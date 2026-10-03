import type { OrderLine } from "@/lib/types";

export type { CustomerDetails, OrderLine } from "@/lib/types";

export const DELIVERY_FEE = 250;

export function computeTotals(lines: OrderLine[]) {
  const subtotal = lines.reduce(
    (sum, line) => sum + line.product.price * line.quantity,
    0,
  );
  const deliveryFee = lines.length > 0 ? DELIVERY_FEE : 0;

  return { subtotal, deliveryFee, total: subtotal + deliveryFee };
}
