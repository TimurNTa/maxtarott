'use strict';

/* ===========================
   Stars background
   =========================== */
(function createStars() {
  const container = document.getElementById('stars');
  if (!container) return;

  const count = 120;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    const size = Math.random() * 2.5 + 0.5;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 4;
    const duration = Math.random() * 3 + 2;

    star.style.cssText = `
      position: absolute;
      left: ${x}%;
      top: ${y}%;
      width: ${size}px;
      height: ${size}px;
      background: white;
      border-radius: 50%;
      opacity: ${Math.random() * 0.7 + 0.1};
      animation: twinkle ${duration}s ${delay}s ease-in-out infinite alternate;
    `;
    fragment.appendChild(star);
  }

  container.appendChild(fragment);

  const style = document.createElement('style');
  style.textContent = `
    @keyframes twinkle {
      from { opacity: 0.1; transform: scale(1); }
      to   { opacity: 0.8; transform: scale(1.3); }
    }
  `;
  document.head.appendChild(style);
})();

/* ===========================
   Header scroll effect
   =========================== */
(function headerScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        header.classList.toggle('scrolled', window.scrollY > 40);
        ticking = false;
      });
      ticking = true;
    }
  });
})();

/* ===========================
   Burger / mobile nav
   =========================== */
(function mobileNav() {
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  if (!burger || !nav) return;

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });

  // Close on nav link click
  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ===========================
   Scroll fade-in animation
   =========================== */
(function scrollReveal() {
  const selectors = [
    '.service-card',
    '.review-card',
    '.how__step',
    '.about__content',
    '.about__image',
    '.contact__info',
    '.contact__form',
    '.section__header',
  ];

  const elements = document.querySelectorAll(selectors.join(', '));
  elements.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => observer.observe(el));
})();

/* ===========================
   Contact form (stub)
   =========================== */
(function contactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('[type="submit"]');
    const original = btn.textContent;

    btn.textContent = 'Отправлено ✓';
    btn.disabled = true;
    btn.style.background = 'linear-gradient(135deg, #4caf82, #2e8b57)';

    // Reset after 3s
    setTimeout(() => {
      btn.textContent = original;
      btn.disabled = false;
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
})();

/* ===========================
   Smooth scroll for anchors
   =========================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
