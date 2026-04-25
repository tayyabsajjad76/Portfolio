const sliderDotsContainer = document.getElementById("slider-dots");
let currentSlide = 0;

function getCardsPerPage() {
  return window.innerWidth < 768 ? 1 : 3;
}

function getVisibleCards() {
  return Array.from(document.querySelectorAll(".project-card:not(.hide)"));
}

function getTotalPages() {
  return Math.ceil(getVisibleCards().length / getCardsPerPage());
}

function goToSlide(page) {
  const visibleCards = getVisibleCards();
  const cpp = getCardsPerPage();
  visibleCards.forEach((card, i) => {
    card.style.display = i >= page * cpp && i < (page + 1) * cpp ? "" : "none";
  });
  currentSlide = page;
  renderSliderDots();
}

function renderSliderDots() {
  const total = getTotalPages();
  sliderDotsContainer.innerHTML = "";
  for (let i = 0; i < total; i++) {
    const dot = document.createElement("button");
    dot.className = "slider-dot" + (i === currentSlide ? " active" : "");
    dot.addEventListener("click", () => goToSlide(i));
    sliderDotsContainer.appendChild(dot);
  }
}

function initProjectSlider() {
  document
    .querySelectorAll(".project-card")
    .forEach((card) => (card.style.display = ""));
  currentSlide = 0;
  goToSlide(0);
}

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    document.querySelectorAll(".project-card").forEach((card) => {
      if (filter === "all" || card.dataset.category === filter) {
        card.classList.remove("hide");
        card.style.display = "";
      } else {
        card.classList.add("hide");
        card.style.display = "none";
      }
    });
    currentSlide = 0;
    goToSlide(0);
  });
});

initProjectSlider();

window.addEventListener("resize", () => {
  currentSlide = 0;
  goToSlide(0);
});
