import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    FormErrorMessage,
    Container,
    Box,
    Divider,
    HStack,
    Heading,
    Link,
    Stack,
    Text,
    Img
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import useAuth from '~/hooks/useAuth.ts';
import { OAuthButtonGroup } from './OAuthButtonGroup';
import { useTranslation } from 'react-i18next';

interface SignupForm {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Signup: React.FC = () => {
    const { t } = useTranslation();

    const schema = yup.object().shape({
        userName: yup.string().required('User name is required'),
        email: yup
            .string()
            .email(t('validates.not_valid', { field: t('labels.email') }))
            .required(t('validates.required', { field: t('labels.email') })),
        password: yup
            .string()
            .required(t('validates.required', { field: t('labels.password') })),
        confirmPassword: yup
            .string()
            .required(
                t('validates.required', {
                    field: t('labels.confirm_password')
                })
            )
            .oneOf([yup.ref('password')], t('validates.password_not_match'))
    });

    const { handleSubmit, control } = useForm<SignupForm>({
        resolver: yupResolver(schema),
        shouldFocusError: false,
        defaultValues: {
            email: '',
            userName: '',
            password: '',
            confirmPassword: ''
        }
    });
    const navigate = useNavigate();
    const { isLoggedIn, isLoadingGetMe } = useAuth({});
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn]);

    if (isLoadingGetMe) return <div>loading</div>;

    const onSubmit = (data: SignupForm) => console.log(data);

    return (
        <Container
            maxW='lg'
            py={{ base: '12', md: '24' }}
            px={{ base: '0', sm: '8' }}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing='8'>
                    <Stack spacing='6'>
                        <Stack
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                        >
                            <Img
                                maxH={40}
                                maxW={40}
                                src='https://edtechawesomeness.files.wordpress.com/2018/09/google-classroom-logo.png'
                            />
                        </Stack>
                        <Stack
                            spacing={{ base: '2', md: '3' }}
                            textAlign='center'
                        >
                            <Heading size={{ base: 'xs', md: 'sm' }}>
                                Create your own account
                            </Heading>
                            <Text color='fg.muted'>
                                Have already had account?{' '}
                                <Link onClick={() => navigate('/login')}>
                                    Login
                                </Link>
                            </Text>
                        </Stack>
                    </Stack>
                    <Box
                        py={{ base: '0', sm: '8' }}
                        px={{ base: '4', sm: '10' }}
                        bg={{ base: 'transparent', sm: 'bg.surface' }}
                        boxShadow={{ base: 'none', sm: 'md' }}
                        borderRadius={{ base: 'none', sm: 'xl' }}
                    >
                        <Stack spacing='6'>
                            <Stack spacing='5'>
                                <Controller
                                    control={control}
                                    name={'userName'}
                                    render={({
                                                 field,
                                                 fieldState: { invalid, error }
                                             }) => (
                                        <FormControl
                                            id='userName'
                                            mb={4}
                                            isInvalid={invalid}
                                        >
                                            <FormLabel htmlFor='userName'>
                                                User name
                                            </FormLabel>
                                            <Input
                                                variant='outline'
                                                size='lg'
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                            <FormErrorMessage
                                                data-testid={'error-userName'}
                                            >
                                                {error?.message}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name={'email'}
                                    render={({
                                                 field,
                                                 fieldState: { invalid, error }
                                             }) => (
                                        <FormControl
                                            id='email'
                                            mb={4}
                                            isInvalid={invalid}
                                        >
                                            <FormLabel htmlFor='email'>
                                                Email address
                                            </FormLabel>
                                            <Input
                                                variant='outline'
                                                size='lg'
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                            <FormErrorMessage
                                                data-testid={'error-email'}
                                            >
                                                {error?.message}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name={'password'}
                                    render={({
                                                 field,
                                                 fieldState: { invalid, error }
                                             }) => (
                                        <FormControl
                                            id='password'
                                            mb={4}
                                            isInvalid={invalid}
                                        >
                                            <FormLabel htmlFor='password'>
                                                Password
                                            </FormLabel>
                                            <Input
                                                variant='outline'
                                                size='lg'
                                                type='password'
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                            <FormErrorMessage
                                                data-testid={'error-password'}
                                            >
                                                {error?.message}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name={'confirmPassword'}
                                    render={({
                                                 field,
                                                 fieldState: { invalid, error }
                                             }) => (
                                        <FormControl
                                            id='confirmPassword'
                                            mb={4}
                                            isInvalid={invalid}
                                        >
                                            <FormLabel htmlFor='confirmPassword'>
                                                Confirm password
                                            </FormLabel>
                                            <Input
                                                variant='outline'
                                                size='lg'
                                                type='password'
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                            <FormErrorMessage
                                                data-testid={
                                                    'error-confirmPassword'
                                                }
                                            >
                                                {error?.message}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                />
                            </Stack>

                            <Stack spacing='6'>
                                <Button data-testid={'submit'} type='submit'>
                                    Signup
                                </Button>
                                <HStack>
                                    <Divider />
                                    <Text
                                        textStyle='sm'
                                        whiteSpace='nowrap'
                                        color='fg.muted'
                                    >
                                        or continue with
                                    </Text>
                                    <Divider />
                                </HStack>
                                <OAuthButtonGroup />
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </form>
        </Container>
    );
};

export default Signup;
