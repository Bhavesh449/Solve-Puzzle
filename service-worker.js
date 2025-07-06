const CACHE_NAME = "solve-puzzle-v1";
const assetsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/puzzle.png",
  "/thinking.png",
  "/click.wav",
  "/shuffle.wav",
  "/win.wav",
  "/tick.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assetsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedRes => {
      return cachedRes || fetch(event.request);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }))
    )
  );
});
