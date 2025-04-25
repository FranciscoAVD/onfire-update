import { getDay, isValid, parseISO } from "date-fns";
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

export const addStaffToPrivateSchema = z
  .object({
    staffId: z.number().min(1, "Invalid staff id."),
    privateId: z.number().min(1, "Invalid private id."),
    time: z.number(),
    date: z
      .string()
      .refine(
        (d) =>
          isValid(parseISO(d)) || !DISABLED_DAYS.includes(getDay(parseISO(d))), {
            message: "Invalid date."
          },
      ),
  })
  .refine(
    (data) => {
      const dateIdx = getDay(parseISO(data.date));
      const time = weekPrivateTimeSlots.get(dateIdx)?.has(data.time);
      return time;
    },
    {
      path: ["time"],
      message: "Invalid time.",
    },
  );
