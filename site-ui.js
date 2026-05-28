const translations = {
  en: {
    urgencyTitle: "No Heat or AC?",
    urgencyText: "Same-day repair windows may be available today.",
    urgencyCall: "Call (781) 381-1212",
    navServices: "Services",
    navRebates: "Rebates",
    navBlog: "Blog",
    navContact: "Contact",
    bookService: "Book Service",
    heroTitle: "Residential HVAC & Heat Pump Installation in Massachusetts",
    heroText: "Cleaner comfort for Massachusetts homes. Heat pumps, mini-splits, AC repair, heating repair, emergency calls, maintenance plans, and Mass Save rebate guidance.",
    freeDirection: "Get My Free HVAC Direction",
    heatPumpEstimate: "Get Heat Pump Estimate",
    trustEpa: "EPA 608 Ready",
    trustLicensed: "Licensed & Insured Verification",
    trustEstimates: "Written Estimates",
    trustMassSave: "Mass Save Guidance",
    emergencyTitle: "No heat, no AC, or an urgent system issue?",
    emergencyText: "Tell us what changed and whether the system is still running. We will triage the problem and offer the earliest available repair window.",
    emergencyCta: "Request Emergency Help",
    advisorTitle: "Know your likely HVAC path before the sales visit.",
    advisorText: "ComfortFit AI gives homeowners a clean pre-check: likely system direction, rough size range, rebate path, and budget tier.",
    advisorBadge: "Free pre-design",
    advisorCardTitle: "One question at a time. No long form on the page.",
    advisorDisclaimer: "Final equipment sizing is verified by a qualified HVAC professional using Manual J, field measurements, and permit/licensing requirements before installation.",
    modalTitle: "Get your HVAC direction",
    close: "Close",
    stepGoal: "What are you trying to solve?",
    stepHome: "Where is the home and how large is it?",
    stepSystem: "What system do you have now?",
    stepComfort: "What comfort problems should we know about?",
    back: "Back",
    next: "Next",
    getDirection: "Get My HVAC Direction"
  },
  es: {
    urgencyTitle: "Sin calefaccion o AC?",
    urgencyText: "Podemos tener ventanas de reparacion para hoy.",
    urgencyCall: "Llama (781) 381-1212",
    navServices: "Servicios",
    navRebates: "Incentivos",
    navBlog: "Blog",
    navContact: "Contacto",
    bookService: "Agendar Servicio",
    heroTitle: "HVAC residencial e instalacion de heat pumps en Massachusetts",
    heroText: "Confort mas limpio para casas en Massachusetts. Heat pumps, mini-splits, reparacion de AC, calefaccion, emergencias, mantenimiento y ayuda con Mass Save.",
    freeDirection: "Recibir mi guia HVAC gratis",
    heatPumpEstimate: "Cotizar Heat Pump",
    trustEpa: "EPA 608 preparado",
    trustLicensed: "Verificacion de licencia y seguro",
    trustEstimates: "Estimados por escrito",
    trustMassSave: "Ayuda con Mass Save",
    emergencyTitle: "Sin calor, sin AC o con una emergencia?",
    emergencyText: "Dinos que cambio y si el sistema sigue funcionando. Revisamos la urgencia y buscamos la primera ventana disponible.",
    emergencyCta: "Pedir ayuda urgente",
    advisorTitle: "Conoce tu mejor camino HVAC antes de la visita.",
    advisorText: "ComfortFit AI te da una pre-revision limpia: tipo de sistema probable, rango de tamano, incentivos y presupuesto.",
    advisorBadge: "Pre-diseno gratis",
    advisorCardTitle: "Una pregunta por vez. Sin formulario largo en la pagina.",
    advisorDisclaimer: "El tamano final del equipo se verifica por un profesional HVAC con Manual J, medidas en sitio y requisitos de permisos/licencias.",
    modalTitle: "Recibe tu guia HVAC",
    close: "Cerrar",
    stepGoal: "Que quieres resolver?",
    stepHome: "Donde esta la casa y que tamano tiene?",
    stepSystem: "Que sistema tienes ahora?",
    stepComfort: "Que problemas de confort debemos saber?",
    back: "Atras",
    next: "Siguiente",
    getDirection: "Recibir guia HVAC"
  },
  pt: {
    urgencyTitle: "Sem aquecimento ou AC?",
    urgencyText: "Podemos ter janelas de reparo para hoje.",
    urgencyCall: "Ligue (781) 381-1212",
    navServices: "Servicos",
    navRebates: "Incentivos",
    navBlog: "Blog",
    navContact: "Contato",
    bookService: "Agendar Servico",
    heroTitle: "HVAC residencial e instalacao de heat pumps em Massachusetts",
    heroText: "Conforto mais limpo para casas em Massachusetts. Heat pumps, mini-splits, reparo de AC, aquecimento, emergencias, manutencao e ajuda com Mass Save.",
    freeDirection: "Receber minha direcao HVAC gratis",
    heatPumpEstimate: "Cotacao de Heat Pump",
    trustEpa: "EPA 608 preparado",
    trustLicensed: "Verificacao de licenca e seguro",
    trustEstimates: "Orcamentos por escrito",
    trustMassSave: "Ajuda com Mass Save",
    emergencyTitle: "Sem calor, sem AC ou com problema urgente?",
    emergencyText: "Conte o que mudou e se o sistema ainda funciona. Fazemos a triagem e buscamos a primeira janela disponivel.",
    emergencyCta: "Pedir ajuda urgente",
    advisorTitle: "Entenda seu melhor caminho HVAC antes da visita.",
    advisorText: "ComfortFit AI entrega uma pre-analise limpa: sistema provavel, faixa de tamanho, incentivos e faixa de orcamento.",
    advisorBadge: "Pre-design gratis",
    advisorCardTitle: "Uma pergunta por vez. Sem formulario gigante na pagina.",
    advisorDisclaimer: "O tamanho final do equipamento e verificado por um profissional HVAC usando Manual J, medidas no local e requisitos de permissoes/licencas.",
    modalTitle: "Receba sua direcao HVAC",
    close: "Fechar",
    stepGoal: "O que voce quer resolver?",
    stepHome: "Onde fica a casa e qual o tamanho?",
    stepSystem: "Qual sistema voce tem hoje?",
    stepComfort: "Quais problemas de conforto devemos saber?",
    back: "Voltar",
    next: "Proximo",
    getDirection: "Receber direcao HVAC"
  }
};

