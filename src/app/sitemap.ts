import type { MetadataRoute } from "next";
import { featuredCookies } from "@/features/browse/catalog";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lamsumsumcookies.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/collection", "/cart", "/checkout", "/story", "/support"];
  const productRoutes = featuredCookies.map((product) => `/product/${product.id}`);

  return [...staticRoutes, ...productRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));
}
