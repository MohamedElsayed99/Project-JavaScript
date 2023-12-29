
var productCategories = ['All Categories', 'Electronics', 'Gaming', 'Photographer', 'Laptops' ,'mouse'];

var sliderContainer = document.getElementById('slider-container');
var slides = ['images/1.jpg', 'images/2.jpg', 'images/3.jpg', 'images/4.jpg', 'images/5.jpg', 'images/6.jpg',
    'images/7.jpg', 'images/8.jpg'
];
var currentSlide = 0;

function showSlides() {
    sliderContainer.innerHTML = '';
    slides.forEach((slide, index) => {
        var slideElement = document.createElement('div');
        slideElement.classList.add('slide');
        slideElement.innerHTML = `<img src="${slide}" alt="Slider Image ${index + 1}">`;
        sliderContainer.appendChild(slideElement);
    });
    sliderContainer.style.transform = `translateX(${-currentSlide * 100}%)`;
}

function nextSlide() {
    if (currentSlide < slides.length - 1) {
        currentSlide++;
    } else {
        currentSlide = 0;
    }
    showSlides();
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
    } else {
        currentSlide = slides.length - 1;
    }
    showSlides();
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Initialize the session storage cart if it doesn't exist
if (!sessionStorage.getItem('cart')) {
    sessionStorage.setItem('cart', JSON.stringify([]));
}

function updateCartCount() {
    var cartCount = document.getElementById('cartCount');
    var cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    cartCount.innerText = cart.length.toString();
}

function displayHomePage() {
    var content = document.getElementById('content');
    var categoryButtons = document.getElementById('categoryButtons');
    productCategories.forEach(category => { var button = document.createElement('button');
        button.innerText = category;
        button.onclick = function () {filterProducts(category);};
        categoryButtons.appendChild(button);
    });
    content.innerHTML += '';
    for (var i = 1; i <= 8; i++) {
        var category = productCategories[i % productCategories.length];
        content.innerHTML += `
        <div class="card" id="product${i}" data-category="${category}">
            <img src="./images/${i}.jpg" alt="Product ${i}">
            <h3>Product ${i}</h3>
            <p>Description of Product ${i}.</p>
            <p>Category: ${category}</p>
            <p>Price: $${i * 10}</p>
            <button onclick="addToCart(${i}, ${i * 10})">Add to Cart</button>
        </div>`;
    }

    updateCartCount();
}

function addToCart(productId, price) {
    var product = {
        id: productId,
        name: `Product ${productId}`,
        description: `Description of Product ${productId}.`,
        category: document.getElementById(`product${productId}`).getAttribute('data-category'),
        price: price
    };

    var cart = JSON.parse(sessionStorage.getItem('cart'));
    cart.push(product);

    sessionStorage.setItem('cart', JSON.stringify(cart));

    alert(`Product ${productId} added to the cart with price $${price}!`);

    updateCartCount();
}

function filterProducts(selectedCategory) {
    var cards = document.getElementsByClassName('card');

    for (var card of cards) {
        var cardCategory = card.getAttribute('data-category');

        if (selectedCategory === 'All Categories' || cardCategory === selectedCategory) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    }
}

function initializePage() {
    showSlides();
    setInterval(nextSlide, 2000); // Change the interval as needed (in milliseconds)
}

function validateLogin() {
  var emailInput = document.getElementById('email');

var usernameInput = document.getElementById('username');
var passwordInput = document.getElementById('password');

var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(emailInput.value)) {
  document.getElementById('emailError').innerText = 'Invalid email address or required.';
  return;
} else {
  document.getElementById('emailError').innerText = '';
}


if (!usernameInput.value.trim() || !passwordInput.value.trim()) {
  alert('Both username and password are required.');
  return;
}
var usernameRegex = /^[A-Z][a-zA-Z]{5,}$/; 
var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 

if (!usernameRegex.test(usernameInput.value)) {
  alert('Invalid username. Please start with alphabetical character and User Name Must be More than 5 Char and Without Any Number.');
  return;
}

if (!passwordRegex.test(passwordInput.value)) {
  alert('Invalid password. Password must be at least 8 characters long and contain at least one letter and one number.');
  return;
}

alert('Login successful!');
}
// Initial display
displayHomePage();

