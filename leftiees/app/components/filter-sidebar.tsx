"use client";

import { useState } from "react";

export type SortOption = "featured" | "price-asc" | "price-desc";

export type Filters = {
  minPrice: number;
  maxPrice: number;
  brands: string[];
  waists: number[];
  sort: SortOption;
};

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function FilterSidebar({
  brands,
  waistOptions,
  bounds,
  filters,
  onChange,
}: {
  brands: string[];
  waistOptions: number[];
  bounds: { min: number; max: number };
  filters: Filters;
  onChange: (filters: Filters) => void;
}) {
  const [open, setOpen] = useState(false);

  function toggleBrand(brand: string) {
    const next = filters.brands.includes(brand)
      ? filters.brands.filter((value) => value !== brand)
      : [...filters.brands, brand];
    onChange({ ...filters, brands: next });
  }

  function toggleWaist(waist: number) {
    const next = filters.waists.includes(waist)
      ? filters.waists.filter((value) => value !== waist)
      : [...filters.waists, waist];
    onChange({ ...filters, waists: next });
  }

  return (
    <div className="lg:sticky lg:top-24 lg:self-start">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-2xl border border-black/15 px-4 py-3.5 text-sm font-medium lg:hidden"
      >
        Filters
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={`h-4 w-4 transition-transform duration-200 motion-reduce:transition-none ${
            open ? "rotate-180" : ""
          }`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        className={`${open ? "mt-3 flex" : "hidden"} flex-col gap-8 rounded-2xl border border-black/15 p-5 lg:mt-0 lg:flex lg:rounded-none lg:border-0 lg:p-0`}
      >
        <fieldset className="flex flex-col gap-3">
          <legend className="mb-1 text-sm font-semibold">Price range</legend>
          <div className="flex items-center gap-3">
            <input
              type="number"
              inputMode="numeric"
              min={bounds.min}
              max={filters.maxPrice}
              placeholder="Min"
              value={filters.minPrice}
              onChange={(event) =>
                onChange({
                  ...filters,
                  minPrice: clamp(
                    Number(event.target.value) || 0,
                    bounds.min,
                    filters.maxPrice,
                  ),
                })
              }
              className="h-11 w-full rounded-lg border border-black/15 px-3.5 text-sm text-foreground transition-colors placeholder:text-zinc-400 focus:border-denim"
            />
            <span className="text-zinc-400">–</span>
            <input
              type="number"
              inputMode="numeric"
              min={filters.minPrice}
              max={bounds.max}
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(event) =>
                onChange({
                  ...filters,
                  maxPrice: clamp(
                    Number(event.target.value) || 0,
                    filters.minPrice,
                    bounds.max,
                  ),
                })
              }
              className="h-11 w-full rounded-lg border border-black/15 px-3.5 text-sm text-foreground transition-colors placeholder:text-zinc-400 focus:border-denim"
            />
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-3">
          <legend className="mb-1 text-sm font-semibold">Brand</legend>
          <div className="flex flex-col gap-2.5">
            {brands.map((brand) => (
              <label
                key={brand}
                className="flex cursor-pointer items-center gap-3 text-sm text-zinc-600"
              >
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                  className="h-4 w-4 rounded border-black/25 accent-denim"
                />
                {brand}
              </label>
            ))}
          </div>
        </fieldset>

        {waistOptions.length > 0 && (
          <fieldset className="flex flex-col gap-3">
            <legend className="mb-1 text-sm font-semibold">Waist</legend>
            <div className="flex flex-wrap gap-2">
              {waistOptions.map((waist) => (
                <label
                  key={waist}
                  className={`flex h-11 min-w-11 cursor-pointer items-center justify-center rounded-lg border px-3 text-sm transition-colors ${
                    filters.waists.includes(waist)
                      ? "border-denim bg-denim/10 text-foreground"
                      : "border-black/15 text-zinc-600 hover:border-black/30"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={filters.waists.includes(waist)}
                    onChange={() => toggleWaist(waist)}
                    className="sr-only"
                  />
                  {waist}
                </label>
              ))}
            </div>
          </fieldset>
        )}

        <fieldset className="flex flex-col gap-3">
          <legend className="mb-1 text-sm font-semibold">Sort by</legend>
          <div className="flex flex-col gap-2.5">
            {SORT_OPTIONS.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-3 text-sm text-zinc-600"
              >
                <input
                  type="radio"
                  name="sort"
                  checked={filters.sort === option.value}
                  onChange={() => onChange({ ...filters, sort: option.value })}
                  className="h-4 w-4 accent-denim"
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>

        <button
          type="button"
          onClick={() =>
            onChange({
              minPrice: bounds.min,
              maxPrice: bounds.max,
              brands: [],
              waists: [],
              sort: "featured",
            })
          }
          className="self-start text-sm font-medium text-denim hover:underline"
        >
          Clear filters
        </button>
      </div>
    </div>
  );
}
