// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize Website
function initializeWebsite() {
    setupNavbar();
    setupAlertBanner();
    setupSearchFunctionality();
    setupMobileMenu();
    setupSmoothScrolling();
    setupMovieCards();
    setupTelegramButton();
    addScrollEffects();
}

// Navbar functionality
function setupNavbar() {
    const navbar = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 15, 15, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(15, 15, 15, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Active link highlighting
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

// Alert Banner functionality
function setupAlertBanner() {
    const alertBanner = document.querySelector('.alert-banner');
    const alertClose = document.querySelector('.alert-close');
    
    if (alertClose && alertBanner) {
        alertClose.addEventListener('click', () => {
            alertBanner.style.transform = 'translateY(-100%)';
            setTimeout(() => {
                alertBanner.style.display = 'none';
            }, 300);
        });
    }
}

// Search functionality
function setupSearchFunctionality() {
    const searchInput = document.getElementById('searchInput');
    const movieCards = document.querySelectorAll('.movie-card');
    
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const searchTerm = e.target.value.toLowerCase().trim();
                performSearch(searchTerm);
            }, 300);
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const searchTerm = e.target.value.toLowerCase().trim();
                if (searchTerm) {
                    window.location.href = `movies.html?search=${encodeURIComponent(searchTerm)}`;
                }
            }
        });
    }
}

// Perform search functionality
function performSearch(searchTerm) {
    const movieCards = document.querySelectorAll('.movie-card');
    let foundResults = false;

    movieCards.forEach(card => {
        const movieTitle = card.querySelector('.movie-title').textContent.toLowerCase();
        const movieYear = card.querySelector('.movie-year').textContent;
        
        if (movieTitle.includes(searchTerm) || movieYear.includes(searchTerm)) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease';
            foundResults = true;
        } else {
            card.style.display = searchTerm ? 'none' : 'block';
        }
    });

    // Show/hide sections based on search results
    const sections = document.querySelectorAll('.featured-section, .popular-section, .recent-section');
    sections.forEach(section => {
        const visibleCards = section.querySelectorAll('.movie-card[style*="display: block"], .movie-card:not([style*="display: none"])');
        if (searchTerm && visibleCards.length === 0) {
            section.style.display = 'none';
        } else {
            section.style.display = 'block';
        }
    });
}

// Mobile menu functionality
function setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = mobileToggle.querySelectorAll('span');
            if (mobileToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                navMenu.style.display = 'flex';
                navMenu.style.flexDirection = 'column';
                navMenu.style.position = 'absolute';
                navMenu.style.top = '100%';
                navMenu.style.left = '0';
                navMenu.style.width = '100%';
                navMenu.style.background = 'rgba(15, 15, 15, 0.98)';
                navMenu.style.padding = '2rem';
                navMenu.style.borderTop = '1px solid rgba(255, 255, 255, 0.1)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                navMenu.style.display = 'none';
            }
        });
    }
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Movie card interactions
function setupMovieCards() {
    const movieCards = document.querySelectorAll('.movie-card');
    
    movieCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            const poster = card.querySelector('.movie-poster');
            if (poster) {
                poster.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            const poster = card.querySelector('.movie-poster');
            if (poster) {
                poster.style.transform = 'scale(1)';
            }
        });

        // Add loading effect for images
        const poster = card.querySelector('.movie-poster');
        if (poster) {
            poster.addEventListener('load', () => {
                poster.style.opacity = '1';
            });
            
            poster.addEventListener('error', () => {
                poster.src = 'https://via.placeholder.com/500x750/333/fff?text=No+Image';
                poster.alt = 'Image not available';
            });
        }
    });
}

// Navigation to movie details
function navigateToMovieDetails(movieId) {
    // Add loading animation
    showLoading();
    
    // Simulate navigation delay
    setTimeout(() => {
        // In a real application, you would navigate to a movie details page
        // For now, we'll show an alert
        hideLoading();
        showMovieModal(movieId);
    }, 1000);
}

