import { z } from "zod";
import { statusSchema } from "@/features/classes/privates/lib/schemas";

export type Status = z.infer<typeof statusSchema>;
