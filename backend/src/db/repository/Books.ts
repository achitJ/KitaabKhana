import BooksModel from "../models/Books";
import { IBookDocument, IBooks } from "../../types/models";
import { MongooseError } from "mongoose";

class BooksRepo {
    static async createNewBook({
        title,
        author,
        genre,
        dop,
        availableBooks
    }: IBooks) : Promise<IBookDocument | MongooseError | undefined> {
        try {
            const newBook:IBookDocument = new BooksModel({
                title,
                author,
                genre,
                dop,
                availableBooks
            });
            await newBook.save();
            return newBook;
        } catch (error) {
            if(error instanceof MongooseError) {
                return error;
            }
            console.log(error);
        }
    }

    static async findBookById(id: string):
    Promise<IBookDocument | MongooseError | undefined | null> {
        try {
            const book: IBookDocument | null = await BooksModel.findById(id);
            return book;
        } catch (error) {
            if(error instanceof MongooseError) {
                return error;
            }
            console.log(error);
        }
    }
}

export default BooksRepo;