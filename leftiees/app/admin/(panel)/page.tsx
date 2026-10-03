import ProductForm from "@/app/components/admin/product-form";

export default function AdminFreshProductsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Fresh products
        </h1>
        <p className="text-sm text-zinc-500">
          Quickly add a product to the “Fresh drops” grid on the home page.
        </p>
      </div>
      <ProductForm variant="quick" />
    </div>
  );
}
