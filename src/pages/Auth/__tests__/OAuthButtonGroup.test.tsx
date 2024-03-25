import MockAdapter from 'axios-mock-adapter';
import { vi } from 'vitest';
import API from '~/network';
import { renderApp } from '~/utils/testing.tsx';
import { OAuthButtonGroup } from '~/pages/Auth/OAuthButtonGroup.tsx';
import { fireEvent, screen, waitFor } from '@testing-library/react';

const mockedMethod = vi.hoisted(() => {
    return {
        navigate: vi.fn(),
        useGoogleLogin: vi.fn()
    };
});
vi.mock('react-router-dom', async () => {
    const result = await vi.importActual('react-router-dom');
    return {
        ...result,
        useNavigate: () => mockedMethod.navigate
    };
});

vi.mock('@react-oauth/google', async () => {
    const result = await vi.importActual('@react-oauth/google');
    return {
        ...result,
        useGoogleLogin: mockedMethod.useGoogleLogin
    };
});

describe('OAuthButtonGroup', () => {
    let mock: MockAdapter;

    beforeAll(() => {
        mock = new MockAdapter(API, {
            // delayResponse: 2000
            onNoMatch: 'passthrough'
        });
    });

    afterEach(() => {
        mock.reset();
    });
    beforeEach(() => {
        mock.onPost('/api/v1/auth/login_google', {
            code: 'code-google'
        }).reply(200, {
                message: 'success',
                data: {
                    access_token: 'token-abc'
                }
            }
        );
    });

    describe('Login Google', () => {
        const handleGoogleLogin = vi.fn();

        mockedMethod.useGoogleLogin.mockImplementation(({ onSuccess }) => {
            return function() {
                handleGoogleLogin();
                onSuccess({
                    code: 'code-google'
                });
            };
        });
        it('should fetch api login google when click google returns success', async () => {

            renderApp(<OAuthButtonGroup />);

            expect(screen.getByTestId('login-google')).toBeInTheDocument();
            fireEvent.click(screen.getByTestId('login-google'));
            expect(handleGoogleLogin).toHaveBeenCalled();
            await waitFor(() => expect(mock.history.post[0].url).toBe('/api/v1/auth/login_google'));
            expect(JSON.parse(mock.history.post[0].data)).toMatchObject({
                code: 'code-google'
            });
            expect(localStorage.getItem('token')).toBe('token-abc');
            expect(mockedMethod.navigate).toHaveBeenCalledWith('/');
        });
    });
});

