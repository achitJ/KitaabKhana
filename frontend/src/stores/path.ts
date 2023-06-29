import { create } from 'zustand';
import { IPathStore } from '../types/stores';

export const usePathStore = create<IPathStore>((set) => ({
    path: '',
    setPath: (path) => set({ path }),
}));