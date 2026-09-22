/* ==========================================================
   1) เมนูมือถือ (hamburger)
   กดปุ่ม navToggle แล้วสลับคลาส is-open บนเมนู
   ========================================================== */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

// ปิดเมนูมือถืออัตโนมัติเมื่อกดลิงก์
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* ==========================================================
   2) ไฮไลต์เมนูตามหมวดที่กำลังเลื่อนดูอยู่ (scroll-spy)
   ใช้ IntersectionObserver เช็คว่า section ไหนอยู่กลางจอ
   ========================================================== */
const sections = document.querySelectorAll("section[id], footer[id]");
const navItems = document.querySelectorAll("[data-nav]");

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navItems.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { rootMargin: "-45% 0px -45% 0px" } // นับว่า "อยู่ที่หมวดนี้" เมื่อหมวดนั้นอยู่แถบกลางจอ
);

sections.forEach((section) => spyObserver.observe(section));

/* ==========================================================
   3) Modal แสดงรายละเอียดโปรเจกต์
   อ่านข้อมูลจาก data-title / data-desc / data-tags ของปุ่มที่กด
   ========================================================== */
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalTags = document.getElementById("modalTags");
const modalClose = document.getElementById("modalClose");

document.querySelectorAll(".project").forEach((card) => {
  card.addEventListener("click", () => {
    modalTitle.textContent = card.dataset.title;
    modalDesc.textContent = card.dataset.desc;
    modalTags.textContent = card.dataset.tags;
    modal.classList.add("is-open");
  });
});

function closeModal() {
  modal.classList.remove("is-open");
}

modalClose.addEventListener("click", closeModal);

// กดพื้นหลังมืดๆ รอบกล่องเพื่อปิด
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// กด Esc เพื่อปิด
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
