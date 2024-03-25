import { GoogleOAuthProvider } from '@react-oauth/google';
import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { QueryClientProvider, QueryClient } from 'react-query';
import { render, RenderResult } from '@testing-library/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import i18n from '~/i18n/i18n.ts';

export const renderApp = (component: React.ReactNode): RenderResult => {
    return render(
        <QueryClientProvider client={new QueryClient()}>
            <GoogleOAuthProvider clientId={'abc'}>
                <I18nextProvider i18n={i18n}>
                    <RouterProvider router={createBrowserRouter([{
                        path: '/',
                        element: component
                    }])} />
                </I18nextProvider>
            </GoogleOAuthProvider>
        </QueryClientProvider>
    );
};

export const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={new QueryClient()}>
        <GoogleOAuthProvider clientId={'abc'}>
            <I18nextProvider i18n={i18n}>
                <RouterProvider router={createBrowserRouter([{
                    path: '/',
                    element: children
                }])} />
            </I18nextProvider>
        </GoogleOAuthProvider>
    </QueryClientProvider>
);

export const renderHookApp = <T extends never>(hook: T) =>
    renderHook(hook, { wrapper });
