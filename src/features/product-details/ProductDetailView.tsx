import type { CookieProduct } from "@/features/browse/catalog";
import { CookieIllustration } from "@/features/browse/CookieIllustration";
import { AddToCartButton } from "@/features/cart/AddToCartButton";

type ProductDetailViewProps = {
  product: CookieProduct;
};

export function ProductDetailView({ product }: ProductDetailViewProps) {
  return (
    <section className="page-content grid gap-10 lg:grid-cols-2 lg:gap-14">
      <div className="relative aspect-square overflow-hidden bg-[#f3ebe3]">
        <CookieIllustration product={product} />
        {product.imageCredit ? (
          <p className="absolute bottom-3 left-3 right-3 text-xs text-[#8a6a3f]">
            {product.imageCredit}
          </p>
        ) : null}
      </div>

      <div>
        <p className="text-sm text-[#6d5a4c]">{product.note}</p>
        <h1 className="brand-display mt-2 text-4xl leading-tight md:text-5xl">
          {product.name}
        </h1>
        <p className="mt-4 text-2xl font-medium">{product.price}</p>
        <p className="mt-5 max-w-xl leading-7 text-[#6d5a4c]">
          {product.description}
        </p>

        <div className="mt-8 max-w-sm">
          <AddToCartButton className="detail-add" productId={product.id} />
        </div>

        <div className="mt-10 grid gap-4 text-sm leading-7 text-[#6d5a4c]">
          <DetailRow label="Ingredients" value={product.ingredients.join(", ")} />
          <DetailRow label="Allergens" value={product.allergens.join(", ")} />
          <DetailRow label="Storage" value={product.storage} />
          <DetailRow
            label="Delivery"
            value={`${product.delivery} ${product.gifting}`}
          />
        </div>
      </div>
    </section>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-[#e8ddd2] pt-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5d3a3a]">
        {label}
      </p>
      <p className="mt-2">{value}</p>
    </div>
  );
}
