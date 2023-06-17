const CACHE_NAME = 'todo-app';

/* Add relative URL of all the static content you want to store in
 * cache storage (this will help us use our app offline)*/
let resourcesToCache = [
	'index.html',
	'manifest.json',
	'favicon.ico',
	'static/192.png',
	'static/512.png',
	'js/App.mjs',
	'js/Footer/index.mjs',
	'js/Header/index.mjs',
	'js/render.mjs',
	'js/ToDo/Filters.mjs',
	'js/ToDo/Footer.mjs',
	'js/ToDo/index.mjs',
	'js/ToDo/Item.mjs',
	'js/ToDo/List.mjs',
	'js/ToDo/store.mjs',
	'js/ToDo/Todos.mjs',
	'js/ToDo/useFilter.mjs',
	'js/ToDo/useTodos.mjs',
	'js/util/groupBy.mjs',
];

self.addEventListener('install', (e) => {
	e.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(resourcesToCache);
		})
	);
});

// Cache and return requests
self.addEventListener('fetch', (e) => {
	e.respondWith(
		caches.match(e.request).then(async (response) => {
			if (response) return response;

            const networkResponse = await fetch(e.request);
			const clonedResponse = networkResponse.clone();

			// save response to runtime cache for later use
			// https://www.harrytheo.com/blog/2021/03/cache-handling-with-service-workers-and-the-cache-api/#runtime-caching--vanilla
			const runtimeCache = await caches.open('runtime-cache');
			runtimeCache.put(e.request, networkResponse);

			// respond with the cloned network response
			return Promise.resolve(clonedResponse);
		})
	);
});

// Update a service worker
const cacheWhitelist = ['todo-app'];
self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheWhitelist.indexOf(cacheName) === -1) {
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});
