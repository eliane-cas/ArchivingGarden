import { DynamicDiagram } from "./dynamicDiagram.js";

new DynamicDiagram('#app', {
    nodes: [
        { id: "Useful links", group: 1, type: 'main-node', distance: 0, class: "useful-links" },
        { id: "Web Typography", group: 2, type: 'child-node', angle: 0.13, distance: 421, class: "category", url: "#/useful-links/category?category=Web_Typography" },
        { id: "Code & Develop", group: 2, type: 'child-node', angle: 6.16101, distance: 473, class: "category", url: "#/useful-links/category?category=Code_&_Develop" },
        { id: "Potential Archiving Platforms", group: 2, type: 'child-node', angle: 6.02139, distance: 582, class: "category", url: "#/useful-links/category?category=Potential_Archiving_Platforms" },
        { id: "Creative Tools", group: 2, type: 'child-node', angle: 5.93412, distance: 602, class: "category", url: "#/useful-links/category?category=Creative_Tools" },
        { id: "Reading Materials", group: 2, type: 'child-node', angle: 4.01426, distance: 150, class: "category", url: "#/useful-links/category?category=Reading_Materials" },
        { id: "AI Tools", group: 2, type: 'child-node', angle: 4.10152, distance: 250, class: "category", url: "#/useful-links/category?category=AI_Tools" },
        { id: "Resource", group: 2, type: 'child-node', angle: 4.71239, distance: 250, class: "category", url: "#/useful-links/category?category=Resource" }
    ],
    links: [
        { source: "Useful links", target: "Web Typography", value: 1 },
        { source: "Useful links", target: "Code & Develop", value: 1 },
        { source: "Useful links", target: "Potential Archiving Platforms", value: 1 },
        { source: "Useful links", target: "Creative Tools", value: 1 },
        { source: "Useful links", target: "Reading Materials", value: 1 },
        { source: "Useful links", target: "AI Tools", value: 1 },
        { source: "Useful links", target: "Resource", value: 1 }

    ]
}, { x: 429, y: 690 });


