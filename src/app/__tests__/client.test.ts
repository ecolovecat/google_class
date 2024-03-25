import {vi} from "vitest";
import Client from "~/app/client.ts";
import {Observable} from "rxjs";

const mockedMethod = vi.hoisted(() => {
    return {
        instance: vi.fn()
    }
})

vi.mock('centrifuge', async () => {
    const result = await vi.importActual('centrifuge')
    return {
        ...result,
        Centrifuge: mockedMethod.instance
    }
})

describe('Client', () => {
    const on = vi.fn();
    const connect = vi.fn();
    const getSubscription = vi.fn();
    mockedMethod.instance.mockReturnValue({
        on,
        connect,
        getSubscription
    })
    describe('constructor', () => {
        it('should trigger correctly', () => {

            new Client({});
            expect(mockedMethod.instance).toHaveBeenCalled();
            expect(on).toHaveBeenCalledWith('connected', expect.any(Function));
            expect(on).toHaveBeenCalledWith('disconnected', expect.any(Function));
            expect(on).toHaveBeenCalledWith('connecting', expect.any(Function));
            expect(connect).toHaveBeenCalled();
        })

    })

    describe('streamSubscribe', () => {
        it('should throw exception if not subscribe', () => {
            getSubscription.mockReturnValue(null);
            const client = new Client({});
            expect(() => client.streamSubscribe('channel')).toThrow(new Error('Subscription is not created'))
            expect(getSubscription).toHaveBeenCalledWith('channel');
        })

        it('should return observable emit message', () => {
            const sub = {
                on: vi.fn(),
            }
            sub.on.mockImplementation((_event, cb) => {
                cb({
                    data: 'test'
                })
            })
            getSubscription.mockReturnValue(sub);
            const client = new Client({});
            const result = client.streamSubscribe('channel');
            const subscriber = vi.fn();
            result.subscribe(subscriber)
            expect(result).toBeInstanceOf(Observable);
            expect(sub.on).toHaveBeenCalledWith('publication', expect.any(Function));
            expect(getSubscription).toHaveBeenCalledWith('channel');
            expect(subscriber).toHaveBeenCalledWith({data: 'test'});
        })
    })
})