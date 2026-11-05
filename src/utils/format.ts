const compact = new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 });
const integer = new Intl.NumberFormat("en-US");

export function formatCompact(value: number) {
  return compact.format(value);
}

export function formatNumber(value: number) {
  return integer.format(value);
}

export function formatCurrency(value: number, currency = "USD", fractionDigits?: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: fractionDigits ?? (Number.isInteger(value) ? 0 : 2),
    maximumFractionDigits: fractionDigits ?? 4,
  }).format(value);
}

export function formatPercent(value: number, fractionDigits = 2) {
  return `${value.toFixed(fractionDigits)}%`;
}

/** Format an ISO date (yyyy-mm-dd) deterministically, independent of locale/timezone. */
export function formatIsoDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[(m ?? 1) - 1]} ${d}, ${y}`;
}
