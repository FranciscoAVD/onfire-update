import { db } from "@/database";
import { packagesPurchasedTable } from "@/database/schema";
import { PackagePurchased } from "@/database/types";
import { eq } from "drizzle-orm";

export async function updatePrivatesFromPurchase(
  purchaseId: PackagePurchased["id"],
  total: number,
): Promise<void> {
  try {
    await db
      .update(packagesPurchasedTable)
      .set({ privatesLeft: total })
      .where(eq(packagesPurchasedTable.id, purchaseId));
  } catch (err) {
    throw new Error("Database error while update user package purchase.");
  }
}
