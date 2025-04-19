import { db } from "@/database";
import { privatesScheduleTable } from "@/database/schema";
import { NewPrivate } from "@/database/types";

export async function addPrivate(p: NewPrivate):Promise<void>{
  try{
    await db.insert(privatesScheduleTable).values(p);
  }
  catch(err){
    throw new Error("Database error while adding private to schedule.")
  }
}
