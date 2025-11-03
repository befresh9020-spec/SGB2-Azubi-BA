document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("themeToggle");
  if (!toggle) {
    console.error('Kein Button mit id="themeToggle" gefunden.');
    return;
  }

  const body = document.body;

  // gespeichertes Theme prüfen
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    toggle.textContent = "☀️ Hellmodus";
  } else {
    toggle.textContent = "🌙 Dunkelmodus";
  }

  // Klick-Event
  toggle.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark-mode");
    toggle.textContent = isDark ? "☀️ Hellmodus" : "🌙 Dunkelmodus";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
  
document.querySelectorAll('nav.toc a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      target.open = true; // Akkordeon öffnen
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

