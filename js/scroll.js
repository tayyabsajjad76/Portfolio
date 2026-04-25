const scrollProgress = document.getElementById("scroll-progress");
const backToTop = document.getElementById("back-to-top");

function updateScrollProgress() {
  const scrolled = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = (scrolled / total) * 100 + "%";
}

function updateBackToTop() {
  backToTop.classList.toggle("visible", window.scrollY > 400);
}

backToTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);

const cursorGlow = document.getElementById("cursor-glow");
document.addEventListener("mousemove", (e) => {
  cursorGlow.style.left = e.clientX + "px";
  cursorGlow.style.top = e.clientY + "px";
});

function checkReveal() {
  document.querySelectorAll(".reveal:not(.visible)").forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
      el.classList.add("visible");
    }
  });
}

let skillsAnimated = false;
function animateSkillBars() {
  if (skillsAnimated || window.innerWidth < 768) return;
  const grid = document.getElementById("skills-grid");
  if (!grid) return;
  if (grid.getBoundingClientRect().top < window.innerHeight * 0.9) {
    skillsAnimated = true;
    document.querySelectorAll(".skill-bar-fill").forEach((bar) => {
      bar.style.width = (bar.dataset.width || 0) + "%";
    });
  }
}

window.addEventListener(
  "scroll",
  () => {
    updateScrollProgress();
    updateBackToTop();
    checkReveal();
    animateSkillBars();
  },
  { passive: true },
);

window.addEventListener("load", () => {
  checkReveal();
  animateSkillBars();
  updateScrollProgress();
  updateBackToTop();
});
