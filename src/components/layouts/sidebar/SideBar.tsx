import { Box } from '@chakra-ui/react';
import React from 'react';
import SideBarItem, { SideBarItemType } from './SideBarItem';
import { IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
import { SlCalender } from 'react-icons/sl';
import { BiMessageSquareDetail } from 'react-icons/bi';

const SideBar: React.FC = () => {
    const navItems: SideBarItemType[] = [
        {
            icon: IoHomeOutline,
            label: 'Home',
            to: '/',
            hasToggle: false,
        },
        {
            icon: SlCalender,
            label: 'Calender',
            to: '/calender',
            hasToggle: false,
        },
        {
            icon: BiMessageSquareDetail,
            label: 'Messages',
            to: '/messages',
            hasToggle: true,
        },
        {
            icon: IoSettingsOutline,
            label: 'Settings',
            to: '/settings',
            hasToggle: false,
        },
    ];
    return (
        <Box
            left="0"
            position={'fixed'}
            h="calc(100vh -  55px)"
            overflowY="auto"
            zIndex="1"
            borderWidth="1px"
            borderStyle="solid"
            borderColor="gray.300"
            pt="12px"
            pr="16px"
        >
            <SideBarItem navItems={navItems} />
        </Box>
    );
};

export default SideBar;
