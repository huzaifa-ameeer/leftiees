export function formatPrice(value: number): string {
  return `Rs ${value.toLocaleString("en-US")}`;
}
