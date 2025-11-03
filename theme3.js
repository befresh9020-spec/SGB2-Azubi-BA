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
    // ---------- AUDIO-STEUERUNG (nur aktiv, wenn Audios existieren) ----------
  const audioButtons = document.querySelectorAll(".audio-btn");

  if (audioButtons.length > 0) {
    audioButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const audio = btn.previousElementSibling; // direkt vor dem Button im DOM
        if (!audio) return;

        // Alle anderen Audios stoppen
        document.querySelectorAll("audio").forEach(a => {
          if (a !== audio) {
            a.pause();
            a.currentTime = 0;
            const otherBtn = a.nextElementSibling;
            if (otherBtn && otherBtn.classList.contains("audio-btn")) {
              otherBtn.textContent = "▶";
            }
          }
        });

        // Wiedergabe umschalten
        if (audio.paused) {
          audio.play();
          btn.textContent = "⏸";
        } else {
          audio.pause();
          btn.textContent = "▶";
        }

        // Beim Ende des Audios Button zurücksetzen
        audio.onended = () => {
          btn.textContent = "▶";
        };
      });
    });
  }
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