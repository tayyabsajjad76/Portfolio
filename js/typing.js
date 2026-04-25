const roles = [
  "FullStack Developer",
  "React Developer",
  "Vue.js Developer",
  "Node.js Developer",
  "UI/UX Enthusiast",
];
let roleIndex = 0,
  charIndex = 0,
  deleting = false;
const typedEl = document.getElementById("typed-text");

function typeEffect() {
  if (!typedEl) return;
  const current = roles[roleIndex];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeEffect, deleting ? 55 : 105);
}
setTimeout(typeEffect, 1600);
