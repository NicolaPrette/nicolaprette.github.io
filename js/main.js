/**
 * Main JavaScript Module
 * Personal Page - Nicola Prette
 * 
 * This file serves as the main entry point for JavaScript functionality.
 * It's designed to be modular and extendable.
 */

// ========================================
// Module: Page Initialization
// ========================================

const PageInit = {
    init() {
        this.setupScrollAnimations();
        this.setupSmoothScroll();
        this.setupThemeToggle();
        console.log('Page initialized successfully');
    },

    /**
     * Setup intersection observer for scroll animations
     */
    setupScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        const animatableElements = document.querySelectorAll('.timeline-item, .publication, section');
        animatableElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.classList.add(`delay-${Math.min(index % 5 + 1, 5)}`);
            observer.observe(el);
        });
    },

    /**
     * Setup smooth scrolling for anchor links
     */
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    },

    /**
     * Setup theme toggle functionality (for future use)
     */
    setupThemeToggle() {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }
};

// ========================================
// Module: Utils
// ========================================

const Utils = {
    /**
     * Debounce function for performance optimization
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Throttle function for performance optimization
     * @param {Function} func - Function to throttle
     * @param {number} limit - Time limit in milliseconds
     * @returns {Function} Throttled function
     */
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// ========================================
// Module: Analytics (Placeholder)
// ========================================

const Analytics = {
    /**
     * Track page view
     * Can be extended to integrate with analytics services
     */
    trackPageView() {
        console.log('Page view tracked');
    },

    /**
     * Track custom events
     * @param {string} eventName - Name of the event
     * @param {Object} eventData - Additional event data
     */
    trackEvent(eventName, eventData = {}) {
        console.log('Event tracked:', eventName, eventData);
    }
};

// ========================================
// Initialize on DOM Ready
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    PageInit.init();
    Analytics.trackPageView();
});

// ========================================
// Export modules for use in other files
// ========================================

window.PersonalPage = {
    PageInit,
    Utils,
    Analytics
};
