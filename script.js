/* ==========================================================================
   EUROPACK WORLD - SCHWEIZ B2B INTERAKTIONS-LOGIK (JAVASCRIPT)
   ========================================================================== */

// 1. B2B Produktdatenbank mit Staffelpreisen & Beschreibungen
const products = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
  },
  {
    id: 5,
    title: "Lieferscheintaschen Ankunft / Enclosed C5",
    category: "beutel",
    badge: "Lagerware",
    price: 15.80,
    unit: "VPE 250 Stück",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=500&q=80",
    description: "Selbstklebende Dokumententaschen in Signalfarbe Rot/Transparent. Wetterfest und hochhaftend.",
    tiers: [
      { qty: "1 - 3 VPE", price: "CHF 15.80" },
      { qty: "4 - 9 VPE", price: "CHF 13.90" },
      { qty: "ab 10 VPE", price: "CHF 11.50" }
    ]
  },
  {
    id: 6,
    title: "Hand-Stretchfolie Transparent 23µm",
    category: "kartons",
    badge: "Industrie",
    price: 48.00,
    unit: "Karton (6 Rollen)",
    image: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=500&q=80",
    description: "Extrem dehnbare Palettenfolie für optimale Ladungssicherung im Lager- und LKW-Transport.",
    tiers: [
      { qty: "1 - 2 Kartons", price: "CHF 48.00" },
      { qty: "3 - 5 Kartons", price: "CHF 42.00" },
      { qty: "ab 6 Kartons", price: "CHF 36.50" }
    ]
  },
  {
    id: 7,
    title: "Bio-Takeaway Burgerbox Zuckerrohr",
    category: "gastro",
    badge: "Öko Standard",
    price: 29.90,
    unit: "VPE 100 Stück",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=500&q=80",
    description: "100% biologisch abbaubare Gastro-Menübox. Fettbeständig, mikrowellengeeignet und nachhaltig.",
    tiers: [
      { qty: "1 - 4 VPE", price: "CHF 29.90" },
      { qty: "5 - 9 VPE", price: "CHF 26.00" },
      { qty: "ab 10 VPE", price: "CHF 22.50" }
    ]
  },
  {
    id: 8,
    title: "Nitril Einweg-Schutzhandschuhe Schwarz",
    category: "hygiene",
    badge: "EN 455",
    price: 11.50,
    unit: "Box (100 Stück)",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80",
    description: "Puderfreie Nitrilhandschuhe für Medizin, Lebensmittelbereich und Reinigung Gewerbe.",
    tiers: [
      { qty: "1 - 9 Boxen", price: "CHF 11.50" },
      { qty: "10 - 29 Boxen", price: "CHF 9.80" },
      { qty: "ab 30 Boxen", price: "CHF 8.20" }
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
const productGrid = document.getElementById("productGrid");
const cartDrawer = document.getElementById("cartDrawer");
const wishlistDrawer = document.getElementById("wishlistDrawer");
const cartOverlay = document.getElementById("cartOverlay");

const cartCountEl = document.getElementById("cartCount");
const wishlistCountEl = document.getElementById("wishlistCount");
const headerCartTotalEl = document.getElementById("headerCartTotal");

const subtotalExclText = document.getElementById("subtotalExclText");
const vatText = document.getElementById("vatText");
const shippingFeeText = document.getElementById("shippingFeeText");
const grandTotalText = document.getElementById("grandTotalText");
const shippingStatusText = document.getElementById("shippingStatusText");
const shippingProgressFill = document.getElementById("shippingProgressFill");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const searchFilterInfo = document.getElementById("searchFilterInfo");
const searchQueryDisplay = document.getElementById("searchQueryDisplay");
const clearSearchBtn = document.getElementById("clearSearchBtn");

// Initialisierung
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  setupEventListeners();
  updateCartUI();
  updateWishlistUI();
});

