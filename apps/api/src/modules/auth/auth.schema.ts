import { z } from "zod";

export const signUpSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at list 6 char"),
});

export const signInSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at list 6 char"),
});