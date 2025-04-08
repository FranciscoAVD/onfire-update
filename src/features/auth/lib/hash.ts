import { env } from "@/env";
import argon2 from "argon2";

export async function hashPassword(input: string): Promise<string> {
  return await argon2.hash(input + env.PEPPER, {
    type: argon2.argon2id,
  });
}
/**
 * @param hash — The digest to be checked
 * @param input — The plaintext password to be verified
 * @returns A promise of a boolean. True if it is the same password and, otherwise, false.
 */
export async function isSamePassword(
  hash: string,
  input: string
): Promise<boolean> {
  return await argon2.verify(hash, input + env.PEPPER);
}