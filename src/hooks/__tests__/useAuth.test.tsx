import MockAdapter from 'axios-mock-adapter';
import { vi } from 'vitest';
import useAuth from '~/hooks/useAuth.ts';
import API from '~/network';
import { renderApp, wrapper } from '~/utils/testing.tsx';
import { act, fireEvent, screen, waitFor, renderHook } from '@testing-library/react';


describe('useAuth', () => {
    let mock: MockAdapter;

    beforeAll(() => {
        mock = new MockAdapter(API, {
            // delayResponse: 2000
        });
    });

    afterEach(() => {
        mock.reset();
    });

    beforeEach(() => {
        mock.onPost('/api/v1/auth/login').reply(200, {
            message: 'success',
            data: {
                access_token: 'token123'
            }
        });
        mock.onGet('/api/v1/auth/me').reply(200, {
            message: 'success',
            data: {
                id: 1
            }
        });
    });

    it('should fetch api login when dispatch login', async () => {
        const onSuccess = vi.fn();
        const Component = () => {
            const { handleLogin, isLoadingLogin } = useAuth({
                onSuccessLogin: onSuccess
            });

            if (isLoadingLogin) {
                return <div>loading</div>;
            }

            return (
                <button data-testid={'button'} onClick={() => handleLogin({
                    email: 'a@gmail.com',
                    password: '123456'
                })} />
            );
        };
        act(() => {
            renderApp(<Component />);
        });
        const button = screen.getByTestId('button');
        fireEvent.click(button);
        await waitFor(() => expect(mock.history.post.length).toBe(1));
        expect(mock.history.post[0].url).toBe('/api/v1/auth/login');
        expect(localStorage.getItem('token')).toBe('token123');
        expect(onSuccess).toHaveBeenCalled();
    });

    it('it should return true if user logged in', async () => {
        mock.onGet('/api/v1/auth/me').reply(200, {
            data: {
                email: 'a@gmail.com'
            }
        });
        const { result } = renderHook(() => useAuth({}), { wrapper });

        await waitFor(() => expect(result.current.isLoggedIn).toBeTruthy());
    });
});
