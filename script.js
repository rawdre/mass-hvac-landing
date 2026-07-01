const advisorRoot = document.querySelector("[data-advisor]");

function getField(form, name) {
  const field = form.elements[name];
  if (!field) return "";
  if (field instanceof RadioNodeList) {
    return field.value;
  }
  return field.value || "";
}

function moneyRange(low, high) {
  return `$${low.toLocaleString()}-$${high.toLocaleString()}`;
}

function analyzeHome(data) {
  const sqft = Math.max(Number(data.sqft) || 0, 400);
  const age = 2026 - (Number(data.yearBuilt) || 1980);
  const hasDucts = data.ductwork.includes("Yes");
  const noDucts = data.ductwork.includes("No");
  const partialDucts = data.ductwork.includes("Partial");
  const drafty = data.insulation.includes("Poor") || data.windows.includes("Older") || age > 80;
  const electrification = data.goal.includes("electrification") || data.goal.includes("Convert") || data.heatSource.includes("Oil") || data.heatSource.includes("Electric");
  const repair = data.goal.includes("Repair");
  const miniSplitGoal = data.goal.includes("mini-splits") || noDucts;

  const baseBtuPerSqft = drafty ? 34 : age > 45 ? 30 : 25;
  const roughBtu = Math.round((sqft * baseBtuPerSqft) / 6000) * 6000;
  const lowBtu = Math.max(12000, roughBtu - 6000);
  const highBtu = roughBtu + (sqft > 2500 ? 12000 : 6000);
  const zones = sqft > 2800 ? "4-6 zones" : sqft > 1800 ? "3-4 zones" : sqft > 1100 ? "2-3 zones" : "1-2 zones";

  let system = "Diagnostic visit first";
  let title = "Start with repair-first diagnostics.";
  let summary = "Your answers point to a service visit before replacement planning. A technician should verify airflow, electrical components, thermostat behavior, refrigerant performance, and whether repair still makes financial sense.";
  let budget = moneyRange(189, 950);
  let rebate = "Usually limited for repair";

  if (!repair && hasDucts && electrification) {
    system = "Ducted cold-climate heat pump";
    title = "A ducted cold-climate heat pump is the first path to price.";
    summary = "Because the home appears to have ducts and an electrification goal, the best first estimate path is a ducted cold-climate heat pump with Manual J sizing, duct inspection, electrical review, and rebate paperwork screening.";
    budget = sqft > 2600 ? moneyRange(22000, 42000) : moneyRange(16000, 30000);
    rebate = "Strong candidate if equipment and controls qualify";
  } else if (!repair && miniSplitGoal) {
    system = "Ductless mini-split heat pump";
    title = "A ductless mini-split plan is likely the cleanest first option.";
    summary = "Because the home has no ducts, partial ducts, or specific room comfort issues, the first estimate should map zones, indoor head locations, outdoor placement, electrical scope, and Mass Save eligibility.";
    budget = zones.includes("1-2") ? moneyRange(6500, 15000) : zones.includes("2-3") ? moneyRange(12000, 24000) : moneyRange(22000, 42000);
    rebate = "Likely worth screening before estimate";
  } else if (!repair && partialDucts) {
    system = "Hybrid ducted + ductless plan";
    title = "A hybrid heat pump plan may fit best.";
    summary = "Partial ductwork usually needs a mixed plan: use ducts where they are efficient, then solve additions, upstairs rooms, or finished spaces with mini-splits.";
    budget = moneyRange(18000, 38000);
    rebate = "Depends on whole-home vs partial-home design";
  } else if (!repair) {
    system = "Replacement system comparison";
    title = "Compare heat pump replacement against like-for-like replacement.";
    summary = "The next step is comparing a cold-climate heat pump path against a traditional replacement. The estimate should show operating comfort, rebate eligibility, financing, and long-term fuel impact.";
    budget = moneyRange(12000, 28000);
    rebate = "Possible if heat pump path qualifies";
  }

  const notes = [
    "Manual J load calculation and room-by-room assumptions",
    "Electrical panel capacity, disconnect location, and permit scope",
    "Outdoor unit location, snow clearance, drainage, and line-set route",
    "Duct condition, static pressure, or ductless head placement",
    "Mass Save qualified equipment, integrated controls, and paperwork path"
  ];

  if (drafty) {
    notes.push("Envelope issues: insulation, drafty windows, attic/basement conditions before final sizing");
  }

  return {
    title,
    system,
    summary,
    size: `${lowBtu.toLocaleString()}-${highBtu.toLocaleString()} BTU/hr pre-check`,
    budget,
    rebate,
    zones,
    notes
  };
}

