import { z } from "zod";
import { rolesSchema } from "./schemas";

export type Roles = z.infer<typeof rolesSchema>;