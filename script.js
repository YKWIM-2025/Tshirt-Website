let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Added to cart!');
}

function loadCart() {
  const itemsContainer = document.getElementById('cart-items');
  const totalContainer = document.getElementById('total');
  let total = 0;
  itemsContainer.innerHTML = '';
  cart.forEach((item, index) => {
    total += item.price;
    itemsContainer.innerHTML += `<p>${item.name} - ₹${item.price}</p>`;
  });
  totalContainer.innerText = `Total: ₹${total}`;
}

function checkout() {
  const amount = cart.reduce((sum, item) => sum + item.price, 0) * 100;
  const options = {
    key: 'rzp_test_YourTestKeyHere',
    amount: amount,
    currency: 'INR',
    name: 'You Know What I Mean',
    description: 'T-shirt Order',
    handler: function (response) {
      alert('Payment Successful!');
      localStorage.removeItem('cart');
      window.location.href = 'thankyou.html';
    },
    prefill: {
      name: '',
      email: ''
    },
    theme: {
      color: '#000'
    }
  };
  const rzp = new Razorpay(options);
  rzp.open();
}

function buyNow(price) {
  const options = {
    key: 'rzp_test_YourTestKeyHere',
    amount: price * 100,
    currency: 'INR',
    name: 'You Know What I Mean',
    description: 'T-shirt Order',
    handler: function (response) {
      alert('Payment Successful!');
      window.location.href = 'thankyou.html';
    },
    prefill: {
      name: '',
      email: ''
    },
    theme: {
      color: '#000'
    }
  };
  const rzp = new Razorpay(options);
  rzp.open();
}

if (window.location.pathname.includes('cart.html')) {
  loadCart();
}
