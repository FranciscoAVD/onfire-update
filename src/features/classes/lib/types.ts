import { z } from "zod";
import { rhythmSchema, styleSchema } from "./schemas";

export type Times = Map<number, string>;

export type Style = z.infer<typeof styleSchema>;
export type Rhythm = z.infer<typeof rhythmSchema>;
