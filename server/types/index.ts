import type { ZodRoleType } from "../zod/moduleSchema";
import type { Request } from "express";

export type GenericRequestBodyType<T> = {
  jwtPayload: JwtPayloadType;
  body: T;
};

export type MessageResponse = {
  message: string;
};

export type ErrorMessage = MessageResponse & {
  stack?: string;
};

export type JwtPayloadType = {
  _id: string;
  role: ZodRoleType;
};