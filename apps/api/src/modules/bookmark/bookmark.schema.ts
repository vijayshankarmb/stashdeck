import { z } from "zod";

export const createBookmarkSchema = z.object({
    url: z.url("Invalid url"),
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
})