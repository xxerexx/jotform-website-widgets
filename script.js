// Apex Builders Main JavaScript File

document.addEventListener('DOMContentLoaded', () => {
    const quoteForm = document.getElementById('quoteForm');

    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect form input data
            const fullName = document.getElementById('fullName').value;
            const phone = document.getElementById('phone').value;
            const serviceType = document.getElementById('serviceType').value;
            const budget = document.getElementById('budget').value;

            // Simple validation feedback (Replace with Jotform API / submission handler when integrated)
            if (fullName && phone && serviceType && budget) {
                alert(`Thank you, ${fullName}! Your quote request for a ${serviceType} has been submitted. An Apex Builders estimator will reach out to ${phone} within 24 hours.`);
                quoteForm.reset();
            } else {
                alert('Please fill out all required fields before submitting.');
            }
        });
    }

    // Smooth scroll enhancement for navigation items
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