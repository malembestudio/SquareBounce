const CACHE_NAME = "square-bounce-v1";
const urlsToCache = [
  "index.html",
  "manifest.json",
  "service-worker.js",
  "icon-192.png",
  "icon-512.png",
  // 👇 Agrega aquí tus archivos adicionales (CSS, imágenes, sonidos, etc.)
];

// Instalar y guardar en caché
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("📦 Archivos cacheados");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activar y limpiar cachés viejas
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("🗑️ Caché vieja eliminada:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Interceptar peticiones y responder desde caché
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
