import { z } from "zod";

export const signUpSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(6),
});