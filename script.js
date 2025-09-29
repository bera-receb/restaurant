
class CardManager {
  constructor() {
    this.cards = this.loadCards();
    this.currentUser = this.getCurrentUser();
  }

  loadCards() {
    const cards = localStorage.getItem("restaurant-cards");
    return cards ? JSON.parse(cards) : [];
  }

  saveCards() {
    localStorage.setItem("restaurant-cards", JSON.stringify(this.cards));
  }

  getCurrentUser() {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  }
}
function addCard(ProductElement) {
  const productCard = (productCard = ProductElement.closest(".product-card"));
  const productName =
    productCard.querySelector(".product-title").textContent?.replace("$", "") ||
    "0";
  const productPrice =
    productCard.querySelector(".product-price").textContent?.replace("$", "") ||
    "0";
  const productCategory =
    productCard
      .querySelector(".product-category")
      .textContent?.trim()
      .toLowerCase() || "appetizers";
  const productImageStyle =
    productCard.querySelector(".product-image").style.backgroundImage || "";

  let productImage = "";
  if (productImageStyle) {
    const urlMatch = productImageStyle.match(/url\('([^']+)'/);
    productImage = urlMatch ? urlMatch[1] : "";
  }

  const productId = Date.now() + Math.random().toString(36).substring(2, 9);

  const product = {
    id: productId,
    name: productName,
    price: productPrice,
    category: productCategory,
    image: productImage,
  };
}






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