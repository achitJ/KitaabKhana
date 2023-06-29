import express from 'express';
import { Router } from 'express';
import Seeder from './seeder';
import UserRouter from './users/routes';
import BooksRouter from './books/routes';
import GenresRouter from './genres/routes';

const router:Router = express.Router();

router.use('/users', UserRouter);
router.use('/books', BooksRouter);
router.use('/genres', GenresRouter);
router.use('/', Seeder);

export default router;