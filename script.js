
class CardManager {
  constructor() {
    this.cards = this.loadCards();
    this.currentUser = this.getCurrentUser();
  }

   loadCardItems() {
    const cards = localStorage.getItem("restaurant-cards");
    return cards ? JSON.parse(cards) : [];
  }

  saveCardItems() {
    localStorage.setItem("restaurant-cards", JSON.stringify(this.cards));
  }

  getCurrentUser() {
    const user = localStorage.getItem("currentUser");
    return user ? JSON.parse(user) : null;
  }

  addItem(product) {
    const existingItem = this.items.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        category: product.category,
        addedAt: new Date().toISOString(),
      });
    }
    this.saveCardItems();
    this.showAddToCartAnimation(product);
    return true;
  }

  showCartNotification(
    message,
    type = "success",
    icon = "fas fa-shopping-cart"
  ) {
    const notification = document.createElement("div");
    notification.className = `card-notification card-notification-${type} alert-dismissible fade show`;
    let iconClass;
    switch (type) {
      case "success":
        iconClass = "fas fa-plus-circle";
        break;
      case "danger":
        iconClass = "fas fa-trash-alt";
        break;
      case "warning":
        iconClass = "fas fa-minus-circle";
        break;
      case "info":
        iconClass = "fas fa-info-circle";
        break;
      default:
        iconClass = "fas fa-shopping-cart";
        break;
    }
    notification.innerHTML = `
    <div class="d-flex align-items-center">
      <i class="${iconClass} me-2"></i>
      <span>${message}</span>
    </div>
    
    
    `;

    const existingNotification = document.querySelector(".card-notification");
    const topPosition = 100 + existingNotification.length * 70;
    notification.style.cssText = `
    position: fixed;
    top: ${topPosition}px;
    right: 20px;
    z-index: 1000;
    animation: fadeIn 0.3s ease-in-out;
    width: 300px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    padding: 15px;
    margin-bottom: 10px;
    border: 1px solid #e0e0e0;
    color: #333;
    font-size: 14px;
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.transform = "translateY(100%)";
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChildren(notification);
        }
      }, 3000);
    }, 3000);
  }

  showAddToCartAnimation(product) {
    this.showCartNotification(
      `${product.name} added to cart`,

      "success",
      "fas fa-shopping-cart"
    );
  }
}
const cardManager = new CardManager();

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
  cardManager.addItem(product);
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