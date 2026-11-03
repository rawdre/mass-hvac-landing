const WORDS_PER_MINUTE = 220;

/** Base URL of the site assets, derived from where article.js itself was loaded. */
function assetBase() {
  const script = document.querySelector('script[src*="article.js"]');
  return script ? new URL("assets/v2/", script.src).href : "assets/v2/";
}

/** v2 only: photo banner after the H1 plus an estimated read time. */
function decorateArticle(readerNode, item) {
  if (!document.body.classList.contains("v2") || !window.VENTIC_TOPICS) return;
  const heading = readerNode.querySelector("h1");
  if (!heading) return;
  const image = window.VENTIC_TOPICS.imageFor(item, window.HVAC_ARTICLES);
  const words = readerNode.textContent.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));

  const meta = document.createElement("p");
  meta.className = "article-meta";
  meta.textContent = `${minutes} min read · Ventic HVAC Learning Center`;

  const figure = document.createElement("figure");
  figure.className = "article-banner";
  const img = document.createElement("img");
  img.src = `${assetBase()}${image}.webp`;
  img.alt = "";
  img.width = 1200;
  img.height = 900;
  img.decoding = "async";
  figure.appendChild(img);

  heading.after(meta, figure);
}

const params = new URLSearchParams(window.location.search);
const routeSlug = document.body?.dataset.articleSlug || "";
const querySlug = params.get("slug") || "";
const slug = routeSlug || querySlug;
const article = Array.isArray(window.HVAC_ARTICLES)
  ? window.HVAC_ARTICLES.find((item) => item.slug === slug || (Array.isArray(item.aliases) && item.aliases.includes(slug)))
  : null;
const reader = document.querySelector("[data-article-reader]");
const ctaPanel = document.querySelector("[data-article-cta-panel]");
const canonicalUrl = document.body?.dataset.articleUrl || (article?.path ? `https://ventichvac.com/${article.path}` : article ? `https://ventichvac.com/article.html?slug=${encodeURIComponent(article.slug)}` : "https://ventichvac.com/blog.html");

if (reader && article) {
  document.title = article.metaTitle || `${article.title} | Ventic HVAC`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta && article.metaDescription) meta.setAttribute("content", article.metaDescription);
  document.getElementById("canonicalLink")?.setAttribute("href", canonicalUrl);
  document.getElementById("ogUrl")?.setAttribute("content", canonicalUrl);
  document.getElementById("ogTitle")?.setAttribute("content", article.metaTitle || `${article.title} | Ventic HVAC`);
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", article.metaDescription || "");
  document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", article.metaTitle || `${article.title} | Ventic HVAC`);
  document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", article.metaDescription || "");
  reader.innerHTML = `
    <span class="result-label">${article.category}</span>
    ${article.html}
  `;
  decorateArticle(reader, article);

  if (ctaPanel) {
    const ctaTitle = ctaPanel.querySelector("[data-article-cta-title]");
    const ctaText = ctaPanel.querySelector("[data-article-cta-text]");
    const ctaButton = ctaPanel.querySelector("[data-article-cta-button]");

    if (ctaTitle && article.ctaTitle) ctaTitle.textContent = article.ctaTitle;
    if (ctaText && article.ctaText) ctaText.textContent = article.ctaText;
    if (ctaButton) {
      if (article.ctaButtonText) ctaButton.textContent = article.ctaButtonText;
      if (article.ctaLink) ctaButton.setAttribute("href", article.ctaLink);
    }
  }
} else if (reader) {
  reader.innerHTML = `
    <span class="result-label">Not found</span>
    <h1>Article not found</h1>
    <p>This article slug is not in the current HVAC library.</p>
    <a class="button secondary" href="blog.html">Back to blog library</a>
  `;
}
