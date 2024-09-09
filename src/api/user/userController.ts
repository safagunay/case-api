import type { NextFunction, Request, RequestHandler, Response } from "express";
import { createUser, getUser, getUsers } from "../../app";
import { getUserRepository } from "../../infra";
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

      res.status(200).send(await createUser(req.body, userRepository));
    } catch (err) {
      next(err);
    }
  };
}

export const userController = new UserController();
