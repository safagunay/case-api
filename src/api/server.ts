import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";

import errorHandler from "./common/middleware/errorHandler";
import { env } from "./common/utils/envConfig";
import { userRouter } from "./user/userRouter";
import { booksRouter } from "./book/bookRouter";

const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());

// Routes
app.use("/users", userRouter);
app.use("/books", booksRouter);

// Error handlers
app.use(errorHandler());

export default app;
