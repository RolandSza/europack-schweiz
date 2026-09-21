/* ==========================================================================
   EUROPACK WORLD - SCHWEIZ B2B LOGIK (JAVASCRIPT)
   ========================================================================== */

// 1. Produktdatenbank (Preise in CHF exkl. / inkl. MwSt.)
const products = [
  {
    id: 1,
    title: "Blockbodenbeutel Natur ohne Fenster",
    category: "beutel",
    badge: "B2B Bestpreis",
    price: 18.50,
    unit: "VPE 100 Stück",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    title: "Geschenkkarton Schwarz Luxus",
    category: "kartons",
    badge: "Neuheit",
    price: 34.00,
    unit: "VPE 25 Stück",
    image: "https://images.unsplash.com/photo-1513885045260-6b3086b24c17?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    title: "DHL / Post Versandkarton Wave",
    category: "kartons",
    badge: "Top Seller",
    price: 12.90,
    unit: "VPE 50 Stück",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    title: "Flaschenverpackung 3er Set Extra Stark",
    category: "kartons",
    badge: "Geprüft",
    price: 22.00,
    unit: "VPE 20 Stück",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 5,
    title: "Lieferscheintaschen Ankunft / Enclosed",
    category: "beutel",
    badge: "Lagerware",
    price: 15.80,
    unit: "VPE 250 Stück",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 6,
    title: "Hand-Stretchfolie Transparent 23µm",
    category: "kartons",
    badge: "Industrie",
    price: 48.00,
    unit: "6 Rollen",
    image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=500&q=80"
  }
];

// 2. Warenkorb Status (State)
let cart = [];
const FREE_SHIPPING_LIMIT = 150.00; // CHF
const VAT_RATE = 0.081; // 8.1% Schweizer MwSt.
const STANDARD_SHIPPING_FEE = 9.90; // CHF

// DOM Elemente
const productGrid = document.getElementById("productGrid");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const openCartBtn = document.getElementById("openCartBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartItemsContainer = document.getElementById("cartItemsContainer");

const cartCountEl = document.getElementById("cartCount");
const headerCartTotalEl = document.getElementById("headerCartTotal");
const subtotalExclText = document.getElementById("subtotalExclText");
const vatText = document.getElementById("vatText");
const shippingFeeText = document.getElementById("shippingFeeText");
const grandTotalText = document.getElementById("grandTotalText");
const shippingStatusText = document.getElementById("shippingStatusText");
const shippingProgressFill = document.getElementById("shippingProgressFill");

const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutModal = document.getElementById("checkoutModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalCloseAction = document.getElementById("modalCloseAction");
const modalOrderSummary = document.getElementById("modalOrderSummary");

// 3. Shop Initialisieren
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(products);
  initEventListeners();
  updateCartUI();
});

// 4. Produkte rendern
function renderProducts(items) {
  productGrid.innerHTML = "";
  items.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <span class="badge-tag">${product.badge}</span>
      <img src="${product.image}" alt="${product.title}" class="product-image">
      <h3 class="product-title">${product.title}</h3>
      <div class="product-meta">${product.unit}</div>
      <div class="product-price-box">
        <div class="price-chf">CHF ${product.price.toFixed(2)}</div>
        <div class="price-sub">exkl. 8.1% MwSt.</div>
      </div>
      <div class="product-actions">
        <input type="number" value="1" min="1" class="qty-input" id="qty-${product.id}">
        <button class="add-cart-btn" onclick="addToCart(${product.id})">
          <i class="fa-solid fa-cart-plus"></i> In den Warenkorb
        </button>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

// 5. In den Warenkorb legen
window.addToCart = function(productId) {
  const qtyInput = document.getElementById(`qty-${productId}`);
  const quantity = parseInt(qtyInput.value) || 1;
  const product = products.find(p => p.id === productId);

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  updateCartUI();
  openCartDrawer();
};

// 6. Warenkorb Mengen ändern & entfernen
window.updateQuantity = function(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartUI();
    }
  }
};

window.removeFromCart = function(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCartUI();
};

