"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import ConfirmDialog from "@/app/components/confirm-dialog";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

import ProductForm from "./product-form";

export default function ProductManager({ products }: { products: Product[] }) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  async function confirmDelete() {
    if (!pendingDelete) return;

    setDeletingId(pendingDelete.id);
    const response = await fetch(`/api/products/${pendingDelete.id}`, {
      method: "DELETE",
    });
    setDeletingId(null);
    setPendingDelete(null);

    if (!response.ok) {
      toast.error("Could not delete the product");
      return;
    }

    toast.success("Product deleted");
    router.refresh();
  }

  if (products.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-black/15 py-16 text-center text-zinc-500">
        No products yet. Add one from “Add product”.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {products.map((product) => (
        <div
          key={product.id}
          className="rounded-2xl border border-black/10 p-4"
        >
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
              {product.images[0] && (
                <Image
                  src={product.images[0]}
                  alt={product.alt}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{product.name}</p>
              <p className="truncate text-xs text-zinc-500">
                {product.brand || "No brand"} · {formatPrice(product.price)} ·
                stock {product.stock}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {product.featured && (
                <span className="hidden rounded-full bg-denim/10 px-2 py-0.5 text-xs font-medium text-denim sm:inline">
                  Fresh
                </span>
              )}
              <button
                type="button"
                onClick={() =>
                  setEditingId(editingId === product.id ? null : product.id)
                }
                className="rounded-full border border-black/15 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-black/5"
              >
                {editingId === product.id ? "Close" : "Edit"}
              </button>
              <button
                type="button"
                onClick={() =>
                  setPendingDelete({ id: product.id, name: product.name })
                }
                disabled={deletingId === product.id}
                className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-60"
              >
                Delete
              </button>
            </div>
          </div>

          {editingId === product.id && (
            <div className="mt-4 border-t border-black/10 pt-4">
              <ProductForm
                initial={product}
                variant="full"
                onSaved={() => setEditingId(null)}
              />
            </div>
          )}
        </div>
      ))}

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Delete product?"
        message={
          pendingDelete
            ? `"${pendingDelete.name}" will be permanently removed.`
            : undefined
        }
        confirmLabel="Delete product"
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
