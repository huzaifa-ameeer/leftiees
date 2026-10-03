"use client";

import Image from "next/image";

import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function CartItem({
  product,
  quantity,
}: {
  product: Product;
  quantity: number;
}) {
  const { increment, decrement, removeItem } = useCart();

  return (
    <div className="flex gap-4 border-b border-black/10 py-5 last:border-b-0">
      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-100 sm:h-28 sm:w-24">
        <Image
          src={product.images[0]}
          alt={product.alt}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-denim">
              {product.brand}
            </p>
            <h3 className="text-sm font-medium sm:text-base">{product.name}</h3>
            <p className="text-sm text-zinc-500">{formatPrice(product.price)}</p>
          </div>
          <button
            type="button"
            onClick={() => removeItem(product.id)}
            aria-label={`Remove ${product.name}`}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-red-600 transition-colors hover:bg-red-50"
          >
            <TrashIcon />
          </button>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="inline-flex items-center rounded-full border border-black/15">
            <button
              type="button"
              onClick={() => decrement(product.id)}
              aria-label="Decrease quantity"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-lg transition-colors hover:bg-black/5"
            >
              −
            </button>
            <span className="w-8 text-center text-sm tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => increment(product.id)}
              aria-label="Increase quantity"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-lg transition-colors hover:bg-black/5"
            >
              +
            </button>
          </div>
          <span className="text-sm font-semibold">
            {formatPrice(product.price * quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}

function TrashIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}
