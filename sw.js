const CACHE_NAME = 'browletto-v1';
const ASSETS = [
  './browletto-order.html',
  './browletto-admin.html',
  './manifest.json',
  './manifest-admin.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Cache-first for our own files, network-first (pass-through) for everything else
// (Firebase/Google Fonts calls should always try the network first)
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const isOwnFile = ASSETS.some((a) => url.pathname.endsWith(a.replace('./', '/')));

  if (isOwnFile) {
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
  }
  // else: let the browser handle it normally (Firebase, fonts, etc.)
});
