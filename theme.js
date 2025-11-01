const toggle = document.getElementById("themeToggle");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Optional: Button-Text dynamisch ändern
  if (document.body.classList.contains("dark-mode")) {
    toggle.textContent = "☀️ Hellmodus";
  } else {
    toggle.textContent = "🌙 Dunkelmodus";
  }
});