// Toast Benachrichtigung anzeigen
function showToast(message, icon = "fa-circle-check") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// 3. Produkte Filtern & Rendern
function renderProducts() {
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
      <button class="wishlist-toggle-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist(${product.id})">
        <i class="fa-${isWishlisted ? 'solid' : 'regular'} fa-heart"></i>
      </button>
      <div class="product-image-box" onclick="openProductDetail(${product.id})">
        <img src="${product.image}" alt="${product.title}" class="product-image">
      </div>
      <h3 class="product-title" onclick="openProductDetail(${product.id})">${product.title}</h3>
      <div class="product-meta">${product.unit}</div>
      <div class="product-price-box">
        <div class="price-chf">CHF ${product.price.toFixed(2)}</div>
        <div class="price-sub">exkl. 8.1% USt.</div>
      </div>
      <div class="product-actions">
        <input type="number" value="1" min="1" class="qty-input" id="qty-${product.id}">
        <button class="add-cart-btn" onclick="addToCart(${product.id})">
          <i class="fa-solid fa-cart-plus"></i> In den Korb
        </button>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

// 4. Warenkorb Logik
window.addToCart = function(productId, customQty = null) {
  const qtyInput = document.getElementById(`qty-${productId}`);
  const qty = customQty || (qtyInput ? parseInt(qtyInput.value) : 1);
  const product = products.find(p => p.id === productId);

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
  document.getElementById("checkoutFinalTotal").textContent = `CHF ${grandTotal.toFixed(2)}`;

  // Fortschrittsbalken
  if (subtotalExcl >= FREE_SHIPPING_LIMIT) {
    shippingStatusText.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#10b981;"></i> Gratulation! Ihre Lieferung ist <strong>versandkostenfrei</strong>!`;
    shippingProgressFill.style.width = "100%";
  } else {
    const needed = FREE_SHIPPING_LIMIT - subtotalExcl;
    const progressPercent = Math.min(100, (subtotalExcl / FREE_SHIPPING_LIMIT) * 100);
    shippingStatusText.innerHTML = `Noch <strong>CHF ${needed.toFixed(2)}</strong> für kostenfreien Schweizer Versand!`;
    shippingProgressFill.style.width = `${progressPercent}%`;
  }

  // Warenkorb Liste Rendern
  const container = document.getElementById("cartItemsContainer");
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 0; color: #9ca3af;">
        <i class="fa-solid fa-cart-flatbed" style="font-size: 40px; margin-bottom: 12px;"></i>
        <p>Ihr Warenkorb ist aktuell leer.</p>
      </div>
    `;
    document.getElementById("checkoutBtn").disabled = true;
    document.getElementById("checkoutBtn").style.opacity = "0.5";
  } else {
    document.getElementById("checkoutBtn").disabled = false;
    document.getElementById("checkoutBtn").style.opacity = "1";

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
      container.appendChild(itemEl);
    });
  }
}

// 5. Merkzettel Logik
window.toggleWishlist = function(productId) {
  const index = wishlist.indexOf(productId);
  if (index > -1) {
    wishlist.splice(index, 1);
    showToast("Vom Merkzettel entfernt", "fa-heart-crack");
  } else {
    wishlist.push(productId);
    showToast("Auf dem Merkzettel gespeichert", "fa-heart");
  }
  updateWishlistUI();
  renderProducts();
};

function updateWishlistUI() {
  wishlistCountEl.textContent = wishlist.length;
  const container = document.getElementById("wishlistItemsContainer");
  container.innerHTML = "";

  if (wishlist.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 0; color: #9ca3af;">
        <i class="fa-regular fa-heart" style="font-size: 40px; margin-bottom: 12px;"></i>
        <p>Keine gemerkten Artikel.</p>
      </div>
    `;
    return;
  }

  wishlist.forEach(id => {
    const item = products.find(p => p.id === id);
    if (!item) return;
    const el = document.createElement("div");
    el.className = "cart-item";
    el.innerHTML = `
      <img src="${item.image}" class="cart-item-img">
      <div class="cart-item-details">
        <div class="cart-item-title">${item.title}</div>
        <div class="cart-item-price">CHF ${item.price.toFixed(2)}</div>
        <div class="cart-item-controls" style="margin-top:8px;">
          <button class="btn btn-red" style="padding:4px 8px; font-size:11px;" onclick="addToCart(${item.id})">
            <i class="fa-solid fa-cart-plus"></i> In Korb
          </button>
          <button class="remove-item-btn" onclick="toggleWishlist(${item.id})">Entfernen</button>
        </div>
      </div>
    `;
    container.appendChild(el);
  });
}

