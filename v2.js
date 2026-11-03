/* Ventic v2 homepage enhancements: hero video, header state, scroll reveal.
   Progressive: the page is complete without this file. */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = Boolean(navigator.connection && navigator.connection.saveData);

  function startHeroVideo() {
    const video = document.querySelector("[data-hero-video]");
    if (!video || reduceMotion || saveData) return;
    video.preload = "auto";
    video.addEventListener("playing", () => video.classList.add("is-playing"), { once: true });
    const attempt = video.play();
    if (attempt && typeof attempt.catch === "function") {
      attempt.catch(() => video.classList.remove("is-playing"));
    }
  }

  function trackHeaderState() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    const update = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function revealOnScroll() {
    const targets = document.querySelectorAll(
      ".v2 .section-heading, .v2 .service-grid article, .v2 .split-section > *, .v2 .system-grid article, .v2 .fleet-inner > *, .v2 .plan-row span, .v2 .booking > *, .v2 .office-section > *, .v2 .blog-preview-grid a"
    );
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    targets.forEach((node, index) => {
      node.classList.add("reveal");
      node.style.setProperty("--reveal-delay", `${(index % 4) * 70}ms`);
      observer.observe(node);
    });
  }

  startHeroVideo();
  trackHeaderState();
  revealOnScroll();
})();
