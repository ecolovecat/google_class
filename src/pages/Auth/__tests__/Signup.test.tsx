import { describe, expect, it, vi } from 'vitest';
import useAuth from '~/hooks/useAuth.ts';
import { renderApp } from '~/utils/testing';
import Signup from '../Signup';
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

describe('SignupComponent', () => {
    const sharePayload = {
        isLoadingGetMe: false,
        handleLogin: vi.fn(),
        isFetchedGetMe: true,
        isLoadingLogin: false,
        isLoggedIn: false,
        user: undefined,
        handleLogout: vi.fn()
    };
    it('render signup form', async () => {
        vi.mocked(useAuth).mockReturnValue({
            ...sharePayload
        });

        renderApp(<Signup />);

        expect(screen.getByLabelText('User name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email address')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();
    });

    it('should redirect to page home if user logged in', () => {
        vi.mocked(useAuth).mockReturnValue({
            ...sharePayload,
            isLoggedIn: true
        });
        renderApp(<Signup />);

        expect(mockedMethod.navigate).toHaveBeenCalledWith('/');
    });

    it('displays correct error messages with incorrect values', async () => {
        const { getByLabelText, getByTestId, queryByText } = renderApp(
            <Signup />
        );

        const userNameField = getByLabelText('User name');
        fireEvent.change(userNameField, { target: { value: '' } });

        const emailField = getByLabelText('Email address');
        fireEvent.change(emailField, { target: { value: 'notanemail' } });

        const passwordField = getByLabelText('Password');
        fireEvent.change(passwordField, { target: { value: '' } });

        const confirmPasswordField = getByLabelText('Confirm password');
        fireEvent.change(confirmPasswordField, {
            target: { value: 'wrongpassword' }
        });

        const signUpButton = getByTestId('submit');
        fireEvent.click(signUpButton);

        // Wait for the error message to appear
        const userNameError = await waitFor(() =>
            getByTestId('error-userName')
        );
        const emailError = await waitFor(() => getByTestId('error-email'));
        const passwordError = await waitFor(() =>
            getByTestId('error-password')
        );
        const confirmPasswordError = await waitFor(() =>
            queryByText('Passwords must match')
        );

        // Check if the error message is in the document
        expect(userNameError).toBeInTheDocument();
        expect(emailError).toBeInTheDocument();
        expect(passwordError).toBeInTheDocument();
        expect(confirmPasswordError).toBeInTheDocument();
    });
});
