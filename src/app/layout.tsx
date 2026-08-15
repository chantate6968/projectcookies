import type { Metadata } from "next";
import { CartProvider } from "@/features/cart/CartProvider";
import { SiteFooter } from "@/features/marketing/MarketingSections";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lamsumsum Cookies | Hong Kong online cookie bakery",
  description:
    "Small-batch cookie boxes in Hong Kong with local ordering, FPS and PayMe payment, and simple gifting options.",
  openGraph: {
    title: "Lamsumsum Cookies",
    description:
      "Small-batch cookie boxes in Hong Kong with local ordering and simple gifting options.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
