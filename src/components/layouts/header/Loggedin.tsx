import React from 'react';
import {
    Box,
    Avatar,
    Tooltip,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';
import useAuth from '~/hooks/useAuth.ts';

interface MenuItem {
    label: string;
    url: string;
    id: number;
}

const LoggedIn: React.FC = () => {
    const { t } = useTranslation();

    const { user, handleLogout } = useAuth({});
    const menuItems: MenuItem[] = [
        { label: 'Take a class', url: 'class.google.com', id: 1 },
        { label: 'Create a class', url: 'class.google.com', id: 2 }
    ];

    return (
        <>
            <Menu isLazy>
                <Box
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    w={10}
                    h={10}
                    _hover={{
                        background: 'gray.200',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        transition: 'background 0.4s ease-in-out'
                    }}
                >
                    <Tooltip
                        label={t('tooltips.create_or_join_class')}
                        placement='bottom'
                    >
                        <MenuButton>
                            <AddIcon boxSize={4} cursor='pointer' />
                        </MenuButton>
                    </Tooltip>
                </Box>

                <MenuList>
                    {menuItems.map((item) => (
                        <MenuItem key={item.id}>{item.label}</MenuItem>
                    ))}
                </MenuList>
            </Menu>
            <Avatar data-testid={'avatar'} name={user?.username} src={user?.avatar_url} boxSize={39} />
            <Button data-testid={'button-logout'} onClick={handleLogout}>{t('labels.logout')}</Button>
        </>
    );
};

export default LoggedIn;
