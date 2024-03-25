import { useEffect } from 'react';
import { useAppClient } from '~/app/appContext.ts';
import CardClass from '~/components/cards/CardClass';
import Layout from '~/components/layouts/Layout';

function Home() {
    const client = useAppClient();

    useEffect(() => {
        const [ctx, unsubscribe] = client.subscribe('welcome');

        ctx.subscribe(console.log);

        return () => {
            unsubscribe();
        };
    }, [client]);

    return (
        <Layout>
            <CardClass
                color="blue"
                avataUrl="https://bit.ly/ryan-florence"
                title="Title"
                subTitle="Subtitle"
                ownerName="Duy"
                headerUrl="https://img.freepik.com/free-photo/grunge-black-concrete-textured-background_53876-124541.jpg"
            ></CardClass>
        </Layout>
    );
}

export default Home;
