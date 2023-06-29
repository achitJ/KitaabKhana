import { Router, Request, Response } from "express";

const router:Router = Router();

router.route('/')
    .get((req: Request, res: Response): void => {
        res.send('users route');
    });

export default router;