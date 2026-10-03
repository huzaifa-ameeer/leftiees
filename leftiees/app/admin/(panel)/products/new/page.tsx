import ProductForm from "@/app/components/admin/product-form";

export default function AdminNewProductPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Add product</h1>
        <p className="text-sm text-zinc-500">
          Add a full product with images, description, sale price and stock.
        </p>
      </div>
      <ProductForm variant="full" />
    </div>
  );
}
