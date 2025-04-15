"use server";

import { getCurrentUser } from "@/features/auth/lib/session";
import { TResponse } from "@/lib/types";
import { formDataToObject } from "@/lib/utils";
import { addGroupSchema } from "../lib/schemas";
import { addGroup } from "../use-cases/add-group";

export async function addGroupAction(
  previous: TResponse,
  unverified: FormData,
): Promise<TResponse> {
  const user = await getCurrentUser();

  if (!user || !user.isAdmin()) return { success: false };

  const object = formDataToObject(unverified);
  const { success, data, error } = addGroupSchema.safeParse(object);

  if (!success) return { success: false };

  await addGroup({
    name: data.name,
    description: data.description,
    cost: data.cost,
    style: data.style,
    rhythm: data.rhythm,
    dayTime: data.days,
    type: data.type,
  });

  return { success: true };
}
