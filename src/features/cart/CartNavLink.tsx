"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";
import { useIsClient } from "./useIsClient";

export function CartNavLink() {
  const isClient = useIsClient();
  const { itemCount } = useCart();

  return (
    <Link className="site-nav-cart" href="/cart">
      Cart
      {isClient && itemCount > 0 ? (
        <span className="site-nav-cart-count">{itemCount}</span>
      ) : null}
    </Link>
  );
}
