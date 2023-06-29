import Mongoose, { Schema, Model } from "mongoose";
import { IBooks } from "../../types/models";

const BookSchema: Schema<IBooks> = new Schema<IBooks>({
    title: {
        type: String,
        required: true,
        index: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    genre: {
        type: Schema.Types.ObjectId,
        ref: 'Genre',
        required: true,
    },
    dop: {
        type: Date,
        required: true,
    },
    availableBooks: {
        type: Number,
        required: true,
        min: 0,
    }
}, {
    timestamps: true,
});

BookSchema.methods.toJSON = function() {
    const book = this;
    const bookObject = book.toObject();

    delete bookObject.createdAt;
    delete bookObject.updatedAt;
    delete bookObject.__v;

    return bookObject;
}

const BooksModel: Model<IBooks> = Mongoose.model<IBooks>('Book', BookSchema);

export default BooksModel;