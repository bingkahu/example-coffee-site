/* ============================================================
   Grounds & Glory — main.js
   Lightweight JS: sticky nav + mobile menu + smooth scrolling
   ============================================================ */

(function () {
  "use strict";

  /* ── Sticky nav on scroll ─────────────────────────────── */
  const nav = document.querySelector(".nav");
  if (nav) {
    const handleScroll = () => {
      nav.classList.toggle("scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run once on load
  }

  /* ── Mobile hamburger menu ────────────────────────────── */
  const toggle = document.querySelector(".nav__toggle");
  const links  = document.querySelector(".nav__links");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen);
      // Animate the three bars into an X
      const bars = toggle.querySelectorAll("span");
      if (isOpen) {
        bars[0].style.transform = "translateY(7px) rotate(45deg)";
        bars[1].style.opacity   = "0";
        bars[2].style.transform = "translateY(-7px) rotate(-45deg)";
        document.body.style.overflow = "hidden";
      } else {
        bars[0].style.transform = "";
        bars[1].style.opacity   = "";
        bars[2].style.transform = "";
        document.body.style.overflow = "";
      }
    });

    // Close menu when a nav link is clicked
    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        links.classList.remove("open");
        const bars = toggle.querySelectorAll("span");
        bars[0].style.transform = "";
        bars[1].style.opacity   = "";
        bars[2].style.transform = "";
        document.body.style.overflow = "";
      });
    });
  }

  /* ── Active nav link highlight ────────────────────────── */
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav__link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  /* ── Contact form — prevent default + show confirmation ─ */
  const form = document.querySelector(".contact-form form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector(".form-submit");
      btn.textContent = "Message sent! ☕";
      btn.disabled = true;
      btn.style.background = "#4caf50";
      setTimeout(() => {
        btn.textContent = "Send Message";
        btn.disabled = false;
        btn.style.background = "";
        form.reset();
      }, 3500);
    });
  }

})();
