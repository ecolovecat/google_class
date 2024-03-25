import { AxiosError, AxiosResponse } from 'axios';
import { useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { AppResponse } from '~/app/response.ts';
import { IAuth } from '~/models/IAuth.ts';
import API from '~/network';
import { FormLoginType } from '~/types/auth.ts';

type useAuthProps = {
    onSuccessLogin?: () => void;
};
export default function useAuth({ onSuccessLogin }: useAuthProps) {
    const { mutate, isLoading: isLoadingLogin } = useMutation<
        AxiosResponse<
            AppResponse<{
                access_token: string;
            }>
        >,
        AxiosError,
        FormLoginType
    >({
        mutationKey: 'login',
        mutationFn: async (payload) => {
            return API.post('/api/v1/auth/login', payload);
        },
        onSuccess: (response) => {
            localStorage.setItem('token', response.data.data.access_token);
            onSuccessLogin && onSuccessLogin();
        }
    });
    const navigate = useNavigate();
    const client = useQueryClient();

    const {
        data,
        isLoading: isLoadingGetMe,
        isFetched: isFetchedGetMe
    } = useQuery<AxiosResponse<AppResponse<IAuth>>, AxiosError, IAuth>({
        queryKey: 'auth',
        queryFn: () => API.get('/api/v1/auth/me'),
        // enabled: !!localStorage.getItem('token'),
        select: (response) => response.data.data,
        retry: false,
        // onSettled: console.log,
        refetchOnWindowFocus: false
    });


    const isLoggedIn = useMemo(() => {
        return !!data;
    }, [data]);


    const handleLogin = (payload: FormLoginType) => {
        mutate(payload);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
        client.removeQueries('auth');
    };

    return {
        handleLogin,
        isLoadingLogin,
        isLoggedIn,
        isLoadingGetMe,
        isFetchedGetMe,
        user: data,
        handleLogout
    };
}
