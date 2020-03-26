// Bron; https://www.youtube.com/watch?v=ksXwaWHCW6k

const cacheName = "version-1";

// Roept zelf het event aan op de service worker te installeren
self.addEventListener("install", function(event) {
  console.log("Service worker is installed");
});

// Roept zelf het event aan om de service worker te activeren
self.addEventListener("activate", function(event) {
  console.log("Service worker is activated");

  // Verwijder alle caches die je niet nodig hebt
  // Loop door de caches
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(function(cache) {
          console.log("Service Worker cleared old cache");
          return cache === cacheName;
        })
      );
    })
  );
});

// Roept zelf het event aan om te fetchen
self.addEventListener("fetch", function(event) {
  console.log("Service Worker is fetching");
  event.respondWith(
    fetch(event.request)
      .then(function(res) {
        // Maak een copy / clone vn het response op de server
        const resClone = res.clone();
        caches.open(cacheName).then(function(cache) {
          // Voeg de response toe aan de cache

          cache.put(event.request, resClone);
          // .then(cache => cache.match('/offline'))
        });
        return res;
      })
      .catch(err => caches.match(event.request).then(res => res))
  );
});
