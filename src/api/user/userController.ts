import type { NextFunction, Request, RequestHandler, Response } from "express";
import { createUser } from "../../app";
import { getUserRepository } from "../../infra";

class UserController {
  // public getUsers: RequestHandler = async (_req: Request, res: Response) => {
  //   const serviceResponse = await userService.findAll();
  //   return handleServiceResponse(serviceResponse, res);
  // };

  // public getUser: RequestHandler = async (req: Request, res: Response) => {
  //   const id = Number.parseInt(req.params.id as string, 10);
  //   const serviceResponse = await userService.findById(id);
  //   return handleServiceResponse(serviceResponse, res);
  // };

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
