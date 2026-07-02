/* ============================================
   KHAN ALUMINIUM FABRICATION - CUSTOM JAVASCRIPT
   ============================================
   
   This file contains all custom JavaScript for the website.
   All original functionality has been preserved.
   
   TABLE OF CONTENTS:
   1. Year Update
   2. AOS Scroll Animations
   3. GLightbox Image Gallery
   4. Vertical Tab Menu
   5. Active Icon Navigation on Scroll
   6. Header Shadow on Scroll
   7. Scroll to Top
   8. Cookie Consent
   9. Form Submission
   
   ============================================ */

// ============================================
// 1. YEAR UPDATE
// Automatically updates the copyright year
// ============================================
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================
// 2. AOS SCROLL ANIMATIONS
// Initializes scroll-triggered animations
// ============================================
AOS.init({ duration: 700, once: true, offset: 60 });

// ============================================
// 3. GLIGHTBOX IMAGE GALLERY
// Initializes the lightbox for service images
// ============================================
const lightbox = GLightbox({ touchNavigation: true, loop: true, zoomable: true });

// ============================================
// 4. VERTICAL TAB MENU
// Handles the mobile slide-out navigation menu
// ============================================
const hamburger = document.getElementById('hamburger');
const verticalTab = document.getElementById('verticalTab');
const overlay = document.getElementById('overlay');
const vtClose = document.getElementById('vtClose');
const vtToggleIcon = document.getElementById('vtToggleIcon');
const vtSub = document.getElementById('vtSub');
const vtServicesToggle = document.getElementById('vtServicesToggle');

const openMenu = () => {
  verticalTab.classList.add('active');
  overlay.classList.add('active');
  hamburger.classList.add('is-open');
  hamburger.setAttribute('aria-expanded', 'true');
  hamburger.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  document.body.style.overflow = 'hidden';
};

const closeMenu = () => {
  verticalTab.classList.remove('active');
  overlay.classList.remove('active');
  hamburger.classList.remove('is-open');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
  document.body.style.overflow = '';
};

hamburger.addEventListener('click', () => {
  verticalTab.classList.contains('active') ? closeMenu() : openMenu();
});

vtClose.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

// Services submenu toggle inside vertical tab
vtServicesToggle.addEventListener('click', (e) => {
  e.preventDefault();
  vtSub.classList.toggle('show');
  vtToggleIcon.classList.toggle('rot');
});

// Close menu on link click
document.querySelectorAll('.vertical-tab a').forEach(a => {
  a.addEventListener('click', (e) => {
    if (a.id === 'vtServicesToggle') return;
    closeMenu();
  });
});

// ============================================
// 5. ACTIVE ICON NAVIGATION ON SCROLL
// Highlights the current section in the icon nav
// ============================================
const sections = document.querySelectorAll('section[id]');
const iconNavItems = document.querySelectorAll('.icon-nav-item');

const updateActiveNav = () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 150;
    if (window.scrollY >= top) current = section.id;
  });
  iconNavItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === '#' + current) item.classList.add('active');
  });
};

window.addEventListener('scroll', updateActiveNav);

// ============================================
// 6. HEADER SHADOW ON SCROLL
// Adds shadow to header when scrolled
// ============================================
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
});

// ============================================
// 7. SCROLL TO TOP
// Shows/hides scroll-to-top button and handles click
// ============================================
const scrollBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollBtn.classList.toggle('show', window.scrollY > 400);
});
scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ============================================
// 8. COOKIE CONSENT
// Handles cookie banner display and user preferences
// ============================================
function acceptCookies() {
  localStorage.setItem('khan_cookies', 'accepted');
  document.getElementById('cookieBanner').classList.remove('show');
}

function declineCookies() {
  localStorage.setItem('khan_cookies', 'declined');
  document.getElementById('cookieBanner').classList.remove('show');
}

if (!localStorage.getItem('khan_cookies')) {
  setTimeout(() => {
    document.getElementById('cookieBanner').classList.add('show');
  }, 1000);
}

// ============================================
// 9. FORM SUBMISSION
// Handles the Quick Inquiry form submission
// Sends data via WhatsApp
// ============================================
const form = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = (data.get('name') || '').toString().trim();
  const phone = (data.get('phone') || '').toString().trim();
  
  if (!name || !phone) {
    alert('Please fill in your name and phone number.');
    return;
  }
  
  const service = (data.get('service') || 'Not specified').toString();
  const message = (data.get('message') || '').toString();
  const text = `Hi Ahamad, I'm ${name} (${phone}).%0A%0AService: ${service}%0A%0A${encodeURIComponent(message)}`;
  
  success.classList.add('show');
  form.reset();
  window.open(`https://wa.me/918999430675?text=${text}`, '_blank');
  setTimeout(() => success.classList.remove('show'), 6000);
});

// ============================================
// 10. CLOSE MENU ON ESC KEY
// Accessibility: Close menu when Escape is pressed
// ============================================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && verticalTab.classList.contains('active')) closeMenu();
});