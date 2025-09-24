function initializeCategoryFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const productItems = document.querySelectorAll(".product-item");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      filterButtons.forEach((btn) => btn.classList.remove("active"));

      button.classList.add("active");

      filterProducts(filter, productItems);
    });
  });
}
function filterProducts(filter, productItems) {
  productItems.forEach((item, index) => {
    const categoryElement = item.querySelector(".product-category");
    const category = categoryElement
      ? categoryElement.textContent.trim().toLowerCase()
      : "";

    let itemCategory = "appetizers";
    if (index === 0) itemCategory = "main-dishes";
    else if (index === 1) itemCategory = "pasta";
    else if (index === 2) itemCategory = "pizza";
    else if (index === 3) itemCategory = "desserts";
    else if (index === 4) itemCategory = "drinks";
    else itemCategory = "appetizers";

    item.setAttribute("data-category", itemCategory);
    if (filter === "all" || itemCategory === filter) {
      item.style.display = "block";
      item.style.animation = "fadeIn 0.5s ease-in-out";
    } else {
      item.style.display = "none";
      item.style.animation = "fadeOut 0.5s ease-in-out";
    }
  });
  showFilterMessage(filter, productItems);
}

function showFilterMessage(filter, productItems) {
  const visibleItems = Array.from(productItems).filter(
    (item) => item.style.display !== "none"
  );
  const existingMessage = document.querySelector(".no-items-message");
  if (existingMessage) {
    existingMessage.remove();
  }
  if (visibleItems.length === 0 && filter !== "all") {
    const menuSection = document.querySelector(".row.mb-4").parentElement;
    const message = document.createElement("div");
    message.className = "no-items-message text-center py-5";
    message.innerHTML = `<p class="lead text-muted">No items found for ${filter}.</p>`;
    menuSection.appendChild(message);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    initializeCategoryFilters();
  }, 100);
});