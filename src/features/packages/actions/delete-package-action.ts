"use server";

import { deletePackage } from "@/features/packages/use-cases/delete-package";
import { getCurrentUser } from "@/features/auth/lib/session";
import { TResponse } from "@/lib/types";
import { getPackage } from "@/features/packages/use-cases/get-packages";
import { formDataToObject } from "@/lib/utils";
import { deletePackageSchema } from "@/features/packages/lib/schemas";
import { redirect } from "next/navigation";
import { routes } from "@/lib/constants";

export async function deletePackageAction(
  previous: TResponse,
  unverified: FormData,
): Promise<TResponse> {
  const user = await getCurrentUser();
  if (!user || !user.isAdmin()) return { success: false };

  const object = formDataToObject(unverified);
  const { success, data, error } = deletePackageSchema.safeParse(object);
  console.log(object, success, data);
  if (!success) return { success: false };
  console.log("Parse successful.");
  //check record exists
  const p = await getPackage(data.id);
  if (!p) return { success: false };
  if (`delete ${p.packageName}` !== data.intent) return { success: false };

  await deletePackage(data.id);
  redirect(routes.dashboard.packages.href);
  return { success: true };
}
