import db from "@/adapter"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { env } from "../env"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite',
  }),
  // Allow requests from the frontend development server
  trustedOrigins: [`'${env.PUBLIC_FRONTEND_URL}'`],
  emailAndPassword: {
    enabled: true,
  }
})

export type AuthType = {
  user: typeof auth.$Infer.Session.user | null
  session: typeof auth.$Infer.Session.session | null
}