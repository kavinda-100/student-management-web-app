import type { ZodRoleType } from "../zod/schema";

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