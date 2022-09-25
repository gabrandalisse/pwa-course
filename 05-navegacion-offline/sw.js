// Cache with network fallback

const CACHE_STATIC_NAME = "static-v5";
const CACHE_DYNAMIC_NAME = "dynamic-v1";
const CACHE_INMUTABLE_NAME = "inmutable-v1";

const CACHE_DYNAMIC_LIMIT = 50;

function clearCache(cacheName, itemsNumber) {
  caches.open(cacheName).then((cache) => {
    return cache.keys().then((keys) => {
      if (keys.length > itemsNumber) {
        cache.delete(keys[0]).then(clearCache(cacheName, itemsNumber));
      }
    });
  });
}

self.addEventListener("install", (event) => {
  const cacheProm = caches.open(CACHE_STATIC_NAME).then((cache) => {
    return cache.addAll([
      "/",
      "/index.html",
      "/pages/offline.html",
      "/css/style.css",
      "/img/main.jpg",
      "/js/app.js",
      "/img/no-img.jpg",
    ]);
  });

  const cacheInmutable = caches
    .open(CACHE_INMUTABLE_NAME)
    .then((cache) =>
      cache.add(
        "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
      )
    );

  event.waitUntil(Promise.all([cacheProm, cacheInmutable]));
});

// It only trigger when the installation finish
self.addEventListener("activate", (event) => {
  const response = caches.keys().then((keys) => {
    keys.forEach((key) => {
      if (key !== CACHE_STATIC_NAME && key.includes("static")) {
        return caches.delete(key);
      }
    });
  });

  event.waitUntil(response);
});

self.addEventListener("fetch", (event) => {
  const response = caches.match(event.request).then((res) => {
    if (res) return res;

    return fetch(event.request)
      .then((newResp) => {
        caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
          cache.put(event.request, newResp);
          clearCache(CACHE_DYNAMIC_NAME, 50);
        });

        return newResp.clone();
      })
      .catch((err) => {
        if (event.request.headers.get("accept").includes("text/html")) {
          return caches.match("/pages/offline.html");
        }
      });
  });

  event.respondWith(response);
});
