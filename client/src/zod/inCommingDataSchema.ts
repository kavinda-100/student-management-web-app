import z from 'zod';
import { ZodRoleEnum } from './index';
// {
//     "_id": "664f6881ee320de1d423401a",
//     "userName": "kavinda10",
//     "name": "Kavinda",
//     "email": "superadmin@gmail.com",
//     "role": "superadmin",
//     "phoneNumber": "0771234567",
//     "createdAt": "2024-05-23T16:02:09.803Z",
//     "updatedAt": "2024-05-23T16:02:09.803Z"
// }

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