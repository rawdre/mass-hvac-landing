// Ventic HVAC newsletter signup (homepage).
// Posts JSON to the Ventic request app, which must store the consent record
// (email, timestamp, page, consent text shown) per the Privacy Policy, section 5.
(function () {
  "use strict";

  var ENDPOINT = "https://ventic.34-41-157-23.nip.io/api/public/newsletter";
  var BUTTON_HTML = 'Join our newsletter <span aria-hidden="true">&#8599;</span>';
  var FALLBACK = "We couldn't save your signup. Please try again, or email info@ventichvac.com.";

  var form = document.getElementById("vn-newsletter-form");
  if (!form) return;
  var button = form.querySelector("button[type=submit]");
  var status = document.getElementById("vn-newsletter-status");
  var consentText = document.getElementById("vn-newsletter-consent-text");
  var busy = false;

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (busy || !form.reportValidity()) return;
    busy = true;
    button.disabled = true;
    button.textContent = "Joining…";
    status.textContent = "";
    try {
      var response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.elements.email.value.trim(),
          consent: form.elements.consent.checked,
          consent_text: consentText ? consentText.textContent.trim() : "",
          source: "ventichvac.com newsletter form",
          page_path: location.pathname,
          website: form.elements.website.value
        })
      });
      var result = await response.json().catch(function () { return {}; });
      if (!response.ok || !result.success) throw new Error(result.message || FALLBACK);
      form.reset();
      status.textContent = "Thank you! You're on the list for seasonal offers, maintenance tips, and rebate updates.";
    } catch (error) {
      status.textContent = (error && error.message) || FALLBACK;
    } finally {
      busy = false;
      button.disabled = false;
      button.innerHTML = BUTTON_HTML;
    }
  });
})();
