import { Response } from "express";
import { RequestWithUser } from "../../types/customExpress";
import BooksRepo from "../../db/repository/Books";
import { IFindBooksParams } from "../../types/params";

export const searchBooks = async (req: RequestWithUser, res: Response) => {
    try {
        const books = await BooksRepo.findBooks(req.body as IFindBooksParams);
        res.json(books);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

export const autocompleteBooks = async (req: RequestWithUser, res: Response) => {
    try {
        const query: string = req.query.query as string;
        const books = await BooksRepo.autocompleteBook(query);
        res.json(books);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}