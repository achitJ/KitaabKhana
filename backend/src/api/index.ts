import express from 'express';
import { Router } from 'express';
import Seeder from './seeder';
import UserRouter from './users/routes';

const router:Router = express.Router();

router.use('/users', UserRouter);
router.use('/', Seeder);

export default router;