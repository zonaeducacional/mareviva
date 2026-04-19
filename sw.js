// ============================================================
// MARÉ VIVA – Service Worker
// Offline-First Strategy: Cache First, Network Fallback
// ============================================================

const CACHE_NAME = 'mare-viva-v1.4';
const STATIC_CACHE = 'mare-viva-static-v1.4';
const DATA_CACHE = 'mare-viva-data-v1.4';

const STATIC_ASSETS = [
  './',
  'index.html',
  'manifest.json',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/apple-touch-icon.png',
  'https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Nunito:wght@400;600;700&display=swap',
];

// ---- INSTALL ----
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Maré Viva Service Worker...');
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS.map(url => new Request(url, { mode: 'no-cors' })))
        .catch(err => console.log('[SW] Cache error (non-fatal):', err));
    }).then(() => self.skipWaiting())
  );
});

// ---- ACTIVATE ----
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Maré Viva Service Worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(name => name !== STATIC_CACHE && name !== DATA_CACHE)
          .map(name => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// ---- FETCH – Cache First Strategy ----
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Google Fonts – network first with cache fallback
  if (url.origin.includes('fonts.googleapis.com') || url.origin.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;
        try {
          const response = await fetch(request);
          cache.put(request, response.clone());
          return response;
        } catch {
          return cached || new Response('/* offline */', { headers: { 'Content-Type': 'text/css' } });
        }
      })
    );
    return;
  }

  // Weather API – network first, cache for 1 hour
  if (url.pathname.includes('/weather') || url.pathname.includes('/forecast')) {
    event.respondWith(
      caches.open(DATA_CACHE).then(async (cache) => {
        try {
          const response = await fetch(request);
          cache.put(request, response.clone());
          return response;
        } catch {
          const cached = await cache.match(request);
          return cached || new Response(JSON.stringify({ error: 'offline' }), {
            headers: { 'Content-Type': 'application/json' }
          });
        }
      })
    );
    return;
  }

  // App Shell – cache first
  event.respondWith(
    caches.open(STATIC_CACHE).then(async (cache) => {
      const cached = await cache.match(request);
      if (cached) {
        // Update cache in background
        fetch(request).then(response => {
          if (response && response.status === 200) {
            cache.put(request, response);
          }
        }).catch(() => {});
        return cached;
      }

      try {
        const response = await fetch(request);
        if (response && response.status === 200 && request.method === 'GET') {
          cache.put(request, response.clone());
        }
        return response;
      } catch {
        // Offline fallback
        const fallback = await cache.match('index.html');
        return fallback || new Response('Offline – Maré Viva', {
          status: 503,
          headers: { 'Content-Type': 'text/plain' }
        });
      }
    })
  );
});

// ---- BACKGROUND SYNC (for notes) ----
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-notes') {
    event.waitUntil(syncNotes());
  }
});

async function syncNotes() {
  // Notes are stored in localStorage – no sync needed
  console.log('[SW] Notes sync check');
}

// ---- PUSH NOTIFICATIONS ----
self.addEventListener('push', (event) => {
  const data = event.data?.json() || {};
  const title = data.title || 'Maré Viva';
  const options = {
    body: data.body || 'Nova informação disponível',
    icon: 'icons/icon-192.png',
    badge: 'icons/icon-192.png',
    vibrate: [200, 100, 200],
    data: data,
    actions: [
      { action: 'view', title: '🌊 Ver Marés' },
      { action: 'close', title: 'Fechar' }
    ]
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'view') {
    event.waitUntil(clients.openWindow('index.html#mare'));
  } else {
    event.waitUntil(clients.openWindow('index.html'));
  }
});

console.log('[SW] Maré Viva Service Worker loaded ✓');
