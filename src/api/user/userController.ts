import type { NextFunction, Request, RequestHandler, Response } from "express";
import { borrowBook, createUser, getUser, getUsers } from "../../app";
import { getUserRepository, getBookRepository, getUserBookRepository } from "../../infra";
import { StatusCodes } from "http-status-codes";

class UserController {
  public getUsersHandler: RequestHandler = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userRepository = await getUserRepository();

      const result = await getUsers(userRepository);

      res.status(StatusCodes.OK).send(result);
    } catch (err) {
      next(err);
    }
  };

  public getUserHandler: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userRepository = await getUserRepository();

      const id = req.params.id as unknown as number;

      const result = await getUser({ id }, userRepository);

      if (result === null) {
        res.sendStatus(StatusCodes.NOT_FOUND);
      } else {
        res.status(StatusCodes.OK).send(result);
      }
    } catch (err) {
      next(err);
    }
  };

  public createUserHandler: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userRepository = await getUserRepository();

      res.status(StatusCodes.OK).send(await createUser(req.body, userRepository));
    } catch (err) {
      next(err);
    }
  };

  public borrowBookHandler: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userBookRepository = await getUserBookRepository();
      const userRepository = await getUserRepository();
      const bookRepository = await getBookRepository();

      const userId = req.params.userId as unknown as number;
      const bookId = req.params.bookId as unknown as number;

      const result = await borrowBook(
        { userId, bookId },
        userBookRepository,
        userRepository,
        bookRepository
      );

      if (result === "book-not-available") {
        res.status(StatusCodes.CONFLICT).send({
          message: "book is already borrowed",
        });
        return;
      }

      if (result === "book-not-found") {
        res.status(StatusCodes.NOT_FOUND).send({
          message: "book not found",
        });
        return;
      }

      if (result === "user-not-found") {
        res.status(StatusCodes.NOT_FOUND).send({
          message: "user not found",
        });
        return;
      }

      res.status(StatusCodes.OK).send({
        message: "success",
      });
    } catch (err) {
      next(err);
    }
  };
}

export const userController = new UserController();
