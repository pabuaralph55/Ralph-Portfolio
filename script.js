// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
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
}

// Active nav link based on section in view
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.site-nav a');
const activateLink = () => {
    const y = window.scrollY + 120;
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

// Reveal animations
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            el.classList.add('visible');
        }
    });
};
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Back to top button
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('show', window.scrollY > 400);
    });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
