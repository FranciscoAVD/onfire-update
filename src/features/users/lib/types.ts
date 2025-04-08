import { z } from "zod";
import { rolesSchema, userSessionSchema } from "@/features/users/lib/schemas";

export type Roles = z.infer<typeof rolesSchema>;

export type UserSessionData = z.infer<typeof userSessionSchema>