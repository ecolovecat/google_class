import {
    Box,
    Flex,
    Spacer,
    Text,
    Tooltip,
    Image,
    useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import useAuth from '~/hooks/useAuth';
import NotLoggedIn from './NotLoggedIn';
import LoggedIn from './Loggedin';
import { IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useColorMode } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useSidebarStore } from '~/store/SidebarStore';

const Header: React.FC = () => {
    const { t } = useTranslation();

    const { toggleMode } = useSidebarStore();

    const { isLoggedIn } = useAuth({});
    const { colorMode, toggleColorMode } = useColorMode();

    const titleColor = useColorModeValue('gray.600', 'white');
    const iconColor = useColorModeValue('blackAlpha.800', 'white');
    const headerBackgroundColor = useColorModeValue('white', 'gray.800');

    return (
        <Box
            w="100%"
            py={2}
            px={6}
            borderBottom="1px"
            borderBottomColor="gray.100"
            position="fixed"
            top={0}
            zIndex={1000}
            backgroundColor={headerBackgroundColor}
        >
            <Flex>
                <Flex alignItems={'center'} gap="4">
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        w={10}
                        h={10}
                        _hover={{
                            background: 'gray.200',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            transition: 'background 0.4s ease-in-out',
                        }}
                        onClick={toggleMode}
                    >
                        <Tooltip
                            label={t('tooltips.main_menu')}
                            placement="bottom"
                        >
                            <HamburgerIcon
                                boxSize={5}
                                color={iconColor}
                                cursor="pointer"
                            />
                        </Tooltip>
                    </Box>
                    <Image
                        src="https://www.gstatic.com/classroom/logo_square_rounded.svg"
                        alt="Alt text"
                        maxHeight="40px"
                        maxWidth="30px"
                        cursor="pointer"
                    />
                    <Text
                        color={titleColor}
                        fontSize="1.5rem"
                        _hover={{
                            color: 'green',
                            cursor: 'pointer',
                        }}
                    >
                        {t('labels.app_title')}
                    </Text>
                </Flex>

                <Spacer />

                <Flex alignItems={'center'} gap="3">
                    <Flex alignItems={'center'} gap="3">
                        <Tooltip
                            label={t('tooltips.toggle_color_mode')}
                            placement="bottom"
                        >
                            <IconButton
                                aria-label="Toggle color mode"
                                icon={
                                    colorMode === 'dark' ? (
                                        <FaSun />
                                    ) : (
                                        <FaMoon />
                                    )
                                }
                                onClick={toggleColorMode}
                            />
                        </Tooltip>
                        <Flex alignItems={'center'} gap="3">
                            {!isLoggedIn ? <NotLoggedIn /> : <LoggedIn />}
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Header;
