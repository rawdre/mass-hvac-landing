/* Ventic v2 — maps article categories to a topic (filter chip) and photography.
   Shared by blog.js (library) and article.js (article banner). */
(function () {
  "use strict";

  const TOPICS = [
    { id: "heat-pumps", label: "Heat Pumps", images: ["svc-heat-pump", "heatpump-snow"],
      categories: ["Heat Pumps", "Heat Pump Repair", "Ductwork"] },
    { id: "mini-splits", label: "Mini-Splits", images: ["svc-mini-split", "topic-attic-bedroom"],
      categories: ["Mini-Splits"] },
    { id: "heating", label: "Heating", images: ["svc-heating", "topic-cold-room", "topic-safety"],
      categories: ["Heating", "Heating Repair", "Heating Safety"] },
    { id: "cooling", label: "Cooling", images: ["svc-ac-repair", "topic-summer"],
      categories: ["AC Repair", "Heating & Cooling"] },
    { id: "maintenance", label: "Maintenance", images: ["svc-maintenance", "topic-thermostat", "svc-emergency"],
      categories: ["Maintenance", "HVAC Maintenance", "HVAC Repair", "Repair Planning", "Controls"] },
    { id: "rebates", label: "Rebates & Costs", images: ["topic-rebates", "home-comfort"],
      categories: ["Rebates", "Mass Save & Rebates", "Energy Bills", "Estimates", "Permits", "Fitchburg"] },
    { id: "faq", label: "FAQ", images: ["tech-door"],
      categories: ["FAQ"] }
  ];

  const FALLBACK = { id: "other", label: "HVAC Guides", images: ["home-comfort"], categories: [] };

  /** Image overrides for articles whose title points at a specific scene. */
  const SLUG_IMAGES = {
    "thermostat-not-working": "topic-thermostat",
    "massachusetts-heating-safety-checklist": "topic-safety",
    "uneven-heating-cold-rooms": "topic-cold-room",
    "ductwork-inspection-before-heat-pump": "topic-ductwork",
    "heat-pump-defrost-mode": "heatpump-snow",
    "how-often-change-hvac-filter": "svc-maintenance",
    "mass-save-heat-pump-rebates-2026": "topic-rebates",
    "hvac-loud-noises": "svc-heating"
  };

  /**
   * @param {string} category
   * @returns {{id: string, label: string, images: string[], categories: string[]}}
   */
  function topicFor(category) {
    return TOPICS.find((topic) => topic.categories.includes(category)) || FALLBACK;
  }

  /**
   * Picks a stable image for an article: slug override first, then rotate through its
   * topic's images by the article's position among same-topic articles, so the blog card
   * and the article banner always match and neighbours in a topic differ.
   * @param {{slug: string, category: string}} article
   * @param {Array<{slug: string, category: string}>} articles full library, in order
   * @returns {string} image basename in assets/v2 (no extension)
   */
  function imageFor(article, articles) {
    if (SLUG_IMAGES[article.slug]) return SLUG_IMAGES[article.slug];
    const topic = topicFor(article.category);
    const siblings = articles.filter((item) => !SLUG_IMAGES[item.slug] && topicFor(item.category).id === topic.id);
    const position = Math.max(siblings.indexOf(article), 0);
    return topic.images[position % topic.images.length];
  }

  window.VENTIC_TOPICS = Object.freeze({ list: TOPICS, topicFor, imageFor });
})();
