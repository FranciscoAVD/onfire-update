"use server";

import { getCurrentUser } from "@/features/auth/lib/session";
import { TResponse } from "@/lib/types";
import { formDataToObject } from "@/lib/utils";
import { packagePurchaseSchema } from "@/features/purchases/lib/schemas";
import { getPackage } from "@/features/packages/use-cases/get-packages";
import { addPackagePurchase } from "@/features/purchases/use-cases/add-purchase";
import { formatDateToDefault } from "@/lib/utils";
import { addDays, getMonth, getYear } from "date-fns";

export async function addPackagePurchaseAction(
  previous: TResponse,
  unverified: FormData,
): Promise<TResponse> {
  const user = await getCurrentUser();
  if (!user) return { success: false };

  const object = formDataToObject(unverified);
  const { success, data } = packagePurchaseSchema.safeParse(object);
  if (!success) return { success: false };

  const p = await getPackage(data.id);
  if (!p) return { success: false };

  const now = new Date(Date.now());
  await addPackagePurchase({
    studentId: user.getId(),
    packageId: p.id,
    privatesLeft: p.numberOfPrivates,
    purchaseDate: formatDateToDefault(now),
    purchaseMonth: getMonth(now),
    purchaseYear: getYear(now),
    expirationDate: formatDateToDefault(addDays(now, p.daysValid)),
  });

  return { success: true };
}
