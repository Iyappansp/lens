/* =========================================================
   ANIMATIONS.JS — Counters, Accordions, Testimonial Slider,
   Tab Transitions, Gallery Transition
   ========================================================= */
(function () {
  "use strict";

  /* ---------------- COUNTER ANIMATION ---------------- */
  function initCounters() {
    const counters = document.querySelectorAll("[data-counter]");
    if (!counters.length) return;

    const animate = (el) => {
      const target = parseFloat(el.getAttribute("data-counter"));
      const suffix = el.getAttribute("data-suffix") || "";
      const duration = 1600;
      const start = performance.now();

      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(eased * target);
        el.textContent = value.toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target.toLocaleString() + suffix;
      }
      requestAnimationFrame(step);
    };

    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animate(entry.target);
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      counters.forEach((c) => obs.observe(c));
    } else {
      counters.forEach(animate);
    }
  }

  /* ---------------- ACCORDION (FAQ) ---------------- */
  function initAccordions() {
    document.addEventListener("click", (e) => {
      const header = e.target.closest(".accordion-header");
      if (!header) return;
      const item = header.closest(".accordion-item");
      const body = item.querySelector(".accordion-body");
      const group = item.closest(".accordion-group");
      const isActive = item.classList.contains("active");

      if (group && group.getAttribute("data-single") === "true") {
        group.querySelectorAll(".accordion-item.active").forEach((openItem) => {
          if (openItem !== item) {
            openItem.classList.remove("active");
            openItem.querySelector(".accordion-body").style.maxHeight = null;
          }
        });
      }

      item.classList.toggle("active", !isActive);
      body.style.maxHeight = !isActive ? body.scrollHeight + "px" : null;
    });
  }

  /* ---------------- TESTIMONIAL SLIDER ---------------- */
  function initTestimonialSliders() {
    document.querySelectorAll(".testimonial-slider").forEach((slider) => {
      const track = slider.querySelector(".slider-track");
      const slides = Array.from(track.children);
      const prevBtn = slider.querySelector(".slider-prev");
      const nextBtn = slider.querySelector(".slider-next");
      const dotsWrap = slider.querySelector(".slider-dots");
      let index = 0;
      let visiblePerView = getVisiblePerView();

      function getVisiblePerView() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
      }

      function renderDots() {
        if (!dotsWrap) return;
        const pages = Math.ceil(slides.length / visiblePerView);
        dotsWrap.innerHTML = "";
        for (let i = 0; i < pages; i++) {
          const dot = document.createElement("button");
          dot.className = "slider-dot" + (i === Math.floor(index / visiblePerView) ? " active" : "");
          dot.setAttribute("aria-label", "Go to slide group " + (i + 1));
          dot.addEventListener("click", () => {
            index = i * visiblePerView;
            update();
          });
          dotsWrap.appendChild(dot);
        }
      }

      function update() {
        visiblePerView = getVisiblePerView();
        const maxIndex = Math.max(slides.length - visiblePerView, 0);
        if (index > maxIndex) index = maxIndex;
        if (index < 0) index = 0;
        
        const computedGap = window.getComputedStyle(track).gap;
        const gap = computedGap && computedGap !== "normal" ? computedGap : "1.5rem";
        const slideWidthStyle = `calc((100% - (${visiblePerView} - 1) * ${gap}) / ${visiblePerView})`;
        slides.forEach((s) => (s.style.flex = `0 0 ${slideWidthStyle}`));

        const isRTL = document.documentElement.getAttribute("dir") === "rtl";
        const firstSlide = slides[0];
        const slideWidthPx = firstSlide ? firstSlide.getBoundingClientRect().width : 0;
        const gapPx = parseFloat(window.getComputedStyle(track).gap) || 0;

        if (slideWidthPx > 0) {
          const offsetPx = index * (slideWidthPx + gapPx);
          track.style.transform = `translateX(${isRTL ? "" : "-"}${offsetPx}px)`;
        } else {
          const fallbackPercent = index * (100 / visiblePerView) * (isRTL ? 1 : -1);
          track.style.transform = `translateX(${fallbackPercent}%)`;
        }

        renderDots();
        if (prevBtn) prevBtn.disabled = index === 0;
        if (nextBtn) nextBtn.disabled = index >= maxIndex;
      }

      if (nextBtn)
        nextBtn.addEventListener("click", () => {
          index = Math.min(index + visiblePerView, slides.length - visiblePerView);
          update();
        });
      if (prevBtn)
        prevBtn.addEventListener("click", () => {
          index = Math.max(index - visiblePerView, 0);
          update();
        });

      window.addEventListener("resize", update);
      update();
    });
  }

  /* ---------------- TAB TRANSITIONS (Lens / generic tabs) ---------------- */
  function initTabs() {
    document.addEventListener("click", (e) => {
      const tabBtn = e.target.closest(".tab-btn[data-tab-target]");
      if (!tabBtn) return;
      const group = tabBtn.closest("[data-tab-group]");
      const targetId = tabBtn.getAttribute("data-tab-target");

      group.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      tabBtn.classList.add("active");

      document.querySelectorAll(".lens-panel, .generic-panel").forEach((panel) => {
        panel.classList.toggle("active", panel.id === targetId);
      });
    });
  }

  /* ---------------- FACE SHAPE TABS ---------------- */
  function initFaceShapeTabs() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".face-tab-btn[data-shape-target]");
      if (!btn) return;
      const group = btn.closest("[data-shape-group]");
      const targetId = btn.getAttribute("data-shape-target");

      group.querySelectorAll(".face-tab-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      document.querySelectorAll(".face-shape-panel").forEach((panel) => {
        panel.classList.toggle("active", panel.id === targetId);
      });
    });
  }

  /* ---------------- GALLERY / BEFORE-AFTER TRANSITION ---------------- */
  function initGalleryTransition() {
    document.querySelectorAll(".before-after-toggle [data-ba-target]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const wrap = btn.closest(".before-after-toggle").nextElementSibling;
        const state = btn.getAttribute("data-ba-target");
        btn.parentElement.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        if (wrap) {
          wrap.querySelectorAll("img").forEach((img) => {
            img.classList.toggle("shown", img.getAttribute("data-state") === state);
          });
        }
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initCounters();
    initAccordions();
    initTestimonialSliders();
    initTabs();
    initFaceShapeTabs();
    initGalleryTransition();
  });
})();
