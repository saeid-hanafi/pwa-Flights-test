// Install Service Worket And Set Catch
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open("home").then(cache => {
            cache.add("/pwa");
        })
    )
});

// Fetch Service Worker Catch If Exists And Fetch From Server If Not Exists
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request)
        })
    )
});