function getLanguage() {
  return localStorage.getItem("baystate-language") || "en";
}

function applyLanguage(language) {
  const dictionary = translations[language] || translations.en;
  document.documentElement.lang = language === "pt" ? "pt-BR" : language === "es" ? "es-MX" : "en-US";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (dictionary[key]) node.textContent = dictionary[key];
  });
  localStorage.setItem("baystate-language", language);
  document.dispatchEvent(new CustomEvent("baystate:language", { detail: { language } }));
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("baystate-theme", theme);
}

function injectHeaderControls() {
  const header = document.querySelector(".site-header");
  const hamburger = document.querySelector(".hamburger");
  if (!header || document.querySelector(".site-controls")) return;

  const controls = document.createElement("div");
  controls.className = "site-controls";
  controls.innerHTML = `
    <div class="language-toggle" aria-label="Language selector">
      <button type="button" data-lang="en" aria-label="English">🇺🇸</button>
      <button type="button" data-lang="es" aria-label="Spanish">🇲🇽</button>
      <button type="button" data-lang="pt" aria-label="Portuguese">🇧🇷</button>
    </div>
    <button class="theme-toggle" type="button" aria-label="Toggle dark or light mode">Light</button>
  `;
  header.insertBefore(controls, hamburger);

  controls.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => {
      applyLanguage(button.dataset.lang);
      setActiveLanguage();
    });
  });

  controls.querySelector(".theme-toggle").addEventListener("click", (event) => {
    const current = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(current);
    event.currentTarget.textContent = current === "dark" ? "Dark" : "Light";
  });
}

function setActiveLanguage() {
  const language = getLanguage();
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.lang === language);
  });
}

function injectPricingPopup() {
  if (document.querySelector(".pricing-popup")) return;
  const popup = document.createElement("aside");
  popup.className = "pricing-popup";
  popup.setAttribute("aria-live", "polite");
  popup.innerHTML = `
    <button class="pricing-close" type="button" aria-label="Close pricing popup">Close</button>
    <span>Pricing help</span>
    <strong>Want a real number before the visit?</strong>
    <p>Call us and we will narrow the likely repair or heat pump budget before we send a technician.</p>
    <div>
      <a class="button primary small" href="tel:+17813811212">Call for Pricing</a>
      <button class="button secondary small" type="button" data-open-advisor>Use ComfortFit AI</button>
    </div>
  `;
  document.body.appendChild(popup);
  const dismissed = sessionStorage.getItem("baystate-pricing-dismissed");
  if (!dismissed) {
    window.setTimeout(() => popup.classList.add("is-visible"), 1800);
  }
  popup.querySelector(".pricing-close").addEventListener("click", () => {
    popup.classList.remove("is-visible");
    sessionStorage.setItem("baystate-pricing-dismissed", "1");
  });
  popup.querySelector("[data-open-advisor]")?.addEventListener("click", () => {
    popup.classList.remove("is-visible");
    const advisorTrigger = document.querySelector(".hero [data-open-advisor], .advisor-card [data-open-advisor]");
    if (advisorTrigger) {
      advisorTrigger.click();
    } else {
      window.location.href = "index.html#advisor";
    }
  });
}

injectHeaderControls();
const savedTheme = localStorage.getItem("baystate-theme") || "light";
applyTheme(savedTheme);
const themeButton = document.querySelector(".theme-toggle");
if (themeButton) themeButton.textContent = savedTheme === "dark" ? "Dark" : "Light";
applyLanguage(getLanguage());
setActiveLanguage();
injectPricingPopup();
