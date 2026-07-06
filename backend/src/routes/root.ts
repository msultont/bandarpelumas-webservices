import { Router, Request, Response } from "express";
import { z } from "zod";
import { postRequestBodySchema } from "../schemas";
import type { UseragentProperties } from "../types";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    const {
        isMobile,
        isDesktop,
        isBot,
        browser,
        os,
        platform,
    }: UseragentProperties = req.useragent || {};

    return res.status(200).json({
        message: "Hello, World!",
        userAgent: { isMobile, isDesktop, isBot, browser, os, platform },
    });
});

router.post("/", (req: Request, res: Response) => {
    try {
        const validatedBody = postRequestBodySchema.parse(req.body);

        return res.status(201).json({
            message: `POST request received with message: ${validatedBody.message}`,
            requestId: validatedBody.requestId,
            source: validatedBody.source,
            timestamp: validatedBody.timestamp || new Date().toISOString(),
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

router.put("/", (req: Request, res: Response) => {
    try {
        const validatedBody = postRequestBodySchema.parse(req.body);

        return res.status(200).json({
            message: `PUT request received with message: ${validatedBody.message}`,
            requestId: validatedBody.requestId,
            source: validatedBody.source,
            timestamp: validatedBody.timestamp || new Date().toISOString(),
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
