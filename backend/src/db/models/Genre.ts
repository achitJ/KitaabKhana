import Mongoose, { Model, Schema } from "mongoose";
import { IGenre } from "../../types/models";

const GenreSchema: Schema<IGenre> = new Schema<IGenre>({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
        unique: true,
        index: true,
    }
}, {
    timestamps: true,
});

GenreSchema.methods.toJSON = function() {
    const genre = this;
    const genreObject = genre.toObject();

    delete genreObject.createdAt;
    delete genreObject.updatedAt;
    delete genreObject.__v;

    return genreObject;
}

const GenreModel: Model<IGenre> = Mongoose.model<IGenre>('Genre', GenreSchema);

export default GenreModel;