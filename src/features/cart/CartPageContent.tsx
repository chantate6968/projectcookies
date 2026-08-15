"use client";

import Link from "next/link";
import { CookieIllustration } from "@/features/browse/CookieIllustration";
import { formatCurrency, promoThresholdMinor } from "./cart-utils";
import { useCart } from "./CartProvider";
import { useIsClient } from "./useIsClient";

export function CartPageContent() {
  const isClient = useIsClient();
  const {
    deliveryMinor,
    itemCount,
    lines,
    promoCode,
    promoMessage,
    removeItem,
    setPromoCode,
    subtotalMinor,
    totalMinor,
    updateQuantity,
  } = useCart();

  if (!isClient) {
    return (
      <section className="page-content">
        <h1 className="text-4xl font-semibold">Your cart</h1>
        <p className="mt-4 text-[#6d5a4c]">Loading your cart...</p>
      </section>
    );
  }

  return (
    <section className="page-content grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <h1 className="text-4xl font-semibold">Your cart</h1>

        {lines.length === 0 ? (
          <div className="detail-panel mt-8">
            <h2 className="text-xl font-semibold">Your cart is empty.</h2>
            <p className="mt-3 leading-7 text-[#6d5a4c]">
              Add a cookie box from the shop to begin your order.
            </p>
            <Link className="product-card-add mt-6 inline-block text-center" href="/#shop">
              Browse shop
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-4">
            {lines.map((item) => (
              <article
                className="detail-panel grid gap-5 md:grid-cols-[7rem_1fr_auto]"
                key={item.product.id}
              >
                <div className="relative aspect-square overflow-hidden bg-[#f3ebe3]">
                  <CookieIllustration product={item.product} />
                </div>
                <div>
                  <p className="text-sm text-[#6d5a4c]">{item.product.note}</p>
                  <h2 className="mt-1 text-lg font-semibold">{item.product.name}</h2>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <label className="text-sm text-[#6d5a4c]" htmlFor={`qty-${item.product.id}`}>
                      Quantity
                    </label>
                    <input
                      className="w-20 border border-[#d9cfc4] bg-white px-3 py-2"
                      id={`qty-${item.product.id}`}
                      min={1}
                      onChange={(event) =>
                        updateQuantity(item.product.id, Number(event.target.value))
                      }
                      type="number"
                      value={item.quantity}
                    />
                    <button
                      className="text-sm text-[#6d5a4c] underline"
                      onClick={() => removeItem(item.product.id)}
                      type="button"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <p className="text-xl font-medium">
                  {formatCurrency(item.product.priceMinor * item.quantity)}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>

      <aside className="detail-panel h-fit">
        <h2 className="text-xl font-semibold">Order summary</h2>
        <div className="mt-6 grid gap-4 text-sm text-[#6d5a4c]">
          <SummaryRow label="Items" value={String(itemCount)} />
          <SummaryRow label="Subtotal" value={formatCurrency(subtotalMinor)} />
          <SummaryRow
            label="Delivery"
            value={deliveryMinor === 0 ? "Complimentary" : formatCurrency(deliveryMinor)}
          />
          <SummaryRow label="Promo threshold" value={formatCurrency(promoThresholdMinor)} />
          <label className="grid gap-2 border-b border-[#e8ddd2] pb-4">
            <span>Promotion code</span>
            <input
              className="border border-[#d9cfc4] bg-white px-3 py-3 uppercase outline-none"
              onChange={(event) => setPromoCode(event.target.value)}
              placeholder="SWEETSTART"
              value={promoCode}
            />
            <span className="text-xs leading-5">{promoMessage}</span>
          </label>
          <div className="flex justify-between border-t border-[#e8ddd2] pt-4 text-xl font-semibold text-[#5d3a3a]">
            <span>Total</span>
            <span>{formatCurrency(totalMinor)}</span>
          </div>
        </div>
        {lines.length === 0 ? (
          <span className="product-card-add mt-6 block cursor-not-allowed text-center opacity-50">
            Add cookies to checkout
          </span>
        ) : (
          <Link className="detail-add mt-6 block text-center" href="/checkout">
            Continue to checkout
          </Link>
        )}
      </aside>
    </section>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-[#e8ddd2] pb-4">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
