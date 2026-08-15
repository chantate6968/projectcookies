import type { CartLineWithProduct } from "@/features/cart/cart-utils";

export type CustomerOrder = {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  giftMessage: string;
  paymentMethod: string;
  lines: CartLineWithProduct[];
  promoCode: string;
  subtotalMinor: number;
  deliveryMinor: number;
  totalMinor: number;
  createdAt: string;
};

export const orderStorageKey = "lamsumsum-last-order-v2";

export function createOrderId() {
  return `LS-${Date.now().toString().slice(-6)}`;
}
