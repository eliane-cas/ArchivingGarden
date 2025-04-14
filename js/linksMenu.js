import { DynamicDiagram } from "./dynamicDiagram.js";

function forceReflow(element) {
    return element.offsetHeight;
}

async function main() {
    const appContainer = document.querySelector('#app');
    forceReflow(appContainer);

    const response = await fetch('/data/links.json');
    const datasets = await response.json();

    const data = await fetch('/data/links.json')
        .then(response => response.json());

    const categoryData = data.find(item => item["main-node"] === "Useful links");

    new DynamicDiagram('#app', categoryData, { x: null, y: null }, { right: 150, top: 95 }, false);

}



if (document.readyState === 'complete') {
    main();
} else {
    document.addEventListener('DOMContentLoaded', main);
}
