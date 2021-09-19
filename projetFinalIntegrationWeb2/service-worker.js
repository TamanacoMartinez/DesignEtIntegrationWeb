//Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v3';

//Add list of files to cache here.
const FILES_TO_CACHE = [
    'offline.html',
    'index.html',
    'biographie.html',
    'discographie.html',
    'marchandise.html',
    'divers.html',
    'anijs.js',
    'pushIn.js',
    'bootstrap-4.3.1-dist',
    'css/anicollection.css',
    'animate.css-main/animate.css',
    'css/style.css',
    'css/styleBiographie.css',
    'css/styleDiscographie.css',
    'css/styleDivers.css',
    'css/styleFooter.css',
    'css/styleIndex.css',
    'css/styleMarchandise.css',
    'css/styleNavbar.css',
    'media/Live.jpg',
    'media/lost-wishes.jpg',
    'media/cureHigh.jpg',
    'media/cureHigh2.jpg',
    'media/catch.jpg',
    'media/rob1-300x293.jpg',
    'media/jazzmaster.jpg',
    'media/Ultra-Cure-40th-Anniversary.jpg',
    'media/Boss-Delay.jpg',
    'media/Boss-Chorus.jpg',
    'media/CC210616708-body-large.jpg',
    'media/Bass-VI_x5d0oe.jpg',
    'media/membres/Simon_Gallup_2012.jpeg',
    'media/membres/1024px-Robert_Smith_-_The_Cure_-_Roskilde_Festival_2012_-_Orange_Stage.jpg',
    'media/membres/Entrevista-Lol-Tolhurst-bat.png',
    'media/membres/800px-150-Reeves-Gabrels.jpg',
    'media/membres/640full-boris-williams.jpg',
    'media/membres/Perry-Bamonte.jpg',
    'media/membres/Jason-Cooper.jpg',
    'media/membres/simon-gallup-cure-trnd.jpg',
    'media/discographie/The-Cure-LiveFromTheMoon.png'


];

self.addEventListener('install', (evt) => {
    console.log('[ServiceWorker] Install');
    // Precache static resources here.
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[ServiceWorker] Pre-caching offline page');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
    console.log('[ServiceWorker] Activate');
    //Remove previous cached data from disk.
    evt.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    self.clients.claim();
});


self.addEventListener('fetch', (evt) => {
    console.log('[ServiceWorker] Fetch', evt.request.url);
    //Add fetch event handler here.
    if (evt.request.mode !== 'navigate') {
        // Not a page navigation, bail.
        return;
    }
    evt.respondWith(
        fetch(evt.request)
        .catch(() => {
            return caches.open(CACHE_NAME)
                .then((cache) => {
                    return cache.match('/DesignEtIntegrationWeb/projetFinalIntegrationWeb2/offline.html');
                });
        })
    );

});



// Register service worker.
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then((reg) => {
                console.log('Service worker registered.', reg);
            });
    });
}