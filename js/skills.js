let currentSkillPage = 0;

function getSkillCards() {
  return Array.from(document.querySelectorAll(".skill-card"));
}

function getCardsPerPageSkills() {
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 1024) return 2;
  return null;
}

function getTotalSkillPages() {
  const cpp = getCardsPerPageSkills();
  if (!cpp) return 1;
  return Math.ceil(getSkillCards().length / cpp);
}

function goToSkillPage(page) {
  const total = getTotalSkillPages();
  currentSkillPage = Math.max(0, Math.min(page, total - 1));

  const trackEl = document.getElementById("skills-track");
  if (!trackEl) return;

  const cpp = getCardsPerPageSkills();
  if (!cpp) return;

  const firstCard = getSkillCards()[0];
  if (!firstCard) return;
  const cardW = firstCard.getBoundingClientRect().width;
  const gap = 20;
  const offset = currentSkillPage * cpp * (cardW + gap);
  trackEl.style.transform = `translateX(-${offset}px)`;

  const cards = getSkillCards();
  cards.forEach((c) => {
    c.querySelectorAll(".skill-bar-fill").forEach((bar) => {
      bar.style.transition = "none";
      bar.style.width = "0%";
    });
  });
  setTimeout(() => {
    const start = currentSkillPage * cpp;
    cards.slice(start, start + cpp).forEach((c) => {
      c.querySelectorAll(".skill-bar-fill").forEach((bar) => {
        bar.style.transition = "";
        bar.style.width = (bar.dataset.width || 0) + "%";
      });
    });
  }, 350);

  updateArrows();
}

function updateArrows() {
  const cpp = getCardsPerPageSkills();
  const total = getTotalSkillPages();
  const prevBtn = document.getElementById("skills-prev");
  const nextBtn = document.getElementById("skills-next");
  if (!prevBtn || !nextBtn) return;

  if (!cpp) {
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
    return;
  }

  prevBtn.style.display = "";
  nextBtn.style.display = "";
  prevBtn.style.opacity = currentSkillPage === 0 ? "0.35" : "1";
  prevBtn.style.pointerEvents = currentSkillPage === 0 ? "none" : "";
  nextBtn.style.opacity = currentSkillPage >= total - 1 ? "0.35" : "1";
  nextBtn.style.pointerEvents = currentSkillPage >= total - 1 ? "none" : "";
}

function initSkillsSlider() {
  const cpp = getCardsPerPageSkills();
  const cards = getSkillCards();
  const trackEl = document.getElementById("skills-track");
  if (!trackEl) return;

  currentSkillPage = 0;
  trackEl.style.transition = "none";
  trackEl.style.transform = "translateX(0px)";

  if (!cpp) {
    trackEl.style.width = "";
    trackEl.style.flexWrap = "wrap";
    trackEl.style.gap = "1.25rem";
    cards.forEach((c) => {
      c.style.flex = "0 0 calc(25% - 0.94rem)";
      c.style.maxWidth = "calc(25% - 0.94rem)";
      c.style.boxSizing = "border-box";
    });
    requestAnimationFrame(() => {
      trackEl.style.transition = "";
    });
    setTimeout(() => {
      cards.forEach((c) => {
        c.querySelectorAll(".skill-bar-fill").forEach((bar) => {
          bar.style.width = (bar.dataset.width || 0) + "%";
        });
      });
    }, 200);
    updateArrows();
    return;
  }

  trackEl.style.flexWrap = "nowrap";
  trackEl.style.width = `${(cards.length / cpp) * 100}%`;

  cards.forEach((c) => {
    c.style.display = "";
    c.style.flex = `0 0 ${100 / cards.length}%`;
    c.style.maxWidth = `${100 / cards.length}%`;
    c.style.boxSizing = "border-box";
  });

  requestAnimationFrame(() => {
    trackEl.style.transition = "";
  });

  setTimeout(() => {
    cards.slice(0, cpp).forEach((c) => {
      c.querySelectorAll(".skill-bar-fill").forEach((bar) => {
        bar.style.width = (bar.dataset.width || 0) + "%";
      });
    });
  }, 200);

  updateArrows();
}

document.getElementById("skills-prev")?.addEventListener("click", () => {
  goToSkillPage(currentSkillPage - 1);
});
document.getElementById("skills-next")?.addEventListener("click", () => {
  goToSkillPage(currentSkillPage + 1);
});

initSkillsSlider();

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(initSkillsSlider, 150);
});
