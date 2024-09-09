import express, { type Router } from "express";
import { userController } from "./userController";

export const userRouter: Router = express.Router();

userRouter.post("/", userController.createUserHandler);

// userRouter.get("/", userController.getUsers);

// userRouter.get("/:id", userController.getUser);
