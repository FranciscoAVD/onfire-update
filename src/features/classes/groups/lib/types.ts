import { z } from "zod";
import { dayTimeSchema } from "@/features/classes/groups/lib/schemas";

export type DayTime = z.infer<typeof dayTimeSchema>;
