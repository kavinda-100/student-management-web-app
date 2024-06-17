import { ZodRoleType } from ".";
import { LoginFormType } from "./inputValidation";

export type LoginFromTypeWithUserRole = LoginFormType & {
  role: ZodRoleType;
};