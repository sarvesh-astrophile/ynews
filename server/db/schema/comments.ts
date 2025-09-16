import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { user } from "./auth-schema";
import { postTable } from "./posts";
import { commentUpvoteTable } from "./upvotes";

export const commentTable = sqliteTable("comments", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: text("user_id").notNull(),
    postId: text("post_id").notNull(),
    parentCommentId: integer("parent_comment_id"),
    content: text("content").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
        .defaultNow()
        .notNull(),
    depth: integer("depth").notNull().default(0),
    commentCount: integer("comment_count").notNull().default(0),
    points: integer("points").notNull().default(0),
});

export const commentRelations = relations(commentTable, ({ one, many }) => ({
    author: one(user, {
        fields: [commentTable.userId],
        references: [user.id],
        relationName: "author",
    }),
    parentComment: one(commentTable, {
        fields: [commentTable.parentCommentId],
        references: [commentTable.id],
        relationName: "childComments",
    }),
    childComments: many(commentTable, {
        relationName: "childComments",
    }),
    post: one(postTable, {
        fields: [commentTable.postId],
        references: [postTable.id],
        relationName: "post",
    }),
    commentUpvotes: many(commentUpvoteTable, {
        relationName: "commentUpvotes",
    }),
}));