// 6. Produkt Detail Modal
window.openProductDetail = function(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const content = document.getElementById("productDetailContent");
  let tiersHTML = product.tiers.map(t => `<tr><td>${t.qty}</td><td><strong>${t.price}</strong></td></tr>`).join('');

  content.innerHTML = `
    <div>
      <img src="${product.image}" class="detail-img" alt="${product.title}">
    </div>
    <div>
      <span class="badge-tag" style="position:static; display:inline-block; margin-bottom:8px;">${product.badge}</span>
      <h2>${product.title}</h2>
      <p style="color:#6b7280; font-size:13px; margin-bottom:12px;">${product.unit}</p>
      <p style="font-size:14px; margin-bottom:16px;">${product.description}</p>
      
      <h4>Staffelpreise (exkl. MwSt.):</h4>
      <table class="tier-table">
        <thead><tr><th>Abnahme-Menge</th><th>Stückpreis</th></tr></thead>
        <tbody>${tiersHTML}</tbody>
      </table>

      <div style="display:flex; gap:10px; margin-top:20px;">
        <input type="number" id="detailQty" value="1" min="1" class="qty-input" style="width:70px;">
        <button class="btn btn-red btn-block" onclick="addToCart(${product.id}, parseInt(document.getElementById('detailQty').value)); closeModals();">
          <i class="fa-solid fa-cart-plus"></i> Jetzt bestellen
        </button>
      </div>
    </div>
  `;

  document.getElementById("productDetailModal").classList.add("active");
};

// 7. Info- / Rechtliche Seiten Modal Renderer
function openInfoModal(pageKey) {
  const contentEl = document.getElementById("infoModalContent");
  
  const pages = {
    impressum: `
      <h2>Impressum</h2>
      <p><strong>EP Verpackungs GmbH</strong><br>Schweizer B2B Kundenservice & Vertrieb<br>Gewerbestrasse 18<br>8000 Zürich, Schweiz</p>
      <h3>Kontakt</h3>
      <p>Telefon: +41 0800 123 456<br>E-Mail: kontakt@europack-world.ch</p>
      <h3>Handelsregister & UID</h3>
      <p>Handelsregister-Nr: CH-100.3.012.345-6<br>UID / USt-ID: CHE-123.456.789 MWST</p>
    `,
    datenschutz: `
      <h2>Datenschutzerklärung</h2>
      <p>Wir verarbeiten personenbezogene Daten unserer Schweizer B2B-Kunden streng nach den Vorgaben des Schweizer Datenschutzgesetzes (DSG) sowie der DSGVO.</p>
      <h3>1. Datenerhebung</h3>
      <p>Ihre Firmendaten werden ausschließlich zur Abwicklung von Bestellungen, Angeboten und Musteranforderungen verwendet.</p>
    `,
    versand: `
      <h2>Versand- & Zahlungsbedingungen</h2>
      <h3>Versand innerhalb der Schweiz</h3>
      <p>• Standard-Lieferzeit: 24 bis 48 Stunden per Die Schweizerische Post oder LKW-Spedition.<br>• Versandkostenfrei ab <strong>CHF 150.00</strong> Netto-Bestellwert.<br>• Unter CHF 150.00 berechnen wir pauschal CHF 9.90 Versandkosten.</p>
      <h3>Zahlungsarten für Gewerbekunden</h3>
      <p>• Kauf auf Rechnung (30 Tage Zahlungsziel ab Rechnungsdatum)<br>• Kreditkarte (Visa, Mastercard)<br>• Vorkasse mit 2% Skonto-Abzug</p>
    `,
    kontakt: `
      <h2>Kontakt & B2B-Beratung</h2>
      <p>Haben Sie Fragen zu Ihrer Bestellung, individuellen Formaten oder Großabnahmen?</p>
      <p><strong>Kundenservice:</strong> Mo–Fr, 08:00 – 17:00 Uhr<br><strong>Telefon:</strong> +41 0800 123 456<br><strong>E-Mail:</strong> einkauf@europack-world.ch</p>
    `
  };

  contentEl.innerHTML = pages[pageKey] || `<h2>Information</h2><p>Inhalt wird geladen...</p>`;
  document.getElementById("infoModal").classList.add("active");
}

// All Modals Schließen
function closeModals() {
  document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
  closeCartDrawer();
  closeWishlistDrawer();
}

function openCartDrawer() {
  cartDrawer.classList.add("active");
  cartOverlay.classList.add("active");
}
function closeCartDrawer() {
  cartDrawer.classList.remove("active");
  cartOverlay.classList.remove("active");
}

function openWishlistDrawer() {
  wishlistDrawer.classList.add("active");
  cartOverlay.classList.add("active");
}
function closeWishlistDrawer() {
  wishlistDrawer.classList.remove("active");
  cartOverlay.classList.remove("active");
}

