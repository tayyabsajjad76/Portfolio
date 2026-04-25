const testitSlider = document.getElementById("testi-slider");
const testiDotsContainer = document.getElementById("testi-dots");
const testiPrev = document.getElementById("testi-prev");
const testiNext = document.getElementById("testi-next");
const testiSlides = document.querySelectorAll(".testi-slide");
let currentTesti = 0;

function getTestiPerPage() {
  return window.innerWidth < 768 ? 1 : 2;
}

function updateTestiSlideWidths() {
  const perPage = getTestiPerPage();
  testiSlides.forEach((slide) => {
    slide.style.flex = "0 0 " + 100 / perPage + "%";
  });
}

function goToTesti(page) {
  const perPage = getTestiPerPage();
  const totalPages = Math.ceil(testiSlides.length / perPage);
  currentTesti = (page + totalPages) % totalPages;
  testitSlider.style.transform = "translateX(-" + currentTesti * 100 + "%)";
  document.querySelectorAll(".testi-dot").forEach((d, i) => {
    d.classList.toggle("active", i === currentTesti);
  });
}

function buildTestiDots() {
  testiDotsContainer.innerHTML = "";
  const perPage = getTestiPerPage();
  const totalPages = Math.ceil(testiSlides.length / perPage);
  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement("button");
    dot.className = "testi-dot" + (i === 0 ? " active" : "");
    dot.addEventListener("click", () => goToTesti(i));
    testiDotsContainer.appendChild(dot);
  }
}

function initTestiSlider() {
  updateTestiSlideWidths();
  currentTesti = 0;
  testitSlider.style.transform = "translateX(0)";
  buildTestiDots();
}

initTestiSlider();
window.addEventListener("resize", initTestiSlider);

testiPrev.addEventListener("click", () => goToTesti(currentTesti - 1));
testiNext.addEventListener("click", () => goToTesti(currentTesti + 1));

setInterval(() => goToTesti(currentTesti + 1), 5000);
