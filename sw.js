// Çevrimdışı okuma için service worker.
// Uygulama kabuğu kurulumda önbelleğe alınır; özet dosyaları açıldıkça önbelleğe eklenir.
// İçerik değiştiğinde VERSION artırılmalı ki kullanıcılar yeni sürümü alsın.
const VERSION = 'v2';
const CACHE = 'ozetler-' + VERSION;
const SHELL = [
  './', 'index.html', 'style.css', 'app.js', 'manifest.json',
  'data/books.js', 'data/scenes.js',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png', 'icons/favicon.png',
];

// Hazır özetlerin hepsi küçük dosyalar; kurulumda topluca indirilir
importScripts('data/books.js');
const SUMMARIES = BOOKS.filter(b => b.ready).map(b => `data/summaries/${b.id}.js`);

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll([...SHELL, ...SUMMARIES])).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Önce ağ, olmazsa önbellek: çevrimiçiyken her zaman güncel içerik, çevrimdışıyken son okunan
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req)
      .then(res => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('index.html')))
  );
});
