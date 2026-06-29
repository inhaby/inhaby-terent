export function calculateMonthlyTotal(price: number, maintenance: number = 0): number {
  return price + maintenance;
}

export function getDiscountPercentage(price: number, originalPrice?: number): number {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
