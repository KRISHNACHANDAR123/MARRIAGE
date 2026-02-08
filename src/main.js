// ================================================
// MAIN APPLICATION LOGIC
// Password Check, 3D Scene Init, Animations
// ================================================

import { WeddingScene } from './3d/scene.js';
import './styles/main.css';
import './styles/animations.css';
import './styles/features.css';
import './styles/cd-effect.css';
import { MusicPlayer, CountdownTimer, addSaveTheDateButton, initTimelineAnimations } from './components/interactive.js';
import { initCDEffect } from './components/cd-init.js';

// Check authentication
const SESSION_KEY = 'wedding_invitation_authenticated';

// If not authenticated, redirect to password page
if (sessionStorage.getItem(SESSION_KEY) !== 'true') {
  window.location.href = '/password.html';
}

// Initialize 3D Scene and interactive features
let scene;
let musicPlayer;
let countdownTimer;

document.addEventListener('DOMContentLoaded', () => {
  scene = new WeddingScene();

  // Initialize scroll animations
  initScrollAnimations();

  // Initialize RSVP form
  initRSVPForm();

  // Initialize interactive features
  musicPlayer = new MusicPlayer();
  countdownTimer = new CountdownTimer('2026-02-22T07:30:00+05:30');
  addSaveTheDateButton();
  initTimelineAnimations();
  initCDEffect();

  // Handle scroll for parallax and reveals
  handleScroll();
});

// ================================================
// SCROLL ANIMATIONS
// ================================================

function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

function handleScroll() {
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);

        // Update 3D scene based on scroll
        if (scene && scene.onScroll) {
          scene.onScroll(scrollProgress);
        }

        ticking = false;
      });
      ticking = true;
    }
  });
}

// ================================================
// RSVP FORM HANDLER
// ================================================

function initRSVPForm() {
  const form = document.getElementById('rsvp-form');
  const formContainer = form?.parentElement;
  const successMessage = document.getElementById('rsvp-success');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
      name: document.getElementById('guest-name').value,
      email: document.getElementById('guest-email').value,
      phone: document.getElementById('guest-phone').value,
      attendance: document.querySelector('input[name="attendance"]:checked')?.value,
      guestCount: document.getElementById('guest-count').value,
      message: document.getElementById('guest-message').value,
      timestamp: new Date().toISOString()
    };

    // Store in localStorage (in production, send to a backend)
    try {
      const responses = JSON.parse(localStorage.getItem('wedding_rsvp_responses') || '[]');
      responses.push(formData);
      localStorage.setItem('wedding_rsvp_responses', JSON.stringify(responses));

      // Hide form and show success message
      form.style.display = 'none';
      successMessage.style.display = 'block';

      // Scroll to success message
      successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

      console.log('RSVP submitted:', formData);

    } catch (error) {
      console.error('Error saving RSVP:', error);
      alert('There was an error submitting your response. Please try again.');
    }
  });
}

// ================================================
// SMOOTH SCROLL FOR LINKS
// ================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ================================================
// SCROLL INDICATOR CLICK
// ================================================

const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
  scrollIndicator.addEventListener('click', () => {
    const ceremonySection = document.getElementById('ceremony');
    if (ceremonySection) {
      ceremonySection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// ================================================
// CONSOLE WELCOME MESSAGE
// ================================================

console.log('%c💒 You Are Invited 💒', 'font-size: 24px; font-weight: bold; color: #8b9d88;');
console.log('%cBhuvaneśh R & Priyadharshini G S', 'font-size: 16px; color: #c9a961;');
console.log('%cFebruary 22, 2026', 'font-size: 14px; color: #f4c2d6;');
console.log('%c\n✨ Made with love and Three.js ✨\n', 'font-size: 12px; font-style: italic;');
