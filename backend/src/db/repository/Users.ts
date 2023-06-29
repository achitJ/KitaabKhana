import { MongooseError } from "mongoose";
import { IUsers } from "../../types/models";
import UsersModel from "../models/Users";

class UserRepo {
    static async createNewUser({
        name,
        email,
        password,
        isAdmin,
        isGoogleUser
    }: IUsers) : Promise<IUsers | MongooseError | undefined> {
        try {
            const newUser = new UsersModel({
                name,
                email,
                password,
                isAdmin,
                isGoogleUser
            });
            await newUser.save();
            return newUser;
        } catch (error) {
            if(error instanceof MongooseError) {
                return error;
            }
            console.log(error);
        }
    }

    static async findByUserEmail(email: string):
    Promise<IUsers | MongooseError | undefined | null> {
        try {
            const user: IUsers | null = await UsersModel.findOne({email});
            return user;
        } catch (error) {
            if(error instanceof MongooseError) {
                return error;
            }
            console.log(error);
        }
    }

    static async findUserById(id: string): 
    Promise<IUsers | MongooseError | undefined | null> {
        try {
            const user: IUsers | null = await UsersModel.findById(id);
            return user;
        } catch (error) {
            if(error instanceof MongooseError) {
                return error;
            }
            console.log(error);
        }
    }
}

export default UserRepo;