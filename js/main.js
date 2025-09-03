// Mobile navigation toggle
(function () {
  const toggleButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (toggleButton && nav) {
    toggleButton.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggleButton.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
    });
  }
})();

// Highlight active nav link
(function () {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach((link) => {
    const href = link.getAttribute('href');
    if ((href === './' && path === 'index.html') || href === path) {
      link.classList.add('active');
    }
  });
})();

// Fade-in on scroll (reduced motion aware)
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-animate]').forEach((el) => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
})();

// Page transition helpers (progressive enhancement)
(function () {
  const links = document.querySelectorAll('a[href$=".html"], a[href="./"], a[href="/"]');
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const url = new URL(link.href);
      if (url.origin !== location.origin) return; // external
      if (link.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      document.body.classList.add('page-exit-active');
    });
  });
})();

// Page enter animation on load
(function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const enable = () => {
    if (prefersReduced) {
      document.body.classList.remove('page-enter');
      return;
    }
    document.body.classList.add('page-enter-active');
    setTimeout(() => {
      document.body.classList.remove('page-enter');
      document.body.classList.remove('page-enter-active');
    }, 300);
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enable);
  } else {
    enable();
  }
})();

// Typing effect for hero headline
(function () {
  const el = document.querySelector('[data-typing]');
  if (!el) return;
  let phrases = [];
  try {
    const raw = el.getAttribute('data-phrases');
    if (raw) phrases = JSON.parse(raw);
  } catch (_) { /* fallback */ }
  if (!phrases.length) {
    phrases = ['I build interactive map experiences.'];
  }
  el.textContent = '';

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const type = () => {
    const phrase = phrases[phraseIndex];
    if (!deleting) {
      charIndex = Math.min(charIndex + 1, phrase.length);
      el.textContent = phrase.slice(0, charIndex);
      if (charIndex === phrase.length) {
        setTimeout(() => { deleting = true; }, 1200);
      }
    } else {
      charIndex = Math.max(charIndex - 1, 0);
      el.textContent = phrase.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    const delay = deleting ? 40 : 70;
    setTimeout(type, delay);
  };

  type();
})(); 