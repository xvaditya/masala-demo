/* ==========================================
   Sunrise Spices - JavaScript Functionality
   ========================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    /* ==========================================
       Mobile Menu Toggle
       ========================================== */
    const mobileToggle = document.getElementById('mobileToggle');
    const navMobile = document.getElementById('navMobile');
    const navLinks = document.querySelectorAll('.nav-mobile .nav-link');
    
    // Toggle mobile menu open/close
    mobileToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMobile.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileToggle.classList.remove('active');
            navMobile.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    
    /* ==========================================
       Sticky Navbar with Scroll Effect
       ========================================== */
    const header = document.getElementById('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add 'scrolled' class when user scrolls down 50px
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    
    /* ==========================================
       Recipe Filtering Functionality
       ========================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const recipeCards = document.querySelectorAll('.recipe-card');
    
    // Add click event to each filter button
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter recipe cards with smooth animation
            recipeCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                // Add slight delay for staggered animation effect
                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        card.classList.remove('hidden');
                        card.style.animation = 'fadeIn 0.5s ease-out';
                    } else {
                        card.classList.add('hidden');
                    }
                }, index * 50);
            });
        });
    });
    
    
    /* ==========================================
       Search Bar Functionality
       ========================================== */
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    
    // Handle search on button click
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            performSearch();
        });
    }
    
    // Handle search on Enter key press
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (searchTerm) {
            // This is a placeholder - in a real implementation, this would
            // filter products or navigate to a search results page
            console.log('Searching for:', searchTerm);
            alert(`Searching for: "${searchTerm}"\n\nThis is a demo. In production, this would show search results.`);
            
            // Clear search input
            searchInput.value = '';
        }
    }
    
    
    /* ==========================================
       Newsletter Form Submission
       ========================================== */
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // This is a placeholder - in a real implementation, this would
                // send the email to a backend service
                alert(`Thank you for subscribing!\n\nWe'll send recipes and offers to: ${email}`);
                
                // Clear form
                emailInput.value = '';
            }
        });
    }
    
    
    /* ==========================================
       Smooth Scroll for Navigation Links
       ========================================== */
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle links that point to elements on the page
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Smooth scroll to target
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    
    /* ==========================================
       Product Card Hover Animation
       ========================================== */
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Add subtle parallax effect on mouse move
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            const image = card.querySelector('.product-image img');
            if (image) {
                image.style.transform = `scale(1.05) translate(${deltaX * 5}px, ${deltaY * 5}px)`;
            }
        });
        
        // Reset on mouse leave
        card.addEventListener('mouseleave', function() {
            const image = card.querySelector('.product-image img');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
    
    
    /* ==========================================
       "View Details" Button Functionality
       ========================================== */
    const viewDetailsButtons = document.querySelectorAll('.product-card .btn-secondary');
    
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            
            // This is a placeholder - in a real implementation, this would
            // navigate to a product detail page or open a modal
            alert(`View Details\n\nProduct: ${productTitle}\n\nThis would open a detailed product page.`);
        });
    });
    
    
    /* ==========================================
       Scroll Animation Observer
       ========================================== */
    // Add fade-in animation to elements as they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe product cards and recipe cards
    const animatedElements = document.querySelectorAll('.product-card, .recipe-card, .stat');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    
    /* ==========================================
       Shop Now Button Functionality
       ========================================== */
    const shopNowButton = document.querySelector('.hero .btn-primary');
    
    if (shopNowButton) {
        shopNowButton.addEventListener('click', function() {
            // Scroll to products section
            const productsSection = document.getElementById('range');
            if (productsSection) {
                productsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    
    /* ==========================================
       Initialize Animations
       ========================================== */
    // Add entrance animations to hero content
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-label, .hero-title, .hero-description, .hero .btn-primary');
        heroElements.forEach((element, index) => {
            element.style.opacity = '1';
        });
    }, 100);
    
    
    /* ==========================================
       Order Options Click Tracking
       ========================================== */
    const orderButtons = document.querySelectorAll('.order-card .btn-primary');
    
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const orderCard = this.closest('.order-card');
            const orderTitle = orderCard.querySelector('.order-title').textContent;
            
            // Add a subtle animation when clicked
            orderCard.style.transform = 'scale(0.95)';
            setTimeout(() => {
                orderCard.style.transform = '';
            }, 200);
            
            // Log the order method (for analytics)
            console.log(`Order initiated via: ${orderTitle}`);
        });
    });
    
    // Add hover effect to contact items
    const contactItems = document.querySelectorAll('.contact-item a');
    
    contactItems.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const svg = this.closest('.contact-item').querySelector('svg');
            if (svg) {
                svg.style.transform = 'scale(1.2)';
                svg.style.transition = 'transform 0.3s ease';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            const svg = this.closest('.contact-item').querySelector('svg');
            if (svg) {
                svg.style.transform = 'scale(1)';
            }
        });
    });
    
    
    /* ==========================================
       Console Welcome Message
       ========================================== */
    console.log('%c🌶️ Welcome to Sunrise Spices! ', 'background: #A20710; color: #FFFFFF; font-size: 16px; padding: 10px; border-radius: 5px;');
    console.log('%cCelebrating Regional Flavours since 1975', 'color: #FBBA00; font-size: 12px;');
    
});


/* ==========================================
   Utility Functions
   ========================================== */

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
