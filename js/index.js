// Main JavaScript bestand

// Smooth scroll voor anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form validation (voorbeeld)
const contactForm = document.querySelector('form');
if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const email = this.querySelector('input[type="email"]');
        if(email && !isValidEmail(email.value)) {
            e.preventDefault();
            alert('Vul een geldig e-mailadres in');
            email.focus();
        }
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Intersection Observer voor lazy loading
if('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const img = entry.target;
                if(img.dataset.src) {
                    img.src = img.dataset.src;
                }
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}


// In je main.js of in de <script> tag
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.mobile-menu-button');
    const mainMenu = document.getElementById('main-menu');

    if (menuButton && mainMenu) {
        menuButton.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            mainMenu.classList.toggle('active');

            // Verander het hamburger icoon (optioneel)
            if (!isExpanded) {
                this.innerHTML = '<span class="sr-only">Menu sluiten</span> ✕';
            } else {
                this.innerHTML = '<span class="sr-only">Menu</span> ☰';
            }
        });

        // Sluit menu als er op een link wordt geklikt
        const menuLinks = mainMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainMenu.classList.remove('active');
                menuButton.setAttribute('aria-expanded', 'false');
                menuButton.innerHTML = '<span class="sr-only">Menu</span> ☰';
            });
        });
    }
});