import { FeaturedCollection } from "@/features/browse/FeaturedCollection";
import {
  AnnouncementBar,
  SiteHeader,
} from "@/features/marketing/MarketingSections";

export default function CollectionPage() {
  return (
    <main className="shop-page">
      <AnnouncementBar />
      <SiteHeader />
      <FeaturedCollection />
    </main>
  );
}
