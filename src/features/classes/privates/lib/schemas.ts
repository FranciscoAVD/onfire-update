import { getDay, isValid, parseISO, toDate } from "date-fns";
import { z } from "zod";
import { rhythmSchema } from "@/features/classes/lib/schemas";
import {
  DISABLED_DAYS,
  weekPrivateTimeSlots,
} from "@/features/classes/lib/constants";

export const addPrivateSchema = z
  .object({
    date: z
      .string()
      .refine(
        (d) =>
          isValid(parseISO(d)) || !DISABLED_DAYS.includes(getDay(parseISO(d))),
        {
          message: "Invalid date.",
        },
      )
      .transform((d) => parseISO(d)),
    time: z.number(),
    rhythm: rhythmSchema,
  })
  .superRefine((data, ctx) => {
    const timeMap = weekPrivateTimeSlots.get(getDay(data.date));
    if (!timeMap || !timeMap.has(data.time)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid time.",
        fatal: true,
      });
      return z.NEVER;
    }
  });

export const statusSchema = z.enum(["pending", "ctl", "no-show", "taken"]);
