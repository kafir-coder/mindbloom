"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z
    .object({
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    role: zod_1.z.enum(["Parent", "Psychologist"]),
    gender: zod_1.z.string().min(1),
    description: zod_1.z.string().optional(),
    image: zod_1.z.string().url().or(zod_1.z.literal("")).optional(),
    occupation: zod_1.z.string().optional(),
    socials: zod_1.z.string().or(zod_1.z.literal("")).optional(),
    psycode: zod_1.z.string().or(zod_1.z.literal("")).optional(),
})
    .superRefine((data, ctx) => {
    const isPsychologist = data.role === "Psychologist";
    const hasPyscode = Boolean(data.psycode && data.psycode.trim());
    if (isPsychologist && !hasPyscode) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["psycode"],
            message: "psycode is required for psychologists",
        });
    }
    if (!isPsychologist && hasPyscode) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["psycode"],
            message: "psycode must not be set unless role is psychologist",
        });
    }
});
