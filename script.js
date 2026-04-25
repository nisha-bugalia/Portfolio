document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = menuBtn.querySelector('i');

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            menuIcon.classList.remove('ph-list');
            menuIcon.classList.add('ph-x');
        } else {
            menuIcon.classList.remove('ph-x');
            menuIcon.classList.add('ph-list');
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuIcon.classList.remove('ph-x');
            menuIcon.classList.add('ph-list');
        });
    });

    // 2. Sticky Navbar Styling on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Reveal Animations on Scroll (Intersection Observer)
    const fadeUpElements = document.querySelectorAll('.fade-up');
    
    // Trigger hero animations right away
    setTimeout(() => {
        document.querySelectorAll('#hero .fade-up').forEach(el => {
            el.classList.add('visible');
        });
    }, 100);

    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Add fade-up class dynamically to section titles and cards if missing, then observe
    const elementsToReveal = [
        ...document.querySelectorAll('.section-title'),
        ...document.querySelectorAll('.skill-category'),
        ...document.querySelectorAll('.project-card'),
        ...document.querySelectorAll('.achievement-card'),
        document.querySelector('.about-text'),
        document.querySelector('.contact-desc'),
        document.querySelector('.contact-links')
    ];

    elementsToReveal.forEach(el => {
        if (el && !el.classList.contains('fade-up')) {
            el.classList.add('fade-up');
        }
    });

    // Re-select all fade-up elements and observe
    document.querySelectorAll('.fade-up').forEach(element => {
        // Skip hero elements as they're animated on load
        if(!element.closest('#hero')) {
            revealOnScroll.observe(element);
        }
    });
});
