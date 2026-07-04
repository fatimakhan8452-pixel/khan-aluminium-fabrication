/* ============================================
   KHAN ALUMINIUM FABRICATION - CUSTOM JAVASCRIPT
   ============================================
   No functional changes needed here for the badge
   text / hero graphics update — that was HTML/CSS only.
   ============================================ */

document.getElementById('year').textContent = new Date().getFullYear();

AOS.init({ duration: 700, once: true, offset: 60 });

const lightbox = GLightbox({ touchNavigation: true, loop: true, zoomable: true });

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

vtServicesToggle.addEventListener('click', (e) => {
  e.preventDefault();
  vtSub.classList.toggle('show');
  vtToggleIcon.classList.toggle('rot');
});

document.querySelectorAll('.vertical-tab a').forEach(a => {
  a.addEventListener('click', (e) => {
    if (a.id === 'vtServicesToggle') return;
    closeMenu();
  });
});

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

const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 30);
});

const scrollBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollBtn.classList.toggle('show', window.scrollY > 400);
});
scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

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

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && verticalTab.classList.contains('active')) closeMenu();
});
