"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { formatCurrency, promoThresholdMinor } from "@/features/cart/cart-utils";
import { useCart } from "@/features/cart/CartProvider";
import { useIsClient } from "@/features/cart/useIsClient";
import { createOrderId, orderStorageKey, type CustomerOrder } from "./order-storage";

export function CheckoutPreview() {
  const router = useRouter();
  const isClient = useIsClient();
  const {
    clearCart,
    deliveryMinor,
    lines,
    promoCode,
    promoMessage,
    setPromoCode,
    subtotalMinor,
    totalMinor,
  } = useCart();
  const [error, setError] = useState("");

  if (!isClient) {
    return (
      <section className="page-content">
        <h1 className="text-4xl font-semibold">Checkout</h1>
        <p className="mt-4 text-[#6d5a4c]">Loading checkout...</p>
      </section>
    );
  }

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const formData = new FormData(event.currentTarget);

    if (lines.length === 0) {
      setError("Add at least one cookie box before checkout.");
      return;
    }

    const order: CustomerOrder = {
      id: createOrderId(),
      customerName: String(formData.get("customerName") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      address: String(formData.get("address") ?? ""),
      giftMessage: String(formData.get("giftMessage") ?? ""),
      paymentMethod: String(formData.get("paymentMethod") ?? "fps"),
      lines,
      promoCode,
      subtotalMinor,
      deliveryMinor,
      totalMinor,
      createdAt: new Date().toISOString(),
    };

    if (!order.customerName || !order.email || !order.phone || !order.address) {
      setError("Please complete name, email, phone, and delivery address.");
      return;
    }

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...order,
          lines: lines.map((line) => ({
            productId: line.productId,
            quantity: line.quantity,
          })),
        }),
      });
      const result = (await response.json()) as {
        error?: string;
        order?: CustomerOrder;
      };

      if (!response.ok || !result.order) {
        setError(result.error ?? "We could not place this order. Please try again.");
        return;
      }

      window.localStorage.setItem(orderStorageKey, JSON.stringify(result.order));
      clearCart();
      router.push("/order-confirmation");
    } catch {
      setError("We could not reach checkout. Please check your connection and try again.");
    }
  }

  return (
    <section className="page-content grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <h1 className="text-4xl font-semibold">Checkout</h1>
        <p className="mt-4 leading-7 text-[#6d5a4c]">
          Add your delivery details and choose a payment method. We will use your
          order number to match FPS or PayMe payment confirmation.
        </p>
        {lines.length === 0 ? (
          <Link className="product-card-add mt-8 inline-block text-center" href="/#shop">
            Add cookies first
          </Link>
        ) : null}
      </div>

      <form className="grid gap-5" onSubmit={submitOrder}>
        <CheckoutField label="Name" name="customerName" required />
        <div className="grid gap-5 md:grid-cols-2">
          <CheckoutField label="Email" name="email" required type="email" />
          <CheckoutField label="Phone" name="phone" required type="tel" />
        </div>
        <label className="detail-panel grid gap-2">
          <span className="text-sm font-medium text-[#5d3a3a]">Delivery address</span>
          <textarea
            className="min-h-28 border border-[#d9cfc4] bg-white px-3 py-3 outline-none"
            name="address"
            required
          />
        </label>
        <label className="detail-panel grid gap-2">
          <span className="text-sm font-medium text-[#5d3a3a]">Gift message</span>
          <textarea
            className="min-h-24 border border-[#d9cfc4] bg-white px-3 py-3 outline-none"
            name="giftMessage"
            placeholder="Optional handwritten note"
          />
        </label>
        <label className="detail-panel grid gap-2">
          <span className="text-sm font-medium text-[#5d3a3a]">Promotion code</span>
          <input
            className="border border-[#d9cfc4] bg-white px-3 py-3 uppercase outline-none"
            onChange={(event) => setPromoCode(event.target.value)}
            placeholder="SWEETSTART"
            value={promoCode}
          />
          <span className="text-sm text-[#6d5a4c]">{promoMessage}</span>
        </label>
        <label className="detail-panel grid gap-2">
          <span className="text-sm font-medium text-[#5d3a3a]">Payment method</span>
          <select
            className="border border-[#d9cfc4] bg-white px-3 py-3 outline-none"
            defaultValue="fps"
            name="paymentMethod"
          >
            <option value="fps">FPS transfer / QR confirmation</option>
            <option value="payme">PayMe QR confirmation</option>
          </select>
          <span className="text-sm leading-6 text-[#6d5a4c]">
            For now, FPS and PayMe are confirmed manually using your order
            number. We will confirm payment details after the order is placed.
          </span>
        </label>

        <div className="detail-panel">
          <h2 className="text-xl font-semibold">Order review</h2>
          <div className="mt-6 grid gap-3 text-sm text-[#6d5a4c]">
            {lines.map((line) => (
              <div className="flex justify-between" key={line.productId}>
                <span>
                  {line.product.shortName} x {line.quantity}
                </span>
                <span>{formatCurrency(line.product.priceMinor * line.quantity)}</span>
              </div>
            ))}
            <SummaryRow label="Subtotal" value={formatCurrency(subtotalMinor)} />
            <SummaryRow label="Delivery" value={deliveryMinor === 0 ? "Complimentary" : formatCurrency(deliveryMinor)} />
            <SummaryRow label="Free delivery threshold" value={formatCurrency(promoThresholdMinor)} />
            <div className="flex justify-between border-t border-[#e8ddd2] pt-3 text-xl font-semibold text-[#5d3a3a]">
              <span>Total</span>
              <span>{formatCurrency(totalMinor)}</span>
            </div>
          </div>
          {error ? <p className="mt-5 text-sm text-[#c45c4a]">{error}</p> : null}
          <button
            className="detail-add mt-8 block w-full disabled:cursor-not-allowed disabled:opacity-50"
            disabled={lines.length === 0}
            type="submit"
          >
            Place order
          </button>
        </div>
      </form>
    </section>
  );
}

function CheckoutField({
  label,
  name,
  required,
  type = "text",
}: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="detail-panel grid gap-2">
      <span className="text-sm font-medium text-[#5d3a3a]">{label}</span>
      <input
        className="border border-[#d9cfc4] bg-white px-3 py-3 outline-none"
        name={name}
        required={required}
        type={type}
      />
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-t border-[#e8ddd2] pt-3">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
