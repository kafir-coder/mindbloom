import { z } from "zod";

export const createUserSchema = z
  .object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["Parent", "Psychologist"]),
    gender: z.string().min(1),
    description: z.string().optional(),
    image: z.string().url().or(z.literal("")).optional(),
    occupation: z.string().min(1),
    socials: z.string().or(z.literal("")).optional(),
    psycode: z.string().or(z.literal("")).optional(),
  })
  .superRefine((data, ctx) => {
    const isPsychologist = data.role === "Psychologist";
    const hasPyscode = Boolean(data.psycode && data.psycode.trim());

    if (isPsychologist && !hasPyscode) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["psycode"],
        message: "psycode is required for psychologists",
      });
    }

    if (!isPsychologist && hasPyscode) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["psycode"],
        message: "psycode must not be set unless role is psychologist",
      });
    }
  });
