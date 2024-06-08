const pageTitle = "Archiving_Garden";

const routes = [
    {
        path: '/',
        template: '/html/home_page.html',
        title: "Home Page",
        description: "This is the home page",
        scripts: ['/js/setsvgs.js', '/js/lineFix.js'],
        styles: ['/css/homepage.css']
    },
    {
        path: '/how',
        template: '/html/howto.html',
        title: "How to archive your work digitally",
        description: "How to archive your work digitally",
        scripts: ['/js/hammer.js', '/js/howto.js',],
        styles: ['/css/howto.css']
    },
    {
        path: '/examples',
        template: '/html/examples.html',
        title: "Examples",
        description: "Examples",
        scripts: ['/js/hammer.js', '/js/panning.js'],
        styles: ['/css/examples.css']
    },

    {
        path: '/useful-links',
        template: '/html/usefulLinks.html',
        title: "Useful Links",
        description: "Useful links and resources",
        scripts: ['https://d3js.org/d3.v7.min.js', '/js/linksMenu.js'],
        styles: ['/css/usefulLinks.css']
    },
    {
        path: '/useful-links/categories',
        template: '/html/links_category.html',
        title: "Useful Links",
        description: "Useful links and resources",
        scripts: ['https://d3js.org/d3.v7.min.js', 'js/category.js'],
        styles: ['/css/usefulLinks.css']
    },
    {
        path: '/useful-links/categories/all-links',
        template: '/html/all_links.html',
        title: "Useful Links",
        description: "Useful links and resources",
        scripts: ['https://d3js.org/d3.v7.min.js', '/js/allLinks.js'],
        styles: ['/css/allLinks.css']
    },

    {
        path: '/info',
        template: '/html/info.html',
        title: "Info",
        description: "Information page",
        scripts: ['/js/hammer.js', '/js/info.js'],
        styles: ['/css/info.css']
    },
    {
        path: '/shop',
        template: '/html/shop.html',
        title: "Shop",
        description: "Shop page",
        scripts: [],
        styles: []
    }


];

function loadStyles(styles) {
    styles.forEach(style => {
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = style;
        document.head.appendChild(linkElement);
    });
}

async function loadScripts(scripts) {
    // Eliminar cualquier script anterior
    document.querySelectorAll('script[data-route-script]').forEach(script => {
        script.parentNode.removeChild(script);
    });

    for (let script of scripts) {
        try {
            await new Promise((resolve, reject) => {
                const scriptElement = document.createElement('script');
                scriptElement.src = script + '?v=' + Date.now();  // Añadir timestamp para forzar la recarga
                scriptElement.type = 'module';
                scriptElement.dataset.routeScript = 'active'; // Marcar el script para posible eliminación
                scriptElement.onload = resolve;
                scriptElement.onerror = reject;
                document.body.appendChild(scriptElement);
            });
        } catch (error) {
            console.error("Failed to load script: ", script, error);
        }
    }
}
function setupLazyLoading() {
    const lazyImages = document.querySelectorAll('img.lazy-load:not([src])');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy-load');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '100px',
        threshold: 0.01
    });

    lazyImages.forEach(img => observer.observe(img));
}

const locationHandler = async () => {
    const location = window.location.hash.replace("#", "") || '/';
    const pathSegments = location.split('?')[0];

    const route = routes.find(r => r.path === pathSegments) || {
        template: "/html/404.html",
        title: "404 | " + pageTitle,
        description: "Page not found",
        scripts: [],
        styles: []
    };
    // Limpiar el contenido existente
    document.getElementById("app").innerHTML = '';
    document.title = route.title;

    // Actualizar el elemento current-page con el título de la página
    const currentPageDisplay = document.getElementById("current-page");
    currentPageDisplay.textContent = route.title + '→';

    // Cargar nuevo contenido HTML
    // Manejar estilos y scripts
    document.querySelectorAll('link[rel="stylesheet"]:not(#common-styles)').forEach(link => link.remove());
    loadStyles(route.styles);
    const html = await fetch(route.template).then(response => response.text());
    document.getElementById("app").innerHTML = html;
    window.scrollTo(0, 0);

    //Quita o pone la barra de navegacion de categorias
    const nav = document.querySelector(".category-navbar");
    if (pathSegments != "/useful-links/categories" && pathSegments != "/useful-links/categories/all-links") {
        nav.classList.add("hidden");
    } else {
        nav.classList.remove("hidden");

    }

    await loadScripts(route.scripts);
    setupLazyLoading();
};

function displayCategoryName(categoryName) {
    const categoryDisplay = document.getElementById('category-name');
    if (categoryDisplay) {
        categoryDisplay.textContent = categoryName || 'Category not found';
    }
}
let isPageInitialized = false;

document.addEventListener("DOMContentLoaded", function () {
    if (!isPageInitialized) {
        locationHandler().then(() => {
            isPageInitialized = true;
            console.log("Todos los scripts y contenidos han sido cargados correctamente.");
        }).catch(error => {
            console.error("Error durante la carga inicial: ", error);
        });
    }
});

window.addEventListener("hashchange", function () {
    if (!isPageInitialized) {
        locationHandler();
    }
});
window.addEventListener("load", locationHandler);  // Asegura que se manejen las cargas completas de la página
