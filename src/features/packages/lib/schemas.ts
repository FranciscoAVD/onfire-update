import { MINIMUM_PRIVATE_COST } from "@/features/classes/privates/lib/constants";
import { z } from "zod";

export const addPackageSchema = z.object({
  name: z
    .string()
    .min(1, "Package name is required.")
    .max(50, "Package name is too long."),
  privates: z
    .string()
    .min(1)
    .refine(
      (p) => Number.isInteger(+p) && Number(p) >= 1,
      "Invalid number of privates.",
    )
    .transform((p) => Number(p)),
  cost: z
    .string()
    .min(1, "Cost is required.")
    .refine(
      (c) => Number.isInteger(+c) && Number(c) >= MINIMUM_PRIVATE_COST,
      "Invalid cost.",
    )
    .transform((c) => Number(c) * 100),
  discount: z
    .string()
    .min(1)
    .refine((d) => Number.isInteger(+d) && Number(d) >= 0, "Invalid discount.")
    .transform((d) => Number(d)),

  description: z.string().min(20, "Description is not long enough."),
});

export const updatePackageStatusSchema = z.object({
  id: z
    .string()
    .min(1, "Invalid id.")
    .refine((id) => Number.isInteger(+id) && +id > 0)
    .transform((id) => Number(id)),
  active: z.enum(["true", "false"]),
});

export const updatePackageNameSchema = z.object({
  id: z
    .string()
    .min(1, "Invalid id.")
    .refine((id) => Number.isInteger(+id) && +id > 0)
    .transform((id) => Number(id)),
  name: z
    .string()
    .min(1, "Package name is required.")
    .max(50, "Package name is too long."),
});

export const updatePackageDescriptionSchema = z.object({
  id: z
    .string()
    .min(1, "Invalid id.")
    .refine((id) => Number.isInteger(+id) && +id > 0)
    .transform((id) => Number(id)),
  description: z
    .string()
    .min(1, "Package description is required.")
    .max(255, "Package description is too long."),
});

export const updatePackageNumbersSchema = z.object({
  id: z
    .string()
    .min(1, "Invalid id.")
    .refine((id) => Number.isInteger(+id) && +id > 0)
    .transform((id) => Number(id)),
  privates: z
    .string()
    .min(1)
    .refine((p) => Number.isInteger(+p) && Number(p) >= 1, "Invalid privates.")
    .transform((p) => Number(p)),
  cost: z
    .string()
    .min(1, "Cost is required.")
    .refine(
      (c) => Number.isInteger(+c) && Number(c) >= MINIMUM_PRIVATE_COST,
      "Invalid cost.",
    )
    .transform((c) => Number(c) * 100),
  discount: z
    .string()
    .min(1)
    .refine((d) => Number.isInteger(+d) && Number(d) >= 0, "Invalid discount.")
    .transform((d) => Number(d)),
});

export const deletePackageSchema = z.object({
  id: z
    .string()
    .min(1, "Invalid id.")
    .refine((id) => Number.isInteger(+id) && +id > 0)
    .transform((id) => Number(id)),
  intent: z.string().startsWith("delete"),
});
