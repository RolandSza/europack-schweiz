/* ==========================================================================
   EUROPACK WORLD - SCHWEIZ B2B INTERAKTIONS-LOGIK (JAVASCRIPT)
   Inklusive Live Shopware 6 Store-API Anbindung
   ========================================================================== */

// 1. SHOPWARE 6 API KONFIGURATION
// Ersetze diese URL mit eurer tatsächlichen Shopware-Domain (OHNE Schrägstrich am Ende!)
const SHOPWARE_URL = 'https://www.europack-world.com'; 
const ACCESS_KEY = 'SWSCDXHJB1GZV08XC013QMWZZQ';

let products = []; // Wird dynamisch via API befüllt

// Fallback-Produkte falls die API nicht erreichbar ist oder noch konfiguriert wird
const fallbackProducts = [
  {
    id: "fb-1",
    title: "Blockbodenbeutel Natur ohne Fenster",
    category: "beutel",
    badge: "B2B Bestpreis",
    price: 18.50,
    unit: "VPE 100 Stück",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=500&q=80",
    description: "Reißfeste Natron-Kraftpapierbeutel mit stabilem Stehboden. Ideal für Bio-Produkte, Gewürze und Kaffeebohnen.",
    tiers: [
      { qty: "1 - 4 VPE", price: "CHF 18.50" },
      { qty: "5 - 9 VPE", price: "CHF 16.20" },
      { qty: "ab 10 VPE", price: "CHF 14.00" }
    ]
  },
  {
    id: "fb-2",
    title: "Geschenkkarton Schwarz Luxus",
    category: "kartons",
    badge: "Neuheit",
    price: 34.00,
    unit: "VPE 25 Stück",
    image: "https://images.unsplash.com/photo-1513885045260-6b3086b24c17?auto=format&fit=crop&w=500&q=80",
    description: "Hochwertige Wellpappe in edlem Matt-Schwarz. Perfekt für Werbegeschenke, Kosmetik und Präsente.",
    tiers: [
      { qty: "1 - 3 VPE", price: "CHF 34.00" },
      { qty: "4 - 8 VPE", price: "CHF 30.50" },
      { qty: "ab 9 VPE", price: "CHF 27.00" }
    ]
  },
  {
    id: "fb-3",
    title: "DHL / Post Versandkarton Wave 200x150x100mm",
    category: "kartons",
    badge: "Top Seller",
    price: 12.90,
    unit: "VPE 50 Stück",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=500&q=80",
    description: "Standard-Postkartonage B-Welle mit doppelter Verschlusslasche. Optimiert für Schweizer Post-Formate.",
    tiers: [
      { qty: "1 - 5 VPE", price: "CHF 12.90" },
      { qty: "6 - 19 VPE", price: "CHF 10.80" },
      { qty: "ab 20 VPE", price: "CHF 8.90" }
    ]
  },
  {
    id: "fb-4",
    title: "Flaschenverpackung 3er Set Extra Stark",
    category: "kartons",
    badge: "Geprüft",
    price: 22.00,
    unit: "VPE 20 Stück",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=500&q=80",
    description: "Post-zertifizierter Weinkarton mit integrierter Innenhülse für maximalen Bruchschutz beim Versand.",
    tiers: [
      { qty: "1 - 2 VPE", price: "CHF 22.00" },
      { qty: "3 - 9 VPE", price: "CHF 19.50" },
      { qty: "ab 10 VPE", price: "CHF 17.00" }
    ]
  }
];

// 2. Anwendungs-State
let cart = [];
let wishlist = [];
let currentFilter = "all";
let searchQuery = "";
let currentUser = null;

const FREE_SHIPPING_LIMIT = 150.00; // CHF
const VAT_RATE = 0.081; // 8.1% USt Schweiz
const STANDARD_SHIPPING_FEE = 9.90; // CHF

// DOM-Elemente
let productGrid, cartDrawer, wishlistDrawer, cartOverlay;
let cartCountEl, wishlistCountEl, headerCartTotalEl;
let subtotalExclText, vatText, shippingFeeText, grandTotalText;
let shippingStatusText, shippingProgressFill;
let searchInput, searchBtn, searchFilterInfo, searchQueryDisplay, clearSearchBtn;

// Initialisierung bei DOM-Load
document.addEventListener("DOMContentLoaded", async () => {
  initDOMElements();
  setupEventListeners();
  
  // Produkte aus Shopware laden
  await loadShopwareProducts();
  
  updateCartUI();
  updateWishlistUI();
});

