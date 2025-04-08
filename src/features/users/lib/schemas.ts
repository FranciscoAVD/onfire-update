import { z } from "zod";

export const rolesSchema = z.enum(["student", "staff", "admin"]);

export const userSessionSchema = z.object({
    id: z.number().positive(),
    name: z.string().min(1),
    role: rolesSchema,
    email: z.string().email(),
})