import mongoose from "mongoose";

import { OrderModel } from "@/lib/models/order";
import { connectToDatabase } from "@/lib/mongoose";
import type {
  AdminOrder,
  CustomerDetails,
  OrderItem,
  OrderStatus,
} from "@/lib/types";

function toOrder(doc: {
  _id: unknown;
  items: OrderItem[];
  customer: CustomerDetails;
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  createdAt?: Date;
}): AdminOrder {
  return {
    id: String(doc._id),
    items: doc.items.map((item) => ({
      productId: item.productId,
      name: item.name,
      brand: item.brand ?? "",
      price: item.price,
      image: item.image ?? "",
      quantity: item.quantity,
    })),
    customer: {
      fullName: doc.customer.fullName,
      email: doc.customer.email,
      phone: doc.customer.phone,
      secondaryPhone: doc.customer.secondaryPhone ?? "",
      address: doc.customer.address,
      city: doc.customer.city,
      province: doc.customer.province,
      country: doc.customer.country,
    },
    subtotal: doc.subtotal,
    deliveryFee: doc.deliveryFee,
    total: doc.total,
    status: doc.status,
    createdAt: (doc.createdAt ?? new Date()).toISOString(),
  };
}

export async function createOrder(input: {
  items: OrderItem[];
  customer: CustomerDetails;
  subtotal: number;
  deliveryFee: number;
  total: number;
}): Promise<AdminOrder> {
  await connectToDatabase();
  const doc = await OrderModel.create({ ...input, status: "pending" });
  return toOrder(doc);
}

export async function getOrders(): Promise<AdminOrder[]> {
  await connectToDatabase();
  const docs = await OrderModel.find().sort({ createdAt: -1 });
  return docs.map(toOrder);
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus,
): Promise<AdminOrder | null> {
  if (!mongoose.isValidObjectId(id)) return null;
  await connectToDatabase();
  const doc = await OrderModel.findByIdAndUpdate(id, { status }, { new: true });
  return doc ? toOrder(doc) : null;
}
