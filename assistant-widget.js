const widget = document.createElement("div");
widget.className = "site-assistant";
widget.innerHTML = `
  <button class="assistant-toggle" type="button" aria-expanded="false" aria-label="Open HVAC help">
    <span>Help</span>
  </button>
  <section class="assistant-panel" aria-label="HVAC help panel">
    <div class="assistant-head">
      <strong>Need HVAC help?</strong>
      <button type="button" aria-label="Close help">Close</button>
    </div>
    <p>Choose the fastest path. Emergency calls should go straight to dispatch.</p>
    <a class="assistant-emergency" href="tel:+17813811212">Emergency dispatch: (781) 381-1212</a>
    <div class="assistant-actions">
      <a href="index.html#advisor">Use ComfortFit AI</a>
      <a href="index.html#book">Request service</a>
      <a href="blog.html">Read HVAC guides</a>
      <a href="index.html#office">Find the office</a>
    </div>
  </section>
`;

document.body.appendChild(widget);

const toggle = widget.querySelector(".assistant-toggle");
const close = widget.querySelector(".assistant-head button");
const panelLinks = widget.querySelectorAll(".assistant-panel a");

function setAssistant(open) {
  widget.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
}

toggle.addEventListener("click", () => {
  setAssistant(!widget.classList.contains("is-open"));
});

close.addEventListener("click", () => setAssistant(false));
panelLinks.forEach((link) => link.addEventListener("click", () => setAssistant(false)));
