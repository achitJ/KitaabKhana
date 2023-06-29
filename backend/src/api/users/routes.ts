import { Router, Request, Response } from "express";
import { loginUser } from "./controller";

const router:Router = Router();

router.route('/')
    .get((req: Request, res: Response): void => {
        res.send('users route');
    });

router.route('/login')
    .post(loginUser);

export default router;