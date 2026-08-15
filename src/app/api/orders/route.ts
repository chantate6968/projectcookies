import { NextResponse } from "next/server";
import { getProductById } from "@/features/browse/catalog";
import {
  getDeliveryMinor,
  getSubtotalMinor,
  getTotalMinor,
  type CartLine,
} from "@/features/cart/cart-utils";

type OrderRequest = {
  id?: string;
  customerName?: string;
  email?: string;
  phone?: string;
  address?: string;
  giftMessage?: string;
  paymentMethod?: string;
  promoCode?: string;
  lines?: CartLine[];
};

const allowedPaymentMethods = new Set(["fps", "payme"]);

export async function POST(request: Request) {
  const body = (await request.json()) as OrderRequest;
  const lines = Array.isArray(body.lines) ? body.lines : [];
  const hydratedLines = lines.flatMap((line) => {
    const product = getProductById(line.productId);
    const quantity = Number(line.quantity);

    if (!product || !Number.isFinite(quantity) || quantity <= 0) {
      return [];
    }

    return [{ product, productId: product.id, quantity }];
  });

  if (!body.customerName || !body.email || !body.phone || !body.address) {
    return NextResponse.json(
      { error: "Name, email, phone, and delivery address are required." },
      { status: 400 },
    );
  }

  if (hydratedLines.length === 0) {
    return NextResponse.json(
      { error: "Add at least one cookie box before checkout." },
      { status: 400 },
    );
  }

  if (!body.paymentMethod || !allowedPaymentMethods.has(body.paymentMethod)) {
    return NextResponse.json(
      { error: "Please choose FPS or PayMe for launch orders." },
      { status: 400 },
    );
  }

  const subtotalMinor = getSubtotalMinor(hydratedLines);
  const deliveryMinor = getDeliveryMinor(subtotalMinor, body.promoCode);
  const totalMinor = getTotalMinor(hydratedLines, body.promoCode);
  const order = {
    id: body.id,
    customerName: body.customerName,
    email: body.email,
    phone: body.phone,
    address: body.address,
    giftMessage: body.giftMessage ?? "",
    paymentMethod: body.paymentMethod,
    promoCode: body.promoCode ?? "",
    lines: hydratedLines,
    subtotalMinor,
    deliveryMinor,
    totalMinor,
    createdAt: new Date().toISOString(),
  };

  if (process.env.ORDER_NOTIFICATION_WEBHOOK_URL) {
    try {
      await fetch(process.env.ORDER_NOTIFICATION_WEBHOOK_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(order),
      });
    } catch {
      return NextResponse.json(
        {
          error:
            "Order was prepared, but merchant notification failed. Please contact us directly with your order number.",
          order,
        },
        { status: 502 },
      );
    }
  }

  return NextResponse.json({
    order,
    notificationStatus: process.env.ORDER_NOTIFICATION_WEBHOOK_URL
      ? "sent"
      : "manual",
  });
}
