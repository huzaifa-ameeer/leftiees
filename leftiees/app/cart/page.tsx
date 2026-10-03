"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

import CartItem from "../components/cart-item";

export default function CartPage() {
  const router = useRouter();
  const { lines, subtotal, totalQuantity } = useCart();

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
          Cart
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Your cart
        </h1>
      </div>

      {lines.length === 0 ? (
        <div className="flex flex-col items-start gap-4">
          <p className="text-zinc-600">Your cart is empty.</p>
          <Link
            href="/explore"
            className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-foreground/85"
          >
            Explore products
          </Link>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-12">
          <div className="rounded-2xl border border-black/10 px-5">
            {lines.map((line) => (
              <CartItem
                key={line.product.id}
                product={line.product}
                quantity={line.quantity}
              />
            ))}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="flex flex-col gap-4 rounded-2xl border border-black/10 p-5">
              <h2 className="text-lg font-semibold">Summary</h2>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600">Total quantity</span>
                <span className="font-medium">{totalQuantity}</span>
              </div>
              <div className="flex justify-between border-t border-black/10 pt-3 text-base font-semibold">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <button
                type="button"
                onClick={() => router.push("/checkout")}
                className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-base font-medium text-background transition-colors hover:bg-foreground/85"
              >
                Proceed to Checkout
              </button>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
