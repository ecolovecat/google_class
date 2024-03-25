import {RouterProvider} from "react-router-dom";
import {routes} from "~/routing";
import {AppContextProvider} from "~/app/appContext.ts";
import Client from "~/app/client.ts";

export default function App() {
    return (
        <>
            <AppContextProvider value={{
                client: new Client({
                    onConnect: () => console.log('connected'),
                    onDisconnect: () => console.log('disconnected'),
                    onConnecting: console.log,
                })
            }}>
                <RouterProvider router={routes}/>
            </AppContextProvider>
        </>
    )
}
