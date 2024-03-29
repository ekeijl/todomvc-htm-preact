# htm-preact • [TodoMVC](http://todomvc.com)

The idea for this project is to create a modern web app without using any bundler or other form of build process to develop the app. Only use native ES6 feature that are available in all major browsers. **It's mostly an experiment and I do not recommend this approach for production apps**.

> htm is JSX-like syntax in plain JavaScript - no transpiler necessary.
>
> Develop with React/Preact directly in the browser, then compile htm away for production.
>
> It uses standard JavaScript Tagged Templates and works in all modern browsers.

## Run

You only need a static file serve to serve the `index.html` and the JS modules. 

Either use the [VSCode Live Preview extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.live-server) or run something yourself:

```
npx serve
```

## Resources

- [HTM](https://github.com/developit/htm)
- [Preact](https://preactjs.com/)
- [Valtio](https://valtio.pmnd.rs/)

### Articles

- [ReverseHTTP NPM CDN](https://twitter.com/_developit/status/1261389109286719489)
- [Rewrite a webapp with ES6](https://medium.com/tastejs-blog/rewriting-a-webapp-with-ecmascript-6-39417b642cb2)

## Implementation

In order to offer a component based development approach without writing everything from scratch, I decided to use [HTM](https://github.com/developit/htm), which enables me to write JSX-like syntax without a transpiler.

I'm "cheating" a little bit by importing a set of pre-bundled libraries from a CDN. This approach is somewhere inbetween bundling modules with Webpack and including `<script>` tags to load third party libraries.

Styles are loaded from TodoMVC packages without modification.

### Import maps, CDN for third party modules

I'm using a Content Delivery Network (CDN) to bundle third party libraries for me. I send one request to the CDN per library and the service sends an optimized, cached bundle back. It's like having your `node_modules` folder in the cloud. 

By specifying an [import map](https://www.honeybadger.io/blog/import-maps/) in `index.html`, we can import libraries directly from a URL and use their aliased names in our JS modules. Import maps are [supported by all mainstream browsers](https://caniuse.com/import-maps).

### HTM, Preact & JSX

I feel very productive writing front-end UI components in React using JSX, so I wanted to have something similar for this app. After some googling I stumbled upon HTM, which promises JSX-like syntax without bundling, so I decided to give that a try. HTM plays nicely with Preact (a leaner version of React with [only slight differences](https://preactjs.com/guide/v8/differences-to-react/)).

Coming from React, the biggest difference is the way you write the JSX:

```js
// React
const root = createRoot(container);
const MyComponent = (props) => <div {...props} className="bar">{foo}</div>;
root.render(<MyComponent />);

// HTM + Preact
const MyComponent = (props, state) => htm`<div ...${props} class=bar>${foo}</div>`;
render(htm`<${MyComponent} />`, container);
```

### State management using Valtio

Valtio uses JavaScript proxies to wrap your state objects and track changes automagically. ✨

The state can be manipulated outside React/Preact too using vanilla JS.

All the logic for managing ToDo items is located in [store.mjs](./js/ToDo/store.mjs).

State is written to local storage using Valtio's `subscribe()` function on any change.

**Note**: there's a [small issue](https://github.com/pmndrs/valtio/issues/452) (and [this](https://github.com/facebook/react/issues/24590)) with Valtio and the dependency on `use-sync-external-store` (missing default export breaks the reverseHttp bundling) which prevents me 
from using `useSnapshot()` properly, so I use `valtio/vanilla` instead until I have a fix.

## Progressive Web App (PWA)

It is relatively simple to turn this app into a PWA, by adding a `service-worker.js` and `manifest.json` file.

The service worker is loaded in the `index.html` file.

- ⚠ We need to list all static assets (JS, images, etc) in our service worker file, because the service worker does not know which files should be cached. This is essential for offline availability.
   - In order to make this less of a chore, I added the `listCacheFiles.mjs` Node script that outputs all files that need to be cached. This file needs to be updated manually when the source code is refactored.
   - Sadly, this adds somewhat of a build step to our development process. Build tools like Webpack automate this process using [workbox](https://developer.chrome.com/docs/workbox/).
- I used a cache first strategy: the service workers tries to look up a resource in the cache first and responds with that if found, otherwise it sends the network request.
- Resources that are not initially cached are put into the cache when they are intercepted by the service worker (so called *runtime caching*).
   - This is required to properly cache external resources (import libraries and CSS).

## Comparison

Let's compare the app implemented in this repository to something like a React app bundled with Webpack and Babel.

**Pros**

- Zero build time!
- No build configuration to manage.
- No difference between environments: `development === production`.
- No transpiler. Uses native [ES6 features](http://kangax.github.io/compat-table/es6/) out of the box.
- Automatic lazy-loading modules.

**Cons**

- Slightly more boilerplate than pure JSX. Babel can do some heavy lifting for us and transpile JSX to good old function calls. But we don't have Babel, so we need to do some manual work to achieve a similar DX. This mainly boils down to calling the `htm` function with template strings.
- No tree-shaking. The JS engine cannot statically analyze the contents of a plain object, which means it cannot do some optimizations for static `import` performance.
- No minification. JS could be optimized by removing whitespace and renaming variables.
- Using a third-party service for delivering your modules is a bit of a risk, same as every CDN.
- No new JS language features (ES7+) unless you use polyfills or wait for browser support.
- No TypeScript or PropType validation (React), best we can do is write JSDoc and depend on intellisense of you IDE.
- It's harder to build a Progressive Web App, specifically enabling offline functionality, because we need to list all [urls of cached resources](https://web.dev/learn/pwa/caching/#caching-assets-in-a-service-worker) as a static list. Webpack can automatically generate this for you.

## Credit

Created by [Edwin Keijl](https://github.com/ekeijl)