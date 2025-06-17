export const formatCurrency = (value) =>
  (parseInt(value) / 100).toFixed(2).toString().split(".").join(",");
