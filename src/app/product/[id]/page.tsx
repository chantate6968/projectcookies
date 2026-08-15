import type { Metadata } from "next";
import Link from "next/link";
import { featuredCookies, getProductById } from "@/features/browse/catalog";
import { ShopPageShell } from "@/features/marketing/MarketingSections";
import { ProductDetailView } from "@/features/product-details/ProductDetailView";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return featuredCookies.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: "Cookie unavailable | lamsumsum cookies",
    };
  }

  return {
    title: `${product.name} | lamsumsum cookies`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return (
      <ShopPageShell>
        <section className="page-content max-w-2xl">
          <h1 className="text-4xl font-semibold">Product unavailable</h1>
          <p className="mt-4 leading-7 text-[#6d5a4c]">
            This cookie is not in the current collection.
          </p>
          <Link className="product-card-add mt-8 inline-block text-center" href="/#shop">
            Back to shop
          </Link>
        </section>
      </ShopPageShell>
    );
  }

  return (
    <ShopPageShell>
      <ProductDetailView product={product} />
    </ShopPageShell>
  );
}
