import mongoose, { Schema, type Model } from "mongoose";

import type { CustomerDetails, OrderItem, OrderStatus } from "@/lib/types";

export type OrderFields = {
  items: OrderItem[];
  customer: CustomerDetails;
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  createdAt?: Date;
  updatedAt?: Date;
};

const orderItemSchema = new Schema<OrderItem>(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    brand: { type: String, default: "" },
    price: { type: Number, required: true },
    image: { type: String, default: "" },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false },
);

const customerSchema = new Schema<CustomerDetails>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    secondaryPhone: { type: String, default: "" },
    address: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false },
);

const orderSchema = new Schema<OrderFields>(
  {
    items: { type: [orderItemSchema], required: true },
    customer: { type: customerSchema, required: true },
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "dispatched", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export const OrderModel: Model<OrderFields> =
  (mongoose.models.Order as Model<OrderFields> | undefined) ??
  mongoose.model<OrderFields>("Order", orderSchema);
