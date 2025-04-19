import { getDay, isValid, isWeekend, parseISO } from "date-fns";
import { z } from "zod";
import { rhythmSchema } from "@/features/classes/lib/schemas";
import { weekPrivateTimeSlots } from "@/features/classes/lib/constants";

export const addPrivateSchema = z
  .object({
    date: z
      .string()
      .min(10, "Invalid date.")
      .refine((d) => isValid(parseISO(d)), "Invalid date.")
      .transform((d) => parseISO(d)),
    time: z
      .string()
      .min(4, "Invalid time.")
      .refine((t) => Number.isInteger(+t))
      .transform((t) => Number(t)),
    rhythm: rhythmSchema,
  })
  .superRefine((data, ctx) => {
    const timeMap = weekPrivateTimeSlots.get(getDay(data.date));
    if (!timeMap) {
      ctx.addIssue({
        path: ["date"],
        message: "Invalid date.",
        code: z.ZodIssueCode.custom,
        fatal: true,
      });
      return z.NEVER;
    }
    if (!timeMap.has(data.time)) {
      ctx.addIssue({
        path: ["time"],
        message: "Invalid time.",
        code: z.ZodIssueCode.custom,
        fatal: true,
      });
      return z.NEVER;
    }
  });
export const statusSchema = z.enum(["pending", "ctl", "no-show", "taken"]);
