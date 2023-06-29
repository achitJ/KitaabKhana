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
    }: IBooks): Promise<IBookDocument | MongooseError | undefined> {
        try {
            const newBook: IBookDocument = new BooksModel({
                title,
                author,
                genre,
                dop,
                availableBooks
            });
            await newBook.save();
            return newBook;
        } catch (error) {
            if (error instanceof MongooseError) {
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
            if (error instanceof MongooseError) {
                return error;
            }
            console.log(error);
        }
    }

    static async findBook({
        title,
        author,
        dop,
        genre,
        sortBy,
        limit,
        skip
    }: {
        title?: string;
        author?: string;
        dop?: Date;
        genre?: string;
        sortBy: 'none' | 'title' | 'author' | 'dop';
        limit: number;
        skip: number;
    }) {
        try {
            const sort: string = sortBy === 'none' ? '' : sortBy;

            const books: IBookDocument[] | null = await BooksModel
                .find({
                    title,
                    author,
                    dop,
                    genre
                })
                .sort(sort)
                .limit(limit)
                .skip(skip);
            return books;
        } catch (error) {
            if (error instanceof MongooseError) {
                return error;
            }
            console.log(error);
        }
    }

    static async autocompleteBook({
        query
    }: {
        query: string;
    }) {
        try {
            const books: IBookDocument[] | null = await BooksModel
                .aggregate([
                    {
                        '$match': {
                            '$or': [
                                {
                                    'title': {
                                        '$regex': new RegExp(`^${query}`),
                                        '$options': 'i'
                                    }
                                }, {
                                    'author': {
                                        '$regex': new RegExp(`^${query}`),
                                        '$options': 'i'
                                    }
                                }
                            ]
                        }
                    }, {
                        '$lookup': {
                            'from': 'genres',
                            'localField': 'genre',
                            'foreignField': '_id',
                            'as': 'genre'
                        }
                    }, {
                        '$unwind': {
                            'path': '$genre'
                        }
                    }, {
                        '$project': {
                            'title': 1,
                            'author': 1,
                            'genre': '$genre.name',
                            'dop': 1,
                            'availableBooks': 1
                        }
                    }
                ]);

            return books;
        } catch (error) {
            if (error instanceof MongooseError) {
                return error;
            }
            console.log(error);
        }
    }
}

export default BooksRepo;