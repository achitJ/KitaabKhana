import GenreModel from "../models/Genre";
import { IGenreDocument, IGenre } from "../../types/models";
import { MongooseError } from "mongoose";


class GenreRepo {
    static async createNewGenre({
        name
    }: IGenre) : Promise<IGenreDocument | MongooseError | undefined> {
        try {
            const newGenre:IGenreDocument = new GenreModel({
                name
            });
            await newGenre.save();
            return newGenre;
        } catch (error) {
            if(error instanceof MongooseError) {
                return error;
            }
            console.log(error);
        }
    }

    static async findGenreById(id: string):
    Promise<IGenreDocument | MongooseError | undefined | null> {
        try {
            const genre: IGenreDocument | null = await GenreModel.findById(id);
            return genre;
        } catch (error) {
            if(error instanceof MongooseError) {
                return error;
            }
            console.log(error);
        }
    }

    static async findGenreByName(name: string):
    Promise<IGenreDocument | MongooseError | undefined | null> {
        try {
            const genre: IGenreDocument | null = await GenreModel.findOne({name});
            return genre;
        } catch (error) {
            if(error instanceof MongooseError) {
                return error;
            }
            console.log(error);
        }
    }

    static async findAllGenres():
    Promise<IGenreDocument[] | MongooseError | undefined | null> {
        try {
            const genres: IGenreDocument[] | null = await GenreModel.find();
            return genres;
        } catch (error) {
            if(error instanceof MongooseError) {
                return error;
            }
            console.log(error);
        }
    }
}

export default GenreRepo;