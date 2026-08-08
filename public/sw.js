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
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match(OFFLINE_URL))
        )
    );
    return;
  }

  // For other requests, try cache first then network, fallback to offline page
  event.respondWith(
    caches.match(request).then((cached) =>
      cached || fetch(request).catch(() => caches.match(OFFLINE_URL))
    )
  );
});
