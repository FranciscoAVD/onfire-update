"use server";

import { getCurrentUser } from "@/features/auth/lib/session";
import { TResponse } from "@/lib/types";
import { formDataToObject } from "@/lib/utils";
import { getPackage } from "@/features/packages/use-cases/get-packages";
import { updatePackageActivity } from "@/features/packages/use-cases/update-package";
import { updatePackageStatusSchema } from "@/features/packages/lib/schemas";
import { revalidatePath } from "next/cache";

export async function updatePackageStatusAction(
  previous: TResponse,
  unverified: FormData,
): Promise<TResponse> {
  const user = await getCurrentUser();
  if (!user || !user.isAdmin()) return { success: false };

  const object = formDataToObject(unverified);

  const { success, data } = updatePackageStatusSchema.safeParse(object);
  if (!success) return { success: false };

  const p = await getPackage(+data.id);
  await updatePackageActivity(+data.id, !p.isActive);
  console.log("Package with id: ", data.id, " updated.");
  revalidatePath("/dashboard/packages", "page");
  return { success: true };
}
