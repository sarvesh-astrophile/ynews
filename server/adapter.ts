import { drizzle } from "drizzle-orm/postgres-js";

import postgres from "postgres";
import { z } from "zod";

const EnvSchema = z.object({
  DATABASE_URL: z.url(),
});

const env = EnvSchema.parse(process.env);

const client = postgres(env.DATABASE_URL, { max: 10 });

export const db = drizzle(client);
