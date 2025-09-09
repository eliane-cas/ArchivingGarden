import { DynamicDiagram } from "/js/DynamicDiagram.js";

let diagramInstance = null;

export async function initCategoryPage() {
  const urlParams = new URLSearchParams(window.location.hash.split("?")[1]);

  let categoryName = urlParams.get("category");
  if (categoryName) {
    categoryName = categoryName.replace(/_/g, " ");
    if (categoryName === "Code and Dev") {
      categoryName = "Code & Dev";
    }
  } else {
    console.warn("No category specified in URL.");
    return;
  }

  const imagenes = document.querySelectorAll(".categoryImage");
  imagenes.forEach((imagen) => {
    if (!imagen.classList.contains("hidden")) {
      imagen.classList.add("hidden");
    }
    if (imagen.dataset.category == categoryName) {
      imagen.classList.remove("hidden");
      const menu_items = document.querySelectorAll(".category-navbar a");
      menu_items.forEach((item) => {
        item.classList.remove("category-active");
      });
    }
  });

  const menu_item = document.querySelector(`[category-name="${categoryName}"]`);
  if (menu_item) {
    menu_item.classList.add("category-active");
  } else {
    console.warn(`No menu item found for category: ${categoryName}`);
  }

  const data = await fetch("/data/links.json").then((response) =>
    response.json()
  );

  const categoryData = data.find((item) => item["main-node"] === categoryName);

  if (!categoryData) return;

  generateCategoryDiagram(categoryData);
}

function generateCategoryDiagram(categoryData) {
  if (diagramInstance && typeof diagramInstance.destroy === "function") {
    diagramInstance.destroy();
  } else if (diagramInstance) {
    const container = document.querySelector("#app");
    if (container) container.innerHTML = "";
  }

  const positions = {
    left: categoryData.position.left,
    right: categoryData.position.right,
    top: categoryData.position.top,
  };

  diagramInstance = new DynamicDiagram(
    "#app",
    categoryData,
    { x: null, y: null },
    positions,
    true
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCategoryPage);
} else {
  initCategoryPage();
}

// ✅ Proper cleanup function for the router to call
export function destroyCategoryPage() {
  console.log("destroyCategory function is called");
  if (diagramInstance && typeof diagramInstance.destroy === "function") {
    diagramInstance.destroy();
  } else if (diagramInstance) {
    const container = document.querySelector("#app");
    if (container) container.innerHTML = "";
  }

  diagramInstance = null;

  // Optionally remove active class from menu
  const active = document.querySelector(".category-navbar a.category-active");
  if (active) {
    active.classList.remove("category-active");
  }

  // Hide all category images again (just in case)
  const imagenes = document.querySelectorAll(".categoryImage");
  imagenes.forEach((imagen) => {
    if (!imagen.classList.contains("hidden")) {
      imagen.classList.add("hidden");
    }
  });
}
