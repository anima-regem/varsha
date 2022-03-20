// Installing service worker
const CACHE_NAME = 'varsha';

let resourcesToCache = ["./", "./index.html", "/service-worker.js", "./images/logo.jpg", "logo.png", "./images/bg.jpg", "./images/icon.ico", "./fonts/Quicksand-Bold.ttf", "./fonts/Quicksand-Light.ttf", "./fonts/Quicksand-Regular.ttf", "./manifest.json", "./style.css"];

self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(resourcesToCache);
        })
    );
});
// Cache and return requests
self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});

const cacheWhitelist = ['varsha'];
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});