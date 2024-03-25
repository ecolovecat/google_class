import React, { ReactNode } from 'react';
import Header from './header/Header';
import {
    Box,
    Flex,
    Grid,
    GridItem,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react';
import SideBar from './sidebar/SideBar';
import { useSidebarStore } from '~/store/SidebarStore';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { mode } = useSidebarStore();

    return (
        <Flex direction="column" zIndex={2} position="relative">
            <Header />
            <Grid
                templateColumns={
                    mode === 'semi' ? 'repeat(12, 8%)' : 'repeat(9, 11%)'
                }
                mt="56px"
            >
                <GridItem
                    colSpan={mode === 'semi' ? 1 : 2}
                    transition="all 0.3s ease-in-out"
                >
                    <SideBar />
                </GridItem>
                <GridItem
                    colSpan={mode === 'semi' ? 11 : 7}
                    transition="all 0.3s ease-in-out"
                >
                    <Box>{children}</Box>
                </GridItem>
            </Grid>
        </Flex>
    );
};

export default Layout;
