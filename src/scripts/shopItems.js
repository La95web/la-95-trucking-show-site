document.addEventListener('DOMContentLoaded', () => {
  const products = JSON.parse(localStorage.getItem('products')) || [
    { name: "Producto 1", price: 170.00, type: "Tipo 1"},
    { name: "Producto 2", price: 180.00, type: "Tipo 2"},
    { name: "Producto 3", price: 190.00, type: "Tipo 3"},
  ];

  localStorage.setItem('products', JSON.stringify(products));

  function addToCart(item) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(cartItem => cartItem.name === item.name);

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1);
    } else {
      item.quantity = 1;
      cart.push(item);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function setupEventListeners() {
    document.querySelectorAll('.add-to-cart-button').forEach(button => {
      const itemIndex = button.getAttribute('data-index');
      const products = JSON.parse(localStorage.getItem('products')) || [];
      const item = products[itemIndex];
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existingItem = cart.find(cartItem => cartItem.name === item.name);

      if (existingItem) {
        button.textContent = 'Agregado';
      }

      button.addEventListener('click', (event) => {
        addToCart(item);
        button.textContent = 'Agregado';
      });
    });
  }

  setupEventListeners();
});
