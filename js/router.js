const pageTitle = "Archiving_Garden";

const routes = [
    {
        path: '/',
        template: '/html/home_page.html',
        title: "Home Page",
        description: "This is the home page",
        scripts: [],
        styles: []
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
        path: '/useful-links/category',
        template: '/html/links_category.html',
        title: "Useful Links",
        description: "Useful links and resources",
        scripts: ['https://d3js.org/d3.v7.min.js', 'js/category.js'],
        styles: ['/css/usefulLinks.css']
    },
    {
        path: '/useful-links/all-links',
        template: '/html/all_links.html',
        title: "Useful Links",
        description: "Useful links and resources",
        scripts: [],
        styles: ['/css/usefulLinks.css']
    },

    {
        path: '/info',
        template: '/html/info.html',
        title: "Info",
        description: "Information page",
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
    const html = await fetch(route.template).then(response => response.text());
    document.getElementById("app").innerHTML = html;
    window.scrollTo(0, 0);

    // Manejar estilos y scripts
    document.querySelectorAll('link[rel="stylesheet"]:not(#common-styles)').forEach(link => link.remove());
    loadStyles(route.styles);
    loadScripts(route.scripts);
};

function displayCategoryName(categoryName) {
    const categoryDisplay = document.getElementById('category-name');
    if (categoryDisplay) {
        categoryDisplay.textContent = categoryName || 'Category not found';
    }
}


document.addEventListener("DOMContentLoaded", function () {
    locationHandler();
});

window.addEventListener("hashchange", locationHandler);
