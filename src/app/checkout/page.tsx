import { CheckoutPreview } from "@/features/order/CheckoutPreview";
import { ShopPageShell } from "@/features/marketing/MarketingSections";

export default function CheckoutPage() {
  return (
    <ShopPageShell>
      <CheckoutPreview />
    </ShopPageShell>
  );
}
