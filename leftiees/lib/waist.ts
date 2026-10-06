export const WAIST_MIN = 30;
export const WAIST_MAX = 44;

export const WAIST_OPTIONS: number[] = Array.from(
  { length: (WAIST_MAX - WAIST_MIN) / 2 + 1 },
  (_, index) => WAIST_MIN + index * 2,
);

export function isValidWaist(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= WAIST_MIN &&
    value <= WAIST_MAX &&
    value % 2 === 0
  );
}
