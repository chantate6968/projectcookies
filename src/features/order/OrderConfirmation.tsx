"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/features/cart/cart-utils";
import { contactLinks } from "@/features/support/contact";
import { orderStorageKey, type CustomerOrder } from "./order-storage";

export function OrderConfirmation() {
  const [order, setOrder] = useState<CustomerOrder | null>(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const savedOrder = window.localStorage.getItem(orderStorageKey);

      if (savedOrder) {
        try {
          setOrder(JSON.parse(savedOrder) as CustomerOrder);
        } catch {
          setOrder(null);
        }
      }
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  if (!order) {
    return (
      <section className="page-content max-w-2xl text-center">
        <h1 className="text-4xl font-semibold">No order found</h1>
        <p className="mt-4 leading-7 text-[#6d5a4c]">
          Start with a cookie selection from the shop.
        </p>
        <Link className="product-card-add mt-8 inline-block text-center" href="/#shop">
          Browse shop
        </Link>
      </section>
    );
  }

  return (
    <section className="page-content max-w-2xl text-center">
      <h1 className="text-4xl font-semibold">Order confirmed</h1>
      <p className="mx-auto mt-4 max-w-xl leading-7 text-[#6d5a4c]">
        Your order details are saved on this device. Please contact us with your
        order number to confirm payment and delivery.
      </p>

      <div className="detail-panel mx-auto mt-10 max-w-xl text-left">
        <div className="flex justify-between border-b border-[#e8ddd2] pb-4">
          <span>Order number</span>
          <span className="font-medium">{order.id}</span>
        </div>
        <div className="mt-4 grid gap-3 border-b border-[#e8ddd2] pb-4 text-sm">
          {order.lines.map((line) => (
            <div className="flex justify-between" key={line.productId}>
              <span>
                {line.product.name} x {line.quantity}
              </span>
              <span>{formatCurrency(line.product.priceMinor * line.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-4 text-sm">
          <SummaryRow label="Customer" value={order.customerName} />
          <SummaryRow label="Email" value={order.email} />
          <SummaryRow label="Phone" value={order.phone} />
          <SummaryRow label="Delivery" value={order.address} />
          {order.giftMessage ? <SummaryRow label="Gift note" value={order.giftMessage} /> : null}
          <SummaryRow label="Payment method" value={formatPaymentMethod(order.paymentMethod)} />
          <SummaryRow label="Payment next step" value={getPaymentInstruction(order.paymentMethod)} />
          <SummaryRow label="Total" value={formatCurrency(order.totalMinor)} />
        </div>
        <Link className="detail-add mt-8 block text-center" href="/#shop">
          Continue browsing
        </Link>
        <a
          className="product-card-add mt-3 block text-center"
          href={contactLinks.phoneHref}
        >
          Call {contactLinks.phoneDisplay}
        </a>
      </div>
    </section>
  );
}

function formatPaymentMethod(method: string) {
  const labels: Record<string, string> = {
    fps: "FPS transfer / QR confirmation",
    payme: "PayMe QR confirmation",
  };

  return labels[method] ?? method;
}

function getPaymentInstruction(method: string) {
  const instructions: Record<string, string> = {
    fps: "Send us this order number and we will reply with FPS payment details.",
    payme: "Send us this order number and we will reply with the PayMe payment link or QR code.",
  };

  return instructions[method] ?? "Payment instructions will be confirmed by support.";
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1">
      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#5d3a3a]">
        {label}
      </span>
      <span className="leading-6 text-[#6d5a4c]">{value}</span>
    </div>
  );
}
