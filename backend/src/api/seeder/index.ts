import { Router } from "express";
import BooksRepo from "../../db/repository/Books";
import { IFindBooksParams } from "../../types/params";

const router: Router = Router();

router.get('/test', async (req, res) => {
    const books = await BooksRepo.findBooks({
        title: 'the',
        sortBy: 'dop',
        limit: 10,
        skip: 0
    } as IFindBooksParams)
    res.json(books);
});

export default router;