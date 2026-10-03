import { notFound } from "next/navigation";

import ProductDetail from "@/app/components/product-detail";
import { getProductById } from "@/lib/products";

export default async function ProductPage({
  params,
}: PageProps<"/product/[id]">) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-16 sm:px-6 lg:px-8">
      <ProductDetail product={product} />
    </main>
  );
}
