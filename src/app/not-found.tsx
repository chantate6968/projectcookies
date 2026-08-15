import Link from "next/link";
import { ShopPageShell } from "@/features/marketing/MarketingSections";

export default function NotFound() {
  return (
    <ShopPageShell>
      <section className="page-content max-w-2xl">
        <h1 className="text-4xl font-semibold">Page not found</h1>
        <p className="mt-4 leading-7 text-[#6d5a4c]">
          This page is not available. Head back to the shop to browse cookie
          boxes.
        </p>
        <Link className="product-card-add mt-8 inline-block text-center" href="/#shop">
          Back to shop
        </Link>
      </section>
    </ShopPageShell>
  );
}
