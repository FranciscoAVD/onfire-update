import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url("Database url required."),
    SESSION_SECRET: z.string().min(1, "Session secret is required."),
    PEPPER: z.string().min(1, "Pepper is required."),
    NODE_ENV: z.enum(["development","production"]),
  },
  runtimeEnv: process.env,
});