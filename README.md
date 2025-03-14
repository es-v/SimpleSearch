# SimpleSearch
A very simple navigational search homepage with a background using Bing's image API and support for adding search engines on your own.

## Feature

- Support switching between multiple search engines:Google、Bing、Baidu、DuckDuckGo and SearXNG
- Hair glass UI design with daily Bing wallpapers
- Collapsible bookmark category management
- Responsive layout, compatible with various screen sizes
- The default search engine and bookmark category expansion status are set for local storage memory.

## Screenshots

## Tech Stack

- HTML5/CSS3
- JavaScript
- Tailwind CSS + Flowbite UI
- Glass Morphism

## Online Preview

https://es-v.github.io/SimpleSearch/

## Interface Preview

![Interface Preview](https://raw.githubusercontent.com/es-v/SimpleSearch/main/preview.jpg)


## Project Structure
<pre>
index.html            # Main Page
Dockerfile            # Dockerfile
nginx.conf            # Nginx Conf
assets/
  img/                # Icon
    web.svg
    ...
  js/
    app.js            # Application Logic
</pre>

## Customized

### Add a new search engine

Add a new search engine configuration to the `searchEngines` object in `app.js`:

```javascript
const searchEngines = {
    // ...
    newengine: {
        name: 'Engines Name',
        url: 'Search URL',
        paramName: 'Query Parameter',
        logo: 'icon URL'
    }
};
```

Then add the corresponding button to the engine selector area in `index.html`.

```html
<!-- You can log out of search engines you don't like and keep only the commonly used. -->
<button type="button"
    class="engine-button px-4 py-2 flex items-center justify-center rounded-full bg-white border border-gray-300 shadow-sm hover:shadow-md transition-shadow"
    data-engine="newengine">
    <img src="icon URL" alt="Engines Name" class="engine-logo" onerror="this.style.display='none'">
    <span>Engines Name</span>
</button>
```

### Add new bookmark

Add a new bookmark item under the appropriate bookmark category:

```html
<div class="bg-white rounded-lg shadow-sm p-3 card-hover mini-bookmark">
    <a href="https://example.com" target="_blank" class="flex flex-col items-center justify-center">
        <img src="https://example.com/favicon.ico" alt="WebSite" class="w-8 h-8 mb-2" onerror="this.src='./assets/img/web.svg'">
        <span class="text-xs font-medium text-gray-800">WebSite</span>
    </a>
</div>
```

## License

[MIT](https://raw.githubusercontent.com/es-v/SimpleSearch/main/LICENSE)
