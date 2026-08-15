import { getProductById, type CookieProduct } from "@/features/browse/catalog";

export type CartLine = {
  productId: string;
  quantity: number;
};

export type CartLineWithProduct = CartLine & {
  product: CookieProduct;
};

export const deliveryEstimateMinor = 600;
export const promoThresholdMinor = 4500;
export const launchPromoCode = "SWEETSTART";

export function formatCurrency(minor: number) {
  return `HK$${(minor / 100).toFixed(2)}`;
}

export function hydrateCartLines(lines: CartLine[]): CartLineWithProduct[] {
  return lines.flatMap((line) => {
    const product = getProductById(line.productId);

    if (!product || line.quantity <= 0) {
      return [];
    }

    return [{ ...line, product }];
  });
}

export function getSubtotalMinor(lines: CartLineWithProduct[]) {
  return lines.reduce(
    (total, item) => total + item.product.priceMinor * item.quantity,
    0,
  );
}

export function getDeliveryMinor(subtotalMinor: number, promoCode?: string) {
  const promoApplied = promoCode?.trim().toUpperCase() === launchPromoCode;
  const meetsThreshold = subtotalMinor >= promoThresholdMinor;

  return promoApplied && meetsThreshold ? 0 : deliveryEstimateMinor;
}

export function getTotalMinor(lines: CartLineWithProduct[], promoCode?: string) {
  const subtotal = getSubtotalMinor(lines);

  return subtotal + getDeliveryMinor(subtotal, promoCode);
}

export function getPromoMessage(subtotalMinor: number, promoCode: string) {
  const normalizedCode = promoCode.trim().toUpperCase();

  if (!normalizedCode) {
    return "Enter SWEETSTART for free delivery over HK$45.00.";
  }

  if (normalizedCode !== launchPromoCode) {
    return "This promotion code is not available.";
  }

  if (subtotalMinor < promoThresholdMinor) {
    return `Add ${formatCurrency(promoThresholdMinor - subtotalMinor)} more to unlock free delivery.`;
  }

  return "SWEETSTART applied: delivery is complimentary.";
}
