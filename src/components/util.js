export function percentDifference(oldPrice, newPrice) {
  return ((newPrice - oldPrice) / oldPrice * 100).toFixed(2);
}
