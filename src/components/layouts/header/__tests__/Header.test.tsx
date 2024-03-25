import useAuth from '~/hooks/useAuth';
import Header from '../Header';
import { vi } from 'vitest';
import { describe, it, expect } from 'vitest';
import { renderApp } from '~/utils/testing';

vi.mock('~/hooks/useAuth');

describe('Header', () => {
    beforeEach(() => {
        vi.mocked(useAuth).mockReturnValue({
            handleLogin: vi.fn(),
            isLoadingLogin: false,
            isLoggedIn: false,
            isLoadingGetMe: false,
            isFetchedGetMe: true,
            handleLogout: vi.fn(),
            user: undefined
        });
    });

    it('renders logout button when logged in', () => {
        vi.mocked(useAuth).mockReturnValue({
            handleLogin: vi.fn(),
            isLoadingLogin: false,
            isLoggedIn: true,
            isLoadingGetMe: false,
            isFetchedGetMe: true,
            handleLogout: vi.fn(),
            user: undefined
        });
        const { getByText } = renderApp(<Header />);
        const logoutButton = getByText('Logout');
        expect(logoutButton).toBeInTheDocument();
    });
});
