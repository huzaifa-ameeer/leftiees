"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { formatPrice } from "@/lib/format";
import type { AdminOrder, OrderStatus } from "@/lib/types";

const STATUSES: OrderStatus[] = ["pending", "dispatched", "delivered"];

export default function OrdersManager({ orders }: { orders: AdminOrder[] }) {
  const router = useRouter();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function updateStatus(id: string, status: OrderStatus) {
    setUpdatingId(id);
    const response = await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setUpdatingId(null);

    if (!response.ok) {
      toast.error("Could not update the status");
      return;
    }

    toast.success("Order status updated");
    router.refresh();
  }

  if (orders.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-black/15 py-16 text-center text-zinc-500">
        No orders yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {orders.map((order) => (
        <div key={order.id} className="rounded-2xl border border-black/10 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold">Order #{order.id}</p>
              <p className="text-xs text-zinc-500">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <select
              value={order.status}
              disabled={updatingId === order.id}
              onChange={(event) =>
                updateStatus(order.id, event.target.value as OrderStatus)
              }
              className="h-10 rounded-lg border border-black/15 bg-background px-3 text-sm capitalize text-foreground focus:border-denim disabled:opacity-60"
            >
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-3 text-sm">
              <p className="font-medium">{order.customer.fullName}</p>
              <dl className="flex flex-col gap-1.5">
                <Detail label="Email" value={order.customer.email} />
                <Detail label="Primary phone" value={order.customer.phone} />
                {order.customer.secondaryPhone ? (
                  <Detail
                    label="Secondary phone"
                    value={order.customer.secondaryPhone}
                  />
                ) : null}
                <Detail label="Country" value={order.customer.country} />
                <Detail label="Province" value={order.customer.province} />
                <Detail label="City" value={order.customer.city} />
                <Detail
                  label="Complete address"
                  value={order.customer.address}
                />
              </dl>
            </div>

            <ul className="flex flex-col gap-2 text-sm">
              {order.items.map((item, index) => (
                <li
                  key={`${item.productId}-${index}`}
                  className="flex justify-between gap-3"
                >
                  <span className="text-zinc-600">
                    {item.name} × {item.quantity}
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
              <li className="flex justify-between border-t border-black/10 pt-2 text-xs text-zinc-500">
                <span>Delivery</span>
                <span>{formatPrice(order.deliveryFee)}</span>
              </li>
              <li className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </li>
              <li className="text-xs text-zinc-500">
                Payment: Cash on Delivery
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <dt className="w-32 shrink-0 text-zinc-400">{label}</dt>
      <dd className="min-w-0 text-zinc-700">{value}</dd>
    </div>
  );
}
