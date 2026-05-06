/* GoSnow — Main JS */
document.addEventListener('DOMContentLoaded', function () {

  /* --- Mobile Nav Toggle --- */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });
  }

  /* --- Mark Active Nav Link --- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* --- FAQ Accordion --- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    const question = item.querySelector('.faq-question');
    if (!question) return;
    question.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');
      // Close all open items
      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-question').classList.remove('open');
        openItem.querySelector('.faq-answer').classList.remove('open');
        openItem.querySelector('.faq-icon').classList.remove('open');
      });
      // Open the clicked one if it was closed
      if (!isOpen) {
        item.classList.add('open');
        question.classList.add('open');
        item.querySelector('.faq-answer').classList.add('open');
        item.querySelector('.faq-icon').classList.add('open');
      }
    });
  });

  /* --- Quote Form Submission (Web3Forms) --- */
  const form = document.querySelector('.quote-form');
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const origLabel = btn.innerHTML;
      btn.innerHTML = 'Sending&hellip;';
      btn.disabled = true;

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(Object.fromEntries(new FormData(form))),
        });
        const data = await res.json();
        if (data.success) {
          form.style.display = 'none';
          const success = document.querySelector('.form-success');
          if (success) success.style.display = 'block';
        } else {
          throw new Error('Submission error');
        }
      } catch {
        btn.innerHTML = origLabel;
        btn.disabled = false;
        alert('Something went wrong. Please call or text us at 734-406-4688 — we\'d love to help!');
      }
    });
  }

  /* --- Smooth Scroll for In-Page Anchors --- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (mobileNav) mobileNav.classList.remove('open');
      }
    });
  });

});
