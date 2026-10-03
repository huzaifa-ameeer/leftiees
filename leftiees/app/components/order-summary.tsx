import { computeTotals, type OrderLine } from "@/lib/order";
import { formatPrice } from "@/lib/format";

export default function OrderSummary({
  lines,
  title = "Order summary",
}: {
  lines: OrderLine[];
  title?: string;
}) {
  const { subtotal, deliveryFee, total } = computeTotals(lines);
  const totalQuantity = lines.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-black/10 p-5">
      <h2 className="text-lg font-semibold">{title}</h2>

      <ul className="flex flex-col gap-3">
        {lines.map(({ product, quantity }) => (
          <li key={product.id} className="flex justify-between gap-4 text-sm">
            <span className="text-zinc-600">
              {product.name}{" "}
              <span className="text-zinc-400">× {quantity}</span>
            </span>
            <span className="shrink-0 font-medium">
              {formatPrice(product.price * quantity)}
            </span>
          </li>
        ))}
      </ul>

      <dl className="flex flex-col gap-2 border-t border-black/10 pt-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-zinc-600">Subtotal ({totalQuantity} items)</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-zinc-600">Delivery</dt>
          <dd>{deliveryFee > 0 ? formatPrice(deliveryFee) : "Free"}</dd>
        </div>
        <div className="flex justify-between border-t border-black/10 pt-3 text-base font-semibold">
          <dt>Total</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
      </dl>
    </div>
  );
}
