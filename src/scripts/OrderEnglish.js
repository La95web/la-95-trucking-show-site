function getCartItems() {
  let cartItems = [];
  if (typeof window !== 'undefined') {
    cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems = cartItems.map(item => {
      item.quantity = item.quantity || 1;
      return item;
    })
  }
  return cartItems;
}

function calculateTotal(cartItems) {
  const total = cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  return total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function updateCartDisplay(cartItems) {
  const cartContainer = document.getElementById('cart-container');
  cartContainer.innerHTML = '';
  
  if (cartItems.length > 0) {
    cartItems.forEach((item, index) => {
      const cartItem = document.createElement('li');
      cartItem.className = 'cart-item';
      
      const itemName = document.createElement('p');
      itemName.textContent = item.name;
      cartItem.appendChild(itemName);

      const flexContainer = document.createElement('div');
      flexContainer.className = 'flex-container';

      const buttonContainer = document.createElement('div');
      buttonContainer.className = 'button-section';
      
      const decrementButton = document.createElement('button');
      const decrement = document.createElement('img');
      decrement.src = '/less.png';
      decrementButton.appendChild(decrement);
      decrementButton.addEventListener('click', () => decrementQuantity(index));
      buttonContainer.appendChild(decrementButton);

      const quantityDisplay = document.createElement('span');
      quantityDisplay.textContent = ` ${item.quantity || 1} `;
      buttonContainer.appendChild(quantityDisplay);

      const incrementButton = document.createElement('button');
      const increment = document.createElement('img');
      increment.src = '/plus.png';
      incrementButton.appendChild(increment);
      incrementButton.addEventListener('click', () => incrementQuantity(index));
      buttonContainer.appendChild(incrementButton);

      flexContainer.appendChild(buttonContainer);

      const deleteButton = document.createElement('div');
      deleteButton.className = 'trash';
      const deleteIcon = document.createElement('img');
      deleteIcon.src = '/trash.png';
      deleteButton.appendChild(deleteIcon);
      deleteButton.addEventListener('click', () => removeItem(index));
      flexContainer.appendChild(deleteButton);

      const simbolContent = document.createElement('div');
      simbolContent.className = 'simbol-content';

      const simbolPrice = document.createElement('p');
      simbolPrice.textContent = 'USD $';
      simbolContent.appendChild(simbolPrice);

      const itemPrice = document.createElement('p');
      itemPrice.textContent = `${item.price * (item.quantity || 1)}`;
      simbolContent.appendChild(itemPrice);

      flexContainer.appendChild(simbolContent);

      cartItem.appendChild(flexContainer);
      cartContainer.appendChild(cartItem);
    });
  } else {
    cartContainer.textContent = 'The cart is empty.';
    cartContainer.style.fontSize = '2rem';
    cartContainer.style.padding = '40px';
    cartContainer.style.textAlign = 'center';
  }

  document.getElementById('total').textContent = `USD $ ${calculateTotal(cartItems)}`;
}

function incrementQuantity(index) {
  let cartItems = getCartItems();
  if (cartItems[index].quantity < 99) {
    cartItems[index].quantity++;
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartDisplay(cartItems);
  }
}

function decrementQuantity(index) {
  let cartItems = getCartItems();
  if (cartItems[index].quantity > 1) {
    cartItems[index].quantity--;
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartDisplay(cartItems);
  }
}

function removeItem(index) {
  let cartItems = getCartItems();
  const removedItem = cartItems.splice(index, 1)[0];
  localStorage.setItem('cart', JSON.stringify(cartItems));
  updateCartDisplay(cartItems);
  updateButtonState(removedItem.name, false);
}

document.addEventListener('DOMContentLoaded', () => {
  let cartItems = getCartItems();
  updateCartDisplay(cartItems);
});

function updateButtonState(productName, isAdded) {
  document.querySelectorAll('.add-to-cart-button').forEach(button => {
    const itemIndex = button.getAttribute('data-index');
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const item = products[itemIndex];

    if (item.name === productName) {
      button.textContent = isAdded ? 'Added' : 'Add to cart';
    }
  });
}