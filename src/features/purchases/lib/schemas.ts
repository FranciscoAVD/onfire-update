import { z } from "zod";

export const packagePurchaseSchema = z.object({
  id: z
    .string()
    .min(1)
    .refine((id) => Number.isInteger(+id) && Number(id) > 0, "Invalid id.")
    .transform((id) => Number(id)),
});
