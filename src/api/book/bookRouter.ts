import express, { type Router } from "express";
import { bookController } from "./bookController";

export const booksRouter: Router = express.Router();

booksRouter.post("/", bookController.createBookHandler);

booksRouter.get("/:id", bookController.getBookHandler);

booksRouter.get("/", bookController.getBooksHandler);
