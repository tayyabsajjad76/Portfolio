const sections = [
  "sections/header.html",
  "sections/home.html",
  "sections/about.html",
  "sections/projects.html",
  "sections/skills.html",
  "sections/testimonials.html",
  "sections/contact.html",
  "sections/footer.html",
];

async function loadSections() {
  const app = document.getElementById("app");

  for (const src of sections) {
    const res = await fetch(src);
    const html = await res.text();
    const div = document.createElement("div");
    div.innerHTML = html;
    app.appendChild(div);
  }
  bootModules();
}

function bootModules() {
  loadScript("js/preloader.js");
  loadScript("js/theme.js");
  loadScript("js/navbar.js");
  loadScript("js/typing.js");
  loadScript("js/projects.js");
  loadScript("js/skills.js");
  loadScript("js/testimonials.js");
  loadScript("js/contact.js");
  loadScript("js/scroll.js", () => {
    checkReveal();
    animateSkillBars();
  });
}

function loadScript(src, onload) {
  const s = document.createElement("script");
  s.src = src;
  if (onload) s.onload = onload;
  document.body.appendChild(s);
}

loadSections();
