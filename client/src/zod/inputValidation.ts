import z from "zod";


// Define a schema for login form
export const logInFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
// Define a type for login form
export type LoginFormType = z.infer<typeof logInFormSchema>;