const CACHE_NAME = 'isofitcalc-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-512.png'
];

// Installieren & sofort aktivieren (ohne auf Schließen der Tabs zu warten)
self.addEventListener('install', (e) => {
  self.skipWaiting(); 
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Alten Cache (v1) beim Aktivieren automatisch löschen
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
