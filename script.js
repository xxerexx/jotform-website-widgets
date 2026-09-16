// Apex Builders Main JavaScript File

document.addEventListener('DOMContentLoaded', () => {
    // Parallax Scrolling Effect for Hero Section
    const heroBg = document.getElementById('heroBg');
    
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            // Shift background image slightly slower than the scroll speed for a smooth parallax depth effect
            heroBg.style.transform = `translateY(${scrollY * 0.35}px)`;
        });
    }

    // Quote Form Submission Handler
    const quoteForm = document.getElementById('quoteForm');

    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value;
            const phone = document.getElementById('phone').value;
            const serviceType = document.getElementById('serviceType').value;
            const budget = document.getElementById('budget').value;

            if (fullName && phone && serviceType && budget) {
                alert(`Thank you, ${fullName}! Your quote request for a ${serviceType} has been submitted. An Apex Builders estimator will reach out to ${phone} within 24 hours.`);
                quoteForm.reset();
            } else {
                alert('Please fill out all required fields before submitting.');
            }
        });
    }

    // Smooth scroll navigation anchors
    const navLinks = document.querySelectorAll('nav a[href^="#"], .hero-content a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
