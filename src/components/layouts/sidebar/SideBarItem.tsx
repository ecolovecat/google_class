import {
    Box,
    Flex,
    Icon,
    Link,
    List,
    ListItem,
    Text,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { IconType } from 'react-icons/lib';
import { NavLink } from 'react-router-dom';
import { useSidebarStore } from '~/store/SidebarStore';
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';

export interface SideBarItemType {
    icon: IconType;
    label: string;
    to: string;
    hasToggle: boolean;
}

export interface SideBarItemsProps {
    navItems: SideBarItemType[];
}

const SideBarItem: React.FC<SideBarItemsProps> = ({ navItems }) => {
    const { mode } = useSidebarStore();
    const { colorMode } = useColorMode();

    const itemColor = useColorModeValue('gray.600', 'whiteAlpha.700');

    const [openIcons, setOpenIcons] = useState<boolean[]>(
        Array(navItems.length).fill(false),
    );

    const toggleIcon = (index: number) => {
        setOpenIcons((prevIcons) => {
            const newIcons = [...prevIcons];
            newIcons[index] = !newIcons[index];
            return newIcons;
        });
    };

    const renderArrowIcons = (index: number) => {
        const hasToggle = navItems[index].hasToggle;
        if (hasToggle) {
            return (
                <Box position="absolute" left="0px">
                    {openIcons[index] ? (
                        <IoIosArrowDown />
                    ) : (
                        <IoIosArrowForward />
                    )}
                </Box>
            );
        }
        return null;
    };

    const sidebarOverItem = (item: SideBarItemType, index: number) => (
        <ListItem
            onClick={() => toggleIcon(index)}
            key={index}
            w="300px"
            data-testid={`over-item-${index}`}
        >
            <Link
                display="block"
                as={NavLink}
                to={item.to}
                _focus={{ bg: 'blue.100' }}
                _hover={{
                    bg: colorMode === 'dark' ? 'blackAlpha.800' : 'gray.100',
                    borderRightRadius: '3xl',
                }}
                _activeLink={{
                    bg: colorMode === 'dark' ? 'gray.600' : '#e3eefc',
                    color: 'black',
                    borderRightRadius: '3xl',
                    fontWeight: '700',
                }}
                w="full"
            >
                <Flex
                    alignItems="center"
                    color={itemColor}
                    boxSize={10}
                    p={3}
                    ml="16px"
                >
                    {renderArrowIcons(index)}
                    <Icon boxSize="18px" as={item.icon} />
                    <Text fontSize="sm" ml={6}>
                        {item.label}
                    </Text>
                </Flex>
            </Link>
        </ListItem>
    );

    const sidebarSemiItem = (item: SideBarItemType, index: number) => (
        <ListItem
            onClick={() => toggleIcon(index)}
            key={index}
            w="70px"
            data-testid={`semi-item-${index}`}
        >
            <Link
                display="block"
                as={NavLink}
                to={item.to}
                _focus={{ bg: 'blue.100', borderRightRadius: '3xl' }}
                _hover={{
                    bg: colorMode === 'dark' ? 'blackAlpha.800' : 'gray.100',
                    borderRightRadius: '3xl',
                }}
                _activeLink={{
                    bg: colorMode === 'dark' ? 'gray.600' : '#e3eefc',
                    color: 'black',
                    borderRightRadius: '3xl',
                }}
                w="full"
            >
                <Flex
                    alignItems="center"
                    color={itemColor}
                    p={3}
                    boxSize={10}
                    ml="16px"
                >
                    {renderArrowIcons(index)}
                    <Icon boxSize="18px" as={item.icon} />
                </Flex>
            </Link>
        </ListItem>
    );

    return (
        <List>
            {navItems.map((item, index) =>
                mode === 'over'
                    ? sidebarOverItem(item, index)
                    : sidebarSemiItem(item, index),
            )}
        </List>
    );
};

export default SideBarItem;
