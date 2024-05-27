import { DynamicDiagrams } from "/js/DynamicDiagrams.js";

export async function initCategoryPage() {

    const data = await fetch('/data/links.json')
        .then(response => response.json());

    const main = document.querySelector("main");
    const svg = d3.select("main").append("svg")
        .attr("width", main.width)
        .attr("height", main.height)
        .style("border", "none");

    data.forEach(categoryData => {
        if (categoryData.mainnode != "Useful links") {
            new DynamicDiagrams(svg, categoryData, categoryData.allposition);
        }
    });

}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCategoryPage);
} else {
    initCategoryPage();
}