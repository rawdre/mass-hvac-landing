const library = document.querySelector("[data-blog-library]");
const topics = window.VENTIC_TOPICS;
const FEATURED_SLUG = "mass-save-heat-pump-rebates-2026";

function articleHref(article) {
  return article.path || `article.html?slug=${encodeURIComponent(article.slug)}`;
}

function cardMarkup(article, index, isFeatured) {
  const topic = topics.topicFor(article.category);
  const image = topics.imageFor(article, window.HVAC_ARTICLES);
  return `
    <article id="${article.slug}" class="blog-card${isFeatured ? " is-featured" : ""}" data-topic="${topic.id}">
      <a class="blog-card-media" href="${articleHref(article)}" tabindex="-1" aria-hidden="true">
        <img src="assets/v2/${image}.webp" alt="" width="1200" height="900" loading="${index < 4 ? "eager" : "lazy"}" decoding="async">
      </a>
      <div class="blog-card-body">
        <span>${article.category}</span>
        <h2><a href="${articleHref(article)}">${article.title}</a></h2>
        <p>${article.excerpt || article.metaDescription}</p>
        <a class="text-link" href="${articleHref(article)}">Read article</a>
      </div>
    </article>
  `;
}

function filterMarkup(articles) {
  const counts = articles.reduce((acc, article) => {
    const id = topics.topicFor(article.category).id;
    return { ...acc, [id]: (acc[id] || 0) + 1 };
  }, {});
  const chips = topics.list
    .filter((topic) => counts[topic.id])
    .map((topic) => `<button type="button" data-filter="${topic.id}" aria-pressed="false">${topic.label} <small>${counts[topic.id]}</small></button>`)
    .join("");
  return `<div class="blog-filters" role="group" aria-label="Filter articles by topic">
      <button type="button" data-filter="all" aria-pressed="true">All guides <small>${articles.length}</small></button>${chips}
    </div>`;
}

function bindFilters(root) {
  const buttons = [...root.querySelectorAll("[data-filter]")];
  const cards = [...root.querySelectorAll(".blog-card")];
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      buttons.forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
      root.classList.toggle("is-filtered", filter !== "all");
      cards.forEach((card) => {
        card.hidden = filter !== "all" && card.dataset.topic !== filter;
      });
    });
  });
}

function renderPlain(articles) {
  library.innerHTML = articles.map((article) => `
    <article id="${article.slug}">
      <span>${article.category}</span>
      <h2>${article.title}</h2>
      <p>${article.excerpt || article.metaDescription}</p>
      <a class="text-link" href="${articleHref(article)}">Read article</a>
    </article>
  `).join("");
}

if (library && Array.isArray(window.HVAC_ARTICLES)) {
  const articles = window.HVAC_ARTICLES;
  if (!topics) {
    renderPlain(articles);
  } else {
    const featured = articles.find((a) => a.slug === FEATURED_SLUG) || articles[0];
    const rest = articles.filter((a) => a !== featured);
    library.innerHTML = `
      ${filterMarkup(articles)}
      <div class="blog-grid">
        ${cardMarkup(featured, 0, true)}
        ${rest.map((article, i) => cardMarkup(article, i + 1, false)).join("")}
      </div>
    `;
    bindFilters(library);
    if (window.location.hash) {
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
    }
  }
}
