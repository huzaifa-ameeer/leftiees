import mongoose from "mongoose";

import { ProductModel, type ProductFields } from "@/lib/models/product";
import { connectToDatabase } from "@/lib/mongoose";
import type { Product } from "@/lib/types";
import { normalizeWaists } from "@/lib/waist";

export type ProductInput = {
  name?: string;
  brand?: string;
  description?: string;
  price?: number;
  oldPrice?: number;
  waists?: number[];
  stock?: number;
  images?: string[];
  featured?: boolean;
};

function toProduct(doc: {
  _id: unknown;
  name: string;
  brand?: string;
  description?: string;
  price: number;
  oldPrice?: number;
  waists?: number[];
  stock?: number;
  images?: string[];
  featured?: boolean;
}): Product {
  return {
    id: String(doc._id),
    name: doc.name,
    brand: doc.brand ?? "",
    description: doc.description ?? "",
    price: doc.price,
    oldPrice: doc.oldPrice ?? undefined,
    waists: doc.waists?.length ? doc.waists : undefined,
    stock: doc.stock ?? 0,
    images: doc.images ?? [],
    alt: doc.name,
    featured: !!doc.featured,
  };
}

function sanitize(input: ProductInput): Partial<ProductFields> {
  const data: Partial<ProductFields> = {};

  if (typeof input.name === "string") data.name = input.name.trim();
  if (typeof input.brand === "string") data.brand = input.brand.trim();
  if (typeof input.description === "string") data.description = input.description.trim();
  if (typeof input.price === "number" && !Number.isNaN(input.price)) data.price = input.price;
  if (Array.isArray(input.waists)) data.waists = normalizeWaists(input.waists);
  if (typeof input.stock === "number" && !Number.isNaN(input.stock)) data.stock = input.stock;
  if (Array.isArray(input.images)) data.images = input.images.filter(Boolean);
  if (typeof input.featured === "boolean") data.featured = input.featured;

  if (
    typeof input.oldPrice === "number" &&
    !Number.isNaN(input.oldPrice) &&
    input.oldPrice > 0
  ) {
    data.oldPrice = input.oldPrice;
  } else if (input.oldPrice === 0) {
    data.oldPrice = undefined;
  }

  return data;
}

export async function getProducts(): Promise<Product[]> {
  await connectToDatabase();
  const docs = await ProductModel.find().sort({ createdAt: -1 });
  return docs.map(toProduct);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  await connectToDatabase();
  const docs = await ProductModel.find({ featured: true })
    .sort({ createdAt: -1 })
    .limit(6);
  return docs.map(toProduct);
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!mongoose.isValidObjectId(id)) return null;
  await connectToDatabase();
  const doc = await ProductModel.findById(id);
  return doc ? toProduct(doc) : null;
}

export async function createProduct(input: ProductInput): Promise<Product> {
  await connectToDatabase();
  const doc = await ProductModel.create(sanitize(input));
  return toProduct(doc);
}

export async function updateProduct(
  id: string,
  input: ProductInput,
): Promise<Product | null> {
  if (!mongoose.isValidObjectId(id)) return null;
  await connectToDatabase();
  const doc = await ProductModel.findByIdAndUpdate(id, sanitize(input), {
    new: true,
  });
  return doc ? toProduct(doc) : null;
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (!mongoose.isValidObjectId(id)) return false;
  await connectToDatabase();
  const result = await ProductModel.findByIdAndDelete(id);
  return !!result;
}
