import { Hono } from "hono";

export const postsRouter = new Hono();

postsRouter.get("/", (c) => {
    return c.json({ message: "Hello, world!" });
});