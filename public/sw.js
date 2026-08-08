const CACHE_NAME = 'business-ledger-v1';
const OFFLINE_URL = '/offline.html';
const ASSETS_TO_CACHE = [
  OFFLINE_URL,
  '/',
  '/pwa-launch.html',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/manifest.json',
];

self.addEventListener('install', (event) => {
  // Debug log
  console.log('[sw] install event, caching assets:', ASSETS_TO_CACHE);
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[sw] activate, clearing old caches');
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  console.log('[sw] fetch', request.method, request.url);
  // For navigation requests, try network first, then cache, then offline page
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // If response is OK (2xx) or a valid redirect, return it.
          if (response && response.status >= 200 && response.status < 400) {
            return response;
          }
          // Non-OK (4xx/5xx) — try cached navigation route or offline page
          console.warn('[sw] navigation fetch returned non-OK status', response.status, request.url);
          return caches.match(request).then((cached) => cached || caches.match(OFFLINE_URL));
        })
        .catch((err) => {
          console.warn('[sw] navigation fetch failed, falling back to cache/offline', err, request.url);
          return caches.match(request).then((cached) => cached || caches.match(OFFLINE_URL));
        })
    );
    return;
  }

  // For other requests, try cache first then network, fallback to offline page
  event.respondWith(
    caches.match(request).then((cached) =>
      cached || fetch(request).then((response) => {
        if (response && response.status >= 200 && response.status < 400) return response;
        // If non-OK response, fallback
        console.warn('[sw] resource fetch returned non-OK', response.status, request.url);
        return caches.match(OFFLINE_URL);
      }).catch((err) => {
        console.warn('[sw] resource fetch failed', err, request.url);
        return caches.match(OFFLINE_URL);
      })
    )
  );
});
