import { z } from "zod";
import { MINIMUM_GROUP_COST } from "@/features/classes/groups/lib/constants";
import { rhythmSchema, styleSchema } from "@/features/classes/lib/schemas";

export const dayTimeSchema = z.array(z.object({
  day: z.number().min(0).max(6),
  startTime: z.number().min(1300).max(2100),
  endTime: z.number().min(1330).max(2130),
}));

export const addGroupSchema = z
  .object({
    name: z.string().min(1).max(100),
    type: z.enum(["group", "workshop"]),
    rhythm: rhythmSchema,
    cost: z
      .string()
      .min(1)
      .refine((c) => Number.isInteger(+c) && parseInt(c) >= MINIMUM_GROUP_COST, {
        message: "Invalid cost.",
      }),
    style: styleSchema,
    description: z.string().min(20).max(255),
    days: z.union([z.string(), z.array(z.string())]).transform((data, ctx) => {
      const isArray = Array.isArray(data);

      if (!isArray) {
        const parsed = parseInt(data);
        if (isNaN(parsed)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Invalid day.",
            fatal: true,
          });
          return z.NEVER;
        }
        return parsed;
      }

      //days is an array
      const newDays: number[] = [];

      for (let i = 0; i < data.length; i++) {
        const parsed = parseInt(data[i]);
        if (isNaN(parsed)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Invalid day.",
          });
          return z.NEVER;
        }
        newDays.push(parsed);
      }
      return newDays;
    }),
  })
  .catchall(z.string())
  .transform((data, ctx) => {
    const rawDays = Array.isArray(data.days) ? data.days : [data.days];

    const dayTimes = rawDays.map((d) => {
      const start = parseInt(data[`start_${d}`]);
      const end = parseInt(data[`end_${d}`]);

      //Ensure start and end are valid numbers.
      if (isNaN(start) || isNaN(end)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid times.",
          path: [],
        });
        return z.NEVER;
      }
      //Ensure start and end fall within range
      if (start < 1300 || start > 2100) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid time.",
          path: [`start_${d}`]
        });
        return z.NEVER;
      }
      if (end < 1030 || end > 2130) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid time.",
          path: [`end_${d}`]
        });
        return z.NEVER;
      }
      if (start >= end) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Start time must be before end time",
          path: [`start_${d}`, `end_${d}`],
        });
        return z.NEVER;
      }
      return { day: d, startTime: start, endTime: end };
    }); //End of map

    return {
      name: data.name,
      cost: Number(data.cost),
      description: data.description,
      style: data.style,
      rhythm: data.rhythm,
      type: data.type,
      days: dayTimes,
    };
  });
