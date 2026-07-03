/* =========================================================
   PRODUCTS.JS — Frame Filtering, Virtual Try-On, Booking Form
   ========================================================= */
(function () {
  "use strict";

  /* ---------------- FRAME / CATEGORY FILTERING ---------------- */
  function initFrameFilters() {
    const filterBar = document.querySelector("[data-filter-group]");
    if (!filterBar) return;
    const items = document.querySelectorAll("[data-filter-item]");

    function applyFilters(filter) {
      const filters = filter.toLowerCase().split(",");
      items.forEach((item) => {
        const cats = (item.getAttribute("data-filter-item") || "").toLowerCase().split(",");
        const show = filters.includes("all") || cats.some(c => filters.includes(c));
        item.style.display = show ? "" : "none";
      });
    }

    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".tab-btn[data-filter]");
      if (!btn) return;
      const filter = btn.getAttribute("data-filter");

      filterBar.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      applyFilters(filter);
    });

    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get("filter");
    if (filterParam) {
      filterBar.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      const matchingTab = filterBar.querySelector(`.tab-btn[data-filter="${filterParam.toLowerCase()}"]`);
      if (matchingTab) {
        matchingTab.classList.add("active");
      }
      applyFilters(filterParam);
    }
  }

  /* ---------------- VIRTUAL TRY-ON (frontend preview only) ---------------- */
  function initVirtualTryOn() {
    const stage = document.querySelector(".try-on-stage");
    if (!stage) return;
    const thumbs = stage.querySelectorAll(".frame-thumb");
    const previewImgs = stage.querySelectorAll(".preview-frame");
    const cameraBox = stage.querySelector(".try-on-camera");

    thumbs.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        thumbs.forEach((t) => t.classList.remove("active"));
        thumb.classList.add("active");
        const target = thumb.getAttribute("data-preview");
        previewImgs.forEach((img) => {
          img.classList.toggle("shown", img.getAttribute("data-frame") === target);
        });
        if (cameraBox) {
          const placeholder = cameraBox.querySelector(".try-on-placeholder-text");
          if (placeholder) placeholder.style.display = "none";
        }
        if (window.showOptiqueToast) window.showOptiqueToast("Preview updated — frame applied.");
      });
    });

    const uploadBtn = stage.querySelector("[data-upload-trigger]");
    if (uploadBtn) {
      uploadBtn.addEventListener("click", () => {
        if (window.showOptiqueToast) window.showOptiqueToast("Demo only: upload is illustrative in this preview.");
      });
    }
  }

  /* ---------------- EYE TEST BOOKING FORM ---------------- */
  function initBookingForm() {
    const form = document.getElementById("bookingForm");
    if (!form) return;

    const timeSlots = form.querySelectorAll(".time-slot");
    const summaryTime = document.getElementById("summaryTime");
    const summaryDate = document.getElementById("summaryDate");
    const summaryName = document.getElementById("summaryName");
    const dateInput = form.querySelector("#preferredDate");
    const nameInput = form.querySelector("#fullName");

    timeSlots.forEach((slot) => {
      slot.addEventListener("click", () => {
        timeSlots.forEach((s) => s.classList.remove("selected"));
        slot.classList.add("selected");
        if (summaryTime) summaryTime.textContent = slot.textContent.trim();
      });
    });

    if (dateInput && summaryDate) {
      dateInput.addEventListener("change", () => {
        summaryDate.textContent = dateInput.value
          ? new Date(dateInput.value).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })
          : "—";
      });
    }
    if (nameInput && summaryName) {
      nameInput.addEventListener("input", () => {
        summaryName.textContent = nameInput.value || "—";
      });
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (window.showOptiqueToast) window.showOptiqueToast("Appointment request received! We'll confirm shortly.");
      form.reset();
      timeSlots.forEach((s) => s.classList.remove("selected"));
      if (summaryTime) summaryTime.textContent = "—";
      if (summaryDate) summaryDate.textContent = "—";
      if (summaryName) summaryName.textContent = "—";
    });
  }

  /* ---------------- GENERIC CONTACT / AUTH FORM FEEDBACK ---------------- */
  function initGenericForms() {
    document.querySelectorAll("form[data-demo-form]").forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const msg = form.getAttribute("data-success-message") || "Submitted successfully!";
        if (window.showOptiqueToast) window.showOptiqueToast(msg);
        form.reset();
      });
    });
  }

  /* ---------------- PASSWORD VISIBILITY TOGGLE ---------------- */
  function initPasswordToggle() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-toggle-password]");
      if (!btn) return;
      const input = document.getElementById(btn.getAttribute("data-toggle-password"));
      if (!input) return;
      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";
      btn.innerHTML = isPassword
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0112 19c-7 0-11-7-11-7a18.5 18.5 0 015.06-5.94M9.9 4.24A10.94 10.94 0 0112 4c7 0 11 7 11 7a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>';
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initFrameFilters();
    initVirtualTryOn();
    initBookingForm();
    initGenericForms();
    initPasswordToggle();
  });
})();
