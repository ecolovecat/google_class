import {ChakraProvider} from '@chakra-ui/react';
import {GoogleOAuthProvider} from '@react-oauth/google';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {QueryClient, QueryClientProvider} from 'react-query';
import {I18nextProvider} from 'react-i18next';
import i18n from './i18n/i18n';
import App from "~/App.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ChakraProvider>
                <I18nextProvider i18n={i18n}>
                    <GoogleOAuthProvider
                        clientId={'98740244692-ob2ptrqk0bp5k97m81r5c7uv69rhf87u.apps.googleusercontent.com'}>
                        <App/>
                    </GoogleOAuthProvider>
                </I18nextProvider>
            </ChakraProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