// Show loading animation
function showLoading() {
    const body = document.body;
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner">
            <div class="loading"></div>
            <p style="color: white; margin-top: 1rem;">Loading movie details...</p>
        </div>
    `;
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(15, 15, 15, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        backdrop-filter: blur(5px);
    `;
    body.appendChild(loadingOverlay);
}

// Hide loading animation
function hideLoading() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.remove();
    }
}

// Show movie modal (placeholder for movie details)
function showMovieModal(movieId) {
    const modal = document.createElement('div');
    modal.className = 'movie-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Movie Details</h2>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>Movie ID: ${movieId}</p>
                <p>Feature coming soon! This will show detailed movie information, trailer, and streaming options.</p>
                <div class="modal-actions">
                    <button class="btn-primary">Watch Trailer</button>
                    <button class="btn-secondary">Add to Watchlist</button>
                </div>
            </div>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(5px);
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
        padding: 2rem;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;
    
    const modalHeader = modal.querySelector('.modal-header');
    modalHeader.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    `;
    
    const modalActions = modal.querySelector('.modal-actions');
    modalActions.style.cssText = `
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Animate modal
    modalContent.style.transform = 'scale(0.8)';
    modalContent.style.opacity = '0';
    setTimeout(() => {
        modalContent.style.transition = 'all 0.3s ease';
        modalContent.style.transform = 'scale(1)';
        modalContent.style.opacity = '1';
    }, 10);
}

// Telegram button functionality
function setupTelegramButton() {
    const telegramBtn = document.querySelector('.telegram-btn');
    if (telegramBtn) {
        telegramBtn.addEventListener('click', () => {
            // In a real application, this would open the Telegram channel
            window.open('https://t.me/moviewind', '_blank');
        });
    }
}

// Scroll effects and animations
function addScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe movie cards and sections
    const elementsToAnimate = document.querySelectorAll('.movie-card, .section-title');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Utility function to get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Handle search from URL parameters
function handleUrlSearch() {
    const searchParam = getUrlParameter('search');
    if (searchParam) {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = searchParam;
            performSearch(searchParam.toLowerCase());
        }
    }
}

// Initialize URL search handling
document.addEventListener('DOMContentLoaded', () => {
    handleUrlSearch();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Press '/' to focus search
    if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Press 'Escape' to clear search
    if (e.key === 'Escape') {
        const searchInput = document.getElementById('searchInput');
        if (searchInput && searchInput.value) {
            searchInput.value = '';
            performSearch('');
            searchInput.blur();
        }
        
        // Close modals
        const modal = document.querySelector('.movie-modal');
        if (modal) {
            modal.remove();
        }
    }
});

// Add some utility functions for future enhancements
const MovieWind = {
    // API endpoints (placeholder)
    apiBase: 'https://api.themoviedb.org/3',
    apiKey: 'your-api-key-here',
    
    // Search movies (placeholder)
    searchMovies: async function(query) {
        try {
            // This would be a real API call in production
            console.log(`Searching for: ${query}`);
            return [];
        } catch (error) {
            console.error('Search error:', error);
            return [];
        }
    },
    
    // Get movie details (placeholder)
    getMovieDetails: async function(movieId) {
        try {
            // This would be a real API call in production
            console.log(`Getting details for movie ID: ${movieId}`);
            return {};
        } catch (error) {
            console.error('Movie details error:', error);
            return null;
        }
    },
    
    // Add to favorites (placeholder)
    addToFavorites: function(movieId) {
        let favorites = JSON.parse(localStorage.getItem('moviewind-favorites') || '[]');
        if (!favorites.includes(movieId)) {
            favorites.push(movieId);
            localStorage.setItem('moviewind-favorites', JSON.stringify(favorites));
            this.showNotification('Added to favorites!');
        }
    },
    
    // Show notification
    showNotification: function(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 10001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
};

// Make MovieWind globally available
window.MovieWind = MovieWind;