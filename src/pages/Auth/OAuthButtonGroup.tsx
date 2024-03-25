import { Button, ButtonGroup, VisuallyHidden } from '@chakra-ui/react';
import { useGoogleLogin } from '@react-oauth/google';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { AppResponse } from '~/app/response.ts';
import API from '~/network';
import { GitHubIcon, GoogleIcon, TwitterIcon } from './ProviderIcons';
import { useTranslation } from 'react-i18next';


export const OAuthButtonGroup = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { mutate } = useMutation<AxiosResponse<AppResponse<{
        access_token: string
    }>>, AxiosError, { code: string }>({
        mutationKey: 'login-google',
        mutationFn: data => {
            return API.post('/api/v1/auth/login_google', data);
        },
        onSuccess: res => {
            localStorage.setItem('token', res.data.data.access_token);
            navigate('/');
        },
        retry: 1
    });
    const handleLoginGoogle = useGoogleLogin({
        onSuccess: mutate,
        flow: 'auth-code'
    });

    const providers = [
        { name: 'Google', icon: <GoogleIcon />, onClick: handleLoginGoogle, 'data-testid': 'login-google' },
        { name: 'Twitter', icon: <TwitterIcon /> },
        { name: 'GitHub', icon: <GitHubIcon /> }
    ];
    return (
        <ButtonGroup variant='secondary' spacing='4'>
            {providers.map(({ name, icon, onClick, ...item }) => (
                <Button data-testid={item['data-testid']} onClick={onClick} key={name} flexGrow={1}>
                    <VisuallyHidden>
                        {t('messages.signin_with')} {name}
                    </VisuallyHidden>
                    {icon}
                </Button>
            ))}
        </ButtonGroup>
    );
};
