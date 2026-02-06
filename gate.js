/* ===== Konfiguration ===== */
const STORAGE_KEY = "access_granted";
const VALID_HASH =
    "e45d96dc2837c40369aff18c148b007cd543ea71f9af7be4d2e84ed6f58ae7be";

/* ===== Status einmal lesen ===== */
const isUnlocked = localStorage.getItem(STORAGE_KEY) === "true";

/* ===== Anzeige-Logik ===== */
document.addEventListener("DOMContentLoaded", () => {
    const gate = document.getElementById("gate-screen");
    const app = document.getElementById("main-app");

    if (!gate || !app) return;

    if (isUnlocked) {
        app.style.display = "block";
    } else {
        gate.style.display = "flex";
    }
});

/* ===== Seitenschutz (Direktaufrufe verhindern) ===== */
(function () {
    const isIndexPage =
        window.location.pathname.endsWith("index.html") ||
        window.location.pathname === "/";

    if (!isUnlocked && !isIndexPage) {
        window.location.href = "index.html";
    }
})();

/* ===== Hash-Funktion ===== */
async function hashString(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

/* ===== Login ===== */
async function unlockApp() {
    const input = document.getElementById("pw-field").value.trim();
    if (!input) return;

    const inputHash = await hashString(input);

    if (inputHash === VALID_HASH) {
        localStorage.setItem(STORAGE_KEY, "true");

        document.getElementById("gate-screen").style.display = "none";
        document.getElementById("main-app").style.display = "block";
    } else {
        alert("Passwort nicht korrekt.");
    }
}