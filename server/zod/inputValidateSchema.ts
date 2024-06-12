import z from "zod";
import { ZodRoleEnum } from "./moduleSchema";

// email validation schema
export const ZodEmailSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
});
export type ZodEmailType = z.infer<typeof ZodEmailSchema>;

// email request body schema
export const ZodVerifyEmailRequestBodySchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  token: z.string({ required_error: "Token is required" }),
});

export type ZodVerifyEmailRequestBodyType = z.infer<typeof ZodVerifyEmailRequestBodySchema>;

// password reset request body schema
export const ZodPasswordResetRequestBodySchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  OPT: z
    .number({ required_error: "OPT is required" })
    .int({ message: "OPT must be a number" })
    .positive({ message: "OPT must be a positive number" }),
  password: z
    .string({
      required_error: "Password is required",
      message: "Password is required",
    })
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export type ZodPasswordResetRequestBodyType = z.infer<typeof ZodPasswordResetRequestBodySchema>;

// login a user schema
export const ZodLoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({
      required_error: "Password is required",
      message: "Password is required",
    })
    .min(6, { message: "Password must be at least 6 characters long" }),
  role: ZodRoleEnum.refine((val) => val != null, {
    message: "Role is required",
  }),
});

export type ZodLoginType = z.infer<typeof ZodLoginSchema>;

// Define the schema for update the user(teacher/admin/super admin) model
export const ZodUserDetailsUpdateSchema = z.object({
  _id: z.string().optional(),
  userName: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  avatar: z.string().url({ message: "Invalid URL" }).optional(),
  phoneNumber: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 characters long",
    })
    .max(10, {
      message: "Phone number must be at most 10 characters long",
    })
    .optional(),
});

export type ZodUserDetailsUpdateType = z.infer<
  typeof ZodUserDetailsUpdateSchema
>;

// Define the schema for the update user role
export const ZodUserRoleUpdateSchema = z.object({
  role: ZodRoleEnum.refine((val) => val != null, {
    message: "Role is required",
  }),
  email: z
    .string({ required_error: "email is required" })
    .email({ message: "Invalid email address" }),
});

export type ZodUserRoleUpdateType = z.infer<typeof ZodUserRoleUpdateSchema>;
