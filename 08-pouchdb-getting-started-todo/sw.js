const STATIC_CACHE_NAME = "static-v1";
const DYNAMIC_CACHE_NAME = "dynamic-v1";
const INMUTABLE_CACHE_NAME = "inmutable-v1";

const APP_SHELL = [
  "/",
  "/index.html",
  "/style/base.css",
  "/style/bg.png",
  "/js/app.js",
  "/js/base.js",
];

const INMUTABLE_APP_SHELL = [
  "//cdn.jsdelivr.net/npm/pouchdb@7.3.0/dist/pouchdb.min.js",
];

self.addEventListener("install", (event) => {
  const installStaticCache = caches.open(STATIC_CACHE_NAME).then((cache) => {
    cache.addAll(APP_SHELL);
  });

  const installInmutableCahe = caches
    .open(INMUTABLE_CACHE_NAME)
    .then((cache) => {
      cache.addAll(INMUTABLE_APP_SHELL);
    });

  event.waitUntil(Promise.all([installInmutableCahe, installStaticCache]));
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  
  const response = caches.match(request).then((res) => {
    if (res) return res;

    caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
      fetch(request).then((fetchRes) => {
        cache.put(request, fetchRes.clone());
        return fetchRes.clone();
      });
    });
  });

  event.respondWith(response);
});
