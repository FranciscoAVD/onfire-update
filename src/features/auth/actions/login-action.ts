import { formDataToObject } from "@/lib/utils";
import { createSession, getSession } from "@/features/auth/lib/session";
import { AuthActionResponse } from "@/features/auth/lib/types";
import { loginUserSchema } from "@/features/auth/lib/schemas";
import { getUserByEmail } from "@/features/users/use-cases/get-user";
import { isSamePassword } from "@/features/auth/lib/hash";
import { redirect } from "next/navigation";

interface LoginResponse extends AuthActionResponse {
  errors?: {
    email?: string[] | undefined;
    password?: string[] | undefined;
  };
}

export async function loginAction(
  previous: LoginResponse,
  unverified: FormData
): Promise<LoginResponse> {
  const session = await getSession();
  if (session) return { success: false };

  const object = formDataToObject(unverified);

  const { success, data, error } = loginUserSchema.safeParse(object);
  if (!success) return { success: false, errors: error.flatten().fieldErrors };

  const normalizedEmail = data.email.toLowerCase();

  const user = await getUserByEmail(normalizedEmail);

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
    email: normalizedEmail,
    role: user.role,
  });

  redirect("/dashboard");

  return { success: true };
}
