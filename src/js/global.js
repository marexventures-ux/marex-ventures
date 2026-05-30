document.addEventListener('DOMContentLoaded', () => {

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.add('scrolled'); // we keep it slightly dark or can conditionally remove it
      if(window.scrollY === 0) navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Set active nav link based on current path
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navItems = document.querySelectorAll('.nav-link');
  navItems.forEach(item => {
    if (item.getAttribute('href') === currentPath) {
      item.classList.add('active');
    }
  });

  // Scroll Reveal Animations
  const reveals = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;
    
    reveals.forEach((reveal) => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add('active');
      }
    });
  };
  
  // Trigger once on load
  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll);

  // Stats Counter Animation (only triggers once when in view)
  const counters = document.querySelectorAll('.counter');
  if (counters.length > 0) {
    const formatNumber = (num, hasK) => {
      return hasK ? (num/1000).toFixed(0) + 'K+' : Math.ceil(num) + '+';
    };

    const runCounter = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.getAttribute('data-target');
          const hasK = counter.getAttribute('data-k') === 'true';
          const duration = 2000;
          const increment = target / (duration / 16); 
          let current = 0;

          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.innerText = formatNumber(current, hasK);
              requestAnimationFrame(updateCounter);
            } else {
              counter.innerText = target >= 1000 ? (target/1000) + 'K+' : target + '+';
            }
          };
          updateCounter();
          observer.unobserve(counter);
        }
      });
    };

    const counterObserver = new IntersectionObserver(runCounter, {
      threshold: 0.5
    });

    counters.forEach(counter => counterObserver.observe(counter));
  }
});
