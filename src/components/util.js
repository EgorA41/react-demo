export function percentDifference(oldPrice, newPrice) {
  return +((newPrice - oldPrice) / oldPrice * 100).toFixed(2);
}

export function capitalizeFirstLetter(str) {
	if (str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

