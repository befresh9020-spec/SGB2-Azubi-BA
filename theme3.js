document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("themeToggle");
  const body = document.body;

  // ---------- THEME-MODUS ----------
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    toggle.textContent = "☀️ Hellmodus";
  } else {
    toggle.textContent = "🌙 Dunkelmodus";
  }

  toggle.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark-mode");
    toggle.textContent = isDark ? "☀️ Hellmodus" : "🌙 Dunkelmodus";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // ---------- INHALTSVERZEICHNIS (nur wenn vorhanden) ----------
  const tocLinks = document.querySelectorAll("nav.toc a");
  if (tocLinks.length > 0) {
    tocLinks.forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const target = document.getElementById(targetId);
        if (!target) return;

        // optional: andere Details schließen
        document.querySelectorAll(".content details[open]").forEach(d => {
          if (d !== target) d.removeAttribute("open");
        });

        // Ziel öffnen & scrollen
        target.setAttribute("open", "true");
        target.scrollIntoView({ behavior: "smooth", block: "start" });

        // visuelle Hervorhebung
        target.style.boxShadow = "0 0 0 4px rgba(226, 0, 26, 0.3)";
        setTimeout(() => (target.style.boxShadow = ""), 2000);
      });
    });
  }

  // ---------- AUDIO-STEUERUNG (nur wenn vorhanden) ----------
  const audioButtons = document.querySelectorAll(".audio-btn");
  if (audioButtons.length > 0) {
    audioButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const audio = btn.previousElementSibling;
        if (!audio) return;

        // alle anderen Audios stoppen
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

        // Play/Pause umschalten
        if (audio.paused) {
          audio.play();
          btn.textContent = "⏸";
        } else {
          audio.pause();
          btn.textContent = "▶";
        }

        // bei Ende zurücksetzen
        audio.onended = () => {
          btn.textContent = "▶";
        };
      });
    });
  }
});