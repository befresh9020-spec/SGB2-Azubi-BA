const CACHE_NAME = 'sgbii-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/subpage1.html',
  '/subpage2.html',
  '/subpage3.html',
  '/subpage2.css',
  '/theme3.js'
];

// Installations-Event: Dateien werden gecacht
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch-Event: versucht erst Cache, dann Netz
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});