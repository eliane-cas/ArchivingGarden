import { DynamicDiagram } from "/js/DynamicDiagram.js";

export async function initCategoryPage() {
    const urlParams = new URLSearchParams(window.location.hash.split('?')[1]);
    const categoryName = urlParams.get('category').replace(/_/g, ' ');  // Asegúrate de manejar correctamente los espacios y caracteres especiales
    const data = await fetch('/data/links.json')
        .then(response => response.json());

    if (data["main-node"] !== categoryName) {
        displayCategoryName('Category not found');
        return;
    }

    const categoryNode = data.nodes.find(node => node.id === categoryName);

    if (categoryNode) {
        generateCategoryDiagram(categoryNode, data.links, data.nodes);
    }
}


function generateCategoryDiagram(categoryNode, links, nodes) {
    const filteredLinks = links.filter(link => link.source === categoryNode.id || link.target === categoryNode.id);
    const relatedNodesIds = new Set(filteredLinks.map(link => link.target));
    relatedNodesIds.add(categoryNode.id);
    const filteredNodes = nodes.filter(node => relatedNodesIds.has(node.id));

    new DynamicDiagram('#app', {
        nodes: filteredNodes,
        links: filteredLinks
    }, { x: null, y: 499 });
}

if (document.readyState === 'complete') {
    initCategoryPage();
} else {
    document.addEventListener('DOMContentLoaded', initCategoryPage);
}
