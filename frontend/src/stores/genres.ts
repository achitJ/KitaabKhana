import { create } from "zustand";
import { IGenresStore } from '../types/stores';
import { getGenres } from "../api/genre";

export const useGenresStore = create<IGenresStore>((set) => ({
    genres: [],
    setGenres: (genres) => set({ genres }),
    getGenres: async () => {
        const genres = await getGenres();
        set({ genres });
    }

}));