import { Request, RequestHandler, Response } from "express";
import { MongooseError } from "mongoose";
import { IUsers } from "../../types/models";
import UserRepo from "../../db/repository/Users";
import { compare } from "../../utils/hash";

export const loginUser: RequestHandler = async (
    req: Request, 
    res: Response
): Promise<void> => {
    const { email, password } = req.body;
    try {
        const user: IUsers | MongooseError | undefined | null = await UserRepo.findByUserEmail(email);
        
        if(user instanceof MongooseError) {
            if(user.name === 'ValidationError') {
                res.status(400).json({message: 'Invalid data'});
                return;
            }

            res.status(500).json({message: 'Internal server error'});
            return;
        }

        if(!user) {
            res.status(404).json({message: 'User not found'});
            return;
        }

        if(!user.password) {
            res.status(400).json({message: 'Use google login instead'});
            return;
        }

        if(!compare(password, user.password)) {
            res.status(400).json({message: 'Invalid credentials'});
            return;
        }
        
        res.status(200).json({message: 'Login successful', user});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
    }
} 

export const registerUser: RequestHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { name, email, password, isAdmin, isGoogleUser } = req.body;
    try {

        const tempUser: IUsers | MongooseError | undefined | null = await UserRepo.findByUserEmail(email);

        if(tempUser instanceof MongooseError) {
            res.status(500).json({message: 'Internal server error'});
            return;
        }

        if(tempUser) {
            res.status(400).json({message: 'User already exists'});
            return;
        }

        const user: IUsers | MongooseError | undefined = await UserRepo.createNewUser({
            name,
            email,
            password,
            isAdmin,
            isGoogleUser
        });

        if(user instanceof MongooseError) {
            if(user.name === 'ValidationError') {
                res.status(400).json({message: 'Invalid data'});
                return;
            }

            res.status(500).json({message: 'Internal server error'});
            return;
        }

        if(!user) {
            res.status(400).json({message: 'User not created'});
            return;
        }

        console.log({user, tempUser});

        res.status(201).json({message: 'User created', user});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
    }
}