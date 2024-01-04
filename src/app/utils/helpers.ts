export const currencyOption = {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

export const formattedPrice = (price: number) =>
  new Intl.NumberFormat("en-US", currencyOption).format(price / 100);
