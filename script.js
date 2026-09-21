// B2B Sortiment mit Kategorien & Verpackungseinheiten (CHF)
const products = [
  {
    id: 'ch-01',
    category: 'beutel',
    name: 'Blockbodenbeutel Natur ohne Fenster',
    unit: 'Packung à 500 Stück',
    price: 38.50,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'ch-02',
    category: 'kartons',
    name: 'Fefco 0201 Versandkarton 400x300x200mm',
    unit: 'Bündel à 25 Stück',
    price: 24.90,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'ch-03',
    category: 'gastro',
    name: 'Holzbesteck-Set Messer & Gabel nachhaltig',
    unit: 'Karton à 1.000 Stück',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'ch-04',
    category: 'hygiene',
    name: 'Handtuchpapier 2-lagig Weiß Z-Falz',
    unit: 'Karton à 3.000 Blatt',
    price: 29.80,
    image: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'ch-05',
    category: 'kartons',
    name: 'Flaschen-Versandkarton 3er Set Wave',
    unit: 'Karton à 10 Stück',
    price: 32.00,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'ch-06',
    category: 'beutel',
    name: 'PP-Flachbeutel Hochtransparent 150x250mm',
    unit: 'Packung à 1.000 Stück',
    price: 19.50,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=400&q=80'
  }
];

let cart = [];
const freeShippingThreshold = 150.00;

document.addEventListener('DOMContentLoaded', () => {
  renderProducts('all');

  // Event Listener für Kategorie-Filter
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderProducts(e.target.dataset.category);
    });
  });

  // Warenkorb Side-Drawer Events
  const cartBtn = document.getElementById('cart-btn');
  const closeCartBtn = document.getElementById('close-cart');
  const cartOverlay = document.getElementById('cart-overlay');
  const checkoutBtn = document.getElementById('checkout-btn');

  cartBtn.addEventListener('click', toggleCart);
  closeCartBtn.addEventListener('click', toggleCart);
  cartOverlay.addEventListener('click', toggleCart);

  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert("Ihr Warenkorb ist leer.");
      return;
    }
    alert("Weiterleitung zum sicheren Shopware Checkout (CHF)...");
  });
});

// Produkt-Grid rendern
function renderProducts(filterCategory) {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = '';

  const filtered = filterCategory === 'all' 
    ? products 
    : products.filter(p => p.category === filterCategory);

  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" class="product-image">
      <div class="product-unit">${p.unit}</div>
      <div class="product-title">${p.name}</div>
      <div class="product-price-box">
        <span class="product-price">CHF ${p.price.toFixed(2)}</span>
        <span class="product-price-sub"> zzgl. MwSt.</span>
      </div>
      <div class="qty-control">
        <button class="qty-btn" onclick="changeQtyInput('${p.id}', -1)">-</button>
        <input type="number" id="qty-${p.id}" value="1" min="1" class="qty-input">
        <button class="qty-btn" onclick="changeQtyInput('${p.id}', 1)">+</button>
      </div>
      <button class="btn-add" onclick="addToCart('${p.id}')">In den Warenkorb</button>
    `;
    grid.appendChild(card);
  });
}

// Mengen-Buttons auf den Produktkarten
function changeQtyInput(id, delta) {
  const input = document.getElementById(`qty-${id}`);
  let current = parseInt(input.value) || 1;
  current += delta;
  if (current < 1) current = 1;
  input.value = current;
}

// Warenkorb-Hinzufügen
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const qtyInput = document.getElementById(`qty-${productId}`);
  const qtyToAdd = parseInt(qtyInput.value) || 1;

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.qty += qtyToAdd;
  } else {
    cart.push({ ...product, qty: qtyToAdd });
  }

  updateCartUI();
  toggleCart(true);
}

// Warenkorb UI & Versandkostenfortschritt berechnen
function updateCartUI() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotalPrice = document.getElementById('cart-total-price');
  const shippingText = document.getElementById('shipping-text');
  const progressFill = document.getElementById('progress-fill');

  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  cartCount.innerText = totalQty;
  cartTotalPrice.innerText = `CHF ${totalAmount.toFixed(2)}`;

  // Versandkostenfreigrenze
  if (totalAmount >= freeShippingThreshold) {
    shippingText.innerText = "🎉 Sie erhalten kostenlosen Versand!";
    progressFill.style.width = "100%";
  } else {
    const diff = freeShippingThreshold - totalAmount;
    const percentage = (totalAmount / freeShippingThreshold) * 100;
    shippingText.innerText = `Noch CHF ${diff.toFixed(2)} bis zum kostenlosen Versand!`;
    progressFill.style.width = `${percentage}%`;
  }

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
