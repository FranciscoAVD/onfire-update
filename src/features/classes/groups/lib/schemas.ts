import { z } from "zod";
import { MINIMUM_GROUP_COST } from "@/features/classes/groups/lib/constants";
import { rhythmSchema, styleSchema } from "@/features/classes/lib/schemas";
import { weekGroupTimeSlots } from "@/features/classes/lib/constants";

export const dayTimeSchema = z.array(
  z.object({
    day: z.number().min(0).max(6),
    startTime: z.number().min(1300).max(2100),
    endTime: z.number().min(1330).max(2130),
  }),
);
export const groupSchema = z.object({
  id: z.number(),
  type: z.string(),
  name: z.string(),
  rhythm: z.string(),
  cost: z.number(),
  style: z.string(),
  description: z.string(),
  capacity: z.number().nullable(),
  dayTime: dayTimeSchema,
});
export const groupsSchema = z.array(groupSchema);

export const addGroupSchema = z
  .object({
    name: z.string().min(1).max(100),
    type: z.enum(["group", "workshop"]),
    rhythm: rhythmSchema,
    cost: z
      .string()
      .min(1)
      .refine(
        (c) => Number.isInteger(+c) && Number(c) >= MINIMUM_GROUP_COST,
        "Invalid cost.",
      )
      .transform((c) => Number(c) * 100),
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
        return [parsed];
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
    const dayTimes = data.days.map((d) => {
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
      //Ensure start and end fall are keys
      const timeMap = weekGroupTimeSlots.get(d);
      if(!timeMap){
        
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid date.",
          path: [`days`],
        });
        return z.NEVER;
      }
      if (!timeMap.has(start)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid start time.",
          path: [`start_${d}`],
        });
        return z.NEVER;
      }
      if (!timeMap.has(end)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid end time.",
          path: [`end_${d}`],
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
