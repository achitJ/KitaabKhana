import Mongoose, { Schema, Model } from "mongoose";
import { IUsers } from "../../types/models";

const UsersSchema: Schema<IUsers> = new Schema<IUsers>({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        minlength: 8,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isGoogleUser: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

const Users: Model<IUsers> = Mongoose.model<IUsers>('Users', UsersSchema);

export default Users;