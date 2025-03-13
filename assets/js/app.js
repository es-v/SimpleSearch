// DOM Elements
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const engineSelector = document.getElementById('engineSelector');
const engineButtons = document.querySelectorAll('.engine-button');
const homeBtn = document.getElementById('homeBtn');
const body = document.body;

// App State
let currentEngine = localStorage.getItem('defaultEngine') || 'google';

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
    searxng: {
        name: 'SearXNG',
        url: 'https://search.vsar.site/search',
        paramName: 'q',
        logo: 'https://search.vsar.site/favicon.ico'
    }
};

// Initialize app
function init() {
    loadDefaultEngine();
    highlightSelectedEngine();
    setDailyBingBackground();
    setupTransparentUI();
    setupBookmarkCategories();
}

// Load default engine from local storage
function loadDefaultEngine() {
    const defaultEngine = localStorage.getItem('defaultEngine') || 'google';
    currentEngine = defaultEngine;
}

// Set daily Bing background
function setDailyBingBackground() {
    // Fetch Bing daily image
    const bingImageUrl = `https://www.bing.com/HPImageArchive.aspx?format=js&idx=1&n=1`;
    
    // Use a proxy to avoid CORS issues
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(bingImageUrl)}`)
        .then(response => response.json())
        .then(data => {
            const bingData = JSON.parse(data.contents);
            if (bingData && bingData.images && bingData.images.length > 0) {
                const imageData = bingData.images[0];
                const imageUrl = `https://www.bing.com${imageData.url}`;
                
                // Set as background
                document.body.style.backgroundImage = `url('${imageUrl}')`;
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
    style.textContent = `
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
    `;
    document.head.appendChild(style);
}

// Highlight the currently selected search engine
function highlightSelectedEngine() {
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
        header.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            const content = this.nextElementSibling;
            const icon = this.querySelector('.category-icon');
            
            if (content.style.display === 'none') {
                content.style.display = 'grid';
                icon.style.transform = 'rotate(0deg)';
                localStorage.setItem(`category_${category}`, 'open');
            } else {
                content.style.display = 'none';
                icon.style.transform = 'rotate(-90deg)';
                localStorage.setItem(`category_${category}`, 'closed');
            }
        });
        
        // Initial state: expanded based on local storage or default settings.
        const category = header.getAttribute('data-category');
        const savedState = localStorage.getItem(`category_${category}`);
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

// Handle search form submission
searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const query = searchInput.value.trim();
    
    if (!query) return;
    
    const engine = searchEngines[currentEngine];
    const url = new URL(engine.url);
    url.searchParams.append(engine.paramName, query);
    
    window.open(url.toString(), '_blank');
});

// Handle search engine selection
engineSelector.addEventListener('click', function(e) {
    const button = e.target.closest('.engine-button');
    if (button) {
        currentEngine = button.getAttribute('data-engine');
        localStorage.setItem('defaultEngine', currentEngine);
        highlightSelectedEngine();
    }
});

// Home button functionality
if (homeBtn) {
    homeBtn.addEventListener('click', function() {
        window.location.reload();
    });
}

// Add keyboard shortcuts for enhanced UX
document.addEventListener('keydown', function(e) {
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
document.addEventListener('DOMContentLoaded', function() {
    init();
});
