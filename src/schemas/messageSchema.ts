import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(6, { message: "Content must be at least 6 characters." })
    .max(300, { message: "Content must not be longer than 300 characters" }),
});
