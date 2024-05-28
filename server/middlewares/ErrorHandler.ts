import type { NextFunction, Request, Response } from "express";
import type { ErrorMessage } from "../types";

// Not Found Middleware
export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
}

// Error Handler Middleware
export function errorHandler(
  err: Error,
  req: Request,
  res: Response<ErrorMessage>,
  next: NextFunction
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: err.stack,
  });
}

// other middlewares can be added here
