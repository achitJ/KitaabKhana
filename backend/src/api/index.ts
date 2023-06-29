import express from 'express';
import { Router } from 'express';
import UserRouter from './users/routes';

const router:Router = express.Router();

router.use('/users', UserRouter);

export default router;