// 7. Warenkorb UI Aktualisierung & Berechnungen
function updateCartUI() {
  // Gesamtanzahl Artikel
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountEl.textContent = totalCount;

  // Zwischensumme (exkl. MwSt.)
  const subtotalExcl = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // MwSt. (8.1%)
  const vatAmount = subtotalExcl * VAT_RATE;

  // Versandkosten gratis ab CHF 150.00
  const isFreeShipping = subtotalExcl >= FREE_SHIPPING_LIMIT || subtotalExcl === 0;
  const shippingFee = (subtotalExcl === 0) ? 0 : (isFreeShipping ? 0 : STANDARD_SHIPPING_FEE);

  // Gesamtsumme (inkl. MwSt. + Versand)
  const grandTotal = subtotalExcl + vatAmount + shippingFee;

  // Header Anzeigetexte
  headerCartTotalEl.textContent = `CHF ${grandTotal.toFixed(2)}`;
  subtotalExclText.textContent = `CHF ${subtotalExcl.toFixed(2)}`;
  vatText.textContent = `CHF ${vatAmount.toFixed(2)}`;
  shippingFeeText.textContent = isFreeShipping ? "KOSTENFREI" : `CHF ${shippingFee.toFixed(2)}`;
  grandTotalText.textContent = `CHF ${grandTotal.toFixed(2)}`;

  // Gratisversand Fortschrittsbalken
  if (subtotalExcl >= FREE_SHIPPING_LIMIT) {
    shippingStatusText.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#10b981;"></i> Gluckwunsch! Ihre Lieferung ist <strong>versandkostenfrei</strong>!`;
    shippingProgressFill.style.width = "100%";
  } else {
    const needed = FREE_SHIPPING_LIMIT - subtotalExcl;
    const progressPercent = Math.min(100, (subtotalExcl / FREE_SHIPPING_LIMIT) * 100);
    shippingStatusText.innerHTML = `Noch <strong>CHF ${needed.toFixed(2)}</strong> für kostenfreien Schweizer Versand!`;
    shippingProgressFill.style.width = `${progressPercent}%`;
  }

  // Warenkorb Liste Rendern
  cartItemsContainer.innerHTML = "";
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div style="text-align: center; padding: 40px 0; color: #9ca3af;">
        <i class="fa-solid fa-cart-flatbed" style="font-size: 40px; margin-bottom: 12px;"></i>
        <p>Ihr Warenkorb ist aktuell leer.</p>
      </div>
    `;
    checkoutBtn.disabled = true;
    checkoutBtn.style.opacity = "0.5";
  } else {
    checkoutBtn.disabled = false;
    checkoutBtn.style.opacity = "1";

    cart.forEach(item => {
      const itemEl = document.createElement("div");
      itemEl.className = "cart-item";
      itemEl.innerHTML = `
        <img src="${item.image}" class="cart-item-img">
        <div class="cart-item-details">
          <div class="cart-item-title">${item.title}</div>
          <div class="cart-item-price">CHF ${(item.price * item.quantity).toFixed(2)}</div>
          <div class="cart-item-controls">
            <div class="qty-btn-group">
              <button onclick="updateQuantity(${item.id}, -1)">-</button>
              <span>${item.quantity}</span>
              <button onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <button class="remove-item-btn" onclick="removeFromCart(${item.id})">
              <i class="fa-regular fa-trash-can"></i> Entfernen
            </button>
          </div>
        </div>
      `;
      cartItemsContainer.appendChild(itemEl);
    });
  }
}

// 8. Event-Listener (Drawer, Modal, Filter)
function initEventListeners() {
  openCartBtn.addEventListener("click", openCartDrawer);
  closeCartBtn.addEventListener("click", closeCartDrawer);
  cartOverlay.addEventListener("click", closeCartDrawer);

  // Filter Knöpfe
  document.querySelectorAll(".pill").forEach(button => {
    button.addEventListener("click", (e) => {
      document.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
      e.target.classList.add("active");
      const category = e.target.getAttribute("data-filter");
      if (category === "all") {
        renderProducts(products);
      } else {
        renderProducts(products.filter(p => p.category === category));
      }
    });
  });

  // Checkout Modal öffnen
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) return;
    closeCartDrawer();
    
    // Bestellzusammenfassung bauen
    const grandTotal = grandTotalText.textContent;
    modalOrderSummary.innerHTML = `
      <strong>Bestellübersicht:</strong><br>
      • Artikel im Korb: ${cartCountEl.textContent} Stück<br>
      • Rechnungsbetrag: <strong>${grandTotal}</strong> (inkl. 8.1% MwSt.)<br>
      • Lieferung: Standard Schweizer Gewerbeversand
    `;
    
    checkoutModal.classList.add("active");
    cart = []; // Warenkorb zurücksetzen
    updateCartUI();
  });

  // Modal schließen
  closeModalBtn.addEventListener("click", () => checkoutModal.classList.remove("active"));
  modalCloseAction.addEventListener("click", () => checkoutModal.classList.remove("active"));
}

function openCartDrawer() {
  cartDrawer.classList.add("active");
  cartOverlay.classList.add("active");
}

function closeCartDrawer() {
  cartDrawer.classList.remove("active");
  cartOverlay.classList.remove("active");
}
