import { z } from "zod";

export const rhythmSchema = z.enum(["Salsa", "Bachata", "Cha-Cha-Cha"]);

export const styleSchema = z.enum(["On 1", "On 2", "On 1/On 2", "Tradicional"]);
