import { Centrifuge, PublicationContext } from 'centrifuge';
import { Observable } from 'rxjs';
import API from '~/network';

type AppClientOptions = {
    addr?: string;
    onConnect?: () => void;
    onDisconnect?: () => void;
    onConnecting?: () => void;
}


class AppClient {
    private client: Centrifuge | undefined;
    private options: AppClientOptions;

    constructor(options: AppClientOptions) {
        const addr = options.addr || 'ws://localhost:8000/connection/websocket';
        this.options = {
            addr,
            onConnect: options.onConnect,
            onDisconnect: options.onDisconnect,
            onConnecting: options.onConnecting
        };

        this.initial();
        this.bindEvents();
        this.connect();
    }

    private initial() {
        this.client = new Centrifuge(this.options?.addr as string, {
            getToken: async () => {
                const response = await API.get('/api/v1/participants/token');
                return response.data.data.access_token;
            }
        });
    }

    private connect() {
        this.client?.connect();
    }

    private bindEvents() {
        this.client?.on('connected', () => {
            if (this.options.onConnect) {
                this.options.onConnect();
            }
        });

        this.client?.on('disconnected', () => {
            if (this.options.onDisconnect) {
                this.options.onDisconnect();
            }
        });

        this.client?.on('connecting', () => {
            if (this.options.onConnecting) {
                this.options.onConnecting();
            }
        });
    }

    public close() {
        this.client?.disconnect();
    }

    public subscribe(channel: string): [Observable<PublicationContext>, () => void] {
        const exists = this.client?.getSubscription(channel);
        if (exists) return [this.streamSubscribe(channel), () => this.unsubscribe(channel)];
        const sub = this.client?.newSubscription(channel, {
            token: localStorage.getItem('token')?.toString()
        });
        sub?.on('subscribed', console.log);
        sub?.on('unsubscribed', console.log);
        sub?.on('subscribing', console.log);
        sub?.subscribe();
        return [this.streamSubscribe(channel), () => this.unsubscribe(channel)];
    }

    public unsubscribe(channel: string) {
        const sub = this.client?.getSubscription(channel);
        if (!sub) return;
        sub.unsubscribe();
    }

    public streamSubscribe(channel: string): Observable<PublicationContext> {
        const sub = this.client?.getSubscription(channel);
        if (!sub) throw new Error('Subscription is not created');
        return new Observable(subscribe => {
            sub.on('publication', ctx => {
                subscribe.next(ctx);
            });
        });
    }
}

export default AppClient;
