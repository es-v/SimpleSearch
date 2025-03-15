# SimpleSearch
A very simple navigational search homepage with a background using Bing's image API and support for adding search engines on your own. 

You can customize your own bookmark page by modifying the search engine and bookmarks in [app.js](https://raw.githubusercontent.com/es-v/SimpleSearch/main/assets/js/app.js). The project also provides a [worker.js](https://raw.githubusercontent.com/es-v/SimpleSearch/main/worker.js) file, which you can deploy and host for free using [Cloudflare Workers](https://dash.cloudflare.com/).

## Feature

- Support switching between multiple search engines:Google、Bing、Baidu、DuckDuckGo and SearXNG
- Hair glass UI design with daily Bing wallpapers
- Collapsible bookmark category management
- Responsive layout, compatible with various screen sizes
- The default search engine and bookmark category expansion status are set for local storage memory.

## Tech Stack

- HTML5/CSS3
- JavaScript
- Tailwind CSS + Flowbite UI
- Glass Morphism

## Online Preview

https://es-v.github.io/SimpleSearch/

## Interface Preview

![Interface Preview](https://raw.githubusercontent.com/es-v/SimpleSearch/main/preview.jpg)


## Version History

You can check the `APP_VERSION` in [app.js](https://raw.githubusercontent.com/es-v/SimpleSearch/main/assets/js/app.js) file to see it.
W
- **v1.0.0**: Initial release with basic functionality as shown in screenshots
- **v1.1.0**: Added support for more search engines
- **v2.0.0**: Changed bookmarks and search engines to be dynamically generated
- **v2.0.1**: Added the worker.js file, now you can deploy it in [Cloudflare Workers](https://dash.cloudflare.com/)
- **v2.0.2**: Changed bookmarks and search engines to be dynamically generated
- **v2.0.3**: Now bookmark categories can also be auto-generated. You just need to add new categories under bookmarks, including the name and the SVG code for the icon. If you use worker.js, pay attention to escaping the backticks (\`).

## Project Structure
<pre>
worker.js             # Cloudflare Workers
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
    //...
    newengine: {
        name: 'newengine',
        url: 'https://www.newengine.com/search',
        paramName: 'q',
        logo: 'https://www.newengine.com/favicon.ico'
    },
    //...
};
```

 Then, buttons and icons will be dynamically generated on the HTML page.

### Add new bookmark

Add a new bookmark item under the appropriate bookmark category:

```javascript
const bookmarks = {
    //...
    favorite: [
        name: 'Favorite',
        icon: '<svg>...</svg>'
        {
            name: 'newTab',
            url: 'https://newTab.com',
            img: 'https://newTab.com/favicon.ico'
        },
    //...
    ],
//...
}
```

 Then, buttons and icons will be dynamically generated on the HTML page.

## License

[MIT](https://raw.githubusercontent.com/es-v/SimpleSearch/main/LICENSE)
