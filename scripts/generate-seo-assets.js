const axios = require("axios");
const fs = require("fs");
const path = require("path");

const siteUrl = "https://asurabot.com.br";
const root = path.resolve(__dirname, "..");
function roosterSlug(name, index) {
  const base = String(name || "galo")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${base || "galo"}-${index}`;
}

function sitemapEntry(route, priority, changefreq) {
  return [
    "  <url>",
    `    <loc>${siteUrl}${route}</loc>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ].join("\n");
}

async function main() {
  const response = await axios.get(
    "https://info.asurabot.com.br/class.json?language=pt",
    { timeout: 20000 },
  );
  const classes = Array.isArray(response.data) ? response.data : [];
  const offset = classes[0] && /404/i.test(classes[0].name || "") ? 1 : 0;
  const roosters = classes
    .slice(offset)
    .filter((rooster) => rooster && rooster.name && rooster.rarity !== -1)
    .map((rooster, position) => ({
      index: position,
      name: rooster.name,
      slug: roosterSlug(rooster.name, position),
    }));

  if (roosters.length === 0) {
    throw new Error("The live rooster catalog was empty; sitemap was not generated.");
  }

  fs.writeFileSync(
    path.join(root, "src", "generated", "roosters.json"),
    `${JSON.stringify({ roosters }, null, 2)}\n`,
  );

  const staticEntries = [
    sitemapEntry("/", "1.0", "weekly"),
    sitemapEntry("/galos", "0.8", "weekly"),
    sitemapEntry("/info", "0.6", "monthly"),
    sitemapEntry("/backgrounds", "0.5", "monthly"),
    sitemapEntry("/pets", "0.5", "monthly"),
    sitemapEntry("/extras", "0.5", "monthly"),
    sitemapEntry("/donate", "0.5", "monthly"),
  ];
  const roosterEntries = roosters.map((rooster) =>
    sitemapEntry(`/galos/${rooster.slug}`, "0.6", "weekly"),
  );
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...staticEntries,
    ...roosterEntries,
    "</urlset>",
    "",
  ].join("\n");
  fs.writeFileSync(path.join(root, "public", "sitemap.xml"), sitemap);
  console.log(`Generated ${roosters.length} canonical rooster routes.`);
}

main().catch((error) => {
  console.error(`Unable to generate SEO assets: ${error.message}`);
  process.exitCode = 1;
});
