"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();

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
    <article className="flex flex-col">
      <Link href={`/product/${product.id}`} className="group flex flex-col">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-zinc-100">
          <Image
            src={product.images[0]}
            alt={product.alt}
            fill
            sizes="(min-width: 1024px) 30vw, 50vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none"
          />
          {discount > 0 && (
            <span className="absolute left-3 top-3 rounded-full bg-foreground px-2.5 py-1 text-xs font-medium text-background">
              -{discount}%
            </span>
          )}
        </div>

        <div className="flex flex-col gap-0.5 pt-3">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-denim">
            {product.brand}
          </p>
          <h3 className="text-sm font-medium sm:text-base">{product.name}</h3>
          <p className="flex items-center gap-2 text-sm">
            <span className="font-medium">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-zinc-400 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </p>
        </div>
      </Link>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={handleAddToCart}
          className="h-11 w-full rounded-full border border-black/15 px-4 text-sm font-medium transition-colors hover:bg-black/5 sm:flex-1"
        >
          Add to Cart
        </button>
        <button
          type="button"
          onClick={handleBuyNow}
          className="h-11 w-full rounded-full bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-foreground/85 sm:flex-1"
        >
          Buy Now
        </button>
      </div>
    </article>
  );
}
