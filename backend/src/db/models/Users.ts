import Mongoose, { Schema, Model } from "mongoose";
import { IUsers } from "../../types/models";
import { hash } from "../../utils/hash";

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

UsersSchema.methods.toJSON = function() {

    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.createdAt;
    delete userObject.updatedAt;
    delete userObject.__v;

    return userObject;
}

UsersSchema.pre('save', function(next) {
    if(!this.password || !this.isModified('password')) {
        return next();
    }

    this.password = hash(this.password);
    next();
})


const UsersModel: Model<IUsers> = Mongoose.model<IUsers>('Users', UsersSchema);

export default UsersModel;