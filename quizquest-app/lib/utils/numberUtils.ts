import numeral from 'numeral';

// Shorten a number to thousands, millions, etc. (e.g. 1000 -> 1K, 1300 -> 1.3K, 1000000 -> 1M)
export const shortenNumber = (number: number, decimals: number = 1) => {
  if (isNaN(number)) return '0';
  return numeral(number).format(`0.${'0'.repeat(decimals)}a`);
};

// Format a number with thousand separators (e.g. 1234 -> 1,234)
export const formatNumber = (number: number, decimals: number = 0) => {
  if (isNaN(number)) return '0';
  return numeral(number).format(`0,${decimals > 0 ? '0'.repeat(decimals) : ''}`);
};

// Format a number as currency
export const formatCurrency = (amount: number, currency: string = 'R', decimals: number = 2) => {
  if (isNaN(amount)) return `${currency}0.00`;
  return numeral(amount).format(`${currency}0,${decimals > 0 ? '0'.repeat(decimals) : ''}`);
};

// Format a number as percentage
export const formatPercentage = (value: number, decimals: number = 1) => {
  if (isNaN(value)) return '0%';
  return numeral(value * 100).format(`0.${'0'.repeat(decimals)}%`);
};
