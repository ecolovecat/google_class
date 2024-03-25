import {createContext, useContext} from "react";
import Client from "~/app/client.ts";


type AppContextProps = {
    client: Client
}

const appContext = createContext<AppContextProps>({
    client: new Client({})
});

export const AppContextProvider = appContext.Provider;

export const useAppClient = () => {
    const context = useContext(appContext);
    return context.client;
}