document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("themeToggle");
  const body = document.body;

  // ---------- Theme-Status prüfen ----------
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    toggle.textContent = "☀️ Hellmodus";
  } else {
    toggle.textContent = "🌙 Dunkelmodus";
  }

  // ---------- Klick auf Theme-Toggle ----------
  toggle.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark-mode");
    toggle.textContent = isDark ? "☀️ Hellmodus" : "🌙 Dunkelmodus";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // ---------- Inhaltsverzeichnis-Links ----------
  const tocLinks = document.querySelectorAll("nav.toc a");

  tocLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);
      if (!target) return;

      // Falls ein anderes <details> noch offen ist, kann es (optional) geschlossen werden:
      document.querySelectorAll(".content details[open]").forEach(d => {
        if (d !== target) d.removeAttribute("open");
      });

      // Ziel öffnen (falls noch zu)
      target.setAttribute("open", "true");

      // sanft scrollen
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      // kleine visuelle Hervorhebung (optional, 2 Sek.)
      target.style.boxShadow = "0 0 0 4px rgba(226, 0, 26, 0.3)";
      setTimeout(() => {
        target.style.boxShadow = "";
      }, 2000);
    });
  });
});