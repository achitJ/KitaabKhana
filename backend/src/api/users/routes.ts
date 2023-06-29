import { Router, Response } from "express";
import { RequestWithUser } from "../../types/customExpress";
import { loginUser, registerUser } from "./controller";
import { auth } from "../../middleware/auth";

const router:Router = Router();

router.route('/')
    .get(auth, (req: RequestWithUser, res: Response): void => {
        res.send('users route');
    });

router.route('/login')
    .post(loginUser);

router.route('/register')
    .post(registerUser);

export default router;