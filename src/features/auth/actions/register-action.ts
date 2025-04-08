"use server";

import { AuthActionResponse } from "@/features/auth/lib/types";
import { registerUserSchema } from "@/features/auth/lib/schemas";
import { createSession, getSession } from "@/features/auth/lib/session";
import { cleanPhoneNumber, formDataToObject } from "@/lib/utils";
import { isUser } from "@/features/users/use-cases/get-user";
import { hashPassword } from "@/features/auth/lib/hash";
import { addUser } from "@/features/users/use-cases/add-user";
import { DEFAULT_USER_ROLE } from "@/features/users/lib/constants";
import { redirect } from "next/navigation";

interface RegisterResponse extends AuthActionResponse {
  errors?: {
    first?: string[] | undefined;
    last?: string[] | undefined;
    email?: string[] | undefined;
    phone?: string[] | undefined;
    password?: string[] | undefined;
  };
  previous?: Record<string, string>
}

export async function registerAction(
  previous: RegisterResponse,
  unverified: FormData
): Promise<RegisterResponse> {
  const session = await getSession();
  if (session) return { success: false };

  const object = formDataToObject(unverified);

  const { success, data, error } = registerUserSchema.safeParse(object);
  if (!success) return { success: false, errors: error.flatten().fieldErrors, previous: object };
 
  const normalizedEmail = data.email.toLowerCase();

  //Ensure entity is not already a user.
  const isRegistered = await isUser(normalizedEmail);
  if (isRegistered)
    return { success: false, errors: { email: ["Email already in use."] }, previous: object };
  
  //Register user
  const hash = await hashPassword(data.password);

  const userId = await addUser({
    firstName: data.first.toLowerCase(),
    lastName: data.last.toLowerCase(),
    email: normalizedEmail,
    phone: cleanPhoneNumber(data.phone),
    password: hash,
    role: DEFAULT_USER_ROLE,
  });

  await createSession({
    id: userId,
    name: `${data.first} ${data.last}`.toLowerCase(),
    email: normalizedEmail,
    role: DEFAULT_USER_ROLE,
  });

  redirect("/dashboard");

  return {
    success: true,
  };
}
