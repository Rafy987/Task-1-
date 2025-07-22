// Movies page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeMoviesPage();
});

function initializeMoviesPage() {
    setupFilters();
    setupLoadMore();
    handleUrlFilters();
}

// Setup filter functionality
function setupFilters() {
    const genreFilter = document.getElementById('genreFilter');
    const yearFilter = document.getElementById('yearFilter');
    const sortFilter = document.getElementById('sortFilter');

    if (genreFilter) {
        genreFilter.addEventListener('change', applyFilters);
    }
    if (yearFilter) {
        yearFilter.addEventListener('change', applyFilters);
    }
    if (sortFilter) {
        sortFilter.addEventListener('change', applySorting);
    }
}

// Apply filters to movie cards
function applyFilters() {
    const genreFilter = document.getElementById('genreFilter').value.toLowerCase();
    const yearFilter = document.getElementById('yearFilter').value;
    const movieCards = document.querySelectorAll('.movie-card');
    
    let visibleCount = 0;
    
    movieCards.forEach(card => {
        const cardGenre = card.getAttribute('data-genre');
        const cardYear = card.getAttribute('data-year');
        
        let showCard = true;
        
        // Genre filter
        if (genreFilter && !cardGenre.includes(genreFilter)) {
            showCard = false;
        }
        
        // Year filter
        if (yearFilter && !matchesYearFilter(cardYear, yearFilter)) {
            showCard = false;
        }
        
        if (showCard) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show/hide load more button based on results
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = visibleCount > 12 ? 'block' : 'none';
    }
    
    // Show no results message if needed
    showNoResultsMessage(visibleCount === 0);
}

// Check if year matches filter
function matchesYearFilter(cardYear, yearFilter) {
    const year = parseInt(cardYear);
    
    switch (yearFilter) {
        case '2024':
        case '2023':
        case '2022':
        case '2021':
        case '2020':
            return year.toString() === yearFilter;
        case '2010s':
            return year >= 2010 && year <= 2019;
        case '2000s':
            return year >= 2000 && year <= 2009;
        case 'classic':
            return year < 2000;
        default:
            return true;
    }
}

// Apply sorting to movie cards
function applySorting() {
    const sortFilter = document.getElementById('sortFilter').value;
    const moviesGrid = document.getElementById('moviesGrid');
    const movieCards = Array.from(document.querySelectorAll('.movie-card'));
    const loadMoreContainer = document.querySelector('.load-more-container');
    
    // Remove load more button temporarily
    if (loadMoreContainer) {
        loadMoreContainer.remove();
    }
    
    // Sort movie cards
    movieCards.sort((a, b) => {
        switch (sortFilter) {
            case 'rating':
                return parseFloat(b.getAttribute('data-rating')) - parseFloat(a.getAttribute('data-rating'));
            case 'newest':
                return parseInt(b.getAttribute('data-year')) - parseInt(a.getAttribute('data-year'));
            case 'oldest':
                return parseInt(a.getAttribute('data-year')) - parseInt(b.getAttribute('data-year'));
            case 'alphabetical':
                const titleA = a.querySelector('.movie-title').textContent.toLowerCase();
                const titleB = b.querySelector('.movie-title').textContent.toLowerCase();
                return titleA.localeCompare(titleB);
            case 'popular':
            default:
                // Keep original order for popular
                return 0;
        }
    });
    
    // Clear and re-append sorted cards
    moviesGrid.innerHTML = '';
    movieCards.forEach(card => {
        moviesGrid.appendChild(card);
    });
    
    // Re-add load more button
    if (loadMoreContainer) {
        moviesGrid.parentNode.appendChild(loadMoreContainer);
    }
    
    // Animate cards
    movieCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

// Setup load more functionality
function setupLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreMovies);
    }
}

// Load more movies (simulate loading additional content)
function loadMoreMovies() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const moviesGrid = document.getElementById('moviesGrid');
    
    // Show loading state
    loadMoreBtn.innerHTML = '<div class="loading"></div> Loading...';
    loadMoreBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        // Add more movie cards (in a real app, this would come from an API)
        const additionalMovies = [
            {
                id: 122,
                title: "The Lord of the Rings: The Return of the King",
                year: 2003,
                rating: 8.9,
                genre: "action",
                genres: "Adventure, Fantasy",
                poster: "https://image.tmdb.org/t/p/w500/f4yVsKVlYI6YGAOUACk6up3pJuI.jpg"
            },
            {
                id: 389,
                title: "12 Angry Men",
                year: 1957,
                rating: 9.0,
                genre: "drama",
                genres: "Drama, Crime",
                poster: "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg"
            },
            {
                id: 19404,
                title: "Dilwale Dulhania Le Jayenge",
                year: 1995,
                rating: 8.7,
                genre: "romance",
                genres: "Romance, Drama",
                poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
            }
        ];
        
        additionalMovies.forEach(movie => {
            const movieCard = createMovieCard(movie);
            moviesGrid.appendChild(movieCard);
        });
        
        // Reset button
        loadMoreBtn.innerHTML = 'Load More Movies';
        loadMoreBtn.disabled = false;
        
        // Hide button after loading (simulate no more content)
        loadMoreBtn.style.display = 'none';
        
        // Show notification
        MovieWind.showNotification('3 more movies loaded!');
        
    }, 1500);
}

