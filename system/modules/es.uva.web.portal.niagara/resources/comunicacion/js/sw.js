'use strict';

self.addEventListener('install', function(event) {
    console.log("INSTALL");
    // pre cache a load of stuff:
    event.waitUntil(
        caches.open('comunicacion-static').then(function(cache) {
            return cache.addAll([
                '/',
				'/index.html',
				'/historico.html',
                '/ws/menu.jsp',
                '/ws/noticias.jsp',
				'/ws/noticiashistorico.jsp',
                '/ws/theconversation.jsp',
                '/ws/dicyt.jsp',
				'/sw.js',
				'/worker.js',
				'/resources/comunicacion/js/webcomponents-loader.js',
				'/resources/comunicacion/js/polyfill.min.js',
				'/resources/comunicacion/js/comunicacionStorage.js',
				'/resources/comunicacion/js/uvaheader.js',
				'/resources/comunicacion/js/navegacion.js',
				'/resources/comunicacion/js/slideshow.js',
				'/resources/comunicacion/js/noticias.js',
				'/resources/comunicacion/js/noticiashistorico.js',
				'/resources/comunicacion/js/eventos.js',
				'/resources/comunicacion/js/flickr.js',
				'/resources/comunicacion/js/theconversation.js',
				'/resources/comunicacion/js/dicyt.js',
				'/resources/comunicacion/css/bootstrap.min.css',
				'/resources/comunicacion/css/all.css'
                //'/styles/all.css',
                //'/styles/imgs/bg.png',
                //'/scripts/all.js'
            ]);
        })
    )
});
  
self.addEventListener('activate', function(event) {
// the old version is gone now, do what you couldn't
// do while it was still around
console.log("ACTIVATE");
/*
event.waitUntil(
    schemaMigrationAndCleanup()
)
*/
});

self.addEventListener('sync', function(event) {
    console.log("SYNC EVENT");
    console.log(event);
    if (event.tag == 'comunicacionSync') {
        console.log("SYNC");
       // event.waitUntil(doSomeStuff());
    }
});

self.addEventListener('fetch', function(event) {
    console.log("FETCH");
    console.log(event.request);
    //event.respondWith(new Response("Hello world!"));
    /*
    event.respondWith(
        caches.match(event.request).then(function(cachedResponse) {
        return cachedResponse || fetch(event.request);
        })
    );
    */
});