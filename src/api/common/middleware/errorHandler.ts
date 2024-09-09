import type { ErrorRequestHandler, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { logger } from "../utils/logger";
import { ZodError } from "zod";

const notFoundHandler: RequestHandler = (_req, res) => {
  res.sendStatus(StatusCodes.NOT_FOUND);
};

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    const errorMessage = `Invalid input: ${(err as ZodError).errors
      .map((e) => e.message)
      .join(", ")}`;

    res.status(StatusCodes.BAD_REQUEST).send({
      message: errorMessage,
    });
  } else {
    logger.error(err, "unexpected error");
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export default () => [notFoundHandler, errorHandler];
