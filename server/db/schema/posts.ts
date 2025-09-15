import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { postUpvoteTable } from "./upvotes";
import { commentTable } from "./comments";
import { user } from "./auth-schema";


export const postTable = sqliteTable("posts", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  url: text("url"),
  content: text("content"),
  points: integer("points").notNull().default(0),
  commentCount: integer("comment_count").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" })
    .defaultNow()
    .notNull(),
});

export const postRelations = relations(postTable, ({ one, many }) => ({
  author: one(user, {
    fields: [postTable.userId],
    references: [user.id],
    relationName: "author",
  }),
  postUpvotes: many(postUpvoteTable, {
    relationName: "postUpvotes",
  }),
  comments: many(commentTable, {
    relationName: "comments",
  }),
}));