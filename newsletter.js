// Ventic HVAC newsletter signup (homepage).
// Saves the email + consent record (time, page, consent text shown) via the
// Supabase RPC public.ventic_email_optin (insert-only; the list is not readable
// with this public key). See Privacy Policy, section 5.
(function () {
  "use strict";

  var ENDPOINT = "https://yuovkylnxembouzkgwcw.supabase.co/rest/v1/rpc/ventic_email_optin";
  // Public (anon) key: safe to ship in the browser; it can only call the opt-in function.
  var ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1b3ZreWxueGVtYm91emtnd2N3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxMDYxODksImV4cCI6MjA5ODY4MjE4OX0.I7svvzkWbZmBKb9YPIk4EA1jZP1laEDYBWQQz-VxOPs";
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
        headers: { "Content-Type": "application/json", apikey: ANON_KEY, Authorization: "Bearer " + ANON_KEY },
        body: JSON.stringify({
          p_email: form.elements.email.value.trim(),
          p_consent: form.elements.consent.checked,
          p_consent_text: consentText ? consentText.textContent.trim() : "",
          p_source: "ventichvac.com newsletter form",
          p_page_path: location.pathname,
          p_website: form.elements.website.value
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
