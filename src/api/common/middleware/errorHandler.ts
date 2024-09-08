import type { ErrorRequestHandler, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { logger } from "../utils/logger";

const unexpectedRequest: RequestHandler = (_req, res) => {
  res.sendStatus(StatusCodes.NOT_FOUND);
};

const unexpectedError: ErrorRequestHandler = (err, _req, res, next) => {
  logger.error(err, "unexpected error");
  res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
};

export default () => [unexpectedRequest, unexpectedError];
