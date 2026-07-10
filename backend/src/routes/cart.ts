import { Router, Request, Response } from "express";
import { Cart } from "../models/Cart";
import { Product } from "../models/Product";

const router = Router();

router.get("/cart/:sessionId", async (req: Request, res: Response) => {
    const { sessionId } = req.params;
    const cart = await Cart.findOne({ sessionId });
    res.json({ cart: cart ?? { sessionId, items: [] } });
});

router.post("/cart/:sessionId/items", async (req: Request, res: Response) => {
    const { sessionId } = req.params;
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
        res.status(400).json({ error: "productId is required" });
        return;
    }

    const product = await Product.findById(productId);
    if (!product) {
        res.status(404).json({ error: "Product not found" });
        return;
    }

    let cart = await Cart.findOne({ sessionId });
    if (!cart) {
        cart = new Cart({ sessionId, items: [] });
    }

    const existing = cart.items.find(
        (item) => item.productId.toString() === productId,
    );

    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.items.push({
            productId: product._id,
            sku: product.sku,
            name: product.name,
            category: product.category,
            price: product.price,
            originalPrice: product.originalPrice,
            badge: product.badge,
            quantity,
        });
    }

    await cart.save();
    res.json({ cart });
});

router.put(
    "/cart/:sessionId/items/:productId",
    async (req: Request, res: Response) => {
        const { sessionId, productId } = req.params;
        const { quantity } = req.body;

        if (typeof quantity !== "number" || quantity < 1) {
            res.status(400).json({ error: "quantity must be a number >= 1" });
            return;
        }

        const cart = await Cart.findOne({ sessionId });
        if (!cart) {
            res.status(404).json({ error: "Cart not found" });
            return;
        }

        const item = cart.items.find(
            (i) => i.productId.toString() === productId,
        );
        if (!item) {
            res.status(404).json({ error: "Item not found in cart" });
            return;
        }

        item.quantity = quantity;
        await cart.save();
        res.json({ cart });
    },
);

router.delete(
    "/cart/:sessionId/items/:productId",
    async (req: Request, res: Response) => {
        const { sessionId, productId } = req.params;

        const cart = await Cart.findOne({ sessionId });
        if (!cart) {
            res.status(404).json({ error: "Cart not found" });
            return;
        }

        cart.items = cart.items.filter(
            (i) => i.productId.toString() !== productId,
        );
        await cart.save();
        res.json({ cart });
    },
);

router.delete("/cart/:sessionId", async (req: Request, res: Response) => {
    const { sessionId } = req.params;
    await Cart.findOneAndDelete({ sessionId });
    res.json({ cart: { sessionId, items: [] } });
});

export default router;
