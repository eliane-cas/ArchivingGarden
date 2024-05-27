import { DynamicDiagram } from "/js/DynamicDiagram.js";

export async function initCategoryPage() {
    const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
    let categoryName = urlParams.get('category').replace(/_/g, ' ');  // Reemplaza los guiones bajos con espacios

    if (categoryName == "Code and Develop") {
        categoryName = "Code & Develop";
    }
    // Obtener los datos del archivo JSON
    const data = await fetch('/data/links.json')
        .then(response => response.json());

    // Buscar el objeto correcto en el arreglo que coincida con la categoría
    const categoryData = data.find(item => item["main-node"] === categoryName);

    if (!categoryData) {
        console.log(categoryName);
        return;
    }

    generateCategoryDiagram(categoryData);
}

function generateCategoryDiagram(categoryData) {

    new DynamicDiagram('#app', categoryData, categoryData.position);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCategoryPage);
} else {
    initCategoryPage();
}