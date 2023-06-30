import { create } from "zustand";
import { IGenresStore } from '../types/stores';
import { getGenres } from "../api/genre";
import { IGenre } from "../types/misc";

export const useGenresStore = create<IGenresStore>((set) => ({
    genres: [],
    genreNames: ['none'],
    setGenres: (genres) => set({ genres }),
    getGenres: async () => {
        try {
            const genres = await getGenres();
            const genreNames = ['none', ...genres.map((genre: IGenre) => genre.name)];
            set({ genres, genreNames });
        } catch (error) {
            set({genres: [], genreNames: ['none']});
        }
    }

}));