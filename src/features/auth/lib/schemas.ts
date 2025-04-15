import { cleanPhoneNumber, isValidPhoneNumber } from "@/lib/utils";
import { z } from "zod";

export const registerUserSchema = z.object({
  first: z
    .string()
    .min(1, "First name is required.")
    .transform((f) => f.toLowerCase()),
  last: z
    .string()
    .min(1, "Last name is required.")
    .transform((l) => l.toLowerCase()),
  email: z
    .string()
    .email("Invalid email address.")
    .transform((e) => e.toLowerCase()),
  phone: z
    .string()
    .min(1, "Phone number is required.")
    .refine((p) => isValidPhoneNumber(p), "Invalid phone number.")
    .transform((p) => cleanPhoneNumber(p)),
  password: z.string().min(8, "Password must contain at least 8 characters."),
});
export const loginUserSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(1, "Password is required."),
});