function buildLeadSummary(data, result) {
  const fileCount = data.fileCount === 1 ? "1 file attached" : `${data.fileCount} files attached`;
  return [
    "ComfortFit AI inquiry",
    `Goal: ${data.goal}`,
    `Location: ${data.zip || "ZIP not provided"}`,
    `Home: ${data.sqft || "unknown"} sq ft, built ${data.yearBuilt || "unknown"}, ${data.floors} floors`,
    `Envelope: ${data.envelope}; insulation ${data.insulation}; windows ${data.windows}`,
    `Current system: heat ${data.heatSource}; cooling ${data.cooling}; ductwork ${data.ductwork}`,
    `Comfort rooms: ${data.rooms || "not specified"}`,
    `Utility bill: ${data.bill}`,
    `Uploads: ${data.fileCount ? fileCount : "none yet"}`,
    `AI direction: ${result.system}`,
    `Rough size range: ${result.size}`,
    `Budget range: ${result.budget}`,
    `Rebate path: ${result.rebate}`,
    "Verification needed: Manual J, field measurements, electrical/permit review, equipment eligibility."
  ].join("\n");
}

if (advisorRoot) {
  const form = advisorRoot.querySelector(".advisor-form");
  const modal = document.querySelector("[data-advisor-modal]");
  const openAdvisorButtons = document.querySelectorAll("[data-open-advisor]");
  const closeAdvisorButtons = document.querySelectorAll("[data-close-advisor]");
  const steps = Array.from(advisorRoot.querySelectorAll(".advisor-step"));
  const prevStep = advisorRoot.querySelector("[data-prev-step]");
  const nextStep = advisorRoot.querySelector("[data-next-step]");
  const controls = advisorRoot.querySelector(".advisor-controls");
  const stepLabel = advisorRoot.querySelector("[data-step-label]");
  const stepMeter = advisorRoot.querySelector("[data-step-meter]");
  const resultTitle = advisorRoot.querySelector("[data-result-title]");
  const resultSummary = advisorRoot.querySelector("[data-result-summary]");
  const resultSystem = advisorRoot.querySelector("[data-result-system]");
  const resultSize = advisorRoot.querySelector("[data-result-size]");
  const resultBudget = advisorRoot.querySelector("[data-result-budget]");
  const resultRebate = advisorRoot.querySelector("[data-result-rebate]");
  const resultNotes = advisorRoot.querySelector("[data-result-notes]");
  const leadSummary = advisorRoot.querySelector("[data-result-lead]");
  const sendSummary = advisorRoot.querySelector("[data-send-summary]");
  let currentStep = 0;

  function setModal(open) {
    if (!modal) return;
    modal.classList.toggle("is-open", open);
    modal.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("modal-open", open);
  }

  function updateStep(index) {
    currentStep = Math.max(0, Math.min(index, steps.length - 1));
    steps.forEach((step, stepIndex) => {
      step.classList.toggle("is-active", stepIndex === currentStep);
    });
    if (prevStep) prevStep.disabled = currentStep === 0;
    if (controls) controls.classList.toggle("is-last", currentStep === steps.length - 1);
    if (stepLabel) stepLabel.textContent = `Step ${currentStep + 1} of ${steps.length}`;
    if (stepMeter) stepMeter.style.width = `${((currentStep + 1) / steps.length) * 100}%`;
  }

  openAdvisorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setModal(true);
      updateStep(0);
    });
  });

  closeAdvisorButtons.forEach((button) => {
    button.addEventListener("click", () => setModal(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setModal(false);
    }
  });

  prevStep?.addEventListener("click", () => updateStep(currentStep - 1));
  nextStep?.addEventListener("click", () => updateStep(currentStep + 1));
  updateStep(0);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const fileInput = form.elements.files;
    const data = {
      goal: getField(form, "goal"),
      zip: getField(form, "zip"),
      sqft: getField(form, "sqft"),
      yearBuilt: getField(form, "yearBuilt"),
      floors: getField(form, "floors"),
      envelope: getField(form, "envelope"),
      heatSource: getField(form, "heatSource"),
      cooling: getField(form, "cooling"),
      ductwork: getField(form, "ductwork"),
      insulation: getField(form, "insulation"),
      windows: getField(form, "windows"),
      rooms: getField(form, "rooms"),
      bill: getField(form, "bill"),
      fileCount: fileInput?.files?.length || 0
    };

    const result = analyzeHome(data);
    resultTitle.textContent = result.title;
    resultSummary.textContent = result.summary;
    resultSystem.textContent = result.system;
    resultSize.textContent = result.size;
    resultBudget.textContent = result.budget;
    resultRebate.textContent = result.rebate;
    const svg = (paths) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
    const noteIcons = [
      svg('<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6v3H9z"/><path d="M8.5 11.5h7M8.5 15.5h5"/>'),
      svg('<path d="M13 2L5 13.5h5l-1 8.5 9-12h-6z"/>'),
      svg('<path d="M12 21s6.5-5 6.5-10.5a6.5 6.5 0 0 0-13 0C5.5 16 12 21 12 21z"/><circle cx="12" cy="10.5" r="2.3"/>'),
      svg('<path d="M3 8h11a3 3 0 1 0-3-3"/><path d="M3 12h15a3 3 0 1 1-3 3"/><path d="M3 16h8"/>'),
      svg('<path d="M12 2.5v19"/><path d="M16 6.5C16 4.8 14.2 4 12 4S8 4.8 8 7s2 3 4 3.5 4 1 4 3.5-1.8 3-4 3-4-.8-4-2.7"/>'),
      svg('<path d="M3 11l9-7 9 7"/><path d="M5.5 9.5V20h13V9.5"/>')
    ];
    const defaultIcon = svg('<path d="M5 12.5l4 4 10-11"/>');
    resultNotes.innerHTML = result.notes
      .map((note, index) => `<li><span aria-hidden="true">${noteIcons[index] || defaultIcon}</span>${note}</li>`)
      .join("");
    leadSummary.value = buildLeadSummary(data, result);
    advisorRoot.classList.add("has-result");
  });

  sendSummary.addEventListener("click", () => {
    const bookingDetails = document.querySelector('.booking-form textarea[name="details"]');
    const bookingService = document.querySelector('.booking-form select[name="service"]');
    if (bookingDetails) {
      bookingDetails.value = leadSummary.value;
    }
    if (bookingService) {
      bookingService.value = "Heat pump estimate";
    }
    setModal(false);
    document.querySelector("#book")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

// Booking form: capture leads for info@ventichvac.com.
// Primary path posts to Web3Forms (works on static hosting, emails the company inbox).
// If no access key is configured yet, or the request fails, it falls back to the
// visitor's email client so the form always does something useful.
const WEB3FORMS_ACCESS_KEY = ""; // <-- Paste the Web3Forms access key for info@ventichvac.com here.
const bookingForm = document.querySelector(".booking-form");
const bookingSubmit = document.querySelector("[data-submit-booking]");
const bookingStatus = document.querySelector("[data-booking-status]");

function bookingCopy(key, fallback) {
  try {
    const lang = typeof getLanguage === "function" ? getLanguage() : "en";
    return (translations[lang] && translations[lang][key]) || fallback;
  } catch (err) {
    return fallback;
  }
}

function setBookingStatus(message, state) {
  if (!bookingStatus) return;
  bookingStatus.textContent = message;
  bookingStatus.dataset.state = state || "";
}

if (bookingForm && bookingSubmit) {
  bookingSubmit.addEventListener("click", async () => {
    if (typeof bookingForm.reportValidity === "function" && !bookingForm.reportValidity()) {
      return;
    }
    const name = getField(bookingForm, "name");
    const phone = getField(bookingForm, "phone");
    const email = getField(bookingForm, "email");
    const city = getField(bookingForm, "city");
    const service = getField(bookingForm, "service");
    const details = getField(bookingForm, "details");
    const subject = `Service request${service ? " - " + service : ""}${name ? " - " + name : ""}`;

    const mailtoFallback = () => {
      const body = [
        `Name: ${name || "-"}`,
        `Phone: ${phone || "-"}`,
        `Email: ${email || "-"}`,
        `City: ${city || "-"}`,
        `Service needed: ${service || "-"}`,
        "",
        "What changed:",
        details || "-"
      ].join("\n");
      window.location.href = `mailto:info@ventichvac.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    // Backend not configured yet -> open the visitor's email client.
    if (!WEB3FORMS_ACCESS_KEY) {
      mailtoFallback();
      return;
    }

    // Honeypot: bots tend to tick every field. Silently ignore.
    if (bookingForm.elements.botcheck && bookingForm.elements.botcheck.checked) {
      return;
    }

    setBookingStatus(bookingCopy("bookingSending", "Sending your request..."), "sending");
    bookingSubmit.disabled = true;
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject,
          from_name: "Ventic HVAC Website",
          name,
          phone,
          email,
          city,
          service,
          message: details
        })
      });
      const result = await response.json();
      if (result.success) {
        setBookingStatus(bookingCopy("bookingSuccess", "Thanks! Your request was sent. We'll reach out shortly."), "success");
        bookingForm.reset();
      } else {
        setBookingStatus(bookingCopy("bookingError", "Something went wrong. Please call us or email info@ventichvac.com."), "error");
        mailtoFallback();
      }
    } catch (err) {
      setBookingStatus(bookingCopy("bookingError", "Something went wrong. Please call us or email info@ventichvac.com."), "error");
      mailtoFallback();
    } finally {
      bookingSubmit.disabled = false;
    }
  });
}
