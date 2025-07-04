// Main JavaScript file for Fayette County GOP website
// Handles GSAP animations, sticky CTAs, and interactive elements

document.addEventListener('DOMContentLoaded', function() {
  // Initialize GSAP plugins if available
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }
  
  initializeLoadingScreen();
  initializeStickyCTA();
  initializeHeroAnimations();
  initializeScrollAnimations();
  initializeParallaxEffects();
  initializeCardFlips();
});

// Loading Screen Management
function initializeLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  
  if (loadingScreen) {
    // Hide loading screen after 1 second
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      // Trigger hero animations after loading screen fades
      if (typeof gsap !== 'undefined') {
        startHeroAnimations();
      }
    }, 1000);
  }
}

// Sticky CTA Management
function initializeStickyCTA() {
  const stickyCTA = document.getElementById('sticky-cta');
  const heroSection = document.querySelector('.hero-section');
  const heroCTAs = document.querySelectorAll('.hero-cta');
  
  if (!stickyCTA) return;
  
  function handleScroll() {
    const scrollY = window.scrollY;
    
    if (scrollY > 400) {
      stickyCTA.classList.add('show');
      // Fade original CTAs
      heroCTAs.forEach(btn => {
        btn.style.opacity = '0.5';
        btn.style.pointerEvents = 'none';
      });
    } else {
      stickyCTA.classList.remove('show');
      // Restore original CTAs
      heroCTAs.forEach(btn => {
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'auto';
      });
    }
  }
  
  // Throttle scroll events for performance
  let ticking = false;
  function throttledScroll() {
    if (!ticking) {
      requestAnimationFrame(function() {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', throttledScroll);
}

// Hero Section Animations
function initializeHeroAnimations() {
  // This will be called after loading screen
  // Actual animation trigger is in startHeroAnimations()
}

function startHeroAnimations() {
  if (typeof gsap === 'undefined') return;
  
  // Hero title drop-in animation
  const heroTitle = document.getElementById('hero-title');
  if (heroTitle) {
    // Split text into words for individual animation
    const words = heroTitle.textContent.trim().split(/\s+/);
    heroTitle.innerHTML = words.map(word => `<span class="word inline-block">${word}</span>`).join(' ');
    
    // Animate each word dropping in with 3D rotation
    gsap.fromTo('.word', {
      y: 100,
      opacity: 0,
      rotationX: -90,
      transformOrigin: '50% 50% -100px'
    }, {
      y: 0,
      opacity: 1,
      rotationX: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "back.out(1.7)",
      delay: 0.3
    });
  }
  
  // Animate subtitle
  gsap.fromTo('.hero-subtitle', {
    y: 50,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 1,
    delay: 1.8,
    ease: "power2.out"
  });
  
  // Animate CTAs
  gsap.fromTo('.hero-ctas', {
    y: 50,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 1,
    delay: 2.3,
    ease: "power2.out"
  });
}

// Scroll-triggered Animations
function initializeScrollAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  
  // Mission section animation
  gsap.fromTo('#mission h2', {
    x: -100,
    opacity: 0
  }, {
    x: 0,
    opacity: 1,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: '#mission',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });
  
  // Mission content animation
  gsap.fromTo('#mission .prose', {
    x: -50,
    opacity: 0
  }, {
    x: 0,
    opacity: 1,
    duration: 1,
    delay: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: '#mission',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });
  
  // Mission card animation
  gsap.fromTo('#mission .relative', {
    x: 100,
    opacity: 0,
    scale: 0.9
  }, {
    x: 0,
    opacity: 1,
    scale: 1,
    duration: 1,
    delay: 0.4,
    ease: "power2.out",
    scrollTrigger: {
      trigger: '#mission',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });
  
  // Issue cards stagger animation
  gsap.fromTo('.issue-card', {
    y: 100,
    opacity: 0,
    scale: 0.9
  }, {
    y: 0,
    opacity: 1,
    scale: 1,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: '.issue-card',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  });
  
  // Call to action section
  gsap.fromTo('.py-20.bg-gradient-to-r h2', {
    y: 50,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: '.py-20.bg-gradient-to-r',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });
}

// Parallax Effects
function initializeParallaxEffects() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  
  // Hero parallax
  gsap.to('.hero-section', {
    backgroundPosition: '50% 100%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });
}

// Card Flip Effects
function initializeCardFlips() {
  const cards = document.querySelectorAll('.issue-card');
  
  cards.forEach(card => {
    // Add enhanced hover effects
    card.addEventListener('mouseenter', function() {
      if (typeof gsap !== 'undefined') {
        gsap.to(this, {
          y: -10,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });
    
    card.addEventListener('mouseleave', function() {
      if (typeof gsap !== 'undefined') {
        gsap.to(this, {
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });
  });
}

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Accessibility enhancements
function enhanceAccessibility() {
  // Add keyboard navigation for cards
  const cards = document.querySelectorAll('.issue-card');
  cards.forEach(card => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.classList.toggle('hover');
      }
    });
  });
}

// Performance optimization
function optimizePerformance() {
  // Lazy load images
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// Initialize performance and accessibility features
document.addEventListener('DOMContentLoaded', function() {
  enhanceAccessibility();
  optimizePerformance();
});

// Error handling for GSAP
window.addEventListener('error', function(e) {
  if (e.message.includes('gsap')) {
    console.warn('GSAP not loaded, falling back to CSS animations');
    // Enable CSS fallback animations
    document.body.classList.add('no-gsap');
  }
});

// Service Worker Registration with better error handling
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/static/serviceworker.js')
      .then(function(registration) {
        console.log('ServiceWorker registration successful');
      })
      .catch(function(err) {
        console.log('ServiceWorker registration failed');
      });
  });
}