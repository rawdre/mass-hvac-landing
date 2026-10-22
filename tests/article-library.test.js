const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const source = fs.readFileSync(path.join(root, "articles-data.js"), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(source, sandbox, { filename: "articles-data.js" });

const expectedArticles = [
  {
    slug: "heat-pump-not-heating",
    phrase: "Heat Pump Not Heating",
    route: "blog/heat-pump-not-heating/index.html",
  },
  {
    slug: "furnace-running-house-still-cold",
    phrase: "Furnace Running but My House Is Still Cold",
    route: "blog/furnace-running-house-still-cold/index.html",
  },
  {
    slug: "heat-pump-defrost-mode",
    phrase: "Heat Pump Defrost Mode",
    route: "blog/heat-pump-defrost-mode/index.html",
  },
  {
    slug: "heating-system-short-cycling",
    phrase: "Heating System Short Cycling",
    route: "blog/heating-system-short-cycling/index.html",
  },
  {
    slug: "uneven-heating-cold-rooms",
    phrase: "Uneven Heating",
    route: "blog/uneven-heating-cold-rooms/index.html",
  },
  {
    slug: "thermostat-not-working",
    phrase: "Thermostat Is Not Working",
    route: "blog/thermostat-not-working/index.html",
  },
  {
    slug: "how-often-change-hvac-filter",
    phrase: "How Often Should You Change Your HVAC Filter",
    route: "blog/how-often-change-hvac-filter/index.html",
  },
  {
    slug: "mass-save-heat-pump-rebates-2026",
    phrase: "2026 Mass Save Heat Pump Rebates",
    route: "blog/mass-save-heat-pump-rebates-2026/index.html",
  },
  {
    slug: "massachusetts-heating-safety-checklist",
    phrase: "Heating Safety Checklist",
    route: "blog/massachusetts-heating-safety-checklist/index.html",
  },
  {
    slug: "hvac-loud-noises",
    phrase: "HVAC System Making a Loud Noise",
    route: "blog/hvac-loud-noises/index.html",
  },
];

for (const expected of expectedArticles) {
  const article = sandbox.window.HVAC_ARTICLES.find((item) => item.slug === expected.slug);

  assert.ok(article, `Missing article record: ${expected.slug}`);
  assert.match(article.title, new RegExp(expected.phrase, "i"));
  assert.ok(article.metaTitle, `${expected.slug} needs a title tag`);
  assert.ok(article.metaDescription, `${expected.slug} needs a meta description`);
  assert.equal(article.path, `${expected.route.replace("index.html", "")}`);
  assert.equal(article.ctaLink, "https://ventic.34-41-157-23.nip.io/request?source=Website");
  assert.match(article.html, /<h1>/);
  assert.match(article.html, /<h2>/);
  assert.ok(fs.existsSync(path.join(root, expected.route)), `Missing article route: ${expected.route}`);
}

console.log(`Validated ${expectedArticles.length} planned article records and routes.`);
