/**
 * main.js — apulido305 Portfolio
 * Handles: mobile nav toggle · smooth scroll · contact form UX
 * No external libraries.
 */

(function () {
  'use strict';

  /* ============================================================
     === MOBILE NAV TOGGLE ===
     Clicking .nav-toggle adds/removes .is-open on .nav-links.
     Also updates aria-expanded on the toggle button.
     ============================================================ */

  const navToggle = document.querySelector('.nav-toggle');
  const navLinks  = document.querySelector('.nav-links');

  if (navToggle && navLinks) {

    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile nav when any link inside it is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close mobile nav when clicking outside of it
    document.addEventListener('click', function (e) {
      if (
        navLinks.classList.contains('is-open') &&
        !navLinks.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close mobile nav on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('is-open')) {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.focus();
      }
    });
  }


  /* ============================================================
     === FOOTER YEAR ===
     Writes the current year into any #year element.
     ============================================================ */

  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }


  /* ============================================================
     === SMOOTH SCROLL ===
     Handles in-page anchor links that start with "#".
     Accounts for fixed nav height so the target isn't hidden.
     ============================================================ */

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return; // skip bare "#" hrefs

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const navHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-height'),
        10
      ) || 64;

      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });


  /* ============================================================
     === CONTACT FORM ===
     On submit: validates fields, then replaces form with a
     success message. No actual network request — static site.
     Wire up Formspree (or similar) by updating the form action
     and removing the e.preventDefault() call below.
     ============================================================ */

  const contactForm   = document.getElementById('contact-form');
  const formSuccess   = document.getElementById('form-success');

  if (contactForm && formSuccess) {

    contactForm.addEventListener('submit', function (e) {
      // Prevent default to keep as static UX demo.
      // Remove this line when a real form backend (e.g. Formspree) is connected.
      e.preventDefault();

      // Basic client-side validation
      const name    = contactForm.querySelector('#name');
      const email   = contactForm.querySelector('#email');
      const subject = contactForm.querySelector('#subject');
      const message = contactForm.querySelector('#message');

      const fields = [name, email, subject, message];
      let hasError  = false;

      fields.forEach(function (field) {
        if (!field) return;
        field.style.borderColor = ''; // reset
        if (!field.value.trim()) {
          field.style.borderColor = '#f87171';
          hasError = true;
        }
      });

      // Simple email format check
      if (email && email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        email.style.borderColor = '#f87171';
        hasError = true;
      }

      if (hasError) {
        // Focus first invalid field
        const firstInvalid = fields.find(function (f) {
          return f && f.style.borderColor === 'rgb(248, 113, 113)';
        });
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Success UX: hide form, show message
      contactForm.style.display    = 'none';
      formSuccess.style.display    = 'block';
      formSuccess.style.visibility = 'visible';
    });

  }

}());
