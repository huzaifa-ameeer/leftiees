"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [active, setActive] = useState(0);

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  function handleAddToCart() {
    addItem(product, 1);
    toast.success(`${product.name} added to cart`);
  }

  function handleBuyNow() {
    router.push(`/checkout?buyNow=${product.id}`);
  }

  return (
    <div className="flex flex-col gap-8">
      <button
        type="button"
        onClick={() => router.back()}
        className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-zinc-600 transition-colors hover:text-foreground"
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

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="flex flex-col gap-4">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-zinc-100">
            <Image
              src={product.images[active]}
              alt={product.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              preload={active === 0}
            />
            {discount > 0 && (
              <span className="absolute left-4 top-4 rounded-full bg-foreground px-3 py-1 text-sm font-medium text-background">
                -{discount}%
              </span>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="flex flex-wrap gap-3">
              {product.images.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`View image ${index + 1}`}
                  aria-pressed={index === active}
                  className={`relative aspect-[4/5] w-20 overflow-hidden rounded-xl bg-zinc-100 transition-opacity sm:w-24 ${
                    index === active
                      ? "ring-2 ring-foreground ring-offset-2"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6 lg:py-2">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-denim">
              {product.brand}
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {product.name}
            </h1>
            <p className="flex flex-wrap items-center gap-3 pt-1 text-lg">
              <span className="font-semibold">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-zinc-400 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
              {discount > 0 && (
                <span className="text-sm font-medium text-denim">
                  {discount}% off
                </span>
              )}
            </p>
          </div>

          <p className="max-w-prose leading-relaxed text-zinc-600">
            {product.description}
          </p>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={handleAddToCart}
              className="h-12 w-full rounded-full border border-black/15 px-6 text-base font-medium transition-colors hover:bg-black/5 sm:flex-1"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              className="h-12 w-full rounded-full bg-foreground px-6 text-base font-medium text-background transition-colors hover:bg-foreground/85 sm:flex-1"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
