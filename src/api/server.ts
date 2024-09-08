import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";

import { userRouter } from "./user/userRouter";
import errorHandler from "./common/middleware/errorHandler";
import rateLimiter from "./common/middleware/rateLimiter";
import { env } from "./common/utils/envConfig";

const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);

// Routes
app.use("/users", userRouter);

// Error handlers
app.use(errorHandler());

export default app;
