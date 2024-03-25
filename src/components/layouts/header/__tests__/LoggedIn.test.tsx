import { fireEvent, screen, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { vi } from 'vitest';
import LoggedIn from '~/components/layouts/header/Loggedin.tsx';
import API from '~/network';
import { renderApp } from '~/utils/testing.tsx';


const mockedMethod = vi.hoisted(() => {
    return {
        navigate: vi.fn(),
        useQueryClient: vi.fn()
    };
});

vi.mock('react-router-dom', async () => {
    const result = await vi.importActual('react-router-dom');
    return {
        ...result,
        useNavigate: () => mockedMethod.navigate
    };
});

vi.mock('react-query', async () => {
    const result = await vi.importActual('react-query');
    return {
        ...result,
        useQueryClient: mockedMethod.useQueryClient
    };
});

describe('LoggedIn', () => {
    let mock: MockAdapter;

    beforeAll(() => {
        mock = new MockAdapter(API);
    });

    afterEach(() => {
        mock.reset();
    });


    it('should render correct avatar url', async () => {
        mock.onGet('/api/v1/auth/me').reply(200, {
            data: {
                id: 1,
                username: 'Tuan Nguyen',
                avatar_url: 'https://image.vtc.vn/files/phuongly/2016/09/10/b1-2108.png'
            }
        });
        renderApp(<LoggedIn />);

        expect(screen.getByTestId('avatar')).toBeInTheDocument();
        await waitFor(() => expect(screen.getByText('TN')).toBeInTheDocument());
    });

    it('should redirect and remove token when click logout', () => {
        const removeQueries = vi.fn();
        mockedMethod.useQueryClient.mockReturnValue({
            removeQueries
        });
        localStorage.setItem('token', 'abc');
        mock.onGet('/api/v1/auth/me').reply(403);
        renderApp(<LoggedIn />);
        fireEvent.click(screen.getByTestId('button-logout'));
        expect(mockedMethod.navigate).toHaveBeenCalledWith('/login');
        expect(localStorage.getItem('token')).toBeNull();
        expect(removeQueries).toHaveBeenCalledWith('auth');
    });
});
