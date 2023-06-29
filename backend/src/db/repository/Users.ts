import { MongooseError } from "mongoose";
import { IUsers, IUserDocument } from "../../types/models";
import UsersModel from "../models/Users";

class UserRepo {
    static async createNewUser({
        name,
        email,
        password,
        isAdmin,
        isGoogleUser
    }: IUsers) : Promise<IUserDocument | MongooseError | undefined> {
        try {
            const newUser:IUserDocument = new UsersModel({
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
    Promise<IUserDocument | MongooseError | undefined | null> {

        try {
            const user: IUserDocument | null = await UsersModel.findOne({email});
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
            const user: IUserDocument | null = await UsersModel.findById(id);
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