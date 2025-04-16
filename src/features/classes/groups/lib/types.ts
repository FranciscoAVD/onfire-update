import { z } from "zod";
import { dayTimeSchema, groupSchema } from "@/features/classes/groups/lib/schemas";

export type DayTime = z.infer<typeof dayTimeSchema>;
export type ZGroup = z.infer<typeof groupSchema>;
