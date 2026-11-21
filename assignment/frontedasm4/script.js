const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 2499,
    originalPrice: 3499,
    discount: 29,
    description: "Comfortable wireless headphones with clear sound and deep bass.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    category: "Electronics",
    rating: 4.5,
    inStock: true
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 1999,
    originalPrice: 2999,
    discount: 33,
    description: "A stylish smartwatch for fitness tracking and daily use.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    category: "Accessories",
    rating: 4.2,
    inStock: true
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 1799,
    originalPrice: 2499,
    discount: 28,
    description: "Lightweight running shoes designed for comfort and everyday workouts.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    category: "Footwear",
    rating: 4.4,
    inStock: true
  },
  {
    id: 4,
    name: "Travel Backpack",
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    description: "A spacious backpack suitable for college, office, and travel.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    category: "Bags",
    rating: 4.3,
    inStock: true
  },
  {
    id: 5,
    name: "Digital Camera",
    price: 15999,
    originalPrice: 18999,
    discount: 16,
    description: "Capture memorable moments with a compact digital camera.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
    category: "Electronics",
    rating: 4.6,
    inStock: true
  },
  {
    id: 6,
    name: "Sunglasses",
    price: 899,
    originalPrice: 1499,
    discount: 40,
    description: "Modern sunglasses with a stylish frame for everyday wear.",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
    category: "Fashion",
    rating: 4.1,
    inStock: true
  },
  {
    id: 7,
    name: "Coffee Maker",
    price: 3499,
    originalPrice: 4499,
    discount: 22,
    description: "Prepare fresh coffee at home with this easy-to-use coffee maker.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
    category: "Home Appliances",
    rating: 4.4,
    inStock: false
  }
];

let cart = [];

const formatINR = (amount) => "₹" + Number(amount).toLocaleString("en-IN");

function renderProducts() {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = products
    .map(
      (p) => `
      <div class="col">
        <div class="card product-card h-100">
          <div class="product-img-wrap">
            <img src="${p.image}" alt="${p.name}" />
            ${
              !p.inStock
                ? `<div class="out-of-stock-overlay"><span class="out-of-stock-badge">OUT OF STOCK</span></div>`
                : ""
            }
          </div>
          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-start gap-2 mb-1">
              <h6 class="card-title fw-bold mb-0 ${!p.inStock ? "text-muted" : ""}">${p.name}</h6>
              <span class="text-warning fw-semibold small text-nowrap">★ ${p.rating}</span>
            </div>
            <p class="product-desc mb-3">${p.description}</p>
            <div class="mt-auto">
              <div class="d-flex align-items-center gap-2 mb-3">
                <span class="fw-bold ${!p.inStock ? "text-muted" : ""}">${formatINR(p.price)}</span>
                <small class="text-decoration-line-through text-muted">${formatINR(p.originalPrice)}</small>
                <span class="discount-badge">${p.discount}% OFF</span>
              </div>
              ${
                p.inStock
                  ? `<button type="button" class="btn btn-success w-100" onclick="addToCart(${p.id})">Add to Cart</button>`
                  : `<button type="button" class="btn btn-secondary w-100" disabled>Add to Cart</button>`
              }
            </div>
          </div>
        </div>
      </div>`
    )
    .join("");
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product || !product.inStock) return;

  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  renderCart();
}

function changeQuantity(productId, delta) {
  const index = cart.findIndex((item) => item.id === productId);
  if (index === -1) return;

  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  renderCart();
}

function clearCart() {
  cart = [];
  renderCart();
}

function renderCart() {
  const container = document.getElementById("cartItemsContainer");
  const totalItemsEl = document.getElementById("totalItems");
  const grandTotalEl = document.getElementById("grandTotal");
  const navBadgeEl = document.getElementById("navBadge");

  if (cart.length === 0) {
    container.innerHTML = `<p class="text-muted text-center my-4">Your cart is empty. Click "Add to Cart" on any available product.</p>`;
    totalItemsEl.textContent = "0";
    grandTotalEl.textContent = "₹0";
    navBadgeEl.textContent = "0";
    return;
  }

  let totalItems = 0;
  let grandTotal = 0;

  container.innerHTML = cart
    .map((item) => {
      const subtotal = item.price * item.quantity;
      totalItems += item.quantity;
      grandTotal += subtotal;

      return `
        <div class="d-flex gap-3 pb-3 mb-3 border-bottom align-items-center">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
          <div class="flex-grow-1">
            <div class="fw-semibold">${item.name}</div>
            <div class="small text-muted mb-2">${formatINR(item.price)}</div>
            <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
              <div class="d-flex align-items-center gap-1">
                <span class="small text-muted me-1">Quantity:</span>
                <button type="button" class="btn btn-outline-secondary btn-sm py-0 px-2" onclick="changeQuantity(${item.id}, -1)">-</button>
                <span class="px-2 fw-semibold small">${item.quantity}</span>
                <button type="button" class="btn btn-outline-secondary btn-sm py-0 px-2" onclick="changeQuantity(${item.id}, 1)">+</button>
              </div>
              <div class="small">
                <span class="text-muted">Subtotal:</span>
                <span class="fw-bold">${formatINR(subtotal)}</span>
              </div>
            </div>
          </div>
        </div>`;
    })
    .join("");

  totalItemsEl.textContent = String(totalItems);
  grandTotalEl.textContent = formatINR(grandTotal);
  navBadgeEl.textContent = String(totalItems);
}

function focusCart() {
  document.getElementById("cartSection").scrollIntoView({ behavior: "smooth" });
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  const total = document.getElementById("grandTotal").textContent;
  const items = document.getElementById("totalItems").textContent;
  alert(`Order placed! Items: ${items}, Grand Total: ${total}`);
  clearCart();
}

renderProducts();
renderCart();