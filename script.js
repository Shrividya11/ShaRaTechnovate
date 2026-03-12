const header = document.getElementById("header");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", function (e) {
  e.stopPropagation();
  navLinks.classList.toggle("active");
});

document.addEventListener("click", function () {
  navLinks.classList.remove("active");
});

// ================= SMOOTH SCROLL TO SECTIONS =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    e.preventDefault();
    const target = document.querySelector(href);

    if (target) {
      // scroll so the top of the section sits right below the fixed header
      const headerHeight = header.offsetHeight;
      const scrollPos = target.offsetTop - headerHeight;
      window.scrollTo({ top: scrollPos, behavior: 'smooth' });
      navLinks.classList.remove("active");
    }
  });
});

// academics "explore more" toggle
const exploreBtn = document.getElementById('explore-more');
const academicsSection = document.getElementById('academics');

if (exploreBtn) {
  exploreBtn.addEventListener('click', () => {
    academicsSection.classList.toggle('c-expanded');
    exploreBtn.textContent = academicsSection.classList.contains('c-expanded') ? 'Show Less' : 'Explore More';
  });
}


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