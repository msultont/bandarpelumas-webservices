import { Router, Request, Response } from "express";
import { z } from "zod";
import { userSchema, type User } from "../schemas";

const router = Router();

router.post("/users", (req: Request, res: Response) => {
    try {
        const validatedUser: User = userSchema.parse(req.body);
        const userId = crypto.randomUUID();

        return res.status(201).json({
            message: "User created successfully",
            id: userId,
            user: validatedUser,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res
                .status(400)
                .json({ error: "Validation Error", details: error.issues });
        }
        return res
            .status(500)
            .json({
                error: "Internal Server Error",
                message: "An unexpected error occurred",
            });
    }
});

export default router;
