(function() {
    const isAccessGranted = localStorage.getItem("access_granted") === "true";
    const isIndexPage = window.location.pathname.endsWith("index.html") || window.location.pathname === "/";

    // Wenn kein Zugriff UND wir sind nicht auf der Startseite -> Umleiten!
    if (!isAccessGranted && !isIndexPage) {
        window.location.href = "index.html";
    }
})();

const VALID_HASH = "e45d96dc2837c40369aff18c148b007cd543ea71f9af7be4d2e84ed6f58ae7be";

async function hashString(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

window.onload = function() {
    // Prüfen, ob der Zugang bereits im Browser gespeichert ist
    if (localStorage.getItem("access_granted") === "true") {
        document.getElementById("gate-screen").style.display = "none";
        document.getElementById("main-app").style.display = "block";
    }
};

async function unlockApp() {
    const input = document.getElementById("pw-field").value;
    const inputHash = await hashString(input);

    if (inputHash === VALID_HASH) {
        localStorage.setItem("access_granted", "true");
        document.getElementById("gate-screen").style.display = "none";
        document.getElementById("main-app").style.display = "block";
    } else {
        alert("Passwort nicht korrekt.");
    }
}

function revealAddress() {
	
    const data = {
        n: "Björn Frischer",
        s: "Musterstraße",
        h: "123",
        z: "12345",
        o: "Musterstadt"
    };

    const container = document.getElementById('address-container');
    
    container.innerHTML = `
        <p class="revealed-text">
            ${data.n}<br>
            ${data.s} ${data.h}<br>
            ${data.z} ${data.o}
        </p>
    `;
    
    container.classList.add('fade-in');
}