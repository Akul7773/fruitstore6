let cart = [];
const cartLink = document.getElementById('cartLink');
const cartSection = document.getElementById('cart-section');
const cartItems = document.getElementById('cart-items');
const totalPrice = document.getElementById('total-price');
const locationResult = document.getElementById('location-result');

// Function to update the cart count
function updateCart() {
    const cartCount = cart.length;
    cartLink.innerText = `Cart (${cartCount})`;
    if (cartCount > 0) {
        cartLink.style.backgroundColor = '#FEB47B'; // Highlight the cart when not empty
    } else {
        cartLink.style.backgroundColor = 'transparent';
    }
}

// Function to handle adding a product to the cart
function addToCart(event) {
    const productCard = event.target.closest('.product-card');
    const productId = productCard.getAttribute('data-id');
    const productName = productCard.querySelector('h3').innerText;
    const productPrice = parseFloat(productCard.querySelector('p').innerText.replace('$', ''));
    const quantity = parseInt(productCard.querySelector('.product-quantity').value);

    if (quantity < 5) {
        alert("Quantity must be at least 5 kg.");
        return;
    }

    const product = {
        id: productId,
        name: productName,
        price: productPrice,
        quantity: quantity
    };

    cart.push(product);
    updateCart();
    refreshCart();
    alert(`${quantity} kg of ${productName} added to cart!`);
}

// Function to refresh the cart UI
function refreshCart() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerText = `${item.name} - ${item.quantity} kg - $${(item.price * item.quantity).toFixed(2)}`;
        cartItems.appendChild(listItem);
        total += item.price * item.quantity;
    });

    totalPrice.innerText = total.toFixed(2);
}

// Function to handle cart display
function showCart() {
    cartSection.style.display = 'block';
}

// Function to close cart
function closeCart() {
    cartSection.style.display = 'none';
}

// Handle checkout
function checkout() {
    alert('Checkout is under development!');
}

// Function to search products
function searchProduct() {
    const searchQuery = document.getElementById('search-bar').value.toLowerCase();
    const products = document.querySelectorAll('.product-card');

    products.forEach(product => {
        const name = product.querySelector('h3').innerText.toLowerCase();
        if (name.includes(searchQuery)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Function to get the user's location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        locationResult.innerText = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    locationResult.innerText = `Latitude: ${lat}° , Longitude: ${lon}°`;
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            locationResult.innerText = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            locationResult.innerText = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            locationResult.innerText = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            locationResult.innerText = "An unknown error occurred.";
            break;
    }
}

// Event listeners for "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
});

// Show the cart when clicking the cart link
cartLink.addEventListener('click', showCart);
