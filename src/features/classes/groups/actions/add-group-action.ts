"use server";

import { getCurrentUser } from "@/features/auth/lib/session";
import { TResponse } from "@/lib/types";
import { formDataToObject } from "@/lib/utils";
import { addGroupSchema } from "../lib/schemas";

export async function addGroupAction(
  previous: TResponse,
  unverified: FormData,
): Promise<TResponse> {
  const user = await getCurrentUser();

  if (!user || !user.isAdmin()) return { success: false };

  const object = formDataToObject(unverified);
  const {success, data, error} = addGroupSchema.safeParse(object);

  return { success: true };
}
