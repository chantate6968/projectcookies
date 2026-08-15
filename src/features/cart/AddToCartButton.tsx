"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

type AddToCartButtonProps = {
  productId: string;
  className?: string;
};

export function AddToCartButton({ productId, className }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [label, setLabel] = useState("Add");

  return (
    <button
      className={className}
      onClick={() => {
        addItem(productId);
        setLabel("Added");
        window.setTimeout(() => setLabel("Add"), 1400);
      }}
      type="button"
    >
      {label}
    </button>
  );
}
