import mongoose from "mongoose";
import Book from "../models/bookModel";
import { Request, Response } from "express";
export const createBook = async (req: any, res: any) => {
  try {
    let BookData = req.body;
    let newRole = new Book({
      name: BookData.name,
      description: BookData.description,
    });
    newRole = await newRole.save();
    res.status(200).json({
      msg: "Successfully created in Book",
    });
  } catch (err) {
    res.status(500).json({
      errors: [
        {
          msg: err,
        },
      ],
    });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const BookData = req.params.bookId;
    if (BookData) {
      let bookCheck = await Book.findOne({
        _id: BookData,
      });
      if (!bookCheck) {
        return res.status(401).json({
          errors: [
            {
              msg: "Book does not exists!",
            },
          ],
        });
      }
      const query = {
        _id: new mongoose.Types.ObjectId(BookData),
      };
      await Book.updateOne(query, req.body).then((data) => {
        return res.status(200).json({
          msg: "Success fully updated",
        });
      });
    } else {
      return res.status(401).json({
        errors: [
          {
            msg: "Please passed to the bookId in Params",
          },
        ],
      });
    }
  } catch (err) {
    res.status(500).json({
      errors: [
        {
          msg: err,
        },
      ],
    });
  }
};

export const getBooks = async (req: Request, res: Response) => {
  try {
    let books = await Book.find();
    if (!books) {
      return res.status(400).json({
        errors: [
          {
            msg: "No Books Found",
          },
        ],
      });
    }
    res.status(200).json({
      books: books,
    });
  } catch (err) {
    res.status(500).json({
      errors: [
        {
          msg: err,
        },
      ],
    });
  }
};
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const BookData = req.params.bookId;
    if (BookData) {
      let bookCheck = await Book.findOne({
        _id: BookData,
      });
      if (!bookCheck) {
        return res.status(401).json({
          errors: [
            {
              msg: "Book does not exists!",
            },
          ],
        });
      }
      const query = {
        _id: new mongoose.Types.ObjectId(BookData),
      };
      await Book.deleteOne(query).then((data) => {
        return res.status(200).json({
          msg: "Book Removed successfully",
        });
      });
    } else {
      return res.status(401).json({
        errors: [
          {
            msg: "Please passed to the bookId in Params",
          },
        ],
      });
    }
  } catch (err) {
    res.status(500).json({
      errors: [
        {
          msg: err,
        },
      ],
    });
  }
};
