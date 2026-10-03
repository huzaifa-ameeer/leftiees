import Image from "next/image";
import Link from "next/link";

const PRODUCTS = [
  {
    name: "Classic Straight Denim",
    price: 1600,
    image:
      "https://images.pexels.com/photos/10133274/pexels-photo-10133274.jpeg?auto=compress&cs=tinysrgb&w=900&h=1200&fit=crop",
    alt: "Stack of folded blue denim jeans",
  },
  {
    name: "Faded Slim Fit Jeans",
    price: 2100,
    image:
      "https://images.pexels.com/photos/4109755/pexels-photo-4109755.jpeg?auto=compress&cs=tinysrgb&w=900&h=1200&fit=crop",
    alt: "Neatly folded blue denim pants on a table",
  },
  {
    name: "Vintage Wash Denim",
    price: 1850,
    image:
      "https://images.pexels.com/photos/17265364/pexels-photo-17265364.jpeg?auto=compress&cs=tinysrgb&w=900&h=1200&fit=crop",
    alt: "Folded blue jeans stacked on a retail display",
  },
];

export default function ProductCards({ className }: { className?: string }) {
  return (
    <section
      className={`w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8 ${className ?? ""}`}
    >
      <h2 className="mb-6 text-2xl font-semibold tracking-tight sm:text-3xl">
        Fresh drops
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
        {PRODUCTS.map((product) => (
          <Link
            key={product.name}
            href="/explore"
            className="group flex flex-col gap-3"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-zinc-100">
              <Image
                src={product.image}
                alt={product.alt}
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none"
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <h3 className="text-sm font-medium sm:text-base">
                {product.name}
              </h3>
              <p className="text-sm text-zinc-500">
                Rs {product.price.toLocaleString("en-US")}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-denim">
              Explore more
              <ArrowIcon />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
