import { useSidebarStore } from '~/store/SidebarStore';
import { vi } from 'vitest';
import { describe, it, expect } from 'vitest';
import { renderApp } from '~/utils/testing';
import SideBarItem, { SideBarItemType } from '../SideBarItem';
import { FaHome, FaUser } from 'react-icons/fa';

vi.mock('~/store/SidebarStore');

const navItems: SideBarItemType[] = [
    {
        icon: FaHome,
        label: 'Home',
        to: '/',
    },
    {
        icon: FaUser,
        label: 'Profile',
        to: '/profile',
    },
];

describe('Sidebar', () => {
    it('renders over side bar when mode over', () => {
        vi.mocked(useSidebarStore).mockReturnValue({
            mode: 'over',
        });
        const { getByTestId } = renderApp(<SideBarItem navItems={navItems} />);
        const overSideBar = getByTestId('over-item-0');
        expect(overSideBar).toBeInTheDocument();
    });

    it('renders semi side bar when mode semi', () => {
        vi.mocked(useSidebarStore).mockReturnValue({
            mode: 'semi',
        });
        const { getByTestId } = renderApp(<SideBarItem navItems={navItems} />);
        const semiSideBar = getByTestId('semi-item-0');
        expect(semiSideBar).toBeInTheDocument();
    });
});
