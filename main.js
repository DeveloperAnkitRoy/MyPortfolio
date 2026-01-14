/* ===================== ELEMENT SELECTORS ===================== */
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('.header');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

/* ===================== MOBILE MENU TOGGLE ===================== */
menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
});

/* ===================== SCROLL HANDLER (THROTTLED) ===================== */
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
        });
        ticking = true;
    }
});

function handleScroll() {
    const scrollY = window.scrollY;

    /* ===== ACTIVE NAV LINK ===== */
    sections.forEach(section => {
        const offset = section.offsetTop - 150;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollY >= offset && scrollY < offset + height) {
            navLinks.forEach(link => link.classList.remove('active'));

            const activeLink = document.querySelector(
                `header nav a[href*="${id}"]`
            );
            if (activeLink) activeLink.classList.add('active');
        }
    });

    /* ===== STICKY HEADER ===== */
    header.classList.toggle('sticky', scrollY > 100);

    /* ===== CLOSE MOBILE MENU ON SCROLL ===== */
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
}

/* ===================== SCROLL REVEAL ===================== */
ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200,
    reset: false
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

/* ===================== TYPED JS ===================== */
new Typed('.multiple-text', {
    strings: [
        'Frontend Developer',
        'Web Designer',
        'React Developer',
        'UI/UX Enthusiast'
    ],
    typeSpeed: 70,
    backSpeed: 50,
    backDelay: 1200,
    loop: true
});

/* ===================== DARK / LIGHT MODE ===================== */

const themeToggle = document.getElementById('theme-toggle');

if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');

    const isLight = document.body.classList.contains('light-mode');
    themeToggle.classList.toggle('fa-sun', isLight);
    themeToggle.classList.toggle('fa-moon', !isLight);

    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

/* ===================== CONTACT FORM EMAIL ===================== */

const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    emailjs.sendForm(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        this
    ).then(() => {
        alert('✅ Message sent successfully!');
        contactForm.reset();
    }, (error) => {
        alert('❌ Failed to send message. Try again!');
        console.error(error);
    });
});
