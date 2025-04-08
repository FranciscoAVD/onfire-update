"use server";

import { addPackage } from "@/features/packages/use-cases/add-package";
import { z } from "zod";
import { getCurrentUser } from "@/features/auth/lib/session";
import { TResponse } from "@/lib/types";
import { formDataToObject } from "@/lib/utils";
import { addPackageSchema } from "@/features/packages/lib/schemas";
import { getDaysValid } from "../lib/utils";

interface AddPackageResponse extends TResponse {
  errors?: {
    name?: string[] | undefined;
    cost?: string[] | undefined;
    privates?: string[] | undefined;
    description?: string[] | undefined;
    discount?: string[] | undefined;
  };
  previous?: Record<string, string>;
}

export async function addPackageAction(
  previous: any,
  unverified: FormData,
): Promise<AddPackageResponse> {
  const user = await getCurrentUser();
  if (!user || !user.isAdmin()) return { success: false };

  const object = formDataToObject(unverified);
  const { success, data, error } = addPackageSchema.safeParse(object);

  if (!success)
    return {
      success: false,
      errors: error.flatten().fieldErrors,
      previous: object,
    };

  await addPackage({
    packageName: data.name,
    numberOfPrivates: +data.privates,
    cost: +data.cost*100,//to save in cents
    discount: +data.discount,
    description: data.description,
    daysValid: getDaysValid(+data.privates),
  })

  return { success: true, previous: object };
}
