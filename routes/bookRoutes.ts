import { Router } from "express";
import {
  createBook,
  deleteBook,
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

export default bookRoutes;
