// Test-Produkte für den Schweizer Markt (Preise in CHF)
const products = [
  {
    id: 'ch-01',
    name: 'Blockbodenbeutel Natur ohne Fenster',
    price: 18.50,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'ch-02',
    name: 'Geschenkkarton Schwarz Luxus',
    price: 34.00,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'ch-03',
    name: 'DHL / Post Versandkarton Wave',
    price: 12.90,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'ch-04',
    name: 'Flaschenverpackung 3er Set',
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80'
  }
];

let cart = [];

// DOM-Elemente initialisieren
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();

  const cartBtn = document.getElementById('cart-btn');
  const closeCartBtn = document.getElementById('close-cart');
  const cartOverlay = document.getElementById('cart-overlay');
  const checkoutBtn = document.getElementById('checkout-btn');

  cartBtn.addEventListener('click', toggleCart);
  closeCartBtn.addEventListener('click', toggleCart);
  cartOverlay.addEventListener('click', toggleCart);

  checkoutBtn.addEventListener('click', () => {
    if(cart.length === 0) {
      alert("Ihr Warenkorb ist leer.");
      return;
    }
    
    // Hier schicken wir den Kunden später zur Shopware Storefront / Checkout-API weiter
    alert("Weiterleitung zum sicheren Shopware Checkout (CHF)...");
  });
});

// Produkte im Grid rendern
function renderProducts() {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-title">${product.name}</div>
      <div class="product-price">CHF ${product.price.toFixed(2)}</div>
      <button class="btn-add" onclick="addToCart('${product.id}')">In den Warenkorb</button>
    `;
    grid.appendChild(card);
  });
}

// Warenkorb-Logik
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
  toggleCart(true); // Cart öffnen
}

function updateCartUI() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotalPrice = document.getElementById('cart-total-price');

  // Count & Summe berechnen
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  cartCount.innerText = totalQty;
  cartTotalPrice.innerText = `CHF ${totalAmount.toFixed(2)}`;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty-msg">Ihr Warenkorb ist noch leer.</p>';
    return;
  }

  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div>
        <strong>${item.name}</strong><br>
        <small>${item.qty} x CHF ${item.price.toFixed(2)}</small>
      </div>
      <div><strong>CHF ${(item.price * item.qty).toFixed(2)}</strong></div>
    </div>
  `).join('');
}

function toggleCart(forceOpen = false) {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');

  if (forceOpen === true) {
    drawer.classList.add('open');
    overlay.classList.add('open');
  } else {
    drawer.classList.toggle('open');
    overlay.classList.toggle('open');
  }
}
