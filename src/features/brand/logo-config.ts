export const customLogoPath: string | null = null;

export const customLogoAlt = "Lamsumsum cookies";

export const logoPreviewStorageKey = "lamsumsum-logo-preview";

export const logoExportFiles = {
  png: "/brand/lamsumsum-logo.png",
  png2x: "/brand/lamsumsum-logo@2x.png",
  svg: "/brand/lamsumsum-logo.svg",
} as const;

export const canvaLinks = {
  createLogo: "https://www.canva.com/create/logos/",
  bakeryTemplates: "https://www.canva.com/templates/search/bakery-logo/",
  cookieTemplates: "https://www.canva.com/templates/search/cookie-logo/",
} as const;

export const logoDesignBrief = {
  brandName: "Lamsumsum cookies",
  tagline: "Hong Kong online cookie bakery",
  colors: [
    { name: "Logo plate brown", hex: "#8f5738" },
    { name: "Logo cream", hex: "#f4ead8" },
    { name: "Shop text", hex: "#5d3a3a" },
    { name: "Background", hex: "#fff8f4" },
  ],
  exportTips: [
    "Use a transparent PNG or SVG.",
    "Export around 800px wide for the header.",
    "Keep the wordmark readable at small sizes.",
    "Leave a little padding around the artwork.",
  ],
} as const;
