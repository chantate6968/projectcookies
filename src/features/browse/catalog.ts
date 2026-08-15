export type CookieProduct = {
  id: string;
  name: string;
  shortName: string;
  detail: string;
  description: string;
  price: string;
  priceMinor: number;
  note: string;
  visualTone: "brown" | "dark" | "pistachio";
  imageSrc?: string;
  imageCredit?: string;
  pairing: string;
  ingredients: string[];
  allergens: string[];
  storage: string;
  delivery: string;
  gifting: string;
};

export const featuredCookies: CookieProduct[] = [
  {
    id: "lamsumsum-crunchies-basics",
    name: "Lamsumsum Crunchies basic",
    shortName: "Basic",
    detail: "Classic chunky cookies with golden edges and dark chocolate pieces.",
    description:
      "Our simple everyday cookie: soft, chunky, buttery, and baked with dark chocolate pieces.",
    price: "HK$28",
    priceMinor: 2800,
    note: "Box of 6",
    visualTone: "brown",
    imageSrc: "/products/lamsumsum-crunchies-basics.png",
    pairing: "Best with cold milk, coffee, or an easy afternoon break.",
    ingredients: ["Butter", "Dark chocolate", "Vanilla", "Brown sugar"],
    allergens: ["Wheat", "Milk", "Egg"],
    storage: "Best enjoyed within 3 days. Keep sealed at room temperature.",
    delivery: "Packed fresh for local delivery or pickup.",
    gifting: "A simple first box for friends, office sharing, and casual gifting.",
  },
  {
    id: "dark-chocolate",
    name: "Dark Chocolate",
    shortName: "Dark Chocolate",
    detail: "Rich cocoa cookie with dark chocolate pieces and a soft center.",
    description:
      "A deeper chocolate box for customers who like a bolder, less-sweet cookie with a soft bite.",
    price: "HK$32",
    priceMinor: 3200,
    note: "Box of 6",
    visualTone: "dark",
    imageSrc:
      "https://images.unsplash.com/photo-1557310717-d6bea9f36682?auto=format&fit=crop&w=1400&q=80",
    imageCredit: "Temporary stock photo from Unsplash.",
    pairing: "Best with espresso, iced milk, or an after-dinner dessert plate.",
    ingredients: ["Cocoa", "Dark chocolate", "Butter", "Brown sugar"],
    allergens: ["Wheat", "Milk", "Egg"],
    storage: "Best enjoyed within 3 days. Keep sealed at room temperature.",
    delivery: "Packed fresh for local delivery or pickup.",
    gifting: "A stronger flavour for chocolate lovers and small gift boxes.",
  },
  {
    id: "pistachio-nuts",
    name: "Pistachio Nuts",
    shortName: "Pistachio",
    detail: "Nutty cookie with pistachio pieces, butter, and a gentle roasted finish.",
    description:
      "A buttery pistachio cookie box for customers who want a nutty, less ordinary flavour.",
    price: "HK$36",
    priceMinor: 3600,
    note: "Box of 6",
    visualTone: "pistachio",
    imageSrc:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1400&q=80",
    imageCredit: "Temporary stock photo from Unsplash.",
    pairing: "Best with jasmine tea, flat white, or a quiet afternoon snack.",
    ingredients: ["Pistachio", "Butter", "Vanilla", "Brown sugar"],
    allergens: ["Wheat", "Milk", "Egg", "Tree nuts"],
    storage: "Best enjoyed within 3 days. Keep sealed at room temperature.",
    delivery: "Packed fresh for local delivery or pickup.",
    gifting: "A distinctive nutty flavour for gifting and sharing.",
  },
];

export function getProductById(id: string) {
  return featuredCookies.find((product) => product.id === id);
}
