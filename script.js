document.addEventListener('DOMContentLoaded', function () {
  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const academicsCards = document.getElementById("academics-cards");

  if (menuToggle) {
    menuToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      navLinks.classList.toggle("active");
    });
  }

  document.addEventListener("click", function () {
    if (navLinks) {
      navLinks.classList.remove("active");
    }
  });

  // ================= SMOOTH SCROLL TO SECTIONS =================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') {
        e.preventDefault();
        const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        if (navLinks) {
          navLinks.classList.remove("active");
        }
        return;
      }

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const headerHeight = header ? header.offsetHeight : 100;
        const rect = target.getBoundingClientRect();

        // Align the section flush below the fixed header (no visible gap).
        const top = Math.max(0, window.scrollY + rect.top - headerHeight);
        const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        if (navLinks) {
          navLinks.classList.remove("active");
        }
      }
    });
  });

  // ================= AUTO-SCROLL ACADEMICS CARDS =================
  if (academicsCards) {
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId = null;
    let paused = false;
    let lastTs = 0;

    const speedPxPerSec = 45; // horizontal scroll speed
    const maxScrollLeft = () => Math.max(0, academicsCards.scrollWidth - academicsCards.clientWidth);

    const tick = (ts) => {
      if (!lastTs) lastTs = ts;
      const dt = ts - lastTs;
      lastTs = ts;

      if (!paused && !prefersReducedMotion && maxScrollLeft() > 0) {
        academicsCards.scrollLeft += (speedPxPerSec * dt) / 1000;
        if (academicsCards.scrollLeft >= maxScrollLeft() - 1) {
          academicsCards.scrollLeft = 0;
        }
      }

      rafId = window.requestAnimationFrame(tick);
    };

    academicsCards.addEventListener("mouseenter", () => { paused = true; });
    academicsCards.addEventListener("mouseleave", () => { paused = false; });
    academicsCards.addEventListener("focusin", () => { paused = true; });
    academicsCards.addEventListener("focusout", () => { paused = false; });

    rafId = window.requestAnimationFrame(tick);

    window.addEventListener("beforeunload", () => {
      if (rafId) window.cancelAnimationFrame(rafId);
    });
  }
});

// ================= SCROLL PROGRESS =================
window.addEventListener("scroll", function () {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  document.querySelector(".progress-bar").style.width = progress + "%";
});
// ================= LOADER =================
window.addEventListener("load", function () {
  const loader = document.querySelector(".loader-wrapper");
  loader.style.opacity = "0";
  loader.style.transition = "opacity 0.6s ease";
  setTimeout(() => loader.style.display = "none", 600);
});
// scroll
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", function () {
  reveals.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100) {
      section.classList.add("active");
    }
  });
});

// ================= COUNTER ANIMATION =================

const counters = document.querySelectorAll(".counter");

function runCounter() {
  counters.forEach(counter => {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const increment = target / 100;

    const updateCounter = () => {
      if (count < target) {
        count += increment;
        counter.innerText = Math.ceil(count);
        setTimeout(updateCounter, 20);
      } else {
        counter.innerText = target + "+";
      }
    };

    updateCounter();
  });
}

// Trigger only once when visible
let counterStarted = false;

window.addEventListener("scroll", function () {
  const statsSection = document.querySelector(".stats");
  const sectionTop = statsSection.getBoundingClientRect().top;

  if (sectionTop < window.innerHeight - 100 && !counterStarted) {
    runCounter();
    counterStarted = true;
  }
});

// ================= TESTIMONIAL SLIDER =================

const track = document.querySelector(".testimonial-track");
const slides = document.querySelectorAll(".testimonial-card");

let index = 0;

function slideTestimonials() {
  index++;
  if (index >= slides.length) {
    index = 0;
  }
  track.style.transform = `translateX(-${index * 100}%)`;
}

setInterval(slideTestimonials, 4000);

// ================= CAROUSEL AUTO-SLIDE =================

const carousel = document.querySelector('#carouselExampleCaptions');
if (carousel) {
  const carouselInstance = new bootstrap.Carousel(carousel, {
    interval: 5000, // 5 seconds
    ride: 'carousel',
    wrap: true // Keep looping
  });
}