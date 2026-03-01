// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const bars = hamburger.querySelectorAll('.bar');
        if (navLinks.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
}

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(10, 25, 47, 0.98)';
        navbar.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.backgroundColor = 'rgba(10, 25, 47, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Scroll Animation Observer (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
});

// Contact Form Handling (for contact.html)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // Consent validation is handled by HTML5 required attribute
        if (!data.consent) {
            alert('Please agree to the privacy policy to submit.');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            return;
        }

        try {
            // In a real environment with a backend, we would use:
            // const response = await fetch('https://your-backend.com/api/contact', { ... });

            // For this live GitHub demo, we simulate a premium API interaction
            await new Promise(resolve => setTimeout(resolve, 1500)); // Artificial delay for realism

            console.log('Form Data Received:', data);

            // Simulating a successful response
            const success = true;

            if (success) {
                alert('Thank you for reaching out. A senior partner from our London office will contact you shortly.');
                contactForm.reset();
            } else {
                alert('There was a problem sending your message. Please try again later.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Unable to connect to the server. Please check your connection or try again later.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}
