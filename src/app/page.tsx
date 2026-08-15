import { FeaturedCollection } from "@/features/browse/FeaturedCollection";
import { NewsletterSignup } from "@/features/marketing/NewsletterSignup";
import {
  AnnouncementBar,
  HeroSection,
  RestocksSection,
  SiteHeader,
} from "@/features/marketing/MarketingSections";

export default function Home() {
  return (
    <main className="shop-page">
      <AnnouncementBar />
      <SiteHeader />
      <HeroSection />
      <FeaturedCollection />
      <RestocksSection />
      <NewsletterSignup />
    </main>
  );
}