// 8. Event Listener Registrierung
function setupEventListeners() {
  // Navigation & Filter
  document.querySelectorAll(".nav-link, .pill, .footer-category").forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const cat = el.getAttribute("data-category") || el.getAttribute("data-filter") || el.getAttribute("data-cat");
      currentFilter = cat;

      document.querySelectorAll(".nav-link").forEach(nl => nl.classList.remove("active"));
      document.querySelectorAll(".pill").forEach(pl => pl.classList.remove("active"));

      const matchPill = document.querySelector(`.pill[data-filter="${cat}"]`);
      if (matchPill) matchPill.classList.add("active");

      renderProducts();
      document.getElementById("products").scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Suche
  const executeSearch = () => {
    searchQuery = searchInput.value.trim();
    if (searchQuery) {
      searchFilterInfo.classList.remove("hidden");
      searchQueryDisplay.textContent = searchQuery;
    } else {
      searchFilterInfo.classList.add("hidden");
    }
    renderProducts();
  };

  searchInput.addEventListener("input", executeSearch);
  searchBtn.addEventListener("click", executeSearch);

  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchQuery = "";
    searchFilterInfo.classList.add("hidden");
    renderProducts();
  });

  // Drawers
  document.getElementById("openCartBtn").addEventListener("click", openCartDrawer);
  document.getElementById("closeCartBtn").addEventListener("click", closeCartDrawer);
  document.getElementById("openWishlistBtn").addEventListener("click", openWishlistDrawer);
  document.getElementById("closeWishlistBtn").addEventListener("click", closeWishlistDrawer);
  cartOverlay.addEventListener("click", closeModals);

  // Formular-Modals Öffnen
  document.getElementById("openLoginBtn").addEventListener("click", () => document.getElementById("loginModal").classList.add("active"));
  document.getElementById("openSampleModalBtn").addEventListener("click", () => document.getElementById("sampleModal").classList.add("active"));
  document.getElementById("floatingMusterBtn").addEventListener("click", () => document.getElementById("sampleModal").classList.add("active"));
  document.getElementById("heroCatalogBtn").addEventListener("click", () => document.getElementById("catalogModal").classList.add("active"));
  document.getElementById("openInquiryBtn").addEventListener("click", () => document.getElementById("inquiryModal").classList.add("active"));

  document.getElementById("heroShopBtn").addEventListener("click", () => {
    document.getElementById("products").scrollIntoView({ behavior: 'smooth' });
  });

  // Close Buttons
  document.querySelectorAll(".close-modal").forEach(btn => {
    btn.addEventListener("click", closeModals);
  });

  // Footer Info Links
  document.querySelectorAll(".info-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      openInfoModal(link.getAttribute("data-page"));
    });
  });

  // Formular Submits
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    currentUser = email.split('@')[0];
    document.getElementById("loginText").textContent = currentUser;
    showToast(`Willkommen zurück, ${currentUser}!`);
    closeModals();
  });

  document.getElementById("sampleForm").addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("Musteranfrage erfolgreich übermittelt!");
    closeModals();
  });

  document.getElementById("catalogForm").addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("Katalog 2026 wurde per E-Mail versendet!");
    closeModals();
  });

  document.getElementById("inquiryForm").addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("Anfrage übermittelt! Wir kontaktieren Sie in 24h.");
    closeModals();
  });

  // Checkout
  document.getElementById("checkoutBtn").addEventListener("click", () => {
    if (cart.length === 0) return;
    closeCartDrawer();
    document.getElementById("checkoutModal").classList.add("active");
  });

  document.getElementById("checkoutForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const company = document.getElementById("coCompany").value;
    const name = document.getElementById("coName").value;
    const email = document.getElementById("coEmail").value;
    const payment = document.querySelector('input[name="paymentMethod"]:checked').value;
    const grandTotal = grandTotalText.textContent;

    document.getElementById("successOrderSummary").innerHTML = `
      <strong>Auftrags-Bestätigung (Schweiz):</strong><br>
      • Kunde: ${company} (${name})<br>
      • Rechnungs-E-Mail: ${email}<br>
      • Zahlungsart: ${payment}<br>
      • Rechnungsbetrag: <strong>${grandTotal}</strong> (inkl. 8.1% USt.)
    `;

    cart = [];
    updateCartUI();
    closeModals();
    document.getElementById("successModal").classList.add("active");
  });

  document.getElementById("closeSuccessBtn").addEventListener("click", closeModals);
}
