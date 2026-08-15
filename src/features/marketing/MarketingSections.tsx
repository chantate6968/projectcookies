import { announcementMessage, restocksCopy } from "./brand-content";
import Link from "next/link";
import Image from "next/image";
import { LamsumsumLogo } from "@/features/brand/LamsumsumLogo";
import { CartNavLink } from "@/features/cart/CartNavLink";
import { featuredCookies } from "@/features/browse/catalog";
import { contactLinks } from "@/features/support/contact";

export { LamsumsumLogo };

export function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      <p>{announcementMessage}</p>
    </div>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link aria-label="Lamsumsum cookies home" href="/">
          <LamsumsumLogo compact />
        </Link>

        <nav className="site-nav" aria-label="Main">
          <Link href="/">Home</Link>
          <Link href="/#shop">Shop</Link>
          <Link href="/story">About</Link>
          <CartNavLink />
        </nav>
      </div>
    </header>
  );
}

export function HeroSection() {
  const heroProduct = featuredCookies[0];

  return (
    <section className="hero-banner">
      <div className="hero-banner-media">
        {heroProduct.imageSrc ? (
          <Image
            alt="Lamsumsum cookie boxes"
            className="object-cover"
            fill
            priority
            sizes="100vw"
            src={heroProduct.imageSrc}
          />
        ) : (
          <div className="hero-banner-fallback" />
        )}
        <div className="hero-banner-overlay" />
      </div>
      <div className="hero-banner-content">
        <h1>Cookie boxes served fresh</h1>
        <Link className="hero-banner-cta" href="/#shop">
          Explore products
        </Link>
      </div>
    </section>
  );
}

export function RestocksSection() {
  return (
    <section className="restocks-section">
      <div className="restocks-inner">
        <h2>Restocks</h2>
        <p>{restocksCopy}</p>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p>© {new Date().getFullYear()} Lamsumsum Cookies</p>
        <nav aria-label="Policies">
          <Link href="/support">Terms and policies</Link>
          <Link href="/story">About</Link>
          <a href={contactLinks.instagram} rel="noreferrer" target="_blank">
            Instagram
          </a>
          <a href={contactLinks.phoneHref}>{contactLinks.phoneDisplay}</a>
        </nav>
      </div>
    </footer>
  );
}

export function ShopPageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="shop-page">
      <AnnouncementBar />
      <SiteHeader />
      {children}
    </main>
  );
}
