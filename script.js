// Global variables
let currentSlide = 1;
let totalSlides = 3;
let cartItems = [];
let cartTotal = 0;

// Page Management
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(pageId + 'Page');
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Close any open overlays
    closeOverlays();
}

// Hero Slider Functions
function nextSlide() {
    currentSlide = currentSlide >= totalSlides ? 1 : currentSlide + 1;
    updateSlider();
}

function previousSlide() {
    currentSlide = currentSlide <= 1 ? totalSlides : currentSlide - 1;
    updateSlider();
}

function goToSlide(slideNumber) {
    currentSlide = slideNumber;
    updateSlider();
}

function updateSlider() {
    // Hide all slides
    const slides = document.querySelectorAll('.hero-slide');
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Show current slide
    const currentSlideElement = document.querySelector(`[data-slide="${currentSlide}"]`);
    if (currentSlideElement) {
        currentSlideElement.classList.add('active');
    }
    
    // Update dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index + 1 === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
    
    // Update counter
    const slideCounter = document.getElementById('currentSlide');
    if (slideCounter) {
        slideCounter.textContent = currentSlide;
    }
}

// Auto-play slider
function startSlider() {
    setInterval(() => {
        nextSlide();
    }, 5000); // Change slide every 5 seconds
}

// Banner Functions
function closeBanner() {
    const banner = document.querySelector('.promo-banner');
    if (banner) {
        banner.style.display = 'none';
    }
}

// Search Functions
function toggleSearch() {
    const searchOverlay = document.getElementById('searchOverlay');
    const overlay = document.getElementById('overlay');
    
    if (searchOverlay.style.display === 'flex') {
        searchOverlay.style.display = 'none';
        overlay.style.display = 'none';
    } else {
        searchOverlay.style.display = 'flex';
        overlay.style.display = 'block';
        document.getElementById('searchInput').focus();
    }
}

function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (searchTerm.trim()) {
        // Filter products based on search term
        showPage('shop');
        filterProductsBySearch(searchTerm);
        toggleSearch(); // Close search overlay
    }
}

function filterProductsBySearch(searchTerm) {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const title = card.querySelector('.product-title').textContent.toLowerCase();
        const description = card.querySelector('.product-description').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Cart Functions
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    
    if (cartSidebar.classList.contains('open')) {
        cartSidebar.classList.remove('open');
        overlay.style.display = 'none';
    } else {
        cartSidebar.classList.add('open');
        overlay.style.display = 'block';
        updateCartDisplay();
    }
}

function addToCart(productId, productName, price, imageUrl) {
    // Check if item already exists in cart
    const existingItem = cartItems.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            id: productId,
            name: productName,
            price: price,
            image: imageUrl,
            quantity: 1
        });
    }
    
    updateCartCount();
    updateCartTotal();
    
    // Show success message
    showNotification(`${productName} added to cart!`);
}

