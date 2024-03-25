import { createBrowserRouter } from 'react-router-dom';
import Home from '~/pages/Home';
import Login from '~/pages/Auth/Login';
import Signup from '~/pages/Auth/Signup';

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        index: true,
    },
    {
        path: '/calender',
        element: <Home />,
        index: true,
    },
    {
        path: '/messages',
        element: <Home />,
    },
    {
        path: '/settings',
        element: <Home />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <Signup />,
    },
]);
