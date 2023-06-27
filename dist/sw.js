importScripts("precache-manifest.d57f563f59870173525faf13d59fc443.js", "../src/workbox-sw.js");

workbox.precaching.precacheAndRoute(self.__precacheManifest);

workbox.routing.registerRoute(
    /https:\/\/www\.example\.com\/api\/*\.json/,
    new workbox.strategies.NetworkFirst({
        cacheName: "api-cache",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 50,
                maxAgeSeconds: 10 * 86400,
                purgeOnQuetaError: true
            })
        ]
    })
);
