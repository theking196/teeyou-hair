// Teeyou Hair - Complete E-Commerce JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const mobileClose = document.querySelector('.mobile-menu-close');
    
    function openMobileMenu() {
        if (mobileMenu) mobileMenu.classList.add('active');
        if (mobileOverlay) {
            mobileOverlay.style.display = 'block';
            mobileOverlay.style.opacity = '1';
            mobileOverlay.style.pointerEvents = 'all';
        }
        document.body.style.overflow = 'hidden';
    }
    
    function closeMobileMenu() {
        if (mobileMenu) mobileMenu.classList.remove('active');
        if (mobileOverlay) {
            mobileOverlay.style.display = 'none';
            mobileOverlay.style.opacity = '0';
            mobileOverlay.style.pointerEvents = 'none';
        }
        document.body.style.overflow = 'auto';
    }
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', openMobileMenu);
    }
    
    if (mobileClose) {
        mobileClose.addEventListener('click', closeMobileMenu);
    }
    
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 30px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        }
    });
    
    // Search Form
    const searchForm = document.querySelector('.search-box form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const searchInput = searchForm.querySelector('input').value;
            if (searchInput) {
                window.location.href = `products.html?search=${encodeURIComponent(searchInput)}`;
            }
        });
    }
    
    // Product Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                filterButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                productCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => card.style.opacity = '1', 50);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => card.style.display = 'none', 300);
                    }
                });
            });
        });
    }
    
    // Wishlist Toggle
    const wishlistButtons = document.querySelectorAll('.product-wishlist');
    wishlistButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            if (this.classList.contains('active')) {
                this.innerHTML = '❤️';
            } else {
                this.innerHTML = '🤍';
            }
        });
    });
    
    // Quick View Modal
    const quickViewBtns = document.querySelectorAll('.quick-view');
    const modal = document.getElementById('quickViewModal');
    
    if (quickViewBtns.length > 0 && modal) {
        quickViewBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const productCard = this.closest('.product-card');
                const productName = productCard.querySelector('.product-name').textContent;
                const productPrice = productCard.querySelector('.current-price').textContent;
                const productImage = productCard.querySelector('.product-image img').src;
                
                document.getElementById('modalProductName').textContent = productName;
                document.getElementById('modalProductPrice').textContent = productPrice;
                document.getElementById('modalProductImage').src = productImage;
                
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });
        
        const modalClose = modal.querySelector('.modal-close');
        modalClose.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Add to Cart
    const addToCartBtns = document.querySelectorAll('.add-to-cart, .product-action-btn');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const card = this.closest('.product-card');
            const name = card.querySelector('.product-name').textContent;
            const price = card.querySelector('.current-price').textContent;
            
            // Show success message
            const originalText = this.textContent;
            this.innerHTML = '✅ Added!';
            this.style.background = 'var(--success)';
            this.style.color = 'white';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.background = '';
                this.style.color = '';
            }, 2000);
            
            // Update cart count (demo)
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                let count = parseInt(cartCount.textContent) || 0;
                cartCount.textContent = count + 1;
            }
        });
    });
    
    // Forms Submission
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Show success message
            alert('Thank you! We have received your message/order and will contact you shortly.');
            this.reset();
        });
    });
    
    // Counter Animation
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current) + '+';
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target + '+';
                        }
                    };
                    
                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => counterObserver.observe(counter));
    }
    
    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
    
    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input').value;
            alert('Thank you for subscribing! You will receive our latest updates.');
            newsletterForm.reset();
        });
    }
    
    // Price Range Slider (Demo)
    const priceRange = document.querySelector('.price-range input[type="range"]');
    if (priceRange) {
        priceRange.addEventListener('input', function() {
            const valueDisplay = this.parentElement.querySelector('.price-value');
            if (valueDisplay) {
                valueDisplay.textContent = '₦' + parseInt(this.value).toLocaleString();
            }
        });
    }
    
    // Mobile Menu Submenu Toggle
    const mobileMenuItems = document.querySelectorAll('.mobile-menu .has-submenu');
    mobileMenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            const submenu = this.nextElementSibling;
            if (submenu) {
                submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
            }
        });
    });
    
    // Lazy Loading Images
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        imgObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
    }
    
    // Animation on Scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    if (animateElements.length > 0) {
        const animateObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, { threshold: 0.1 });
        
        animateElements.forEach(el => animateObserver.observe(el));
    }
});
