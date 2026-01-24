// Name deiner Cache-Version – bei Änderungen hochzählen, z.B. "v2"
const CACHE_NAME = "sgb2-lernen-cache-v1.1";

// Dateien, die direkt beim Installieren gecacht werden sollen:
const PRECACHE_URLS = [
  "index.html",
  "styles.main.css",
  "gate.js",
  "Quiz.html",
  "Berechtigte.html",
  "Berechtigte_SV.html",
  "Bedarfe.html",
  "Bedarfe_SV.html",
  "VM.html",
  "VM_FW_Haerte.html",
  "VM_FW_Hausrat.html",
  "VM_FW_KFZ.html",
  "VM_SV.html",
  "EK.html",
  "EK_FW_Fahrt.html",
  "EK_SV.html",
  "Hilfebeduerftigkeit.html",
  "9_SV.html",
  "BAM.html",
  "Minderung.html",
  "Minderung_SV.html",
  "subpage2.css",
  "theme3.js",
  "AGP1.html",
  "AGP2.html",
  "AGP_SV.html",
  "Audio.html",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png"
  // ggf. weitere JS/CSS-Dateien, falls ausgelagert
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
});

// Alte Caches aufräumen, wenn CACHE_NAME geändert wurde
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
});

// Fetch-Handler: erst Cache, dann Netzwerk (fallback)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Wenn im Cache gefunden -> direkt zurückgeben
      if (response) {
        return response;
      }
      // Sonst normal aus dem Netz holen
      return fetch(event.request);
    })
  );
});
