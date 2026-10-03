import BrandMarquee from "./components/brand-marquee";
import Hero from "./components/hero";
import ProductGrid from "./components/product-grid";
import { getFeaturedProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featured = await getFeaturedProducts();

  return (
    <main className="flex flex-1 flex-col items-center">
      <Hero />
      <BrandMarquee className="mx-auto my-16 w-full max-w-6xl px-4 sm:px-6 lg:px-8" />
      {featured.length > 0 && (
        <section className="w-full max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight sm:text-3xl">
            Fresh drops
          </h2>
          <ProductGrid products={featured} />
        </section>
      )}
    </main>
  );
}
