/* ============================================
   KHAN ALUMINIUM FABRICATION - CUSTOM JAVASCRIPT
   ============================================
   Handles:
   - Dynamic year display
   - Scroll animations (AOS)
   - Lightbox gallery functionality
   - Mobile hamburger menu with overlay
   - Vertical tab submenu toggle
   - Active navigation highlight on scroll
   - Header scroll state
   - Scroll-to-top button
   - Cookie consent banner
   - Contact form with WhatsApp integration
   - Keyboard accessibility (ESC to close menu)
   ============================================ */

// Set current year dynamically
document.getElementById('year').textContent = new Date().getFullYear();

// Initialize AOS (Animate On Scroll) library
AOS.init({ duration: 700, once: true, offset: 60 });

// Initialize GLightbox for image gallery
const lightbox = GLightbox({ touchNavigation: true, loop: true, zoomable: true });

// Mobile menu elements
const hamburger = document.getElementById('hamburger');
const verticalTab = document.getElementById('verticalTab');
const overlay = document.getElementById('overlay');
const vtClose = document.getElementById('vtClose');
const vtToggleIcon = document.getElementById('vtToggleIcon');
const vtSub = document.getElementById('vtSub');
const vtServicesToggle = document.getElementById('vtServicesToggle');

// Opens mobile menu and sets accessibility attributes
const openMenu = () => {
  verticalTab.classList.add('active');
  overlay.classList.add('active');
  hamburger.classList.add('is-open');
  hamburger.setAttribute('aria-expanded', 'true');
  hamburger.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  document.body.style.overflow = 'hidden';
};

// Closes mobile menu and restores accessibility state
const closeMenu = () => {
  verticalTab.classList.remove('active');
  overlay.classList.remove('active');
  hamburger.classList.remove('is-open');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
  document.body.style.overflow = '';
};

// Toggle menu on hamburger click
hamburger.addEventListener('click', () => {
  verticalTab.classList.contains('active') ? closeMenu() : openMenu();
});

// Close menu on close button or overlay click
vtClose.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

// Toggle submenu visibility for services
vtServicesToggle.addEventListener('click', (e) => {
  e.preventDefault();
  vtSub.classList.toggle('show');
  vtToggleIcon.classList.toggle('rot');
});

// Close menu when clicking navigation links (except Services toggle)
document.querySelectorAll('.vertical-tab a').forEach(a => {
  a.addEventListener('click', (e) => {
    if (a.id === 'vtServicesToggle') return;
    closeMenu();
  });
});

// Highlight active navigation item based on scroll position
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

// Add scrolled class to header when page is scrolled
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
});

// Show/hide scroll-to-top button
const scrollBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollBtn.classList.toggle('show', window.scrollY > 400);
});

// Smooth scroll to top on button click
scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Cookie consent management
function acceptCookies() {
  localStorage.setItem('khan_cookies', 'accepted');
  document.getElementById('cookieBanner').classList.remove('show');
}

function declineCookies() {
  localStorage.setItem('khan_cookies', 'declined');
  document.getElementById('cookieBanner').classList.remove('show');
}

// Display cookie banner if user hasn't made a choice
if (!localStorage.getItem('khan_cookies')) {
  setTimeout(() => {
    document.getElementById('cookieBanner').classList.add('show');
  }, 1000);
}

// Contact form submission with WhatsApp integration
const form = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = (data.get('name') || '').toString().trim();
  const phone = (data.get('phone') || '').toString().trim();
  
  // Validate required fields
  if (!name || !phone) {
    alert('Please fill in your name and phone number.');
    return;
  }
  
  // Format message for WhatsApp and send
  const service = (data.get('service') || 'Not specified').toString();
  const message = (data.get('message') || '').toString();
  const text = `Hi Ahamad, I'm ${name} (${phone}).%0A%0AService: ${service}%0A%0A${encodeURIComponent(message)}`;
  
  success.classList.add('show');
  form.reset();
  window.open(`https://wa.me/918999430675?text=${text}`, '_blank');
  setTimeout(() => success.classList.remove('show'), 6000);
});

// Close mobile menu on ESC key press
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && verticalTab.classList.contains('active')) closeMenu();
});
