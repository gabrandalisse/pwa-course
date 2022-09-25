// Service Worker lifecycle

/**
 * the install event is triggered when the code of the service worker changes
 * the event install the new service worker but it does not activate it yet.
 *
 * In this event we can, for example, download page assets, create a cache, etc.
 */
self.addEventListener("install", (event) => {
  console.log("[service worker]: installing");

  const installation = new Promise((resolve, reject) => {
    // we simulate that the installation last 1 ms
    setTimeout(() => {
      console.log("[service worker]: the installation is complete");

      // this allow us to not wait unil the user closes the tab, it install the service worker automatically
      self.skipWaiting();
      resolve();
    }, 1);
  });

  /**
   * All the events executes very fast, if some process of the installation process last longer that the installation event
   * we have to use event.waitUnitl, this allow us to let that process finish before the installation event is complete.
   */
  event.waitUntil(installation);
});

/**
 * This event means that the new service worker is intalled and it have controll above the app
 * and it also means that the old service worker is disables.
 *
 * In this even we can, for example, delete old cache.
 */
self.addEventListener("activate", (event) => {
  console.log("[service worker]: activated");
});

/**
 * This events is triggered by any http and/or api request
 * it allow us to have control above all the app requests.
 *
 * In this event we can, for example, apply cache strategies.
 */
self.addEventListener("fetch", (event) => {
  /* 
    console.log('[service worker]: intercepted request url', event.request.url);

    if (event.request.url.includes('https://reqres.in')) {
        const newResponse = new Response(`{
            ok: false,
            msg: 'hello world'
        }`);

        event.respondWith(newResponse);
    }
    */
});

/**
 * This event is triggered when we get back the internet connection (if it is losted) in the app.
 */
self.addEventListener("sync", (event) => {
  console.log("[service worker]: we have internet connection");

  // we can identify the data we want to post or save or smth by this tag
  console.log(event.tag);
});

/**
 * With this event we can handle the push notifications.
 */
self.addEventListener("push", (event) => {
  console.log("[service worker]: notification received");
});
