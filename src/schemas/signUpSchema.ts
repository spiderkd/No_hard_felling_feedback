import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "username must be at least 2 characters ")
  .max(20, "username must not be more than 20 chars")
  .regex(/^[a-zA-Z0-9_]+$/, "username must not contain special chars");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "invalid email address" }),
  password: z
    .string()
    .min(6, { message: "password must be at least 6 chars " }),
});
