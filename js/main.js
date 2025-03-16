// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    const smoothScroll = (target, duration) => {
        const targetElement = document.querySelector(target);
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        
        // Easing function
        const ease = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
        
        requestAnimationFrame(animation);
    };
    
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = this.getAttribute('href');
                smoothScroll(target, 1000);
            }
        });
    });
    
    // Update active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks2 = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks2.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Automatically update current year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Since we're using GitHub Pages, which doesn't support server-side processing,
            // we'll just show a thank you message instead of actually submitting the form.
            const formData = new FormData(this);
            const formElements = this.elements;
            
            // Simple validation
            let isValid = true;
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].required && !formElements[i].value) {
                    isValid = false;
                    formElements[i].classList.add('error');
                } else if (formElements[i].type === 'email' && formElements[i].value) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(formElements[i].value)) {
                        isValid = false;
                        formElements[i].classList.add('error');
                    }
                }
            }
            
            if (isValid) {
                // Clear the form
                this.reset();
                
                // Show thank you message
                const contactContainer = document.querySelector('.contact-container');
                const thankYouMessage = document.createElement('div');
                thankYouMessage.className = 'thank-you-message';
                thankYouMessage.innerHTML = `
                    <h3>Thank You!</h3>
                    <p>Your message has been received. I'll get back to you soon!</p>
                    <button class="btn primary-btn" id="backToForm">Send Another Message</button>
                `;
                
                contactContainer.innerHTML = '';
                contactContainer.appendChild(thankYouMessage);
                
                // Add event listener to the "Send Another Message" button
                document.getElementById('backToForm').addEventListener('click', () => {
                    window.location.reload();
                });
            }
        });
    }
    
    // Add ScrollReveal for animation if available
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('.hero-content', { 
            delay: 200,
            distance: '50px',
            duration: 1000,
            origin: 'left'
        });
        
        ScrollReveal().reveal('.hero-image', { 
            delay: 400,
            distance: '50px',
            duration: 1000,
            origin: 'right'
        });
        
        ScrollReveal().reveal('.project-card', { 
            delay: 200,
            distance: '30px',
            duration: 800,
            interval: 200,
            origin: 'bottom'
        });
        
        ScrollReveal().reveal('.skill-category', { 
            delay: 200,
            distance: '30px',
            duration: 800,
            interval: 200,
            origin: 'bottom'
        });
    }
}); 