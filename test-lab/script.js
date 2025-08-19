// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const siteNav   = document.querySelector('#site-nav');
if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const open = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Newsletter (local only)
const newsForm = document.getElementById('newsletter-form');
if (newsForm) {
  newsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = (document.getElementById('news-email') || {}).value || '';
    const msg = document.getElementById('newsletter-msg');
    if (!email.includes('@')) {
      msg.textContent = 'Bitte eine gültige E-Mail-Adresse eingeben.';
      return;
    }
    try {
      const list = JSON.parse(localStorage.getItem('futurenaut_news') || '[]');
      if (!list.includes(email)) list.push(email);
      localStorage.setItem('futurenaut_news', JSON.stringify(list));
      msg.textContent = 'Danke! Du bist eingetragen.';
      newsForm.reset();
    } catch {
      msg.textContent = 'Danke! (Lokale Speicherung aktiv.)';
    }
  });
}

// Contact form (demo only)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(contactForm).entries());
    const msg = document.getElementById('contact-msg');
    msg.textContent = 'Danke! Wir melden uns innerhalb von 24–48h.';
    console.log('Kontakt-Anfrage', data);
    contactForm.reset();
  });
}

// Footer year
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
