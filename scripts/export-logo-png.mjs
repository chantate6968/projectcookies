import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const brandDir = path.join(__dirname, "..", "public", "brand");
const svgPath = path.join(brandDir, "lamsumsum-logo.svg");

const exports = [
  { name: "lamsumsum-logo.png", width: 800 },
  { name: "lamsumsum-logo@2x.png", width: 1600 },
];

await mkdir(brandDir, { recursive: true });

const svgBuffer = await sharp(svgPath).png().toBuffer();

for (const item of exports) {
  const outputPath = path.join(brandDir, item.name);
  await sharp(svgBuffer).resize({ width: item.width }).png().toFile(outputPath);
  console.log(`Wrote ${outputPath}`);
}

const manifest = {
  files: [
    "/brand/lamsumsum-logo.svg",
    "/brand/lamsumsum-logo.png",
    "/brand/lamsumsum-logo@2x.png",
  ],
  canvaImport:
    "Upload lamsumsum-logo.png or lamsumsum-logo.svg into Canva via Uploads, then edit on your logo design.",
};

await writeFile(
  path.join(brandDir, "README.txt"),
  [
    "Lamsumsum logo exports",
    "",
    "Use these files in Canva:",
    "- lamsumsum-logo.png (800px wide, recommended)",
    "- lamsumsum-logo@2x.png (1600px wide, high resolution)",
    "- lamsumsum-logo.svg (vector, if Canva accepts SVG upload)",
    "",
    "Canva steps:",
    "1. Open https://www.canva.com/create/logos/",
    "2. Click Uploads",
    "3. Upload lamsumsum-logo.png",
    "4. Drag it onto your design canvas",
    "",
  ].join("\n"),
  "utf8",
);

console.log(JSON.stringify(manifest, null, 2));
