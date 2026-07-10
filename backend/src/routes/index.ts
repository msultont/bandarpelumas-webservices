import { Router, Request, Response } from "express";
import rootRouter from "./root";
import usersRouter from "./users";
import reviewsRouter from "./reviews";
import productsRouter from "./products";
import cartRouter from "./cart";

const router = Router();

router.use(rootRouter);
router.use(usersRouter);
router.use(reviewsRouter);
router.use(productsRouter);
router.use(cartRouter);

router.use((req: Request, res: Response) => {
    res.status(404).json({
        error: "Not Found",
        message: `Route ${req.method} ${req.path} does not exist`,
    });
});

export default router;
