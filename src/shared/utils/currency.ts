export function parseCurrency(val: string) {
  // remove spaces
  const clean = val.replace(/\s/g, "").replace(/,/g, ".");
  const num = Math.round(parseFloat(clean) * 100);
  if (!Number.isFinite(num)) {
    return NaN;
  }
  return num;
}

const formatterNumber = new Intl.NumberFormat("fr-FR", {
  style: "decimal",
  minimumFractionDigits: 2,
});

export function formatCurrencyNumber(amount: number) {
  return formatterNumber.format(amount / 100);
}

const currencyFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

export function formatCurrency(amount: number) {
  return currencyFormatter.format(amount / 100);
}
