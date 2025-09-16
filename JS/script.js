// Dapatkan troli dari localStorage (simpan data antara halaman)
let cart = JSON.parse(localStorage.getItem('gearup-cart') || '[]');

// Update paparan jumlah item
function updateCartDisplay() {
  const count = cart.length;
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    cartCount.textContent = count > 0 ? count : '';
  }
}

// Tambah ke troli
function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem('gearup-cart', JSON.stringify(cart));
  updateCartDisplay();
  alert(`✅ ${name} berjaya ditambah ke troli!`);
}

// Paparkan troli
function viewCart() {
  window.location.href = 'payment.html';
}

// Paparkan senarai barang dalam troli
function displayCart() {
  const cartItems = document.getElementById('cart-items');
  const totalPrice = document.getElementById('total-price');
  
  if (!cartItems || !totalPrice) return;
  
  cartItems.innerHTML = '';
  let total = 0;
  
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} - RM ${item.price}
      <button class="remove-item" onclick="removeFromCart(${index})">Hapus</button>
    `;
    cartItems.appendChild(li);
    total += item.price;
  });
  
  totalPrice.textContent = `Jumlah: RM ${total}`;
}

// Hapus item dari troli
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('gearup-cart', JSON.stringify(cart));
  displayCart();
  updateCartDisplay();
}

// Sahkan pembayaran
function confirmPayment() {
  if (cart.length === 0) {
    alert("❌ Tiada barang dalam troli!");
    return false;
  }
  
  alert("✅ Pembayaran berjaya! Tempahan anda sedang diproses.");
  cart = [];
  localStorage.setItem('gearup-cart', JSON.stringify(cart));
  updateCartDisplay();
  return true;
}

// Initialize troli pada setiap halaman
document.addEventListener('DOMContentLoaded', function() {
  updateCartDisplay();
  
  // Jika di halaman payment, paparkan troli
  if (window.location.pathname.includes('payment.html')) {
    displayCart();
  }
  
  // Neural Network Background Animation
  const canvas = document.getElementById('neural-bg');
  const ctx = canvas.getContext('2d');
  let nodes = [];
  let mouse = { x: 0, y: 0 };
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  class Node {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 3 + 1;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#00ffff';
      ctx.fill();
    }
  }
  
  function init() {
    nodes = [];
    for (let i = 0; i < 100; i++) {
      nodes.push(new Node(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      ));
    }
  }
  
  function connectNodes() {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 150) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(0, 255, 255, ${1 - distance / 150})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nodes.forEach(node => {
      node.update();
      node.draw();
    });
    connectNodes();
    requestAnimationFrame(animate);
  }
  
  // Initialize and start animation
  init();
  animate();
  
  // Handle window resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  });
  
  // Mouse move effect
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
});