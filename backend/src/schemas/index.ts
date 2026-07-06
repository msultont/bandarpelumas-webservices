import { z } from "zod";

export const postRequestBodySchema = z.object({
    message: z
        .string()
        .min(1, "Message is required")
        .max(5000, "Message must not exceed 5000 characters")
        .trim(),
    requestId: z.string().uuid("Invalid request ID format").optional(),
    source: z.enum(["web", "mobile", "api"]).optional(),
    timestamp: z.date().optional(),
});

export type PostRequestBody = z.infer<typeof postRequestBodySchema>;

export const userSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required")
        .max(100, "Name must be less than 100 characters"),
    email: z.email("Invalid email address"),
    age: z
        .number()
        .int("Age must be an integer")
        .min(0, "Age must be positive")
        .max(150, "Age must be less than 150"),
});

export type User = z.infer<typeof userSchema>;
