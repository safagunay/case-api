import express, { type Router } from "express";
import { userController } from "./userController";

export const userRouter: Router = express.Router();

userRouter.post("/", userController.createUserHandler);

userRouter.get("/:id", userController.getUserHandler);

userRouter.get("/", userController.getUsersHandler);

userRouter.post("/:userId/borrow/:bookId", userController.borrowBookHandler);

