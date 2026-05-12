// ============================================================================
// CODEX AI - Interactive Web Application
// ============================================================================

// ============== HAMBURGER MENU FUNCTIONALITY ==============
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle hamburger menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu and open modal when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Open corresponding modal if data-modal exists
        const modalId = link.getAttribute('data-modal');
        if (modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
            }
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ============== THEME TOGGLE ==============
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const bodyElement = document.body;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    bodyElement.classList.add('light-theme');
}

// Toggle theme
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        bodyElement.classList.toggle('light-theme');
        
        // Save preference
        const theme = bodyElement.classList.contains('light-theme') ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
    });
}

// ============== MODAL FUNCTIONALITY ==============
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close-modal');

// Close modal when close button is clicked
closeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal');
        modal.classList.remove('active');
    });
});

// Close modal when clicking outside the content
modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modals.forEach(modal => {
            modal.classList.remove('active');
        });
    }
});

// ============== SNOWFLAKE GENERATION ==============
const snowContainer = document.getElementById('snowflakes');

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.textContent = '❄';
    snowflake.classList.add('snowflake');
    
    // Random properties
    const randomLeft = Math.random() * 100;
    const randomDuration = Math.random() * 10 + 10; // 10-20 seconds
    const randomDelay = Math.random() * 2; // 0-2 seconds delay
    const randomTranslate = Math.random() * 200 - 100; // -100 to 100px
    const randomSize = Math.random() * 20 + 10; // 10-30px
    
    snowflake.style.left = randomLeft + '%';
    snowflake.style.fontSize = randomSize + 'px';
    snowflake.style.animationDuration = randomDuration + 's';
    snowflake.style.animationDelay = randomDelay + 's';
    snowflake.style.setProperty('--tx', randomTranslate + 'px');
    
    snowContainer.appendChild(snowflake);
    
    // Remove snowflake after animation completes
    setTimeout(() => {
        snowflake.remove();
    }, (randomDuration + randomDelay) * 1000);
}

// Create snowflakes continuously
setInterval(createSnowflake, 150);

// Create initial batch of snowflakes
for (let i = 0; i < 10; i++) {
    setTimeout(createSnowflake, i * 100);
}

// ============== SMOOTH SCROLL ==============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============== SCROLL ANIMATIONS ==============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature boxes and other elements
document.querySelectorAll('.feature-box, .section-title').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============== NAVBAR SCROLL EFFECT ==============
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'var(--shadow)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ============== FORM VALIDATION ==============
const suggestionForm = document.querySelector('.suggestion-form');
if (suggestionForm) {
    suggestionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        
        if (email && title && description) {
            // Here you would typically send the data to a server
            console.log({
                email,
                title,
                description,
                timestamp: new Date()
            });
            
            // Reset form
            suggestionForm.reset();
            
            // Show success message
            alert('🎉 Thank you for your suggestion! We appreciate your feedback.');
        } else {
            alert('Please fill in all fields');
        }
    });
}

// ============== UTILITY FUNCTIONS ==============

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
    });
}

// Format date
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

// Get current theme
function getCurrentTheme() {
    return localStorage.getItem('theme') || 'dark';
}

// ============== PERFORMANCE OPTIMIZATION ==============

// Lazy load images if any
if ('IntersectionObserver' in window) {
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

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============== ACCESSIBILITY ==============

// Add keyboard navigation for modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            const focusableElements = activeModal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            
            if (focusableElements.length > 0) {
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        }
    }
});

// ============== LOG ON LOAD ==============
console.log('%c🚀 CODEX AI Platform Loaded Successfully!', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%cVersion: 1.0.0 | Last Updated: May 12, 2026', 'color: #a78bfa; font-size: 12px;');
console.log('%cThanks for visiting! If you have any questions, contact us at support@codexai.com', 'color: #94a3b8; font-size: 12px;');
