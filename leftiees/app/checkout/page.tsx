import { getProductById } from "@/lib/products";

import CheckoutClient from "../components/checkout-client";

export default async function CheckoutPage({
  searchParams,
}: PageProps<"/checkout">) {
  const { buyNow } = await searchParams;
  const id = typeof buyNow === "string" ? buyNow : null;
  const product = id ? await getProductById(id) : null;

  return <CheckoutClient buyNowProduct={product} />;
}
