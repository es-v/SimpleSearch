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

## Interface Preview

![Interface Preview](https://raw.githubusercontent.com/es-v/SimpleSearch/main/preview.jpg)

index.html            # Main Page
assets/
  img/                # Search Engine Icon
    baidu.ico
    bing.ico
    duckduckgo.ico
    google.ico
    searxng.png
  js/
    app.js            # Application Logic

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

### Add new bookmark

Add a new bookmark item under the appropriate bookmark category:

```html
<div class="bg-white rounded-lg shadow-sm p-3 card-hover mini-bookmark">
    <a href="https://example.com" target="_blank" class="flex flex-col items-center justify-center">
        <img src="https://example.com/favicon.ico" alt="网站名称" class="w-8 h-8 mb-2">
        <span class="text-xs font-medium text-gray-800">网站名称</span>
    </a>
</div>
```

## License

MIT
