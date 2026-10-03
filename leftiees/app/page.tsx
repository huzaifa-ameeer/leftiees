import Hero from "./components/hero";
import BrandMarquee from "./components/brand-marquee";
import ProductCards from "./components/product-cards";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center">
      <Hero />
      <BrandMarquee className="mx-auto my-16 w-full max-w-6xl px-4 sm:px-6 lg:px-8" />
      <ProductCards />
    </main>
  );
}
