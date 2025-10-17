// ===== MOBILE MENU TOGGLE =====
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// ===== SMOOTH SCROLL TO SECTION =====
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu if open
        const navLinks = document.getElementById('navLinks');
        navLinks.classList.remove('active');
    }
}

// ===== BACK TO TOP BUTTON =====
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show/Hide Back to Top Button on Scroll
window.addEventListener('scroll', function() {
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 400) {
        backToTop.style.display = 'flex';
    } else {
        backToTop.style.display = 'none';
    }
});

// ===== CHATBOT TOGGLE =====
function toggleChatbot() {
    const modal = document.getElementById('chatbotModal');
    if (modal.style.display === 'flex') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'flex';
    }
}

// ===== CLOSE MOBILE MENU WHEN CLICKING OUTSIDE =====
document.addEventListener('click', function(event) {
    const nav = document.getElementById('mainNav');
    const navLinks = document.getElementById('navLinks');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    // Check if click is outside nav and menu is open
    if (!nav.contains(event.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
});

// ===== ACTIVE NAVIGATION HIGHLIGHTING =====
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===== CLOSE CHATBOT WITH ESCAPE KEY =====
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('chatbotModal');
        if (modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    }
});

// ===== ACCESSIBILITY: TRAP FOCUS IN CHATBOT MODAL =====
const chatbotModal = document.getElementById('chatbotModal');
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

chatbotModal.addEventListener('keydown', function(e) {
    if (e.key === 'Tab' && chatbotModal.style.display === 'flex') {
        const focusableContent = chatbotModal.querySelectorAll(focusableElements);
        const firstFocusable = focusableContent[0];
        const lastFocusable = focusableContent[focusableContent.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    }
});

// ===== LAZY LOADING FOR IMAGES (if you add images later) =====
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});

// ===== SMOOTH SCROLL POLYFILL CHECK =====
// Check if browser supports smooth scroll
if (!('scrollBehavior' in document.documentElement.style)) {
    // If not supported, you could load a polyfill here
    console.log('Smooth scroll not natively supported');
}

// ===== PRELOAD CRITICAL RESOURCES =====
window.addEventListener('DOMContentLoaded', function() {
    // Add any initialization code here
    console.log('SHE IS AI Global Welcome Guide loaded successfully!');
});

// ===== HANDLE EXTERNAL LINKS =====
document.addEventListener('DOMContentLoaded', function() {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        // Ensure security for external links
        if (!link.getAttribute('rel')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
});

// ===== ANIMATE STATS ON SCROLL (OPTIONAL ENHANCEMENT) =====
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start) + '+';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Observe impact stats section
const impactSection = document.getElementById('impact');
if (impactSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const value = parseInt(stat.textContent);
                    if (!isNaN(value) && !stat.classList.contains('animated')) {
                        stat.classList.add('animated');
                        // Uncomment below to enable animation
                        // animateValue(stat, 0, value, 2000);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(impactSection);
}

// ===== FORM VALIDATION (if you add forms later) =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== KEYBOARD NAVIGATION IMPROVEMENTS =====
document.addEventListener('keydown', function(e) {
    // Press '/' to focus search (if you add search functionality)
    // Press 'H' to go to home
    if (e.key === 'h' && !e.target.matches('input, textarea')) {
        scrollToSection('hero');
    }
});

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', function() {
    // Log page load performance
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time:', pageLoadTime + 'ms');
    }
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
    // You could send this to an error tracking service
});

// ===== SERVICE WORKER REGISTRATION (for PWA - optional) =====
// Uncomment if you want to make this a Progressive Web App
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}
*/

// ===== UTILITY FUNCTIONS =====

// Debounce function for scroll events
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
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttle to scroll events for better performance
const optimizedScroll = throttle(function() {
    // Scroll event logic here
}, 100);

window.addEventListener('scroll', optimizedScroll);

// ===== COPY EMAIL TO CLIPBOARD =====
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function() {
            // Show success message
            showNotification('Email copied to clipboard!');
        }).catch(function(err) {
            console.error('Could not copy text: ', err);
        });
    }
}

// Show notification (you can enhance this)
function showNotification(message) {
    // Simple notification - you can enhance this with a toast library
    console.log(message);
    // Could create a toast element here
}

// ===== ACCESSIBILITY: ANNOUNCE DYNAMIC CONTENT =====
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.classList.add('sr-only');
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// ===== DETECT USER PREFERENCES =====
// Detect if user prefers reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
    document.documentElement.style.scrollBehavior = 'auto';
}

// Detect dark mode preference (if you want to add dark mode later)
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (prefersDarkMode) {
    // You could add dark mode class here
    console.log('User prefers dark mode');
}

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer if needed
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(el => {
        el.textContent = new Date().getFullYear();
    });
    
    // Initialize any tooltips or popovers
    // Initialize analytics (if you add them later)
    // Initialize any third-party libraries
    
    console.log('All SHE IS AI scripts initialized successfully!');
});