import mongoose, { Schema, type Model } from "mongoose";

export type ProductFields = {
  name: string;
  brand: string;
  description: string;
  price: number;
  oldPrice?: number;
  stock: number;
  images: string[];
  featured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

const productSchema = new Schema<ProductFields>(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, default: "", trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    oldPrice: { type: Number, min: 0 },
    stock: { type: Number, default: 0, min: 0 },
    images: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const ProductModel: Model<ProductFields> =
  (mongoose.models.Product as Model<ProductFields> | undefined) ??
  mongoose.model<ProductFields>("Product", productSchema);
