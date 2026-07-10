import { Schema, model, Document, Types } from "mongoose";

export interface ICartItem {
    productId: Types.ObjectId;
    sku: string;
    name: string;
    category: string;
    price: number;
    originalPrice: number | null;
    badge: string | null;
    quantity: number;
}

export interface ICart extends Document {
    sessionId: string;
    items: ICartItem[];
    createdAt: Date;
    updatedAt: Date;
}

const CartItemSchema = new Schema<ICartItem>(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        sku: { type: String, required: true },
        name: { type: String, required: true },
        category: { type: String, required: true },
        price: { type: Number, required: true },
        originalPrice: { type: Number, default: null },
        badge: { type: String, default: null },
        quantity: { type: Number, required: true, min: 1, default: 1 },
    },
    { _id: false },
);

const CartSchema = new Schema<ICart>(
    {
        sessionId: { type: String, required: true, unique: true, index: true },
        items: { type: [CartItemSchema], default: [] },
    },
    { timestamps: true },
);

export const Cart = model<ICart>("Cart", CartSchema);
