/*
 * Progressive enhancement: reveal-on-scroll and current-year stamp.
 * The site is fully usable with JavaScript disabled; this only adds polish.
 */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    // Stamp the current year in the footer.
    var yearEl = document.querySelector("[data-current-year]");
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }

    // Reveal elements as they enter the viewport.
    var revealItems = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || revealItems.length === 0) {
      revealItems.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    revealItems.forEach(function (el) {
      observer.observe(el);
    });
  });
})();
