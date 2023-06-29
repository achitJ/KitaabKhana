import { Router } from "express";
import BooksRepo from "../../db/repository/Books";

const router: Router = Router();

router.get('/test', async (req, res) => {
    const books = await BooksRepo.autocompleteBook({
        query: 'harry'
    });
    res.json(books);
});

export default router;