/* ============================================
   ACAL AUTOMOTIVE - JAVASCRIPT FUNCTIONALITY
   ============================================ */

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('ACAL Automotive Website - Initializing...');
    initNavigation();
    initContactForm();
    console.log('ACAL Automotive Website - Ready!');
});

/* ============================================
   NAVIGATION FUNCTIONALITY
   ============================================ */

function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (!navToggle || !navMenu) {
        console.warn('Navigation elements not found');
        return;
    }

    // Toggle mobile menu when hamburger button is clicked
    navToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        console.log('Menu toggled:', navMenu.classList.contains('active'));
    });

    // Close menu when a navigation link is clicked
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside of it
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);
        
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });

    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });

    // Set active navigation link based on current page
    setActiveNavLink();
}

function setActiveNavLink() {
    // Get the current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        // Match current page
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    console.log('Current page:', currentPage);
}

/* ============================================
   CONTACT FORM FUNCTIONALITY
   ============================================ */

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) {
        console.log('Contact form not found on this page');
        return;
    }

    contactForm.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formMessage = document.getElementById('formMessage');
    const submitBtn = form.querySelector('.submit-btn');
    
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    console.log('Form submitted:', data);
    
    // Validate form
    const validationError = validateForm(data);
    if (validationError) {
        showFormMessage(validationError, 'error', formMessage);
        return;
    }
    
    // Disable submit button during submission
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Submit form (simulated - in production would send to backend)
    submitForm(data, form, formMessage, submitBtn);
}

function validateForm(data) {
    // Validate name
    if (!data.name || data.name.trim().length < 2) {
        return 'Please enter a valid name (at least 2 characters).';
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        return 'Please enter a valid email address.';
    }
    
    // Validate subject
    if (!data.subject || data.subject.trim().length < 3) {
        return 'Please enter a subject (at least 3 characters).';
    }
    
    // Validate message
    if (!data.message || data.message.trim().length < 10) {
        return 'Please enter a message (at least 10 characters).';
    }
    
    // Validate phone if provided
    if (data.phone && data.phone.trim().length > 0) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(data.phone)) {
            return 'Please enter a valid phone number.';
        }
    }
    
    return null; // No errors
}

function submitForm(data, form, formMessage, submitBtn) {
    // Simulate network delay
    setTimeout(function() {
        // In a production environment, you would send this to a backend/email service
        // Example: 
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // }).then(response => response.json()).then(result => { ... })
        
        // Log form data (for debugging)
        console.log('Form Data to Send:', {
            name: data.name,
            email: data.email,
            phone: data.phone || 'Not provided',
            subject: data.subject,
            message: data.message,
            timestamp: new Date().toISOString()
        });
        
        // Show success message
        showFormMessage(
            'Thank you for your message! We will contact you at ' + data.email + ' within 24 hours.',
            'success',
            formMessage
        );
        
        // Reset form
        form.reset();
        
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        
        // Auto-hide message after 5 seconds
        setTimeout(function() {
            formMessage.style.display = 'none';
        }, 5000);
        
    }, 800); // 800ms delay to simulate network request
}

function showFormMessage(message, type, element) {
    if (!element) {
        console.warn('Form message element not found');
        return;
    }
    
    element.textContent = message;
    element.className = `form-message ${type}`;
    element.style.display = 'block';
    
    // Scroll to message
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    console.log(`Message (${type}):`, message);
}

/* ============================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Check if target element exists
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// Add scroll event listener for additional effects if needed
window.addEventListener('scroll', function() {
    // You can add additional scroll effects here
    // For example: sticky header effects, fade-in animations, etc.
});

// Handle page visibility for analytics
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Page hidden');
    } else {
        console.log('Page visible');
    }
});

// Log page load performance
window.addEventListener('load', function() {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time: ' + pageLoadTime + 'ms');
    }
});

/* ============================================
   PRINT STYLESHEET SUPPORT
   ============================================ */

window.addEventListener('beforeprint', function() {
    // Hide navigation during print
    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.style.display = 'none';
});

window.addEventListener('afterprint', function() {
    // Show navigation after print
    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.style.display = '';
});

console.log('✓ JavaScript loaded successfully');
