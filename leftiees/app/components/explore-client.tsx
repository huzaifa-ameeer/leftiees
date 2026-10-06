"use client";

import { useMemo, useState } from "react";

import type { Product } from "@/lib/types";

import FilterSidebar, { type Filters } from "./filter-sidebar";
import ProductGrid from "./product-grid";

export default function ExploreClient({ products }: { products: Product[] }) {
  const brands = useMemo(
    () => Array.from(new Set(products.map((product) => product.brand))).sort(),
    [products],
  );

  const waistOptions = useMemo(
    () =>
      Array.from(
        new Set(
          products
            .map((product) => product.waist)
            .filter((waist): waist is number => typeof waist === "number"),
        ),
      ).sort((a, b) => a - b),
    [products],
  );

  const bounds = useMemo(() => {
    const prices = products.map((product) => product.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [products]);

  const [filters, setFilters] = useState<Filters>({
    minPrice: bounds.min,
    maxPrice: bounds.max,
    brands: [],
    waists: [],
    sort: "featured",
  });

  const visible = useMemo(() => {
    const list = products.filter(
      (product) =>
        product.price >= filters.minPrice &&
        product.price <= filters.maxPrice &&
        (filters.brands.length === 0 ||
          filters.brands.includes(product.brand)) &&
        (filters.waists.length === 0 ||
          (product.waist !== undefined &&
            filters.waists.includes(product.waist))),
    );

    if (filters.sort === "price-asc") {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (filters.sort === "price-desc") {
      return [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }, [products, filters]);

  return (
    <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-12">
      <FilterSidebar
        brands={brands}
        waistOptions={waistOptions}
        bounds={bounds}
        filters={filters}
        onChange={setFilters}
      />

      <div>
        <p className="mb-6 text-sm text-zinc-500">
          {visible.length} {visible.length === 1 ? "product" : "products"}
        </p>
        <ProductGrid products={visible} />
      </div>
    </div>
  );
}
