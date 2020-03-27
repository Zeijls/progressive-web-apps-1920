var CACHE_NAME = "v1";
var urlsToCache = ["/", "/css/main.css"];

// Install service worker
self.addEventListener("install", function(event) {
  // Voegt bestanden uit "urlsToCache" toe aan de cache
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Checkt en clonet de response, een voor de browser en een voor de cache
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Als er een response in de cache is, geef deze terug
      if (response) {
        return response;
      }

      // Als de request nog niet in de cache staat
      return fetch(event.request).then(function(response) {
        // Controlleer of het een valid response is
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        var responseToCache = response.clone();
        // Voegt nieuwe request toe aan cache
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    })
  );
});

// Update the service worker
self.addEventListener("activate", function(event) {
  var cacheWhitelist = ["pages-cache-v1", "blog-posts-cache-v1"];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
