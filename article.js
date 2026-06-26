const params = new URLSearchParams(window.location.search);
const slug = params.get("slug") || "";
const article = Array.isArray(window.HVAC_ARTICLES)
  ? window.HVAC_ARTICLES.find((item) => item.slug === slug)
  : null;
const reader = document.querySelector("[data-article-reader]");

if (reader && article) {
  document.title = `${article.metaTitle || article.title} | Ventic HVAC`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta && article.metaDescription) meta.setAttribute("content", article.metaDescription);
  const articleUrl = `https://ventichvac.com/article.html?slug=${encodeURIComponent(article.slug)}`;
  document.getElementById("canonicalLink")?.setAttribute("href", articleUrl);
  document.getElementById("ogUrl")?.setAttribute("content", articleUrl);
  document.getElementById("ogTitle")?.setAttribute("content", `${article.metaTitle || article.title} | Ventic HVAC`);
  reader.innerHTML = `
    <span class="result-label">${article.category}</span>
    ${article.html}
    <div class="article-bottom-cta">
      <h2>Want this applied to your home?</h2>
      <p>Send the home details through ComfortFit AI and our team can turn it into a cleaner estimate conversation.</p>
      <a class="button primary" href="index.html#advisor">Start ComfortFit AI</a>
    </div>
  `;
} else if (reader) {
  reader.innerHTML = `
    <span class="result-label">Not found</span>
    <h1>Article not found</h1>
    <p>This article slug is not in the current HVAC library.</p>
    <a class="button secondary" href="blog.html">Back to blog library</a>
  `;
}
