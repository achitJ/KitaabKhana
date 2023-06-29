import { Request, RequestHandler, Response } from "express";
import { MongooseError } from "mongoose";
import { IUsers } from "../../types/models";
import UserRepo from "../../db/repository/Users";
import { hash } from "../../utils/hash";

export const loginUser: RequestHandler = async (
    req: Request, 
    res: Response
): Promise<void> => {
    const { email, password } = req.body;
    try {
        const user: IUsers | MongooseError | undefined | null = await UserRepo.findByUserEmail(email);
        
        if(user instanceof MongooseError) {
            res.status(500).json({message: 'Internal server error'});
            return;
        }

        if(!user) {
            res.status(404).json({message: 'User not found'});
            return;
        }

        const hashedPassword: string = hash(password);
        
        res.status(200).json();
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
    }
} 