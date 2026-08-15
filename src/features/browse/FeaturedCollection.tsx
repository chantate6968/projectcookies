import Link from "next/link";
import { AddToCartButton } from "@/features/cart/AddToCartButton";
import { CookieIllustration } from "./CookieIllustration";
import { featuredCookies } from "./catalog";

export function FeaturedCollection() {
  return (
    <section id="shop" className="mx-auto max-w-6xl px-6 py-14">
      <p className="text-center text-xs font-medium uppercase tracking-[0.28em] text-[#5d3a3a]">
        Cookie boxes served fresh
      </p>
      <h2 className="mt-4 text-center text-3xl font-semibold tracking-[-0.03em] text-[#5d3a3a] md:text-4xl">
        Explore our flavours
      </h2>
      <div className="mx-auto mt-10 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {featuredCookies.map((cookie) => (
          <article className="product-card" key={cookie.id}>
            <Link
              className="product-card-image"
              href={`/product/${cookie.id}`}
            >
              <CookieIllustration product={cookie} />
            </Link>
            <div className="product-card-body">
              <Link
                className="product-card-title"
                href={`/product/${cookie.id}`}
              >
                {cookie.name}
              </Link>
              <p className="product-card-price">{cookie.price}</p>
              <AddToCartButton
                className="product-card-add"
                productId={cookie.id}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
