const CurrentFormdat = (currency) => {
  let FormdateCurrency = new Intl.NumberFormat("en-in", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });
  return FormdateCurrency.format(currency);
};

export default CurrentFormdat;
