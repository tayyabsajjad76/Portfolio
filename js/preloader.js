const preloader = document.getElementById("preloader");
const preloaderFill = document.getElementById("preloader-fill");
let progress = 0;

const preloadInterval = setInterval(() => {
  progress += Math.random() * 18 + 6;
  if (progress >= 100) {
    progress = 100;
    clearInterval(preloadInterval);
    setTimeout(() => {
      preloader.classList.add("hidden");
      setTimeout(() => (preloader.style.display = "none"), 500);
    }, 300);
  }
  preloaderFill.style.width = progress + "%";
}, 100);
