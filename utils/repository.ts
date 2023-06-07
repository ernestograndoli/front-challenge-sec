const currencyUSDFormat = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const currencyEUFormat = Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
});

export const formatToCurrency = (amount: number, currency: string) => {
  switch (currency) {
    case "EUR":
      return currencyEUFormat.format(amount);
    case "USD":
      return currencyUSDFormat.format(amount);
    default:
      return currencyUSDFormat.format(amount);
  }
};
