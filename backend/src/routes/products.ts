import { Router, Request, Response } from "express";
import { Product } from "../models/Product";

const router = Router();

router.get("/products", async (req: Request, res: Response) => {
    const { category, search } = req.query;

    const filter: Record<string, unknown> = {};
    if (category && category !== "all") {
        filter.category = category;
    }
    if (search && typeof search === "string") {
        filter.name = { $regex: search, $options: "i" };
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json({ products });
});

router.get("/products/:id", async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
    }
    res.json({ product });
});

export default router;
