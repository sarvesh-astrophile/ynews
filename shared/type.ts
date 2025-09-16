import { insertPostSchema } from "@/db/schema/posts";

export type SuccessResponse<T = void> = {
  success: true;
  message: string;
} & (T extends void ? {} : { data: T });

export type ErrorResponse = {
  success: false;
  error: string;
  isFormError?: boolean;
};

export type Response<T = void> = SuccessResponse<T> | ErrorResponse;

export const createPostSchema = insertPostSchema.pick({
  title: true,
  url: true,
  content: true,
})
.refine((data) => data.url || data.content, {
  message: "URL or content is required",
  path: ["url", "content"],
});
