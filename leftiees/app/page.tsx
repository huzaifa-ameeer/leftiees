import Hero from "./components/hero";
import ProductCards from "./components/product-cards";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center">
      <div className="flex min-h-[calc(100dvh-4rem)] w-full items-center justify-center">
        <Hero />
      </div>
      <ProductCards />
    </main>
  );
}
