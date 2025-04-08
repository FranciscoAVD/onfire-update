import { isValidPhoneNumber } from "@/lib/utils";
import { z } from "zod";

export const registerUserSchema = z.object({
  first: z.string().min(1, "First name is required."),
  last: z.string().min(1, "Last name is required."),
  email: z.string().email("Invalid email address."),
  phone: z.string().min(1, "Phone number is required."),
  password: z.string().min(8, "Password must contain at least 8 characters.")
}).refine(d => isValidPhoneNumber(d.phone), {
  path: ["phone"],
  message: "Invalid phone number.",
});

export const loginUserSchema = z.object({
    email: z.string().email("Invalid email address."),
    password: z.string().min(1, "Password is required.")
})
