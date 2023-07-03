export const convertPrice = (price) => {
  if (price.includes("$")) {
    price = price.replace("$", "");
  }
  let resultPriceValue;
  const priceWithoutDot = price.replace(/\./g, "");
  if (priceWithoutDot.length > 4) {
    resultPriceValue =
      priceWithoutDot.slice(0, 4) + "." + priceWithoutDot.slice(4);
    if (resultPriceValue.length > 7) {
      resultPriceValue = resultPriceValue.slice(0, 7);
    }
    if (resultPriceValue.length === 6) {
      resultPriceValue = resultPriceValue.slice(0, 7) + "0";
    }
  } else if (priceWithoutDot.length === 4) {
    resultPriceValue = priceWithoutDot + ".00";
  } else if (priceWithoutDot.length < 4) {
    resultPriceValue = priceWithoutDot;
  }

  return "$" + resultPriceValue;
};
