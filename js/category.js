import { DynamicDiagram } from "/js/DynamicDiagram.js";

export async function initCategoryPage() {
    const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
    let categoryName = urlParams.get('category').replace(/_/g, ' ');

    if (categoryName == "Code and Develop") {
        categoryName = "Code & Develop";
    }


    var imagenes = document.querySelectorAll('.categoryImage');
    imagenes.forEach(function (imagen) {
        if (!imagen.classList.contains('hidden')) {
            imagen.classList.add('hidden');
        }
        if (imagen.dataset.category == categoryName) {
            imagen.classList.remove('hidden');
            let menu_items = document.querySelectorAll(".category-navbar a");
            menu_items.forEach((item) => {
                if (item.classList.contains("category-active")) {
                    item.classList.remove("category-active");
                }
            });
        }
    });
    let menu_item = document.querySelector(`[category-name="${categoryName}"]`);
    menu_item.classList.add("category-active");

    const data = await fetch('/data/links.json')
        .then(response => response.json());

    const categoryData = data.find(item => item["main-node"] === categoryName);

    if (!categoryData) {
        return;
    }

    generateCategoryDiagram(categoryData);
}

function generateCategoryDiagram(categoryData) {
    let positions = { left: categoryData.position.left, right: categoryData.position.right, top: categoryData.position.top }
    new DynamicDiagram('#app', categoryData, { x: null, y: null }, positions, true);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCategoryPage);
} else {
    initCategoryPage();
}