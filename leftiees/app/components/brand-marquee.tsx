const BRANDS = [
  { name: "Levi's", className: "font-serif italic" },
  { name: "GUESS", className: "tracking-[0.35em]" },
  { name: "MUSTANG", className: "font-black italic tracking-tight" },
  { name: "Wrangler", className: "font-serif" },
  { name: "Diesel", className: "font-semibold tracking-[0.2em]" },
  { name: "Lee", className: "font-bold tracking-[0.45em]" },
];

export default function BrandMarquee({ className }: { className?: string }) {
  return (
    <div
      className={`group w-full min-w-0 overflow-hidden ${className ?? ""}`}
    >
      <div className="marquee-edge">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center gap-12 pr-12 sm:gap-20 sm:pr-20"
            >
              {BRANDS.map((brand) => (
                <li
                  key={brand.name}
                  className={`whitespace-nowrap text-xl text-zinc-400 transition-colors duration-300 hover:text-denim sm:text-2xl ${brand.className}`}
                >
                  {brand.name}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
