import { Response } from "express";
import { RequestWithUser } from "../../types/customExpress";
import GenreRepo from "../../db/repository/Genre";

export const getGenres = async (req: RequestWithUser, res: Response) => {
    try {
        const genres = await GenreRepo.findAllGenres();
        res.json(genres);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}