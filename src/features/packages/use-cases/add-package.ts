import { db } from "@/database";
import { packageTable } from "@/database/schema";
import { NewPackage } from "@/database/types";

export async function addPackage(p: NewPackage):Promise<void>{

  try{
    await db.insert(packageTable).values(p);
  }
  catch(err){
    throw new Error("Database error while adding new package.")
  }
}
