import { Hono } from "hono";
import type { AuthType } from "@/auth";
import auth from "./routers/auth";

const app = new Hono<{ Variables: AuthType }>({
  strict: false,
});

// Mount all routes
app.route("/", auth);

export default app;