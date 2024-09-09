import type { NextFunction, Request, RequestHandler, Response } from "express";
import { getBookRepository } from "../../infra";
import { createBook, getBook, getBooks } from "../../app";
import { StatusCodes } from "http-status-codes";

class BookController {
  public getBooksHandler: RequestHandler = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const bookRepository = await getBookRepository();

      const result = await getBooks(bookRepository);

      res.status(StatusCodes.OK).send(result);
    } catch (err) {
      next(err);
    }
  };

  public getBookHandler: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const bookRepository = await getBookRepository();

      const id = req.params.id as unknown as number;

      const result = await getBook({ id }, bookRepository);

      if (result === null) {
        res.sendStatus(StatusCodes.NOT_FOUND);
      } else {
        res.status(StatusCodes.OK).send(result);
      }
    } catch (err) {
      next(err);
    }
  };

  public createBookHandler: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const bookRepository = await getBookRepository();

      res.status(StatusCodes.OK).send(await createBook(req.body, bookRepository));
    } catch (err) {
      next(err);
    }
  };
}

export const bookController = new BookController();
