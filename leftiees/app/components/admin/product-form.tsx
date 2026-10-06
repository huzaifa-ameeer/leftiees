"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import TextField from "@/app/components/text-field";
import type { Product } from "@/lib/types";
import { WAIST_OPTIONS } from "@/lib/waist";

import ImageUploader from "./image-uploader";

type Variant = "quick" | "full";

export default function ProductForm({
  initial,
  variant = "full",
  onSaved,
}: {
  initial?: Product;
  variant?: Variant;
  onSaved?: () => void;
}) {
  const router = useRouter();
  const isEdit = Boolean(initial);

  const [images, setImages] = useState<string[]>(initial?.images ?? []);
  const [name, setName] = useState(initial?.name ?? "");
  const [brand, setBrand] = useState(initial?.brand ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [price, setPrice] = useState(initial ? String(initial.price) : "");
  const [waist, setWaist] = useState(initial?.waist ? String(initial.waist) : "");
  const [oldPrice, setOldPrice] = useState(
    initial?.oldPrice ? String(initial.oldPrice) : "",
  );
  const [stock, setStock] = useState(initial ? String(initial.stock) : "0");
  const [featured, setFeatured] = useState(
    variant === "quick" ? true : Boolean(initial?.featured),
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Product name is required.");
      return;
    }

    const priceValue = Number(price);
    if (!priceValue || priceValue <= 0) {
      setError("Enter a valid price.");
      return;
    }

    if (!waist) {
      setError("Waist is required.");
      return;
    }

    setSaving(true);

    const payload = {
      name: name.trim(),
      brand: brand.trim(),
      description: description.trim(),
      price: priceValue,
      waist: Number(waist),
      oldPrice: oldPrice ? Number(oldPrice) : undefined,
      stock: Number(stock) || 0,
      images,
      featured,
    };

    const response = await fetch(
      isEdit ? `/api/products/${initial?.id}` : "/api/products",
      {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    const data = await response.json().catch(() => null);
    setSaving(false);

    if (!response.ok) {
      setError(data?.error ?? "Could not save the product.");
      return;
    }

    toast.success(isEdit ? "Product updated" : "Product added");
    router.refresh();
    onSaved?.();

    if (!isEdit && variant === "quick") {
      setImages([]);
      setName("");
      setBrand("");
      setDescription("");
      setPrice("");
      setWaist("");
      setOldPrice("");
      setStock("0");
      return;
    }

    if (!isEdit && variant === "full") {
      router.push("/admin/products");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-5 rounded-2xl border border-black/10 p-5"
    >
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-zinc-700">Images</span>
        <ImageUploader value={images} onChange={setImages} />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <TextField
          id={`name-${variant}`}
          label="Product name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          id={`brand-${variant}`}
          label="Brand"
          value={brand}
          onChange={(event) => setBrand(event.target.value)}
        />
        <div className="flex flex-col">
          <label htmlFor={`waist-${variant}`} className="sr-only">
            Waist (inches)
          </label>
          <select
            id={`waist-${variant}`}
            required
            value={waist}
            onChange={(event) => setWaist(event.target.value)}
            className="h-12 w-full rounded-xl border border-black/15 bg-background px-4 text-left text-base text-foreground transition-colors focus:border-denim"
          >
            <option value="" disabled>
              Waist (inches)
            </option>
            {WAIST_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <TextField
          id={`price-${variant}`}
          label="Price (Rs)"
          type="number"
          min="0"
          required
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />

        {variant === "full" && (
          <>
            <TextField
              id={`oldPrice-${variant}`}
              label="Sale price (optional)"
              type="number"
              min="0"
              value={oldPrice}
              onChange={(event) => setOldPrice(event.target.value)}
            />
            <TextField
              id={`stock-${variant}`}
              label="Stock"
              type="number"
              min="0"
              value={stock}
              onChange={(event) => setStock(event.target.value)}
            />
          </>
        )}
      </div>

      {variant === "full" && (
        <>
          <div className="flex flex-col">
            <label htmlFor={`description-${variant}`} className="sr-only">
              Description
            </label>
            <textarea
              id={`description-${variant}`}
              placeholder="Description"
              rows={4}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="w-full rounded-xl border border-black/15 bg-background px-4 py-3 text-base text-foreground transition-colors placeholder:text-zinc-400 focus:border-denim"
            />
          </div>

          <label className="flex items-center gap-3 text-sm text-zinc-600">
            <input
              type="checkbox"
              checked={featured}
              onChange={(event) => setFeatured(event.target.checked)}
              className="h-4 w-4 accent-denim"
            />
            Show in “Fresh drops” on the home page
          </label>
        </>
      )}

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="inline-flex h-12 w-fit items-center justify-center rounded-full bg-foreground px-6 text-base font-medium text-background transition-colors hover:bg-foreground/85 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {saving
          ? "Saving..."
          : isEdit
            ? "Save changes"
            : variant === "quick"
              ? "Publish to Fresh drops"
              : "Add product"}
      </button>
    </form>
  );
}
