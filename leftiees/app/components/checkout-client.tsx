"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import {
  computeTotals,
  type CustomerDetails,
  type OrderLine,
} from "@/lib/order";
import type { Product } from "@/lib/types";

import CheckoutForm from "./checkout-form";
import OrderSummary from "./order-summary";

export default function CheckoutClient({
  buyNowProduct,
}: {
  buyNowProduct: Product | null;
}) {
  const router = useRouter();
  const { lines: cartLines, clear } = useCart();
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lines = useMemo<OrderLine[]>(
    () =>
      buyNowProduct ? [{ product: buyNowProduct, quantity: 1 }] : cartLines,
    [buyNowProduct, cartLines],
  );

  const totals = computeTotals(lines);

  async function placeOrder(details: CustomerDetails) {
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: lines.map(({ product, quantity }) => ({
            productId: product.id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            image: product.images[0] ?? "",
            quantity,
          })),
          customer: details,
          subtotal: totals.subtotal,
          deliveryFee: totals.deliveryFee,
          total: totals.total,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? "Could not place the order.");
      }

      const data = await response.json();
      setOrderId(data.order?.id ?? "");
      if (!buyNowProduct) clear();
      setPlaced(true);
    } catch (placeError) {
      setError(
        placeError instanceof Error
          ? placeError.message
          : "Could not place the order.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (placed) {
    return (
      <main className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex w-full max-w-md flex-col items-center gap-3 rounded-3xl border border-black/10 p-8 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-denim">
            Order placed
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">Thank you!</h1>
          <p className="text-zinc-600">
            Your order{" "}
            <span className="font-medium text-foreground">#{orderId}</span> has
            been placed.
          </p>
          <p className="text-sm text-zinc-500">
            Payment method: Cash on Delivery — pay {formatPrice(totals.total)}{" "}
            on delivery.
          </p>
          <Link
            href="/explore"
            className="mt-4 inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-foreground/85"
          >
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  if (lines.length === 0) {
    return (
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-4 px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          Nothing to check out
        </h1>
        <p className="text-zinc-600">
          Add a product to your cart to place an order.
        </p>
        <Link
          href="/explore"
          className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-foreground/85"
        >
          Explore products
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 transition-colors hover:text-foreground"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="h-4 w-4"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Back
        </button>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
          Checkout
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Your order
        </h1>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-12">
        <CheckoutForm onSubmit={placeOrder} submitting={submitting} />
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <OrderSummary lines={lines} />
        </aside>
      </div>
    </main>
  );
}
