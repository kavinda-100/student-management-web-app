import z from 'zod';
import { ZodRoleEnum } from './index';

// user schema (incoming data) for (Teacher, Admin, SuperAdmin)
export const userSchema = z.object({
  _id: z.string({ message: "user id required" }),
  userName: z.string({ message: "user name required" }),
  name: z.string({ message: "name required" }),
  email: z.string({ message: "email required" }),
  role: ZodRoleEnum,
  phoneNumber: z.string({ message: "phone number required"}),
  createdAt: z.string({ message: "created at required"}),
  updatedAt: z.string({ message: "updated at required"}),
});

export type UserSchemaType = z.infer<typeof userSchema>;