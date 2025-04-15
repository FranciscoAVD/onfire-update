"use server";
import { getCurrentUser } from "@/features/auth/lib/session";
import { TResponse } from "@/lib/types";
import { formDataToObject } from "@/lib/utils";
import { getPackage } from "@/features/packages/use-cases/get-packages";
import {
  updatePackageActivity,
  updatePackageDescription,
  updatePackageName,
  updatePackageNumbers,
} from "@/features/packages/use-cases/update-package";
import {
  updatePackageDescriptionSchema,
  updatePackageNameSchema,
  updatePackageNumbersSchema,
  updatePackageStatusSchema,
} from "@/features/packages/lib/schemas";
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

  const activeBool = data.active === "true";
  await updatePackageActivity(data.id, !activeBool);

  revalidatePath("/dashboard/packages", "page");
  return { success: true };
}

export async function updatePackageNameAction(
  previous: TResponse,
  unverified: FormData,
): Promise<TResponse> {
  const user = await getCurrentUser();
  if (!user || !user.isAdmin()) return { success: false };

  const object = formDataToObject(unverified);

  const { success, data } = updatePackageNameSchema.safeParse(object);
  if (!success) return { success: false };

  await updatePackageName(data.id, data.name);
  revalidatePath(`/dashboard/packages/edit/${data.id}`, "page");

  return { success: true };
}
export async function updatePackageDescriptionAction(
  previous: TResponse,
  unverified: FormData,
): Promise<TResponse> {
  const user = await getCurrentUser();
  if (!user || !user.isAdmin()) return { success: false };

  const object = formDataToObject(unverified);

  const { success, data } = updatePackageDescriptionSchema.safeParse(object);
  if (!success) return { success: false };

  await updatePackageDescription(data.id, data.description);
  revalidatePath(`/dashboard/packages/edit/${data.id}`, "page");

  return { success: true };
}

export async function updatePackageNumbersAction(
  previous: TResponse,
  unverified: FormData,
): Promise<TResponse> {
  const user = await getCurrentUser();
  if (!user || !user.isAdmin()) return { success: false };

  const object = formDataToObject(unverified);

  const { success, data } = updatePackageNumbersSchema.safeParse(object);
  if (!success) return { success: false };

  await updatePackageNumbers(
    +data.id,
    +data.cost * 100,//converting to cents
    +data.discount,
    +data.privates,
  );
  
  revalidatePath(`/dashboard/packages/edit/${data.id}`, "page");
  return { success: true };
}
