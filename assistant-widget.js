const widget = document.createElement("div");
widget.className = "site-assistant";
const assistantCopy = {
  en: {
    help: "Help",
    title: "Comfort Navigator",
    close: "Close",
    intro: "Tell us what you need and jump to the right place fast.",
    emergency: "Emergency dispatch: (781) 381-1212",
    advisor: "Find my system",
    rebates: "Mass Save help",
    heatPump: "Heat pump estimate",
    service: "Request service",
    guides: "HVAC guides",
    office: "Office map",
    warning: "For gas smell, smoke, CO alarm, or electrical fire, leave the home and call 911 or the utility emergency line first."
  },
  es: {
    help: "Ayuda",
    title: "Navegador de Confort",
    close: "Cerrar",
    intro: "Dinos que necesitas y ve rapido al lugar correcto.",
    emergency: "Emergencia: (781) 381-1212",
    advisor: "Encontrar mi sistema",
    rebates: "Ayuda Mass Save",
    heatPump: "Cotizar heat pump",
    service: "Pedir servicio",
    guides: "Guias HVAC",
    office: "Mapa/oficina",
    warning: "Si hueles gas, hay humo, alarma de CO o fuego electrico, sal de la casa y llama 911 o a la emergencia de tu utility primero."
  },
  pt: {
    help: "Ajuda",
    title: "Navegador de Conforto",
    close: "Fechar",
    intro: "Diga o que precisa e va direto para a area certa.",
    emergency: "Emergencia: (781) 381-1212",
    advisor: "Encontrar meu sistema",
    rebates: "Ajuda Mass Save",
    heatPump: "Cotacao heat pump",
    service: "Pedir servico",
    guides: "Guias HVAC",
    office: "Mapa/escritorio",
    warning: "Se sentir cheiro de gas, fumaca, alarme de CO ou fogo eletrico, saia da casa e ligue 911 ou a emergencia da utility primeiro."
  }
};

widget.innerHTML = `
  <button class="assistant-toggle" type="button" aria-expanded="false" aria-label="Open HVAC help">
    <span data-assistant-copy="help">Help</span>
  </button>
  <section class="assistant-panel" aria-label="HVAC help panel">
    <div class="assistant-head">
      <strong data-assistant-copy="title">Comfort Navigator</strong>
      <button type="button" aria-label="Close help" data-assistant-copy="close">Close</button>
    </div>
    <p data-assistant-copy="intro">Tell us what you need and jump to the right place fast.</p>
    <a class="assistant-emergency" href="tel:+17813811212" data-assistant-copy="emergency">Emergency dispatch: (781) 381-1212</a>
    <div class="assistant-actions">
      <button type="button" data-assistant-advisor data-assistant-copy="advisor">Find my system</button>
      <a href="index.html#rebates" data-assistant-copy="rebates">Mass Save help</a>
      <a href="index.html#heat-pumps" data-assistant-copy="heatPump">Heat pump estimate</a>
      <a href="index.html#book" data-assistant-copy="service">Request service</a>
      <a href="blog.html" data-assistant-copy="guides">HVAC guides</a>
      <a href="index.html#office" data-assistant-copy="office">Office map</a>
    </div>
    <small data-assistant-copy="warning">For gas smell, smoke, CO alarm, or electrical fire, leave the home and call 911 or the utility emergency line first.</small>
  </section>
`;

document.body.appendChild(widget);

const toggle = widget.querySelector(".assistant-toggle");
const close = widget.querySelector(".assistant-head button");
const panelLinks = widget.querySelectorAll(".assistant-panel a");
const advisorButton = widget.querySelector("[data-assistant-advisor]");

function setAssistant(open) {
  widget.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
}

function applyAssistantLanguage(language) {
  const copy = assistantCopy[language] || assistantCopy.en;
  widget.querySelectorAll("[data-assistant-copy]").forEach((node) => {
    const key = node.getAttribute("data-assistant-copy");
    if (copy[key]) node.textContent = copy[key];
  });
}

toggle.addEventListener("click", () => {
  setAssistant(!widget.classList.contains("is-open"));
});

close.addEventListener("click", () => setAssistant(false));
panelLinks.forEach((link) => link.addEventListener("click", () => setAssistant(false)));
advisorButton.addEventListener("click", () => {
  setAssistant(false);
  const advisorTrigger = document.querySelector("[data-open-advisor]");
  if (advisorTrigger) {
    advisorTrigger.click();
  } else {
    window.location.href = "index.html#advisor";
  }
});

applyAssistantLanguage(localStorage.getItem("baystate-language") || "en");
document.addEventListener("baystate:language", (event) => {
  applyAssistantLanguage(event.detail.language);
});
