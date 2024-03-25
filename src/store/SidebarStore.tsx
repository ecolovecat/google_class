import create from 'zustand';

type SidebarStore = {
    mode: 'semi' | 'over';
    toggleMode: () => void;
};

export const useSidebarStore = create<SidebarStore>((set) => ({
    mode: 'semi',
    toggleMode: () =>
        set((state) => ({ mode: state.mode === 'semi' ? 'over' : 'semi' })),
}));
