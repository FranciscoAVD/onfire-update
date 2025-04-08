import { User } from "@/database/types";
import { env } from "@/env";
import { getOneWeekFromNow } from "@/lib/utils";
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { sessionName } from "./constants";
import { cache } from "react";
import { UserSessionData } from "@/features/users/lib/types";
import { userSessionSchema } from "@/features/users/lib/schemas";
import { UserDTO } from "@/features/users/lib/dto";

type SessionData = {
    data: UserSessionData,
    expiresAt: Date,
}
type Payload = SessionData & JWTPayload;
const encodedKey = new TextEncoder().encode(env.SESSION_SECRET);

async function encrypt(payload: Payload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(getOneWeekFromNow())
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined): Promise<Payload | null> {
    try{
        if(!session) return null;
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ["HS256"]
        })
        return payload as Payload;
    }
    catch(err){
        console.log("Failed to decrypt auth token.");
        return null;
    }
}

export async function createSession(data:UserSessionData):Promise<void>{
    const expiresAt = getOneWeekFromNow();
    const session = await encrypt({data, expiresAt});

    const cookieStore = await cookies();

    cookieStore.set(sessionName, session, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        expires: expiresAt,
    });
}

export async function getSession():Promise<Payload | null> {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(sessionName);
    return await decrypt(cookie?.value);
}

export async function deleteSession(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(sessionName);
}

export const getCurrentUser = cache(async ():Promise<UserDTO | null> => {
    const session = await getSession();
    const { success, data } = userSessionSchema.safeParse(session?.data);
    return success ? new UserDTO(data) : null;
})