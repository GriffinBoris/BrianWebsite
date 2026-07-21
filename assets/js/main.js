/*
 * Small progressive enhancements: mobile nav disclosure and the footer year.
 * The site is fully readable and navigable without JavaScript.
 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var yearEl = document.querySelector("[data-current-year]");
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }

    var navToggle = document.querySelector("[data-nav-toggle]");
    var navLinks = document.getElementById("nav-links");
    if (navToggle && navLinks) {
      navToggle.addEventListener("click", function () {
        var open = navLinks.getAttribute("data-open") === "true";
        navLinks.setAttribute("data-open", String(!open));
        navToggle.setAttribute("aria-expanded", String(!open));
      });

      navLinks.addEventListener("click", function (event) {
        if (event.target.tagName === "A") {
          navLinks.setAttribute("data-open", "false");
          navToggle.setAttribute("aria-expanded", "false");
        }
      });
    }
  });
})();
