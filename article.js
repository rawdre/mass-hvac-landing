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