function initDOMElements() {
  productGrid = document.getElementById("productGrid");
  cartDrawer = document.getElementById("cartDrawer");
  wishlistDrawer = document.getElementById("wishlistDrawer");
  cartOverlay = document.getElementById("cartOverlay");

  cartCountEl = document.getElementById("cartCount");
  wishlistCountEl = document.getElementById("wishlistCount");
  headerCartTotalEl = document.getElementById("headerCartTotal");

  subtotalExclText = document.getElementById("subtotalExclText");
  vatText = document.getElementById("vatText");
  shippingFeeText = document.getElementById("shippingFeeText");
  grandTotalText = document.getElementById("grandTotalText");
  shippingStatusText = document.getElementById("shippingStatusText");
  shippingProgressFill = document.getElementById("shippingProgressFill");

  searchInput = document.getElementById("searchInput");
  searchBtn = document.getElementById("searchBtn");
  searchFilterInfo = document.getElementById("searchFilterInfo");
  searchQueryDisplay = document.getElementById("searchQueryDisplay");
  clearSearchBtn = document.getElementById("clearSearchBtn");
}

// 3. Shopware 6 API Abruf
async function loadShopwareProducts() {
  if (productGrid) {
    productGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px; color: #4b5563;">
        <i class="fa-solid fa-spinner fa-spin" style="font-size: 36px; margin-bottom: 12px; color: #dc2626;"></i>
        <p style="font-weight: 600;">Lade B2B-Produkte direkt aus Shopware...</p>
      </div>
    `;
  }

  try {
    const response = await fetch(`${SHOPWARE_URL}/store-api/product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'sw-access-key': ACCESS_KEY
      },
      body: JSON.stringify({
        limit: 24,
        associations: {
          cover: {},
          categories: {}
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Shopware API HTTP Fehler: ${response.status}`);
    }

    const data = await response.json();

    if (data.elements && data.elements.length > 0) {
      products = data.elements.map(p => {
        // Zuordnung der Kategorien
        let cat = "kartons";
        if (p.categories && p.categories.length > 0) {
          const catName = p.categories[0].translated?.name?.toLowerCase() || "";
          if (catName.includes("beutel") || catName.includes("sack")) cat = "beutel";
          else if (catName.includes("gastro") || catName.includes("teller")) cat = "gastro";
          else if (catName.includes("hygiene") || catName.includes("seife")) cat = "hygiene";
        }

        const unitPrice = p.calculatedPrice?.unitPrice || 0;

        return {
          id: p.id,
          title: p.translated?.name || p.name || "Unbenanntes Produkt",
          category: cat,
          badge: p.markAsTopseller ? "Top Seller" : "B2B Qualität",
          price: unitPrice,
          unit: p.packUnit ? `VPE ${p.packUnit}` : "1 Stück",
          image: p.cover?.media?.url || "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=500&q=80",
          description: p.translated?.description?.replace(/<[^>]*>?/gm, '') || "Geprüfte Verpackungsqualität für den Schweizer B2B Fachhandel.",
          tiers: [
            { qty: "1 - 4 VPE", price: `CHF ${unitPrice.toFixed(2)}` },
            { qty: "5 - 9 VPE", price: `CHF ${(unitPrice * 0.92).toFixed(2)}` },
            { qty: "ab 10 VPE", price: `CHF ${(unitPrice * 0.85).toFixed(2)}` }
          ]
        };
      });
      console.log(`Erfolgreich ${products.length} Produkte aus Shopware 6 geladen.`);
    } else {
      console.warn("Keine Produkte im Shopware Verkaufskanal gefunden. Verwende Fallback-Daten.");
      products = fallbackProducts;
    }
  } catch (err) {
    console.warn("Fehler beim Abrufen der Shopware-API (Verbindung oder CORS). Verwende Fallback-Daten:", err);
    products = fallbackProducts;
  }

  renderProducts();
}

// Toast Benachrichtigung
function showToast(message, icon = "fa-circle-check") {
  const container = document.getElementById("toastContainer");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// 4. Produkte Filtern & Rendern
function renderProducts() {
  if (!productGrid) return;
  productGrid.innerHTML = "";

  let filtered = products.filter(p => {
    const matchesCategory = (currentFilter === "all") || (p.category === currentFilter);
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    productGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #6b7280;">
        <i class="fa-solid fa-box-open" style="font-size: 48px; margin-bottom: 12px; color: #cbd5e1;"></i>
        <h3>Keine passenden Artikel gefunden</h3>
        <p>Versuchen Sie einen anderen Suchbegriff oder eine andere Kategorie.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(product => {
    const isWishlisted = wishlist.includes(product.id);
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <span class="badge-tag">${product.badge}</span>
      <button class="wishlist-toggle-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist('${product.id}')">
        <i class="fa-${isWishlisted ? 'solid' : 'regular'} fa-heart"></i>
      </button>
      <div class="product-image-box" onclick="openProductDetail('${product.id}')">
        <img src="${product.image}" alt="${product.title}" class="product-image">
      </div>
      <h3 class="product-title" onclick="openProductDetail('${product.id}')">${product.title}</h3>
      <div class="product-meta">${product.unit}</div>
      <div class="product-price-box">
        <div class="price-chf">CHF ${product.price.toFixed(2)}</div>
        <div class="price-sub">exkl. 8.1% USt.</div>
      </div>
      <div class="product-actions">
        <input type="number" value="1" min="1" class="qty-input" id="qty-${product.id}">
        <button class="add-cart-btn" onclick="addToCart('${product.id}')">
          <i class="fa-solid fa-cart-plus"></i> In den Korb
        </button>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

// 5. Warenkorb Logik
window.addToCart = function(productId, customQty = null) {
  const qtyInput = document.getElementById(`qty-${productId}`);
  const qty = customQty || (qtyInput ? parseInt(qtyInput.value) : 1);
  const product = products.find(p => p.id === productId);

  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += qty;
  } else {
    cart.push({ ...product, quantity: qty });
  }

  updateCartUI();
  showToast(`${qty}x "${product.title}" in den Warenkorb gelegt`);
  openCartDrawer();
};

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
  showToast("Artikel aus dem Warenkorb entfernt", "fa-trash-can");
};

function updateCartUI() {
  if (!cartCountEl) return;
  
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountEl.textContent = totalCount;

  const subtotalExcl = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const vatAmount = subtotalExcl * VAT_RATE;
  const isFreeShipping = subtotalExcl >= FREE_SHIPPING_LIMIT || subtotalExcl === 0;
  const shippingFee = (subtotalExcl === 0) ? 0 : (isFreeShipping ? 0 : STANDARD_SHIPPING_FEE);
  const grandTotal = subtotalExcl + vatAmount + shippingFee;

  headerCartTotalEl.textContent = `CHF ${grandTotal.toFixed(2)}`;
  subtotalExclText.textContent = `CHF ${subtotalExcl.toFixed(2)}`;
  vatText.textContent = `CHF ${vatAmount.toFixed(2)}`;
  shippingFeeText.textContent = isFreeShipping ? "KOSTENFREI" : `CHF ${shippingFee.toFixed(2)}`;
  grandTotalText.textContent = `CHF ${grandTotal.toFixed(2)}`;
  
  const finalTotalEl = document.getElementById("checkoutFinalTotal");
  if (finalTotalEl) finalTotalEl.textContent = `CHF ${grandTotal.toFixed(2)}`;

  // Versandkosten-Fortschrittsbalken
  if (shippingStatusText && shippingProgressFill) {
    if (subtotalExcl >= FREE_SHIPPING_LIMIT) {
      shippingStatusText.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#10b981;"></i> Gratulation! Ihre Lieferung ist <strong>versandkostenfrei!</strong>`;
      shippingProgressFill.style.width = "100%";
      shippingProgressFill.style.background = "#10b981";
    } else {
      const remaining = FREE_SHIPPING_LIMIT - subtotalExcl;
      const pct = Math.min(100, (subtotalExcl / FREE_SHIPPING_LIMIT) * 100);
      shippingStatusText.innerHTML = `Noch <strong>CHF ${remaining.toFixed(2)}</strong> für kostenfreien Schweizer Versand!`;
      shippingProgressFill.style.width = `${pct}%`;
      shippingProgressFill.style.background = "#dc2626";
    }
  }

  // Warenkorb Liste rendern
  const container = document.getElementById("cartItemsContainer");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 40px 20px; color:#6b7280;">
        <i class="fa-solid fa-bag-shopping" style="font-size: 48px; margin-bottom: 12px; color: #cbd5e1;"></i>
        <p style="font-size: 16px; font-weight:600;">Ihr Warenkorb ist noch leer</p>
        <p style="font-size: 14px;">Wählen Sie Artikel aus unserem B2B-Katalog aus.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = "";
  cart.forEach(item => {
    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="cart-item-img">
      <div class="cart-item-details">
        <h4>${item.title}</h4>
        <div class="cart-item-price">CHF ${item.price.toFixed(2)} / VPE</div>
        <div class="cart-item-controls">
          <div class="qty-control">
            <button onclick="updateQuantity('${item.id}', -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="updateQuantity('${item.id}', 1)">+</button>
          </div>
          <button class="remove-btn" onclick="removeFromCart('${item.id}')"><i class="fa-solid fa-trash-can"></i> Entfernen</button>
        </div>
      </div>
    `;
    container.appendChild(row);
  });
}

// 6. Merkzettel (Wishlist)
window.toggleWishlist = function(productId) {
  const index = wishlist.indexOf(productId);
  if (index > -1) {
    wishlist.splice(index, 1);
    showToast("Vom Merkzettel entfernt", "fa-heart-crack");
  } else {
    wishlist.push(productId);
    showToast("Zum Merkzettel hinzugefügt", "fa-heart");
  }
  updateWishlistUI();
  renderProducts();
};

function updateWishlistUI() {
  if (wishlistCountEl) wishlistCountEl.textContent = wishlist.length;
  const container = document.getElementById("wishlistItemsContainer");
  if (!container) return;

  if (wishlist.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 40px 20px; color:#6b7280;">
        <i class="fa-regular fa-heart" style="font-size: 48px; margin-bottom: 12px; color: #cbd5e1;"></i>
        <p>Keine Artikel auf Ihrem Merkzettel.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = "";
  wishlist.forEach(id => {
    const item = products.find(p => p.id === id);
    if (item) {
      const row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="cart-item-img">
        <div class="cart-item-details">
          <h4>${item.title}</h4>
          <div class="cart-item-price">CHF ${item.price.toFixed(2)}</div>
          <button class="add-cart-btn" style="padding: 4px 8px; font-size:12px; margin-top:5px;" onclick="addToCart('${item.id}')">In den Korb</button>
        </div>
      `;
      container.appendChild(row);
    }
  });
}

