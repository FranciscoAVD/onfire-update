import { z } from "zod";

export const rolesSchema = z.enum(["student", "staff", "admin"]);