function removeFromCart(productId) {
    cartItems = cartItems.filter(item => item.id !== productId);
    updateCartCount();
    updateCartTotal();
    updateCartDisplay();
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function updateCartTotal() {
    cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartTotalElement = document.getElementById('cartTotal');
    if (cartTotalElement) {
        cartTotalElement.textContent = cartTotal.toFixed(2);
    }
}

function updateCartDisplay() {
    const cartContent = document.getElementById('cartContent');
    const cartFooter = document.getElementById('cartFooter');
    
    if (cartItems.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-bag"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        cartFooter.style.display = 'none';
    } else {
        cartContent.innerHTML = cartItems.map(item => `
            <div class="cart-item" style="display: flex; gap: 15px; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #eee;">
                <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 5px;">
                <div style="flex: 1;">
                    <h4 style="font-size: 14px; margin-bottom: 5px;">${item.name}</h4>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-weight: 600; color: #8B4513;">$${item.price.toFixed(2)}</span>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span>Qty: ${item.quantity}</span>
                            <button onclick="removeFromCart('${item.id}')" style="background: #ff4444; color: white; border: none; border-radius: 3px; padding: 5px 8px; cursor: pointer; font-size: 12px;">Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
        cartFooter.style.display = 'block';
        updateCartTotal();
    }
}

function checkout() {
    if (cartItems.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    // Simple checkout simulation
    showNotification('Thank you for your order! Redirecting to checkout...');
    
    // Clear cart after checkout
    setTimeout(() => {
        cartItems = [];
        updateCartCount();
        updateCartDisplay();
        toggleCart();
    }, 2000);
}

// Product Functions
function filterProducts() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (!categoryFilter || category === categoryFilter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function sortProducts() {
    const sortBy = document.getElementById('sortFilter').value;
    const productsGrid = document.getElementById('productsGrid');
    const productCards = Array.from(document.querySelectorAll('.product-card'));
    
    productCards.sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return parseFloat(a.getAttribute('data-price')) - parseFloat(b.getAttribute('data-price'));
            case 'price-high':
                return parseFloat(b.getAttribute('data-price')) - parseFloat(a.getAttribute('data-price'));
            case 'name':
                return a.getAttribute('data-name').localeCompare(b.getAttribute('data-name'));
            default:
                return 0;
        }
    });
    
    // Remove all product cards
    productCards.forEach(card => card.remove());
    
    // Re-append sorted cards
    productCards.forEach(card => productsGrid.appendChild(card));
}

function showProductDetails(productId) {
    // Product details data
    const productDetails = {
        'biotin-shampoo': {
            name: 'Biotin B-Complex Shampoo',
            price: 24.99,
            image: 'https://lusetabeauty.com/cdn/shop/products/BiotinShampoo_500x.jpg?v=1652116775',
            description: 'A natural blend with Biotin, Caffeine, and Niacin, which helps stimulate hair roots, improve hair growth and structure, thicken and strengthen hair.',
            benefits: ['Stimulates hair growth', 'Strengthens hair follicles', 'Adds volume and thickness', 'Natural ingredients'],
            ingredients: 'Biotin, Caffeine, Niacin, Natural botanicals',
            howToUse: 'Apply to wet hair, massage gently into scalp, rinse thoroughly. Follow with conditioner for best results.'
        },
        'biotin-conditioner': {
            name: 'Biotin B-Complex Conditioner',
            price: 24.99,
            image: 'https://lusetabeauty.com/cdn/shop/products/BiotinConditioner_500x.jpg?v=1652116775',
            description: 'Nourishing and thickening formula that complements the Biotin shampoo for complete hair care.',
            benefits: ['Deeply nourishes hair', 'Adds shine and softness', 'Detangles hair', 'Supports hair growth'],
            ingredients: 'Biotin, Natural oils, Keratin proteins',
            howToUse: 'After shampooing, apply to mid-lengths and ends. Leave for 2-3 minutes, then rinse thoroughly.'
        }
        // Add more product details as needed
    };
    
    const product = productDetails[productId];
    if (!product) {
        showNotification('Product details not found');
        return;
    }
    
    const detailsContent = document.getElementById('productDetailsContent');
    detailsContent.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 20px;">
            <div>
                <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: 10px;">
            </div>
            <div>
                <h1 style="font-family: 'Playfair Display', serif; font-size: 2rem; margin-bottom: 15px;">${product.name}</h1>
                <p style="font-size: 1.5rem; color: #8B4513; font-weight: 600; margin-bottom: 20px;">$${product.price.toFixed(2)}</p>
                <p style="margin-bottom: 20px; line-height: 1.6;">${product.description}</p>
                
                <h3 style="margin-bottom: 10px;">Benefits:</h3>
                <ul style="margin-bottom: 20px;">
                    ${product.benefits.map(benefit => `<li style="margin-bottom: 5px;">${benefit}</li>`).join('')}
                </ul>
                
                <h3 style="margin-bottom: 10px;">Key Ingredients:</h3>
                <p style="margin-bottom: 20px;">${product.ingredients}</p>
                
                <h3 style="margin-bottom: 10px;">How to Use:</h3>
                <p style="margin-bottom: 30px;">${product.howToUse}</p>
                
                <button onclick="addToCart('${productId}', '${product.name}', ${product.price}, '${product.image}')" 
                        style="background-color: #8B4513; color: white; border: none; padding: 15px 30px; font-size: 16px; font-weight: 600; border-radius: 5px; cursor: pointer; width: 100%;">
                    ADD TO CART - $${product.price.toFixed(2)}
                </button>
            </div>
        </div>
    `;
    
    showPage('productDetails');
}

function showCollection(collectionId) {
    // Show shop page and filter by collection
    showPage('shop');
    
    // Map collection to category
    const collectionMap = {
        'hair-growth': 'shampoo',
        'moisturizing': 'conditioner',
        'color-care': 'shampoo',
        'repair': 'treatment'
    };
    
    const category = collectionMap[collectionId];
    if (category) {
        document.getElementById('categoryFilter').value = category;
        filterProducts();
    }
}

// Wishlist Functions
function toggleWishlist() {
    showNotification('Wishlist feature coming soon!');
}

function toggleWishlistItem(button) {
    const icon = button.querySelector('i');
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        showNotification('Added to wishlist!');
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        showNotification('Removed from wishlist!');
    }
}

function toggleAccount() {
    showNotification('Account feature coming soon!');
}

// Mobile Menu
function toggleMobileMenu() {
    const nav = document.querySelector('.main-nav');
    nav.classList.toggle('mobile-open');
}

// Overlay Functions
function closeOverlays() {
    const overlay = document.getElementById('overlay');
    const searchOverlay = document.getElementById('searchOverlay');
    const cartSidebar = document.getElementById('cartSidebar');
    
    overlay.style.display = 'none';
    searchOverlay.style.display = 'none';
    cartSidebar.classList.remove('open');
}

// Notification System
function showNotification(message) {
    // Create notification element if it doesn't exist
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #8B4513;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 3000;
            font-weight: 500;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;
        document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.style.transform = 'translateX(0)';
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
    }, 3000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize slider
    updateSlider();
    startSlider();
    
    // Initialize cart count
    updateCartCount();
    
    // Add search functionality on Enter key
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Close overlays when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target.id === 'overlay') {
            closeOverlays();
        }
    });
    
    // Add mobile responsive behavior
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            const nav = document.querySelector('.main-nav');
            nav.classList.remove('mobile-open');
        }
    });
});

// Add CSS for mobile navigation
const mobileNavCSS = `
    @media (max-width: 768px) {
        .main-nav {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background-color: white;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            padding-top: 50px;
            transition: left 0.3s ease;
            z-index: 1000;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
        }
        
        .main-nav.mobile-open {
            left: 0;
        }
        
        .nav-link {
            font-size: 18px;
            padding: 20px;
            width: 100%;
            text-align: center;
            border-bottom: 1px solid #eee;
        }
    }
`;

// Add the mobile navigation CSS to the document
const style = document.createElement('style');
style.textContent = mobileNavCSS;
document.head.appendChild(style);