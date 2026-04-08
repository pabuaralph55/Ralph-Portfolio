const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Smooth scrolling for in-page anchors
const inPageAnchors = document.querySelectorAll('a[href^="#"]');
inPageAnchors.forEach(anchor => {
    anchor.addEventListener('click', event => {
        const targetId = anchor.getAttribute('href');
        const target = targetId ? document.querySelector(targetId) : null;
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });

        // Close mobile nav after selecting a link
        if (siteNav?.classList.contains('open')) {
            siteNav.classList.remove('open');
            menuToggle?.setAttribute('aria-expanded', 'false');
        }
    });
});

// Mobile navigation toggle
const menuToggle = document.getElementById('menu-toggle');
const siteNav = document.getElementById('site-nav');

if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
        const isOpen = siteNav.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', event => {
        if (!siteNav.classList.contains('open')) return;
        const clickedInsideNav = siteNav.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideNav && !clickedToggle) {
            siteNav.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// Active nav link based on section in view
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.site-nav a');

const activateLink = () => {
    const y = window.scrollY + 140;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.site-nav a[href="#${id}"]`);
        if (!link) return;

        if (y >= top && y < top + height) {
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', activateLink);
activateLink();

// Reveal animations using IntersectionObserver
const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && revealElements.length) {
    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealElements.forEach(element => revealObserver.observe(element));
} else {
    revealElements.forEach(element => element.classList.add('visible'));
}

// Back to top button
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('show', window.scrollY > 400);
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
}

// Contact form enhancement
const contactForm = document.querySelector('.contact-form form');
const formStatus = document.getElementById('form-status');

if (contactForm && formStatus) {
    contactForm.addEventListener('submit', event => {
        const nameInput = contactForm.querySelector('input[name="name"]');
        const messageInput = contactForm.querySelector('textarea[name="message"]');

        if (!nameInput?.value.trim() || !messageInput?.value.trim()) {
            event.preventDefault();
            formStatus.textContent = 'Please fill out your name and message before sending.';
            formStatus.classList.add('visible');
            return;
        }

        formStatus.textContent = 'Submitting your message...';
        formStatus.classList.add('visible');
    });
}

// Footer year
const footerYear = document.getElementById('year');
if (footerYear) {
    footerYear.textContent = String(new Date().getFullYear());
}
