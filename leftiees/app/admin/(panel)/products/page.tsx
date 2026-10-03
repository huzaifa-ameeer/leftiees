import ProductManager from "@/app/components/admin/product-manager";
import { getProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Manage products
        </h1>
        <p className="text-sm text-zinc-500">
          {products.length} {products.length === 1 ? "product" : "products"}
        </p>
      </div>
      <ProductManager products={products} />
    </div>
  );
}