// 7. Produktdetail Modal
window.openProductDetail = function(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const content = document.getElementById("productDetailContent");
  if (!content) return;

  content.innerHTML = `
    <div class="detail-img-box">
      <img src="${product.image}" alt="${product.title}">
    </div>
    <div class="detail-info-box">
      <span class="badge-tag" style="position:static; display:inline-block; margin-bottom:10px;">${product.badge}</span>
      <h2>${product.title}</h2>
      <p class="detail-unit">${product.unit} | Art.-Nr.: EP-CH-${product.id}</p>
      <div class="price-chf" style="font-size:28px; margin: 15px 0;">CHF ${product.price.toFixed(2)} <span style="font-size:14px; font-weight:normal; color:#6b7280;">exkl. MwSt.</span></div>
      <p class="detail-desc">${product.description}</p>
      
      <h4>B2B Staffelpreise (ab Werk Schweiz):</h4>
      <table class="tier-table" style="width:100%; border-collapse:collapse; margin:15px 0;">
        <thead>
          <tr style="border-bottom: 2px solid #e2e8f0; text-align:left;">
            <th style="padding:8px;">Bestellmenge</th>
            <th style="padding:8px;">Preis pro VPE</th>
          </tr>
        </thead>
        <tbody>
          ${product.tiers.map(t => `<tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px;">${t.qty}</td><td style="padding:8px; font-weight:bold; color:#dc2626;">${t.price}</td></tr>`).join('')}
        </tbody>
      </table>

      <div class="product-actions" style="margin-top:20px;">
        <input type="number" value="1" min="1" class="qty-input" id="detailQtyInput">
        <button class="add-cart-btn" onclick="addToCart('${product.id}', parseInt(document.getElementById('detailQtyInput').value))">
          <i class="fa-solid fa-cart-plus"></i> In den Warenkorb
        </button>
      </div>
    </div>
  `;

  openModal("productDetailModal");
};

// 8. Event Listeners & Modals Navigation
function setupEventListeners() {
  // Drawer Toggles
  document.getElementById("openCartBtn")?.addEventListener("click", openCartDrawer);
  document.getElementById("closeCartBtn")?.addEventListener("click", closeCartDrawer);
  document.getElementById("cartOverlay")?.addEventListener("click", closeCartDrawer);

  document.getElementById("openWishlistBtn")?.addEventListener("click", () => {
    wishlistDrawer.classList.add("active");
    cartOverlay.classList.add("active");
  });
  document.getElementById("closeWishlistBtn")?.addEventListener("click", closeWishlistDrawer);

  // Modal Triggers
  document.getElementById("openLoginBtn")?.addEventListener("click", () => openModal("loginModal"));
  document.getElementById("closeLoginModalBtn")?.addEventListener("click", () => closeModal("loginModal"));

  document.getElementById("openSampleModalBtn")?.addEventListener("click", () => openModal("sampleModal"));
  document.getElementById("floatingMusterBtn")?.addEventListener("click", () => openModal("sampleModal"));
  document.getElementById("closeSampleModalBtn")?.addEventListener("click", () => closeModal("sampleModal"));

  document.getElementById("heroCatalogBtn")?.addEventListener("click", () => openModal("catalogModal"));
  document.getElementById("closeCatalogModalBtn")?.addEventListener("click", () => closeModal("catalogModal"));

  document.getElementById("openInquiryBtn")?.addEventListener("click", () => openModal("inquiryModal"));
  document.getElementById("closeInquiryModalBtn")?.addEventListener("click", () => closeModal("inquiryModal"));

  document.getElementById("checkoutBtn")?.addEventListener("click", () => {
    if (cart.length === 0) {
      showToast("Ihr Warenkorb ist leer!", "fa-triangle-exclamation");
      return;
    }
    closeCartDrawer();
    openModal("checkoutModal");
  });
  document.getElementById("closeCheckoutModalBtn")?.addEventListener("click", () => closeModal("checkoutModal"));
  document.getElementById("closeDetailModalBtn")?.addEventListener("click", () => closeModal("productDetailModal"));

  // Form Submit Handler
  document.getElementById("loginForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    currentUser = document.getElementById("loginEmail").value;
    document.getElementById("loginText").textContent = "Konto AG";
    closeModal("loginModal");
    showToast("Erfolgreich als B2B-Kunde angemeldet");
  });

  document.getElementById("sampleForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    closeModal("sampleModal");
    showToast("Musteranforderung erfolgreich versendet!");
  });

  document.getElementById("catalogForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    closeModal("catalogModal");
    showToast("Katalog 2026 wurde per E-Mail versendet!");
  });

  document.getElementById("inquiryForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    closeModal("inquiryModal");
    showToast("Sonderanfrage eingegangen. Wir melden uns!");
  });

  document.getElementById("checkoutForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const company = document.getElementById("coCompany").value;
    const city = document.getElementById("coCity").value;
    
    closeModal("checkoutModal");
    
    const summaryBox = document.getElementById("successOrderSummary");
    if (summaryBox) {
      summaryBox.innerHTML = `
        <p><strong>Empfänger:</strong> ${company} (${city})</p>
        <p><strong>Zahlungsart:</strong> Kauf auf Rechnung (30 Tage)</p>
        <p><strong>Auftragsnummer:</strong> EP-CH-2026-${Math.floor(10000 + Math.random() * 90000)}</p>
      `;
    }
    
    cart = [];
    updateCartUI();
    openModal("successModal");
  });

  document.getElementById("closeSuccessBtn")?.addEventListener("click", () => closeModal("successModal"));

  // Filter Buttons
  document.querySelectorAll(".pill").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".pill").forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      currentFilter = e.target.getAttribute("data-filter");
      renderProducts();
    });
  });

  // Main Nav Filter Links
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
      const target = e.currentTarget;
      target.classList.add("active");
      currentFilter = target.getAttribute("data-category");
      renderProducts();
      
      const sec = document.getElementById("products");
      if (sec) sec.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Suche
  if (searchBtn && searchInput) {
    searchBtn.addEventListener("click", performSearch);
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") performSearch();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      searchQuery = "";
      if (searchInput) searchInput.value = "";
      if (searchFilterInfo) searchFilterInfo.classList.add("hidden");
      renderProducts();
    });
  }
}

function performSearch() {
  if (!searchInput) return;
  searchQuery = searchInput.value.trim();
  if (searchQuery !== "") {
    if (searchQueryDisplay) searchQueryDisplay.textContent = `"${searchQuery}"`;
    if (searchFilterInfo) searchFilterInfo.classList.remove("hidden");
  } else {
    if (searchFilterInfo) searchFilterInfo.classList.add("hidden");
  }
  renderProducts();
  const sec = document.getElementById("products");
  if (sec) sec.scrollIntoView({ behavior: "smooth" });
}

// Modal Helpers
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add("active");
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove("active");
}

function openCartDrawer() {
  cartDrawer?.classList.add("active");
  cartOverlay?.classList.add("active");
}

function closeCartDrawer() {
  cartDrawer?.classList.remove("active");
  cartOverlay?.classList.remove("active");
}

function closeWishlistDrawer() {
  wishlistDrawer?.classList.remove("active");
  cartOverlay?.classList.remove("active");
}
