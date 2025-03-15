// This file is deployed using Cloudflare Workers. https://dash.cloudflare.com/<userid>/workers-and-pages
// You can paste all the code into the newly created worker.js file on Cloudflare.
// Then click on Deploy, and it also supports custom domain names.
// Since I am quite lazy, I directly escaped the ' to embed app.js into worker.js, so I didn't have to create a new file.
// Although it is very convenient, note that when adding bookmarks, you need to escape the code in the <svg> as well, i.e., add a \ before the ', otherwise it will cause an error.
// In addition, I modified the generation logic for the search engine icon and bookmark icon. I first attempt to load them online, and if that fails, I hide them directly.
// The benefit of this approach is that local icons are no longer needed, and when the search engine icon fails to load, you know that your network conditions are not suitable for using this engine.

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
    const url = new URL(request.url)
    const path = url.pathname
    
    // Handle root path requests and return index.html
    if (path === '/' || path === '') {
      return new Response(INDEX_HTML, {
        headers: { 'Content-Type': 'text/html' }
      })
    }
    
    // Handle resource requests
    if (path === '/assets/js/app.js') {
      return new Response(APP_JS, {
        headers: { 'Content-Type': 'application/javascript' }
      })
    }
    
    // If no matching resources are found, return a 404.
    return new Response('Not Found', { status: 404 })
  }
  
  // Static resources are stored as strings.
  const INDEX_HTML = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Search Navigation">
    <meta name="keywords" content="S1mpleSearch, Search Navigation, Search Engine, Quick Bookmarks">
    <title>Search Navigation</title>
    <link rel="icon" href="https://raw.githubusercontent.com/es-v/SimpleSearch/main/assets/img/search.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="https://raw.githubusercontent.com/es-v/SimpleSearch/main/assets/img/search.svg">
    <!-- Flowbite and Tailwind CSS -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/flowbite.min.css" rel="stylesheet" />
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        :root {
            --primary-50: #eff6ff;
            --primary-100: #dbeafe;
            --primary-200: #bfdbfe;
            --primary-300: #93c5fd;
            --primary-400: #60a5fa;
            --primary-500: #3b82f6;
            --primary-600: #2563eb;
            --primary-700: #1d4ed8;
            --primary-800: #1e40af;
            --primary-900: #1e3a8a;
            --primary-950: #172554;
        }

        body {
            font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
        }

        .bg-primary-500 {
            background-color: var(--primary-500);
        }

        .bg-primary-600 {
            background-color: var(--primary-600);
        }

        .bg-primary-700 {
            background-color: var(--primary-700);
        }

        .hover\:bg-primary-700:hover {
            background-color: var(--primary-700);
        }

        .focus\:ring-primary-300:focus {
            --tw-ring-color: var(--primary-300);
        }

        .focus\:ring-primary-500:focus {
            --tw-ring-color: var(--primary-500);
        }

        .focus\:border-primary-500:focus {
            border-color: var(--primary-500);
        }

        .text-primary-600 {
            color: var(--primary-600);
        }

        .search-gradient {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }

        .card-hover {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .engine-logo {
            width: 24px;
            height: 24px;
            margin-right: 8px;
        }
    </style>
</head>

<body class="bg-gray-50 min-h-screen font-body">
    <div class="container mx-auto px-4 py-8">
        <!-- Header and Navigation Bar -->
        <header class="mb-8">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <h1 class="text-2xl font-bold mb-4 md:mb-0 text-gray-800">
                    <a href="https://github.com/es-v/SimpleSearch/"><span
                            class="search-gradient">Simple</span>Search</a>
                </h1>
                <nav class="w-full md:w-auto">
                    <div class="flex flex-col md:flex-row md:space-x-4">
                        <button id="homeBtn"
                            class="px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 mb-2 md:mb-0">Home</button>
                    </div>
                </nav>
            </div>
        </header>

        <!-- Main Search Form -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-8 transform transition-all">
            <form id="searchForm" class="space-y-6">
                <div class="relative">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-5 h-5 text-primary-600 search-gradient" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="searchInput"
                        class="block w-full p-4 ps-10 text-lg rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Search anything..." required>
                    <button type="submit"
                        class="absolute end-2.5 bottom-2.5 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-md px-5 py-2 text-white">Search</button>
                </div>

                <!-- Search Engine Selector -->
                <div class="flex flex-wrap gap-3 justify-center" id="engineSelector">
                    <!-- The search engine button will be dynamically generated by JavaScript. -->
                </div>
            </form>
        </div>

        <!-- Quick Bookmarks Section -->
        <div class="mb-8">
            <h2 class="text-xl font-semibold mb-4 text-gray-700">Quick Bookmarks</h2>
            
            <!-- Bookmarks container - all categories will be dynamically generated here -->
            <div id="bookmarksContainer">
                <!-- Bookmark categories and items will be dynamically generated by JavaScript -->
            </div>
        </div>
    </div>

    <!-- Flowbite JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.0/flowbite.min.js"></script>

    <!-- Application JS -->
    <script src="./assets/js/app.js"></script>
</body>

</html>
  `
  
  const APP_JS = `//
// DOM Elements
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const engineSelector = document.getElementById('engineSelector');
const engineButtons = document.querySelectorAll('.engine-button');
const homeBtn = document.getElementById('homeBtn');
const body = document.body;

// App State
let currentEngine = localStorage.getItem('defaultEngine') || 'google';
const APP_VERSION = '2.0.3'; 

// Search engine configurations
const searchEngines = {
    google: {
        name: 'Google',
        url: 'https://www.google.com/search',
        paramName: 'q',
        logo: 'https://www.google.com/favicon.ico'
    },
    bing: {
        name: 'Bing',
        url: 'https://www.bing.com/search',
        paramName: 'q',
        logo: 'https://www.bing.com/favicon.ico'
    },
    baidu: {
        name: 'Baidu',
        url: 'https://www.baidu.com/s',
        paramName: 'wd',
        logo: 'https://www.baidu.com/favicon.ico'
    },
    duckduckgo: {
        name: 'DuckDuckGo',
        url: 'https://duckduckgo.com/',
        paramName: 'q',
        logo: 'https://duckduckgo.com/favicon.ico'
    },
    yahoo: {
        name: 'Yahoo',
        url: 'https://search.yahoo.com/search',
        paramName: 'q',
        logo: 'https://search.yahoo.com/favicon.ico'
    },
    startpage: {
        name: 'StartPage',
        url: 'https://www.startpage.com/search',
        paramName: 'q',
        logo: 'https://www.startpage.com/favicon.ico'
    },
    ask: {
        name: 'Ask',
        url: 'https://www.ask.com/search',
        paramName: 'q',
        logo: 'https://www.ask.com/favicon.ico'
    },
    searxng: {
        name: 'SearXNG',
        url: 'https://search.vsar.site/search',
        paramName: 'q',
        logo: 'https://search.vsar.site/favicon.ico'
    },
    feloai: {
        name: 'FeloAI',
        url: 'https://felo.ai/search',
        paramName: 'q',
        logo: 'https://felo.ai/icon.svg'
    },
    yandex: {
        name: 'Yandex',
        url: 'https://yandex.eu/search',
        paramName: 'text',
        logo: 'https://yandex.eu/favicon.ico'
    },
    metaso: {
        name: 'Metaso',
        url: 'https://metaso.cn/',
        paramName: 'q',
        logo: 'https://metaso.cn/favicon.ico'
    }
};

const bookmarks = {
    tech: {
        name: 'Technical Website',
        icon: \`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 category-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>\`,
        items: [
            {
                name: 'GitHub',
                url: 'https://github.com',
                img: 'https://github.com/favicon.ico'
            },
            {
                name: 'LinuxDO',
                url: 'https://linux.do',
                img: 'https://linux.do/uploads/default/optimized/3X/9/d/9dd49731091ce8656e94433a26a3ef36062b3994_2_32x32.png'
            },
            {
                name: '52Pojie',
                url: 'https://www.52pojie.cn',
                img: 'https://www.52pojie.cn/favicon.ico'
            },
            {
                name: 'Zhihu',
                url: 'https://www.zhihu.com',
                img: 'https://www.zhihu.com/favicon.ico'
            },
            {
                name: 'V2EX',
                url: 'https://v2ex.com',
                img: 'https://v2ex.com/favicon.ico'
            }
        ]
    },
    tools: {
        name: 'Common Tools',
        icon: \`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 category-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>\`,
        items: [
            {
                name: 'ChatGPT',
                url: 'https://chat.openai.com',
                img: 'https://openai.com/favicon.ico'
            },
            {
                name: 'Grammarly',
                url: 'https://www.grammarly.com',
                img: 'https://static-web.grammarly.com/cms/master/public/favicon.ico'
            },
            {
                name: 'Notion',
                url: 'https://www.notion.so',
                img: 'https://www.notion.com/front-static/favicon.ico'
            },
            {
                name: 'Google Drive',
                url: 'https://drive.google.com',
                img: 'https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png'
            },
            {
                name: 'DeepL',
                url: 'https://www.deepl.com/translator',
                img: 'https://www.deepl.com/img/favicon/favicon_96.png'
            }
        ]
    },
    social: {
        name: 'Social Media',
        icon: \`<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 category-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>\`,
        items: [
            {
                name: 'Twitter',
                url: 'https://x.com',
                img: 'https://abs.twimg.com/favicons/twitter.3.ico'
            },
            {
                name: 'Instagram',
                url: 'https://www.instagram.com',
                img: 'https://static.cdninstagram.com/rsrc.php/y4/r/QaBlI0OZiks.ico'
            },
            {
                name: 'LinkedIn',
                url: 'https://www.linkedin.com',
                img: 'https://www.linkedin.com/favicon.ico'
            },
            {
                name: 'Discord',
                url: 'https://discord.com/app',
                img: 'https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/6266bc493fb42d4e27bb8393_847541504914fd33810e70a0ea73177e.ico'
            },
            {
                name: 'Reddit',
                url: 'https://www.reddit.com',
                img: 'https://www.reddit.com/favicon.ico'
            }
        ]
    }
};

// Generate engine buttons dynamically
function generateEngineButtons() {
    const engineSelector = document.getElementById('engineSelector');
    engineSelector.innerHTML = ''; // Clear existing buttons

    for (const key in searchEngines) {
        if (searchEngines.hasOwnProperty(key)) {
            const engine = searchEngines[key];
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'engine-button px-4 py-2 flex items-center justify-center rounded-full bg-white border border-gray-300 shadow-sm hover:shadow-md transition-shadow';
            button.setAttribute('data-engine', key);

            const img = document.createElement('img');
            // Use the online icon URL directly
            img.src = engine.logo;
            img.alt = engine.name;
            img.className = 'engine-logo';
            // Hide directly if icon fails to load
            img.onerror = function () {
                this.style.visibility = 'hidden';
            };

            const span = document.createElement('span');
            span.textContent = engine.name;

            button.appendChild(img);
            button.appendChild(span);
            engineSelector.appendChild(button);
        }
    }
    
    // Attach event listeners after generating buttons
    attachEngineButtonEvents();
}

// Generate bookmark categories and items dynamically
function generateBookmarks() {
    // Get the parent container where all bookmark categories will be added
    const bookmarksContainer = document.getElementById('bookmarksContainer');
    if (!bookmarksContainer) {
        console.error("Bookmarks container not found");
        return;
    }
    
    bookmarksContainer.innerHTML = ''; // Clear existing bookmarks
    
    // Generate each category and its bookmarks
    for (const categoryKey in bookmarks) {
        if (bookmarks.hasOwnProperty(categoryKey)) {
            const category = bookmarks[categoryKey];
            const savedState = localStorage.getItem(\`category_\${categoryKey}\`);
            
            // Create category section
            const categorySection = document.createElement('div');
            categorySection.className = 'mb-4 bookmark-category';
            
            // Create category header
            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'flex items-center cursor-pointer mb-2 category-header';
            categoryHeader.setAttribute('data-category', categoryKey);
            categoryHeader.innerHTML = category.icon;
            
            const categoryTitle = document.createElement('h3');
            categoryTitle.className = 'font-medium text-gray-800';
            categoryTitle.textContent = category.name;
            
            categoryHeader.appendChild(categoryTitle);
            
            // Create category content container
            const categoryContent = document.createElement('div');
            categoryContent.className = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 category-content';
            categoryContent.id = \`\${categoryKey}Bookmarks\`;
            
            // Set initial display state based on localStorage
            if (savedState === 'closed') {
                categoryContent.style.display = 'none';
                // Ensure the icon is rotated properly
                const icon = categoryHeader.querySelector('.category-icon');
                if (icon) {
                    icon.style.transform = 'rotate(-90deg)';
                    icon.style.transition = 'transform 0.3s ease';
                }
            } else {
                categoryContent.style.display = 'grid';
            }
            
            // Add items to the category
            category.items.forEach(bookmark => {
                const bookmarkDiv = document.createElement('div');
                bookmarkDiv.className = 'bg-white rounded-lg shadow-sm p-3 card-hover mini-bookmark';
                
                const bookmarkLink = document.createElement('a');
                bookmarkLink.href = bookmark.url;
                bookmarkLink.target = '_blank';
                bookmarkLink.className = 'flex flex-col items-center justify-center';
                
                const bookmarkImg = document.createElement('img');
                bookmarkImg.src = bookmark.img;
                bookmarkImg.alt = bookmark.name;
                bookmarkImg.className = 'w-8 h-8 mb-2';
                // Hide directly if icon fails to load
                bookmarkImg.onerror = function() {
                    this.src = 'https://raw.githubusercontent.com/es-v/SimpleSearch/main/assets/img/web.svg';
                };
                
                const bookmarkName = document.createElement('span');
                bookmarkName.className = 'text-xs font-medium text-gray-800';
                bookmarkName.textContent = bookmark.name;
                
                bookmarkLink.appendChild(bookmarkImg);
                bookmarkLink.appendChild(bookmarkName);
                bookmarkDiv.appendChild(bookmarkLink);
                categoryContent.appendChild(bookmarkDiv);
            });
            
            // Assemble the category section
            categorySection.appendChild(categoryHeader);
            categorySection.appendChild(categoryContent);
            
            // Add the category section to the bookmarks container
            bookmarksContainer.appendChild(categorySection);
            
            // Add event listener directly to this category header
            categoryHeader.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                const content = this.nextElementSibling;
                const icon = this.querySelector('.category-icon');
                
                if (content.style.display === 'none') {
                    content.style.display = 'grid';
                    if (icon) icon.style.transform = 'rotate(0deg)';
                    localStorage.setItem(\`category_\${category}\`, 'open');
                } else {
                    content.style.display = 'none';
                    if (icon) icon.style.transform = 'rotate(-90deg)';
                    localStorage.setItem(\`category_\${category}\`, 'closed');
                }
            });
        }
    }
}

// Attach event listeners to engine buttons
function attachEngineButtonEvents() {
    const engineButtons = document.querySelectorAll('.engine-button');
    engineButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentEngine = this.getAttribute('data-engine');
            localStorage.setItem('defaultEngine', currentEngine);
            highlightSelectedEngine();
        });
    });
}

// Initialize app
function init() {
    generateEngineButtons();
    generateBookmarks();
    loadDefaultEngine();
    highlightSelectedEngine();
    setDailyBingBackground();
    setupTransparentUI();
    // setupBookmarkCategories();
    // displayVersionInfo();
}

// Load default engine from local storage
function loadDefaultEngine() {
    const defaultEngine = localStorage.getItem('defaultEngine') || 'google';
    currentEngine = defaultEngine;
}

// Set daily Bing background
function setDailyBingBackground() {
    // Fetch Bing daily image
    const bingImageUrl = \`https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1\`;

    // Use a proxy to avoid CORS issues
    fetch(\`https://api.allorigins.win/get?url=\${encodeURIComponent(bingImageUrl)}\`)
        .then(response => response.json())
        .then(data => {
            const bingData = JSON.parse(data.contents);
            if (bingData && bingData.images && bingData.images.length > 0) {
                const imageData = bingData.images[0];
                const imageUrl = \`https://www.bing.com\${imageData.url}\`;

                // Set as background
                document.body.style.backgroundImage = \`url('\${imageUrl}')\`;
                document.body.style.backgroundSize = 'cover';
                document.body.style.backgroundPosition = 'center';
                document.body.style.backgroundRepeat = 'no-repeat';
                document.body.style.backgroundAttachment = 'fixed';
            } else {
                // Fallback to a gradient if Bing image can't be fetched
                document.body.style.background = 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)';
            }
        })
        .catch(error => {
            console.error('Error fetching Bing background:', error);
            // Fallback background
            document.body.style.background = 'linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)';
        });
}

// Make UI elements transparent
function setupTransparentUI() {
    // Add glass morphism effect to main containers
    const mainContainers = document.querySelectorAll('.bg-white');
    mainContainers.forEach(container => {
        container.classList.remove('bg-white');
        container.classList.add('glass-morphism');
    });

    // Add glass morphism to bookmark cards
    const bookmarkCards = document.querySelectorAll('.card-hover');
    bookmarkCards.forEach(card => {
        card.classList.add('glass-bookmark');
    });

    // Style the search form for transparency
    const searchContainer = document.querySelector('#searchForm').parentElement;
    searchContainer.classList.add('search-container-glass');

    // Style search input for transparency
    const searchInputElem = document.querySelector('#searchInput');
    searchInputElem.classList.add('glass-input');

    // Apply glass effect to engine buttons
    const engineButtonElements = document.querySelectorAll('.engine-button');
    engineButtonElements.forEach(btn => {
        btn.classList.add('glass-button');
    });

    // Add CSS rules for glass morphism
    const style = document.createElement('style');
    style.textContent = \`
    .glass-morphism {
        background: rgba(255, 255, 255, 0.2) !important;
        backdrop-filter: blur(8px) !important;
        -webkit-backdrop-filter: blur(8px) !important;
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
    }
    
    .glass-bookmark {
        background: rgba(255, 255, 255, 0.25) !important;
        backdrop-filter: blur(10px) !important;
        -webkit-backdrop-filter: blur(10px) !important;
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
        transition: all 0.3s ease !important;
    }
    
    .glass-bookmark:hover {
        background: rgba(255, 255, 255, 0.35) !important;
        transform: translateY(-5px) !important;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2) !important;
    }
    
    .search-container-glass {
        background: rgba(255, 255, 255, 0.15) !important;
        backdrop-filter: blur(12px) !important;
        -webkit-backdrop-filter: blur(12px) !important;
        border-radius: 16px !important;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1) !important;
        padding: 24px !important;
    }
    
    .glass-input {
        background: rgba(255, 255, 255, 0.2) !important;
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
        color: rgba(0, 0, 0, 0.8) !important;
        backdrop-filter: blur(4px) !important;
        -webkit-backdrop-filter: blur(4px) !important;
    }
    
    .glass-input::placeholder {
        color: rgba(0, 0, 0, 0.5) !important;
    }
    
    .glass-button {
        background: rgba(255, 255, 255, 0.25) !important;
        backdrop-filter: blur(4px) !important;
        -webkit-backdrop-filter: blur(4px) !important;
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
        transition: all 0.3s ease !important;
    }
    
    .glass-button:hover {
        background: rgba(255, 255, 255, 0.4) !important;
        transform: translateY(-2px) !important;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1) !important;
    }
    
    .container {
        max-width: 900px !important;
        margin: 0 auto !important;
    }
    
    body {
        font-family: 'Inter', sans-serif !important;
        color: white !important;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2) !important;
        height: 100vh !important;
        overflow-x: hidden !important;
    }
    
    h1, h2, h3, h4, h5, h6 {
        color: white !important;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3) !important;
    }
    
    a {
        color: rgba(255, 255, 255, 0.8) !important;
        transition: color 0.3s ease !important;
    }
    
    a:hover {
        color: white !important;
        text-shadow: 0 0 8px rgba(255, 255, 255, 0.5) !important;
    }
    
    .text-gray-600, .text-gray-700, .text-gray-800 {
        color: rgba(255, 255, 255, 0.9) !important;
    }
    .mini-bookmark {
        background: rgba(255, 255, 255, 0.2) !important;
        backdrop-filter: blur(10px) !important;
        -webkit-backdrop-filter: blur(10px) !important;
        border: 1px solid rgba(255, 255, 255, 0.3) !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
        transition: all 0.3s ease !important;
    }
    
    .mini-bookmark:hover {
        background: rgba(255, 255, 255, 0.3) !important;
        transform: translateY(-3px) !important;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15) !important;
    }
    
    .category-header {
        padding: 8px 12px;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.15) !important;
        backdrop-filter: blur(8px) !important;
        -webkit-backdrop-filter: blur(8px) !important;
        transition: all 0.3s ease !important;
    }
    
    .category-header:hover {
        background: rgba(255, 255, 255, 0.25) !important;
    }
    
    .category-content {
        transition: all 0.3s ease;
    }
\`;
    document.head.appendChild(style);
}

// Highlight the currently selected search engine
function highlightSelectedEngine() {
    const engineButtons = document.querySelectorAll('.engine-button');
    engineButtons.forEach(button => {
        const engine = button.getAttribute('data-engine');
        if (engine === currentEngine) {
            button.classList.add('ring-2', 'ring-white', 'bg-white/30');
        } else {
            button.classList.remove('ring-2', 'ring-white', 'bg-white/30');
        }
    });
}

// Bookmark Category Collapse/Expand Function
function setupBookmarkCategories() {
    const categoryHeaders = document.querySelectorAll('.category-header');

    categoryHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const category = this.getAttribute('data-category');
            const content = this.nextElementSibling;
            const icon = this.querySelector('.category-icon');

            if (content.style.display === 'none') {
                content.style.display = 'grid';
                icon.style.transform = 'rotate(0deg)';
                localStorage.setItem(\`category_\${category}\`, 'open');
            } else {
                content.style.display = 'none';
                icon.style.transform = 'rotate(-90deg)';
                localStorage.setItem(\`category_\${category}\`, 'closed');
            }
        });

        // Initial state: expanded based on local storage or default settings.
        const category = header.getAttribute('data-category');
        const savedState = localStorage.getItem(\`category_\${category}\`);
        const content = header.nextElementSibling;
        const icon = header.querySelector('.category-icon');

        if (savedState === 'closed') {
            content.style.display = 'none';
            icon.style.transform = 'rotate(-90deg)';
        } else {
            content.style.display = 'grid';
            icon.style.transform = 'rotate(0deg)';
        }

        icon.style.transition = 'transform 0.3s ease';
    });
}

// Add a function to display the version number
function displayVersionInfo() {
    const footer = document.createElement('div');
    footer.className = 'fixed bottom-2 right-2 flex items-center bg-black/20 backdrop-filter backdrop-blur-sm px-3 py-1 rounded-full hover:bg-black/30 transition-all';
    
    const versionSpan = document.createElement('span');
    versionSpan.className = 'text-xs text-white/70 font-medium'; 
    versionSpan.textContent = \`v\${APP_VERSION}\`;
    versionSpan.style.textShadow = '0 1px 2px rgba(0,0,0,0.3)';
    
    const githubLink = document.createElement('a');
    githubLink.href = 'https://github.com/vsar/SimpleSearch';
    githubLink.target = '_blank';
    githubLink.className = 'ml-2 text-white/80 hover:text-white transition-colors';
    githubLink.title = 'View on GitHub';
    githubLink.style.textShadow = '0 1px 2px rgba(0,0,0,0.3)'; 
    
    const githubIcon = document.createElement('span');
    githubIcon.innerHTML = \`
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
        </svg>
    \`;
    
    githubLink.appendChild(githubIcon);
    
    footer.appendChild(versionSpan);
    footer.appendChild(githubLink);
    
    document.body.appendChild(footer);
}

// Handle search form submission
searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const query = searchInput.value.trim();

    if (!query) return;

    const engine = searchEngines[currentEngine];
    const url = new URL(engine.url);
    url.searchParams.append(engine.paramName, query);

    window.open(url.toString(), '_blank');
});

// Home button functionality
if (homeBtn) {
    homeBtn.addEventListener('click', function () {
        window.location.reload();
    });
}

// Add keyboard shortcuts for enhanced UX
document.addEventListener('keydown', function (e) {
    // Alt+S to focus search input
    if (e.altKey && e.key === 's') {
        e.preventDefault();
        searchInput.focus();
    }
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// Initialize the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    init();
});
`