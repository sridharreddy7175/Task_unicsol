import mongoose, { Document, Schema } from "mongoose";
import { IBook } from "../interfaces/bookInterface";

export interface IBookModel extends IBook, Document {}

const BookSchema: Schema = new Schema(
  {
    name: {
      type: String,
      require: true,
      lowercase: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

//EXPORT
export default mongoose.model<IBookModel>("Book", BookSchema);
