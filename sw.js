const CACHE_NAME = `steno-v1`;

// Use the install event to pre-cache all initial resources.
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll([
      '/',
      '/ploverdemo.js',
      '/uiElements.js',

      "assets/binaryToSteno.json",
      "assets/dict.json",
      "assets/keyCodeToQwerty.json",
      "assets/keyCodeToSteno.json",
      "assets/stenoKeyNumbers.json",

      "output.css",
      "ploverdemo.css",
      "qwertyKeyboard.css",
      "stenoKeyboard.css",
      "verticalNotes.css"
    ]);
  })());
});

self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    // Get the resource from the cache.
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    } else {
        try {
          // If the resource was not in the cache, try the network.
          const fetchResponse = await fetch(event.request);

          // Save the resource in the cache and return it.
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        } catch (e) {
          // The network failed.
        }
    }
  })());
});