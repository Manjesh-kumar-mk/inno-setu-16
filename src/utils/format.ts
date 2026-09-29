/**
 * Utility functions for Indian Currency and Number Formatting
 */

export function formatINR(amount: number): string {
  if (isNaN(amount)) return '₹0';
  
  // Format with Indian Comma System (e.g. 25,00,000)
  const amountStr = Math.round(amount).toString();
  let lastThree = amountStr.substring(amountStr.length - 3);
  const otherNumbers = amountStr.substring(0, amountStr.length - 3);
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  const formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  return `₹${formatted}`;
}

export function formatLakhCrore(amount: number): string {
  if (amount >= 10000000) {
    const crore = (amount / 10000000).toFixed(2);
    return `₹${crore.replace(/\.00$/, '')} Crore`;
  }
  if (amount >= 100000) {
    const lakh = (amount / 100000).toFixed(2);
    return `₹${lakh.replace(/\.00$/, '')} Lakh`;
  }
  return formatINR(amount);
}

export const formatCurrency = formatINR;

