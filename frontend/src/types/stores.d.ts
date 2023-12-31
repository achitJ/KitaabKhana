import { IGenre } from "./misc";

export interface IPathStore {
    path: string;
    setPath: (path: string) => void;
};

export interface IGenresStore {
    genres: IGenre[];
    genreNames: string[];
    setGenres: (genres: IGenre[]) => void;
    getGenres: () => Promise<void>;
}