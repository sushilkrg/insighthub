import { z } from "zod";

export const createInsightSchema = z.object({
  tag: z
    .string()
    .min(2, { message: "Tag must be at least 2 characters." })
    .max(10, { message: "Tag must not be longer than 10 characters" }),

  question: z
    .string()
    .min(2, { message: "Tag must be at least 2 characters." })
    .max(100, { message: "Tag must not be longer than 100 characters" }),
});
