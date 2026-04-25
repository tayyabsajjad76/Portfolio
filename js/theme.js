const themeToggle = document.getElementById("theme-toggle");
const iconMoon = document.getElementById("icon-moon");
const iconSun = document.getElementById("icon-sun");
const html = document.documentElement;

const savedTheme =
  localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");
html.classList.add(savedTheme);

function updateThemeIcons() {
  const isDark = html.classList.contains("dark");
  iconMoon.style.display = isDark ? "none" : "";
  iconSun.style.display = isDark ? "" : "none";
}
updateThemeIcons();

themeToggle.addEventListener("click", () => {
  html.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    html.classList.contains("dark") ? "dark" : "light",
  );
  updateThemeIcons();
});
