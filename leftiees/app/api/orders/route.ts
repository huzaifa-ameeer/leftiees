import { NextResponse } from "next/server";

import { getAdminSession } from "@/lib/admin";
import { createOrder, getOrders } from "@/lib/orders";

export async function GET() {
  const admin = await getAdminSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await getOrders();
  return NextResponse.json({ orders });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!Array.isArray(body?.items) || body.items.length === 0) {
    return NextResponse.json({ error: "Order has no items" }, { status: 400 });
  }

  const order = await createOrder({
    items: body.items,
    customer: body.customer,
    subtotal: body.subtotal,
    deliveryFee: body.deliveryFee,
    total: body.total,
  });

  return NextResponse.json({ order }, { status: 201 });
}
