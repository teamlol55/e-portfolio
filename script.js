/* =========================================================
   e-Portfolio · script.js
   - เมนูมือถือ (เปิด/ปิด)
   - ไฮไลต์เมนูตามส่วนที่กำลังดูอยู่
   - เอฟเฟกต์ค่อย ๆ ปรากฏเมื่อเลื่อนถึง
   - ปีลิขสิทธิ์อัตโนมัติ
   ========================================================= */

(function () {
  "use strict";

  // บอก CSS ว่า JavaScript ทำงานแล้ว (ถ้า JS ไม่ทำงาน เนื้อหาจะยังแสดงปกติ)
  document.documentElement.classList.add("js");

  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  const links = document.querySelectorAll(".nav-menu a");

  /* ---------- เมนูมือถือ ---------- */
  function setMenu(open) {
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "ปิดเมนู" : "เปิดเมนู");
  }

  toggle.addEventListener("click", function () {
    setMenu(!menu.classList.contains("open"));
  });

  // กดลิงก์แล้วปิดเมนูอัตโนมัติ
  links.forEach(function (link) {
    link.addEventListener("click", function () { setMenu(false); });
  });

  // กด Esc เพื่อปิดเมนู
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  /* ---------- ไฮไลต์เมนูตามส่วนที่กำลังดู ---------- */
  const sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(function (section) { spy.observe(section); });

    /* ---------- เอฟเฟกต์ปรากฏเมื่อเลื่อนถึง ---------- */
    const reveal = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll(".reveal").forEach(function (el) { reveal.observe(el); });
  } else {
    // เบราว์เซอร์เก่า: แสดงทุกอย่างทันที
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- ปีลิขสิทธิ์ ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
