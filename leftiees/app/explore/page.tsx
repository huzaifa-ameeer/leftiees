import { getProducts } from "@/lib/products";

import ExploreClient from "../components/explore-client";

export const dynamic = "force-dynamic";

export default async function Explore() {
  const products = await getProducts();

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
          Explore
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Explore
        </h1>
        <p className="max-w-prose text-lg text-zinc-600">
          Browse what Leftiees has to offer.
        </p>
      </div>

      <ExploreClient products={products} />
    </main>
  );
}
