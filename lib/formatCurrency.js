/**
 * Format currency functions
 */

export function formatCurrency(amount) {
  return `Rp ${amount.toLocaleString('id-ID')}`;
}

export function formatCurrencyShort(amount) {
  if (amount >= 1000000) {
    return `Rp ${(amount / 1000000).toFixed(1)}jt`;
  }
  if (amount >= 1000) {
    return `Rp ${(amount / 1000).toFixed(0)}rb`;
  }
  return `Rp ${amount}`;
}

export function parseCurrency(formattedAmount) {
  return parseInt(formattedAmount.replace(/[^0-9]/g, '')) || 0;
}