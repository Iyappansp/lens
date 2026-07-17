/* =========================================================
   MAIN.JS — Header/Footer injection, Theme, RTL, Navigation
   Optique & Co. — Optician & Eyewear Shop
   ========================================================= */
(function () {
  "use strict";

  /* ---------------------------------------------------------
     0. NAV LINK CONFIG (single source of truth for header/footer)
  --------------------------------------------------------- */
  const NAV_LINKS = [
    {
      label: "Home",
      href: "index.html",
      match: ["index.html", "home-2.html", ""],
      children: [
        { label: "Home 1", href: "index.html" },
        { label: "Home 2", href: "home-2.html" },
      ],
    },
        { label: "About", href: "about.html", match: ["about.html"] },

    {
      label: "Shop",
      href: "frames.html",
      match: ["frames.html", "brands.html"],
    },
    {
      label: "Eye Care",
      href: "lens-solutions.html",
      match: ["vision-care.html", "lens-solutions.html", "face-shape-guide.html"],
      children: [
        { label: "Face Shape Guide", href: "face-shape-guide.html" },
        { label: "Vision Care Tips", href: "vision-care.html" },
      ],
    },
    { label: "Virtual Try-On", href: "virtual-try-on.html", match: ["virtual-try-on.html"] },
    { label: "Offers", href: "offers.html", match: ["offers.html"] },
    { label: "Insurance", href: "insurance-benefits.html", match: ["insurance-benefits.html"] },
    { label: "Contact", href: "contact.html", match: ["contact.html"] },
  ];

  const AUTH_NO_HEADER_FOOTER = [
    "login.html",
    "signup.html",
    "forgot-password.html",
    "404.html",
    "coming-soon.html",
  ];

  /* ---------------------------------------------------------
     1. ICONS (inline SVG strings — Lucide-style, no external lib)
  --------------------------------------------------------- */
  const ICONS = {
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-moon"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 010 20 15 15 0 010-20z"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    glasses: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="15" r="4"/><circle cx="18" cy="15" r="4"/><path d="M10 15h4M2 13l2-7a2 2 0 012-1h0M22 13l-2-7a2 2 0 00-2-1h0"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-arrow"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0022 12z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>',
    twitter: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.4-1.3 1.7-2.2-.8.5-1.7.8-2.6 1A4 4 0 0012 8.8c0 .3 0 .6.1.9A11.4 11.4 0 013 4.8a4 4 0 001.3 5.4c-.7 0-1.3-.2-1.9-.5 0 1.9 1.4 3.6 3.3 4-.7.2-1.4.2-2 .1a4 4 0 003.8 2.8A11.5 11.5 0 011 19a11.6 11.6 0 006.3 1.9c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 6.5a1.94 1.94 0 11-3.88 0 1.94 1.94 0 013.88 0zM3.4 8.75h3.1V21H3.4V8.75zM9.5 8.75h2.97v1.68h.04c.42-.78 1.43-1.6 2.95-1.6 3.15 0 3.73 2.07 3.73 4.76V21h-3.1v-5.7c0-1.36-.02-3.1-1.9-3.1-1.9 0-2.2 1.48-2.2 3v5.8H9.5V8.75z"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
  };

  /* ---------------------------------------------------------
     2. PATH HELPERS — keep all links relative (works from zip)
  --------------------------------------------------------- */
  function currentPage() {
    const path = window.location.pathname.split("/").pop();
    return path === "" ? "index.html" : path;
  }

  function buildNavItem(item, current) {
    const isActive = item.match.includes(current);
    const hasChildren = item.children && item.children.length;
    if (hasChildren) {
      const childLinks = item.children
        .map((c) => `<li><a href="${c.href}">${c.label}</a></li>`)
        .join("");
      return `
        <li class="nav-dropdown">
          <a href="javascript:void(0)" class="nav-dropdown-toggle ${isActive ? "active" : ""}">${item.label} ${ICONS.chevron}</a>
          <ul class="dropdown-menu">${childLinks}</ul>
        </li>`;
    }
    return `<li><a href="${item.href}" class="${isActive ? "active" : ""}">${item.label}</a></li>`;
  }

  function buildMobileNavItem(item, current) {
    const isActive = item.match.includes(current);
    const hasChildren = item.children && item.children.length;
    if (hasChildren) {
      const childLinks = item.children
        .map((c) => `<li><a href="${c.href}">${c.label}</a></li>`)
        .join("");
      return `
        <li>
          <a href="#" class="mobile-submenu-toggle ${isActive ? "active" : ""}">${item.label} ${ICONS.chevron}</a>
          <ul class="mobile-submenu">${childLinks}</ul>
        </li>`;
    }
    return `<li><a href="${item.href}" class="${isActive ? "active" : ""}">${item.label}</a></li>`;
  }

  /* ---------------------------------------------------------
     3. HEADER TEMPLATE
  --------------------------------------------------------- */
  function renderHeader() {
    const current = currentPage();
    const desktopLinks = NAV_LINKS.map((l) => buildNavItem(l, current)).join("");
    const mobileLinks = NAV_LINKS.map((l) => buildMobileNavItem(l, current)).join("");

    return `
    <div class="site-header" id="siteHeaderBar">
      <div class="container header-inner">
        <a href="index.html" class="brand">
          <span class="brand-mark">${ICONS.glasses}</span>
          <span>Optique<em> & Co.</em><br><small>Eyewear &amp; Eye Care</small></span>
        </a>

        <nav class="main-nav" aria-label="Primary">
          <ul>${desktopLinks}</ul>
        </nav>

        <div class="header-actions">
          <button class="icon-toggle theme-toggle-btn" id="themeToggleBtn" aria-label="Toggle dark mode" title="Toggle theme">
            ${ICONS.sun}${ICONS.moon}
          </button>
          <button class="icon-toggle lang-toggle rtl-toggle-btn" id="rtlToggleBtn" aria-label="Toggle language direction" title="Toggle RTL/LTR">
            <span id="rtlToggleLabel" class="rtl-toggle-label">RTL</span>
          </button>
          <div class="header-cta-group">
            <a href="login.html" class="btn btn-primary btn-sm">Login</a>
          </div>
          <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Open menu">
            ${ICONS.menu}
          </button>
        </div>
      </div>
    </div>

    <div class="menu-backdrop" id="menuBackdrop"></div>
    <nav class="mobile-nav" id="mobileNav" aria-label="Mobile">
      <ul>${mobileLinks}</ul>
      <div class="mobile-cta">
        <a href="login.html" class="btn btn-primary btn-block">Login</a>
        <div class="mobile-nav-toggle-row" style="display:flex; justify-content:center; gap:1.2rem; margin-top:1.8rem; border-top:1px solid var(--border-color); padding-top:1.5rem;">
          <button class="icon-toggle theme-toggle-btn" aria-label="Toggle dark mode" title="Toggle theme">
            ${ICONS.sun}${ICONS.moon}
          </button>
          <button class="icon-toggle lang-toggle rtl-toggle-btn" aria-label="Toggle language direction" title="Toggle RTL/LTR">
            <span class="rtl-toggle-label">RTL</span>
          </button>
        </div>
      </div>
    </nav>
    `;
  }

  /* ---------------------------------------------------------
     4. FOOTER TEMPLATE
  --------------------------------------------------------- */
  function renderFooter() {
    return `
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <a href="index.html" class="brand">
            <span class="brand-mark">${ICONS.glasses}</span>
            <span>Optique<em> & Co.</em><br><small>Eyewear &amp; Eye Care</small></span>
          </a>
          <p>Premium eyewear and professional eye care, blending modern vision technology with timeless style since day one.</p>
          <div class="footer-social">
            <a href="#" aria-label="Facebook">${ICONS.facebook}</a>
            <a href="#" aria-label="Instagram">${ICONS.instagram}</a>
            <a href="#" aria-label="Twitter">${ICONS.twitter}</a>
            <a href="#" aria-label="LinkedIn">${ICONS.linkedin}</a>
          </div>
        </div>

        <div class="footer-col">
          <h5>About</h5>
          <ul>
            <li><a href="about.html">Our Story</a></li>
            <li><a href="about.html#mission">Mission &amp; Vision</a></li>
            <li><a href="about.html#experts">Optical Experts</a></li>
            <li><a href="contact.html">Careers</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h5>Collections</h5>
          <ul>
            <li><a href="frames.html">Eyeglasses</a></li>
            <li><a href="frames.html#sunglasses">Sunglasses</a></li>
            <li><a href="frames.html#kids">Kids Eyewear</a></li>
            <li><a href="brands.html">Designer Brands</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h5>Eye Care</h5>
          <ul>
            <li><a href="face-shape-guide.html">Face Shape Guide</a></li>
            <li><a href="eye-test-booking.html">Book Eye Test</a></li>
            <li><a href="vision-care.html">Vision Care Tips</a></li>
          </ul>
        </div>

        <div class="footer-col footer-newsletter">
          <h5>Stay Updated</h5>
          <p style="font-size:.85rem;color:rgba(255,255,255,.6);">Get offers, new arrivals &amp; eye care tips.</p>
          <form id="newsletterForm">
            <input type="email" placeholder="Your email address" required aria-label="Email for newsletter">
            <button type="submit" aria-label="Subscribe">${ICONS.send}</button>
          </form>
        </div>
      </div>

      <div class="footer-bottom">
        <span>&copy; <span id="footerYear"></span> Optique &amp; Co. All rights reserved.</span>
        <div class="footer-bottom-links">
          <a href="faq.html">FAQ</a>
          <a href="contact.html">Contact</a>
          <a href="insurance-benefits.html">Insurance</a>
        </div>
      </div>
    </div>
    `;
  }

  /* ---------------------------------------------------------
     5. INJECT HEADER / FOOTER
  --------------------------------------------------------- */
  function injectHeaderFooter() {
    const current = currentPage();
    const headerEl = document.getElementById("main-header");
    const footerEl = document.getElementById("main-footer");
    const skip = AUTH_NO_HEADER_FOOTER.includes(current);

    if (headerEl && !skip) {
      headerEl.outerHTML = renderHeader();
    } else if (headerEl) {
      headerEl.remove();
    }

    if (footerEl && !skip) {
      footerEl.outerHTML = `<footer class="site-footer" id="main-footer">${renderFooter()}</footer>`;
      const yearSpan = document.getElementById("footerYear");
      if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    } else if (footerEl) {
      footerEl.remove();
    }
  }

  /* ---------------------------------------------------------
     6. THEME TOGGLE (dark/light + localStorage)
  --------------------------------------------------------- */
  function initTheme() {
    const stored = localStorage.getItem("optique-theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = stored || (prefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);

    document.addEventListener("click", (e) => {
      const btn = e.target.closest("#themeToggleBtn, .theme-toggle-btn");
      if (!btn) return;
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("optique-theme", next);
    });
  }

  /* ---------------------------------------------------------
     7. RTL TOGGLE (Arabic-style mirroring demo + localStorage)
  --------------------------------------------------------- */
  function initRTL() {
    const stored = localStorage.getItem("optique-dir") || "ltr";
    applyDir(stored);

    document.addEventListener("click", (e) => {
      const btn = e.target.closest("#rtlToggleBtn, .rtl-toggle-btn");
      if (!btn) return;
      const next = document.documentElement.getAttribute("dir") === "rtl" ? "ltr" : "rtl";
      applyDir(next);
      localStorage.setItem("optique-dir", next);
    });

    function applyDir(dir) {
      document.documentElement.setAttribute("dir", dir);
      document.documentElement.setAttribute("lang", dir === "rtl" ? "ar" : "en");
      const labels = document.querySelectorAll("#rtlToggleLabel, .rtl-toggle-label");
      labels.forEach((label) => {
        label.textContent = dir === "rtl" ? "LTR" : "RTL";
      });
    }
  }

  /* ---------------------------------------------------------
     8. MOBILE NAV
  --------------------------------------------------------- */
  function initMobileNav() {
    document.addEventListener("click", (e) => {
      const openBtn = e.target.closest("#mobileMenuBtn");
      const backdrop = e.target.closest("#menuBackdrop");
      const submenuToggle = e.target.closest(".mobile-submenu-toggle");
      const mobileNav = document.getElementById("mobileNav");
      const menuBackdrop = document.getElementById("menuBackdrop");

      if (openBtn) {
        const isOpen = mobileNav.classList.contains("open");
        mobileNav.classList.toggle("open", !isOpen);
        menuBackdrop.classList.toggle("open", !isOpen);
        document.body.classList.toggle("menu-open", !isOpen);
        openBtn.innerHTML = !isOpen ? ICONS.close : ICONS.menu;
      }

      if (backdrop) {
        mobileNav.classList.remove("open");
        menuBackdrop.classList.remove("open");
        document.body.classList.remove("menu-open");
        const mb = document.getElementById("mobileMenuBtn");
        if (mb) mb.innerHTML = ICONS.menu;
      }

      if (submenuToggle) {
        e.preventDefault();
        submenuToggle.classList.toggle("open");
        const submenu = submenuToggle.nextElementSibling;
        submenu.classList.toggle("open");
      }
    });
  }

  /* ---------------------------------------------------------
     9. STICKY HEADER SHADOW ON SCROLL
  --------------------------------------------------------- */
  function initHeaderScroll() {
    const header = document.getElementById("siteHeaderBar");
    if (!header) return;
    function onScroll() {
      header.classList.toggle("scrolled", window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------------------------------------------------------
     10. BACK TO TOP BUTTON
  --------------------------------------------------------- */
  function initBackToTop() {
    const btn = document.createElement("button");
    btn.className = "back-to-top";
    btn.id = "backToTopBtn";
    btn.setAttribute("aria-label", "Back to top");
    btn.innerHTML = ICONS.up;
    document.body.appendChild(btn);

    window.addEventListener(
      "scroll",
      () => {
        btn.classList.toggle("visible", window.scrollY > 480);
      },
      { passive: true }
    );

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------------------------------------------------------
     11. NEWSLETTER FORM (frontend-only feedback)
  --------------------------------------------------------- */
  function initNewsletterForm() {
    document.addEventListener("submit", (e) => {
      if (e.target && e.target.id === "newsletterForm") {
        e.preventDefault();
        e.target.reset();
        showToast("Thanks for subscribing! Check your inbox soon.");
      }
    });
  }

  function showToast(message) {
    let toast = document.getElementById("globalToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "globalToast";
      toast.className = "toast";
      toast.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="9 12 12 15 16 10"/></svg><span id="toastMsg"></span>`;
      document.body.appendChild(toast);
    }
    document.getElementById("toastMsg").textContent = message;
    toast.classList.add("show");
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
  }
  window.showOptiqueToast = showToast;

  /* ---------------------------------------------------------
     12. CUSTOM CURSOR (desktop only, lightweight)
  --------------------------------------------------------- */
  function initCursor() {
    if (window.matchMedia("(hover: none)").matches || window.innerWidth < 1024) return;

    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    const ring = document.createElement("div");
    ring.className = "cursor-ring";
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
    });

    function loop() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";
      requestAnimationFrame(loop);
    }
    loop();

    document.addEventListener("mouseover", (e) => {
      if (e.target.closest("a, button, .card, .face-tab-btn, .tab-btn, input, textarea, select")) {
        ring.classList.add("cursor-hover");
      }
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest("a, button, .card, .face-tab-btn, .tab-btn, input, textarea, select")) {
        ring.classList.remove("cursor-hover");
      }
    });
  }

  /* ---------------------------------------------------------
     13. MAGNETIC BUTTON EFFECT (subtle)
  --------------------------------------------------------- */
  function initMagneticButtons() {
    if (window.matchMedia("(hover: none)").matches || window.innerWidth < 1024) return;
    const magnets = document.querySelectorAll(".btn-primary, .btn-secondary, .icon-toggle");
    magnets.forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.12}px, ${y * 0.28}px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "";
      });
    });
  }

  /* ---------------------------------------------------------
     14. SCROLL REVEAL (IntersectionObserver)
  --------------------------------------------------------- */
  function initScrollReveal() {
    const targets = document.querySelectorAll(".reveal, .reveal-stagger > *");
    if (!("IntersectionObserver" in window) || !targets.length) {
      targets.forEach((t) => t.classList.add("in-view"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    targets.forEach((t) => observer.observe(t));

    document.querySelectorAll(".reveal-stagger").forEach((group) => {
      Array.from(group.children).forEach((child, i) => {
        child.style.setProperty("--i", i);
        child.classList.add("reveal");
      });
    });
  }

  /* ---------------------------------------------------------
     INIT — runs on every page
  --------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", () => {
    injectHeaderFooter();
    initTheme();
    initRTL();
    initMobileNav();
    initHeaderScroll();
    initBackToTop();
    initNewsletterForm();
    // initCursor();
    // initMagneticButtons();
    initScrollReveal();

    // Desktop & Tablet nav dropdown toggle handling
    document.addEventListener("click", (e) => {
      const dropdownToggle = e.target.closest(".nav-dropdown > a, .nav-dropdown-toggle");
      const dropdownItem = e.target.closest(".nav-dropdown");

      if (dropdownToggle) {
        e.preventDefault();
        e.stopPropagation();
        const parent = dropdownToggle.closest(".nav-dropdown");
        if (parent) {
          document.querySelectorAll(".nav-dropdown.is-open").forEach((nd) => {
            if (nd !== parent) nd.classList.remove("is-open");
          });
          parent.classList.toggle("is-open");
        }
      } else if (!dropdownItem) {
        document.querySelectorAll(".nav-dropdown.is-open").forEach((nd) => {
          nd.classList.remove("is-open");
        });
      }

      const hashLink = e.target.closest('.main-nav a[href="#"]');
      if (hashLink) {
        e.preventDefault();
      }
    });

    // Close mobile dropdown menus when resizing to desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024) {
        const mobileNav = document.getElementById("mobileNav");
        const menuBackdrop = document.getElementById("menuBackdrop");
        const mb = document.getElementById("mobileMenuBtn");
        if (mobileNav) mobileNav.classList.remove("open");
        if (menuBackdrop) menuBackdrop.classList.remove("open");
        document.body.classList.remove("menu-open");
        if (mb) mb.innerHTML = ICONS.menu;
      }
    });
  });
})();
