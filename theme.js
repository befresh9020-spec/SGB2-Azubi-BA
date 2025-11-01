// ===========================================
//   GLOBALER DARK-/LIGHT-MODUS FÜR ALLE SEITEN
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
  const htmlEl = document.documentElement;
  const btn = document.getElementById('themeToggle');
  if (!btn) return; // Seite hat evtl. keinen Button (z. B. PDFs, spezielle Seiten)

  // ---- 1. Gespeicherte Wahl aus localStorage lesen ----
  const saved = localStorage.getItem('theme');
  const initialTheme = saved === 'dark' || saved === 'light' ? saved : 'light';

  // ---- 2. Theme auf <html> anwenden ----
  htmlEl.setAttribute('data-theme', initialTheme);

  // ---- 3. Button-Beschriftung & Zustand anpassen ----
  updateButton(initialTheme);

  // ---- 4. Klick-Handler für Wechsel ----
  btn.addEventListener('click', () => {
    const current = htmlEl.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';

    htmlEl.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateButton(next);
  });

  // ---- Hilfsfunktion für Beschriftung und ARIA ----
  function updateButton(mode) {
    if (mode === 'dark') {
      btn.textContent = '☀️ Hellmodus';
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.textContent = '🌙 Dunkelmodus';
      btn.setAttribute('aria-pressed', 'false');
    }
  }
});