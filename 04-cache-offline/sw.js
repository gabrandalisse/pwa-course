/*
  The app shell is what the app need to work (the main files)
  In this case the img/main-patas-arribas.jpg is not part of the shell app

  ! All promises can be replazed with async/await
*/

// const CACHE_NAME = 'cache-1';
const CACHE_STATIC_NAME = "static-v2";
const CACHE_DYNAMIC_NAME = "dynamic-v1";
/**
 * In this cache will be saving files or request like boostrap
 * because that files do not change ever
 */
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

/**
 * We save the app shell in the cache in the install event
 */
self.addEventListener("install", (event) => {
  const cacheProm = caches.open(CACHE_STATIC_NAME).then((cache) => {
    return cache.addAll([
      "/", // We need to put this, if not the localhost request in network tab does not work
      "/index.html",
      "/css/style.css",
      "/img/main.jpg",
      "/img/no-img.jpg",
      "/js/app.js",
    ]);
  });

  const cacheInmutable = caches
    .open(CACHE_INMUTABLE_NAME)
    .then((cache) =>
      cache.addAll([
        "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css",
      ])
    );

  event.waitUntil(Promise.all([cacheProm, cacheInmutable]));
});

//* Cache strategies (all cache strategies are applied in the fetch event)

self.addEventListener("fetch", (event) => {
  /**
   ** Cache only strategy
   * In this strategy we save all the app in the cache and never make a 
   * request to the internet
   
   event.respondWith( caches.match( event.request ) );
  */

  /**
    ** Cache with network fallback strategy 
    * First we try to get the file or the request from the cache
    * If there is no file we get it from the internet 

    const cacheRes = caches.match(event.request).then((res) => {
      if (res) return res;
      else
        return fetch(event.request).then((newResp) => {
     
          Once we have the response we save it in the cache, so we do not have to
          make the request if the files is not in the cache
     
          caches.open(CACHE_DYNAMIC_NAME).then((cache) => {
          cache.put(event.request, newResp);
          clearCache(CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT);
        });
    
        return newResp.clone();
      });
    });
    event.respondWith(cacheRes); 
  */

  /** 
    **  Network with cache fallback straregy
    * Get the resource from the internet, if we can get it we show it if not
    * we check if it is in the cache

    const cacheRes = fetch(event.request).then(response => {
      if (!res) {
        return caches.match(event.request);
      }

      caches.open(CACHE_DYNAMIC_NAME).then(cache => {
        cache.put(event.request, response);
        clearCache(CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT);
      });
      return response.clone();
    }).catch(err => {
      return caches.match(event.request);
    })
    event.respondWith(cacheRes);
  */

  /**
   ** Cache with network update strategy
   * Is usefull when the performance is critic
   * The updates are a version behind of the app
   
    if (event.request.url.includes('bootstrap')) {
      return event.respondWith(
        caches.match(event.request)
      )
    }
    const cacheRes = caches.open(CACHE_STATIC_NAME).then(cache => {
      fetch(event.request).then(newRes => cache.put(event.request, newRes));
      return cache.match(event.request);
    });
    event.respondWith(cacheRes);
  */

  /**
   ** Cache and network race strategy
   */
  const cacheRes = new Promise((resolve, reject) => {
    let rejected = false;

    const failOnce = () => {
      if (rejected) {
        if (/\.(png|jpg)$/i.test(event.request.url)) {
          // The request is for a img
          resolve(caches.match("/img/no-img.jpg"));
        } else {
          reject("no responde found");
        }
      } else {
        rejected = true;
      }
    };

    fetch(event.request)
      .then((res) => {
        res.ok ? resolve(res) : failOnce();
      })
      .catch(failOnce);

    caches
      .match(event.request)
      .then((res) => {
        res ? resolve(res) : failOnce();
      })
      .catch(failOnce);
  });
  event.respondWith(cacheRes);
});
