import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
    sku: string;
    name: string;
    category: "pelumas" | "filter" | "sparepart" | "aki";
    rating: number;
    reviews: number;
    price: number;
    originalPrice: number | null;
    badge: string | null;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
    {
        sku: { type: String, required: true, unique: true, trim: true },
        name: { type: String, required: true, trim: true },
        category: {
            type: String,
            required: true,
            enum: ["pelumas", "filter", "sparepart", "aki"],
        },
        rating: { type: Number, required: true, min: 1, max: 5 },
        reviews: { type: Number, required: true, default: 0 },
        price: { type: Number, required: true, min: 0 },
        originalPrice: { type: Number, default: null },
        badge: { type: String, default: null },
        stock: { type: Number, required: true, default: 100, min: 0 },
    },
    { timestamps: true },
);

export const Product = model<IProduct>("Product", ProductSchema);
