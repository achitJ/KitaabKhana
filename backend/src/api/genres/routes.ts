import { Router } from "express";
import { auth } from "../../middleware/auth";
import { getGenres } from "./controller";

const router: Router = Router();

router.use(auth);

router.route('/')
    .get(getGenres);

export default router;