// Create movie card element
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.setAttribute('onclick', `navigateToMovieDetails(${movie.id})`);
    card.setAttribute('data-genre', movie.genre);
    card.setAttribute('data-year', movie.year);
    card.setAttribute('data-rating', movie.rating);
    
    card.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}" class="movie-poster" loading="lazy">
        <div class="movie-info">
            <h3 class="movie-title">${movie.title}</h3>
            <div class="movie-meta">
                <span class="movie-year">${movie.year}</span>
                <div class="movie-rating">
                    <i class="fas fa-star"></i>
                    <span>${movie.rating}</span>
                </div>
            </div>
            <p class="movie-genre">${movie.genres}</p>
        </div>
    `;
    
    // Add animation
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    setTimeout(() => {
        card.style.transition = 'all 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
    
    return card;
}

// Show/hide no results message
function showNoResultsMessage(show) {
    let noResultsMsg = document.getElementById('noResultsMessage');
    
    if (show && !noResultsMsg) {
        const moviesGrid = document.getElementById('moviesGrid');
        noResultsMsg = document.createElement('div');
        noResultsMsg.id = 'noResultsMessage';
        noResultsMsg.className = 'no-results-message';
        noResultsMsg.innerHTML = `
            <div style="text-align: center; padding: 4rem 2rem; color: white;">
                <i class="fas fa-search" style="font-size: 3rem; color: #e50914; margin-bottom: 1rem;"></i>
                <h3 style="margin-bottom: 1rem;">No movies found</h3>
                <p style="opacity: 0.7;">Try adjusting your filters or search terms</p>
                <button class="btn-secondary" onclick="clearAllFilters()" style="margin-top: 1.5rem;">Clear Filters</button>
            </div>
        `;
        moviesGrid.appendChild(noResultsMsg);
    } else if (!show && noResultsMsg) {
        noResultsMsg.remove();
    }
}

// Clear all filters
function clearAllFilters() {
    document.getElementById('genreFilter').value = '';
    document.getElementById('yearFilter').value = '';
    document.getElementById('sortFilter').value = 'popular';
    
    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach(card => {
        card.style.display = 'block';
    });
    
    showNoResultsMessage(false);
    
    // Show load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = 'block';
    }
    
    MovieWind.showNotification('Filters cleared!');
}

// Handle URL filters (for deep linking)
function handleUrlFilters() {
    const urlParams = new URLSearchParams(window.location.search);
    const genre = urlParams.get('genre');
    const year = urlParams.get('year');
    const sort = urlParams.get('sort');
    
    if (genre) {
        document.getElementById('genreFilter').value = genre;
    }
    if (year) {
        document.getElementById('yearFilter').value = year;
    }
    if (sort) {
        document.getElementById('sortFilter').value = sort;
    }
    
    // Apply filters if any were set from URL
    if (genre || year || sort) {
        if (sort) {
            applySorting();
        }
        if (genre || year) {
            applyFilters();
        }
    }
}

// Update URL with current filters
function updateUrlWithFilters() {
    const genre = document.getElementById('genreFilter').value;
    const year = document.getElementById('yearFilter').value;
    const sort = document.getElementById('sortFilter').value;
    
    const params = new URLSearchParams();
    if (genre) params.set('genre', genre);
    if (year) params.set('year', year);
    if (sort && sort !== 'popular') params.set('sort', sort);
    
    const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
    window.history.replaceState({}, '', newUrl);
}

// Enhanced search for movies page
function enhancedMovieSearch(searchTerm) {
    const movieCards = document.querySelectorAll('.movie-card');
    let foundResults = false;

    movieCards.forEach(card => {
        const movieTitle = card.querySelector('.movie-title').textContent.toLowerCase();
        const movieYear = card.querySelector('.movie-year').textContent;
        const movieGenre = card.querySelector('.movie-genre').textContent.toLowerCase();
        
        if (movieTitle.includes(searchTerm) || 
            movieYear.includes(searchTerm) || 
            movieGenre.includes(searchTerm)) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease';
            foundResults = true;
        } else {
            card.style.display = searchTerm ? 'none' : 'block';
        }
    });

    showNoResultsMessage(!foundResults && searchTerm);
    
    // Hide load more button during search
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = searchTerm ? 'none' : 'block';
    }
}

// Override the search function for movies page
if (window.performSearch) {
    window.performSearch = enhancedMovieSearch;
}

// Add event listeners for filter changes to update URL
document.addEventListener('DOMContentLoaded', function() {
    const filters = ['genreFilter', 'yearFilter', 'sortFilter'];
    filters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', updateUrlWithFilters);
        }
    });
});

// Export functions for global access
window.clearAllFilters = clearAllFilters;