const library = document.querySelector("[data-blog-library]");

if (library && Array.isArray(window.HVAC_ARTICLES)) {
  library.innerHTML = window.HVAC_ARTICLES.map((article) => `
    <article id="${article.slug}">
      <span>${article.category}</span>
      <h2>${article.title}</h2>
      <p>${article.excerpt || article.metaDescription}</p>
      <a class="text-link" href="article.html?slug=${encodeURIComponent(article.slug)}">Read article</a>
    </article>
  `).join("");
}
