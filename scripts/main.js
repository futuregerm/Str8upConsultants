document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Carousel functionality
    const carousel = {
        currentSlide: 0,
        slides: document.querySelectorAll('.carousel-slide'),
        indicators: document.querySelectorAll('.indicator'),
        prevButton: document.querySelector('.carousel-nav.prev'),
        nextButton: document.querySelector('.carousel-nav.next'),
        autoPlayInterval: null,
        
        init() {
            if (this.slides.length === 0) return;
            this.showSlide(this.currentSlide);
            this.setupEventListeners();
            this.startAutoPlay();
        },

        setupEventListeners() {
            this.prevButton?.addEventListener('click', () => {
                this.prevSlide();
                this.resetAutoPlay();
            });
            
            this.nextButton?.addEventListener('click', () => {
                this.nextSlide();
                this.resetAutoPlay();
            });
            
            // Setup indicator clicks
            this.indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    this.goToSlide(index);
                    this.resetAutoPlay();
                });
            });
        },

        showSlide(index) {
            // Remove active class from all slides and indicators
            this.slides.forEach(slide => slide.classList.remove('active'));
            this.indicators.forEach(indicator => indicator.classList.remove('active'));
            
            // Add active class to current slide and indicator
            this.slides[index].classList.add('active');
            this.indicators[index].classList.add('active');
            
            this.currentSlide = index;
        },

        nextSlide() {
            const next = (this.currentSlide + 1) % this.slides.length;
            this.showSlide(next);
        },

        prevSlide() {
            const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
            this.showSlide(prev);
        },

        goToSlide(index) {
            this.showSlide(index);
        },

        startAutoPlay() {
            this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
        },

        resetAutoPlay() {
            if (this.autoPlayInterval) {
                clearInterval(this.autoPlayInterval);
                this.startAutoPlay();
            }
        }
    };

    // Initialize carousel if it exists on the page
    if (document.querySelector('.hero-carousel')) {
        carousel.init();
    }
});