import { db } from "@/database";
import { packagesPurchasedTable } from "@/database/schema";
import { NewPackagePurchased } from "@/database/types";

export async function addPackagePurchase(p: NewPackagePurchased):Promise<void>{
  try{
    await db.insert(packagesPurchasedTable).values(p);
  }
  catch(err){
    throw new Error("Database error while adding new package purchase.")
  }
}
