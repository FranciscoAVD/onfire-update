import { MINIMUM_PRIVATE_COST } from "@/features/classes/privates/lib/constants";
import { z } from "zod";

export const addPackageSchema = z
  .object({
    name: z
      .string()
      .min(1, "Package name is required.")
      .max(50, "Package name is too long."),
    privates: z.string().min(1),
    cost: z.string().min(1, "Cost is required."),
    discount: z.string().min(1),
    description: z.string().min(20, "Description is not long enough."),
  })
  .refine((d) => Number.isInteger(+d.privates), {
    path: ["privates"],
    message: "Invalid number of privates.",
  })
  .refine((d) => Number.isInteger(+d.cost) && +d.cost >= MINIMUM_PRIVATE_COST, {
    path: ["cost"],
    message: "Invalid cost.",
  })
  .refine((d) => Number.isInteger(+d.discount), {
    path: ["discount"],
    message: "Invalid discount.",
  });

export const updatePackageStatusSchema = z
  .object({
    id: z.string().min(1, "Invalid id."),
    active: z.enum(["true", "false"]),
  })
  .refine((d) => Number.isInteger(+d.id));

export const updatePackageNameSchema = z.object({
  id: z.string().min(1, "Invalid id."),
  name: z
    .string()
    .min(1, "Package name is required.")
    .max(50, "Package name is too long."),
});

export const updatePackageDescriptionSchema = z.object({
  id: z.string().min(1, "Invalid id."),
  description: z
    .string()
    .min(1, "Package description is required.")
    .max(255, "Package description is too long."),
});

export const updatePackageNumbersSchema = z
  .object({
    id: z.string().min(1, "Invalid id."),
    privates: z.string().min(1),
    cost: z.string().min(1, "Cost is required."),
    discount: z.string().min(1),
  })
  .refine((d) => Number.isInteger(+d.privates), {
    path: ["privates"],
    message: "Invalid number of privates.",
  })
  .refine((d) => Number.isInteger(+d.cost) && +d.cost >= MINIMUM_PRIVATE_COST, {
    path: ["cost"],
    message: "Invalid cost.",
  })
  .refine((d) => Number.isInteger(+d.discount), {
    path: ["discount"],
    message: "Invalid discount.",
  });
