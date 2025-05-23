"use server";

import { formDataToObject } from "@/lib/utils";
import { createSession, getSession } from "@/features/auth/lib/session";
import { TResponse } from "@/lib/types";
import { loginUserSchema } from "@/features/auth/lib/schemas";
import { getUserByEmail } from "@/features/users/use-cases/get-user";
import { isSamePassword } from "@/features/auth/lib/hash";
import { redirect } from "next/navigation";
import { Roles } from "@/features/users/lib/types";

interface LoginResponse extends TResponse {
  errors?: {
    email?: string[] | undefined;
    password?: string[] | undefined;
  };
  previous?: Record<string, string | string[]>;
}

export async function loginAction(
  previous: LoginResponse,
  unverified: FormData,
): Promise<LoginResponse> {
  const session = await getSession();
  if (session) return { success: false };

  const object = formDataToObject(unverified);

  const { success, data, error } = loginUserSchema.safeParse(object);
  if (!success)
    return {
      success: false,
      errors: error.flatten().fieldErrors,
      previous: object,
    };

  const user = await getUserByEmail(data.email);

  if (!user)
    return {
      success: false,
      errors: {
        email: ["Email or password incorrect."],
        password: ["Email or password incorrect."],
      },
    };

  const isSame = isSamePassword(user.password, data.password);

  if (!isSame)
    return {
      success: false,
      errors: {
        email: ["Email or password incorrect."],
        password: ["Email or password incorrect."],
      },
    };

  await createSession({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    email: data.email,
    role: user.role as Roles,
  });

  redirect("/dashboard");

  return { success: true };
}
