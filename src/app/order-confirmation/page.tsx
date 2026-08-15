import { OrderConfirmation } from "@/features/order/OrderConfirmation";
import { ShopPageShell } from "@/features/marketing/MarketingSections";

export default function OrderConfirmationPage() {
  return (
    <ShopPageShell>
      <OrderConfirmation />
    </ShopPageShell>
  );
}
