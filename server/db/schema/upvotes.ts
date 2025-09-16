import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { postTable } from "./posts";
import { commentTable } from "./comments";
import { user } from "./auth-schema";

export const postUpvoteTable = sqliteTable("post_upvotes", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    postId: text("post_id").notNull(),
    userId: text("user_id").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
        .defaultNow()
        .notNull(),
});

export const postUpvoteRelations = relations(postUpvoteTable, ({ one }) => ({
    post: one(postTable, {
        fields: [postUpvoteTable.postId],
        references: [postTable.id],
        relationName: "postUpvotes",
    }),
    user: one(user, {
        fields: [postUpvoteTable.userId],
        references: [user.id],
        relationName: "user",
    }),
}));

export const commentUpvoteTable = sqliteTable("comment_upvotes", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    commentId: text("comment_id").notNull(),
    userId: text("user_id").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
        .defaultNow()
        .notNull(),
});

export const commentUpvoteRelations = relations(commentUpvoteTable, ({ one }) => ({
    comment: one(commentTable, {
        fields: [commentUpvoteTable.commentId],
        references: [commentTable.id],
        relationName: "commentUpvotes",
    }),
    user: one(user, {
        fields: [commentUpvoteTable.userId],
        references: [user.id],
        relationName: "user",
    }),
}));
