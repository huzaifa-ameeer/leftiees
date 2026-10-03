import OrdersManager from "@/app/components/admin/orders-manager";
import { getOrders } from "@/lib/orders";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Orders</h1>
        <p className="text-sm text-zinc-500">
          {orders.length} {orders.length === 1 ? "order" : "orders"}
        </p>
      </div>
      <OrdersManager orders={orders} />
    </div>
  );
}
