import { db } from "@/database";
import { packageTable } from "@/database/schema";
import { Package } from "@/database/types";
import { eq } from "drizzle-orm";

export async function updatePackageActivity(
  packageId: Package["id"],
  newStatus: boolean,
): Promise<void> {
  try {
    await db
      .update(packageTable)
      .set({ isActive: newStatus })
      .where(eq(packageTable.id, packageId));
  } catch (err) {
    throw new Error("Database error while update package isActive.");
  }
}

export async function updatePackageName(
  packageId: Package["id"],
  newName: string,
): Promise<void> {
  try {
    await db
      .update(packageTable)
      .set({ packageName: newName })
      .where(eq(packageTable.id, packageId));
  } catch (err) {
    throw new Error("Database error while update package name.");
  }
}

export async function updatePackageDescription(
  packageId: Package["id"],
  newDescription: string,
): Promise<void> {
  try {
    await db
      .update(packageTable)
      .set({ description: newDescription })
      .where(eq(packageTable.id, packageId));
  } catch (err) {
    throw new Error("Database error while update package description.");
  }
}

/**
@param cost - The price of the package in cents.
*/
export async function updatePackageNumbers(
  packageId: Package["id"],
  cost: number,
  discount: number,
  privates: number,
): Promise<void> {
  try {
    await db
      .update(packageTable)
      .set({ numberOfPrivates: privates, discount: discount, cost: cost })
      .where(eq(packageTable.id, packageId));
  } catch (err) {
    throw new Error("Database error while update package description.");
  }
}
