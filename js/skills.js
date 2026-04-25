const skillsDotsContainer = document.getElementById("skills-dots");
let currentSkillPage = 0;

function getSkillCards() {
  return Array.from(document.querySelectorAll(".skill-card"));
}

function goToSkillPage(page) {
  const cards = getSkillCards();
  const total = Math.ceil(cards.length / 2);
  currentSkillPage = (page + total) % total;

  cards.forEach((c, i) => {
    c.style.display =
      i >= currentSkillPage * 2 && i < (currentSkillPage + 1) * 2 ? "" : "none";
  });

  cards.slice(currentSkillPage * 2, currentSkillPage * 2 + 2).forEach((c) => {
    c.querySelectorAll(".skill-bar-fill").forEach((bar) => {
      bar.style.width = "0%";
      requestAnimationFrame(() => {
        bar.style.width = (bar.dataset.width || 0) + "%";
      });
    });
  });

  renderSkillDots();
}

function renderSkillDots() {
  if (!skillsDotsContainer) return;
  const total = Math.ceil(getSkillCards().length / 2);
  skillsDotsContainer.innerHTML = "";
  for (let i = 0; i < total; i++) {
    const dot = document.createElement("button");
    dot.className = "slider-dot" + (i === currentSkillPage ? " active" : "");
    dot.addEventListener("click", () => goToSkillPage(i));
    skillsDotsContainer.appendChild(dot);
  }
}

function initSkillsSlider() {
  if (window.innerWidth >= 768) {
    getSkillCards().forEach((c) => (c.style.display = ""));
    if (skillsDotsContainer) skillsDotsContainer.innerHTML = "";
    return;
  }
  currentSkillPage = 0;
  goToSkillPage(0);
}

initSkillsSlider();
window.addEventListener("resize", initSkillsSlider);
