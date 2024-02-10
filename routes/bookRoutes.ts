import { Router } from "express";
import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from "../controllers/BookController";
import verifyToken from "../middlewares/TokenVerifier";
import { validateBodyPayload } from "../validation/validator";
import { BookSchema } from "../validation/schema";
const bookRoutes = Router();

bookRoutes.post(
  "/createBook",
  verifyToken,
  validateBodyPayload.bind(null, BookSchema),
  createBook
);
bookRoutes.put(
  "/updateBook/:bookId",
  verifyToken,
  validateBodyPayload.bind(null, BookSchema),
  updateBook
);
bookRoutes.get("/books", verifyToken, getBooks);
bookRoutes.delete("/book/:bookId", verifyToken, deleteBook);
bookRoutes.get('/book/:bookId',verifyToken,getBook)

export default bookRoutes;
