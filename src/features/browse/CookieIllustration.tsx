import Image from "next/image";
import type { CookieProduct } from "./catalog";

type CookieIllustrationProps = {
  product?: Pick<CookieProduct, "visualTone" | "shortName" | "imageSrc">;
  size?: "sm" | "md" | "lg";
};

const toneClasses = {
  brown: {
    plate: "from-[#f6ead8] via-[#ead3b1] to-[#d4aa73]",
    cookie: "from-[#e2b978] via-[#c98545] to-[#8d4f2f]",
    chip: "bg-[#3b2118]",
    accent: "bg-[#f4d8a4]",
  },
  dark: {
    plate: "from-[#2a1710] via-[#55311f] to-[#8a5637]",
    cookie: "from-[#5a2f21] via-[#351a13] to-[#160b08]",
    chip: "bg-[#d8a873]",
    accent: "bg-[#2d1710]",
  },
  pistachio: {
    plate: "from-[#eef0da] via-[#d9ddb5] to-[#b5bd7f]",
    cookie: "from-[#c8c78d] via-[#9ba76d] to-[#6c784a]",
    chip: "bg-[#fff2d4]",
    accent: "bg-[#7b8d56]",
  },
};

const sizeClasses = {
  sm: "h-20 w-20",
  md: "h-32 w-32",
  lg: "h-64 w-64",
};

export function CookieIllustration({
  product,
  size = "md",
}: CookieIllustrationProps) {
  const tone = toneClasses[product?.visualTone ?? "brown"];

  if (product?.imageSrc) {
    return (
      <div className="relative h-full w-full">
        <Image
          alt={`${product.shortName} cookies`}
          className="object-cover"
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
          src={product.imageSrc}
        />
      </div>
    );
  }

  return (
    <div
      aria-label={product ? `${product.shortName} cookie illustration` : "cookie illustration"}
      className={`relative grid ${sizeClasses[size]} place-items-center rounded-full bg-gradient-to-br ${tone.plate} shadow-inner`}
      role="img"
    >
      <div
        className={`relative h-[78%] w-[78%] rounded-full border border-[#8a6a3f]/25 bg-gradient-to-br ${tone.cookie} shadow-[inset_-18px_-20px_35px_rgba(36,25,20,0.18),0_18px_45px_rgba(36,25,20,0.12)]`}
      >
        <span className={`absolute left-[28%] top-[26%] h-[9%] w-[9%] rounded-full ${tone.chip}`} />
        <span className={`absolute right-[24%] top-[34%] h-[7%] w-[7%] rounded-full ${tone.chip}`} />
        <span className={`absolute bottom-[28%] left-[42%] h-[8%] w-[8%] rounded-full ${tone.chip}`} />
        <span className={`absolute bottom-[20%] right-[28%] h-[10%] w-[10%] rounded-full ${tone.accent}`} />
      </div>
    </div>
  );
}
