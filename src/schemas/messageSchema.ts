import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(10, { message: "must be at least 10 char" })
    .max(400, { message: "must not be more than 400 char" }),
});
