import BooksModel from "../models/Books";
import { IBookDocument, IBooks, IGenreDocument } from "../../types/models";
import { MongooseError, Query } from "mongoose";
import { IFindBooksParams, IFindBooksQuery } from "../../types/params";
import GenresRepo from "./Genre";

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

    static async findBooks({
        title,
        author,
        dopStart,
        dopEnd,
        genre,
        sortBy,
        limit,
        skip
    }: IFindBooksParams): 
    Promise<IBookDocument[] | MongooseError | undefined> {
        try {
            const query = {} as IFindBooksQuery;
            const sort: string = sortBy === 'none' ? '' : sortBy;

            if (title) {
                query['title'] = new RegExp(`^${title}`, 'i');
            }

            if (author) {
                query['author'] = new RegExp(`^${author}`, 'i');
            }

            if (dopStart && dopEnd) {
                query['dop'] = {
                    $gte: dopStart,
                    $lte: dopEnd
                };
            }

            if (genre) {
                const genreDoc : IGenreDocument | MongooseError | null | undefined = await GenresRepo.findGenreByName(genre);
                
                if (genreDoc && !(genreDoc instanceof MongooseError)) {
                    query['genre'] = genreDoc._id;
                }
            }


            const books: IBookDocument[] | null = await BooksModel
                .find(query)
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

    static async autocompleteBook(query: string) {
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