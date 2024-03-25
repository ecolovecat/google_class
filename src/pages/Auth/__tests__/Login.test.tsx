import { describe, expect, it, vi } from 'vitest';
import useAuth from '~/hooks/useAuth.ts';
import { renderApp } from '~/utils/testing';
import Login from '../Login';
import { fireEvent, screen, waitFor } from '@testing-library/react';

const mockedMethod = vi.hoisted(() => {
    return {
        navigate: vi.fn()
    };
});

vi.mock('~/hooks/useAuth');

vi.mock('react-router-dom', async () => {
    const result = await vi.importActual('react-router-dom');
    return {
        ...result,
        useNavigate: () => mockedMethod.navigate
    };
});

describe('LoginComponent', () => {
    const sharePayload = {
        isLoadingGetMe: false,
        handleLogin: vi.fn(),
        isFetchedGetMe: true,
        isLoadingLogin: false,
        isLoggedIn: false,
        user: undefined,
        handleLogout: vi.fn()
    };
    it('render login form', async () => {
        vi.mocked(useAuth).mockReturnValue({
            ...sharePayload
        });

        renderApp(<Login />);

        expect(screen.getByLabelText('Email address')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    it('should redirect to page home if user logged in', () => {
        vi.mocked(useAuth).mockReturnValue({
            ...sharePayload,
            isLoggedIn: true
        });
        renderApp(<Login />);

        expect(mockedMethod.navigate).toHaveBeenCalledWith('/');
    });

    it('displays correct error messages with incorrect values', async () => {
        const { getByLabelText, getByTestId } = renderApp(<Login />);

        const emailField = getByLabelText('Email address');
        fireEvent.change(emailField, { target: { value: 'notanemail' } });

        const passwordField = getByLabelText('Password');
        fireEvent.change(passwordField, { target: { value: '' } });

        const signInButton = getByTestId('submit');
        fireEvent.click(signInButton);

        // Wait for the error message to appear
        const emailError = await waitFor(() => getByTestId('error-email'));
        const passwordError = await waitFor(() =>
            getByTestId('error-password')
        );
        // Check if the error message is in the document
        expect(emailError).toBeInTheDocument();
        expect(passwordError).toBeInTheDocument();
    });
});
