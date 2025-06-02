import { z } from "zod";

export const createUserSchema = z
  .object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["Parent", "Psychologist"]),
    gender: z.string().min(1),
    description: z.string().min(1),
    image: z.string().url().or(z.literal("")).optional(),
    occupation: z.string().min(1),
    socials: z.string().or(z.literal("")).optional(),
    pyscode: z.string().or(z.literal("")).optional(),
  })
  .superRefine((data, ctx) => {
    const isPsychologist = data.role === "Psychologist";
    const hasPyscode = Boolean(data.pyscode && data.pyscode.trim());

    if (isPsychologist && !hasPyscode) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["pyscode"],
        message: "pyscode is required for psychologists",
      });
    }

    if (!isPsychologist && hasPyscode) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["pyscode"],
        message: "pyscode must not be set unless role is psychologist",
      });
    }
  });
