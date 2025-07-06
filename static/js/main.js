/**
 * Fayette County GOP - Main JavaScript
 * Modern, accessible, and performant interactions
 */

(function() {
  'use strict';

  // Utility functions
  const utils = {
    // Debounce function for performance
    debounce: function(func, wait, immediate) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          timeout = null;
          if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
      };
    },

    // Throttle function for scroll events
    throttle: function(func, limit) {
      let inThrottle;
      return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    },

    // Check if element is in viewport
    isInViewport: function(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    },

    // Smooth scroll to element
    scrollToElement: function(element, offset = 0) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Enhanced Navigation
  const Navigation = {
    init: function() {
      this.nav = document.getElementById('main-nav');
      this.toggle = document.getElementById('nav-toggle');
      this.menu = document.getElementById('nav-menu');
      this.navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
      
      if (!this.nav) return;
      
      this.bindEvents();
      this.handleScrollEffect();
    },

    bindEvents: function() {
      // Mobile menu toggle
      if (this.toggle && this.menu) {
        this.toggle.addEventListener('click', this.toggleMobileMenu.bind(this));
      }

      // Close mobile menu on nav link click
      this.navLinks.forEach(link => {
        link.addEventListener('click', this.closeMobileMenu.bind(this));
      });

      // Handle scroll effects
      window.addEventListener('scroll', utils.throttle(this.handleScrollEffect.bind(this), 10));

      // Close mobile menu on outside click
      document.addEventListener('click', (e) => {
        if (!this.nav.contains(e.target) && this.menu && this.menu.classList.contains('open')) {
          this.closeMobileMenu();
        }
      });

      // Close mobile menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.menu && this.menu.classList.contains('open')) {
          this.closeMobileMenu();
        }
      });

      // Handle resize
      window.addEventListener('resize', utils.debounce(() => {
        if (window.innerWidth >= 1024 && this.menu && this.menu.classList.contains('open')) {
          this.closeMobileMenu();
        }
      }, 250));
    },

    toggleMobileMenu: function() {
      if (!this.menu || !this.toggle) return;
      
      const isOpen = this.menu.classList.contains('open');
      
      if (isOpen) {
        this.closeMobileMenu();
      } else {
        this.openMobileMenu();
      }
    },

    openMobileMenu: function() {
      if (!this.menu || !this.toggle) return;
      
      this.menu.classList.add('open');
      this.toggle.classList.add('open');
      this.toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('overflow-hidden');
      
      // Focus management
      const firstLink = this.menu.querySelector('.mobile-nav-link');
      if (firstLink) {
        setTimeout(() => firstLink.focus(), 100);
      }
    },

    closeMobileMenu: function() {
      if (!this.menu || !this.toggle) return;
      
      this.menu.classList.remove('open');
      this.toggle.classList.remove('open');
      this.toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('overflow-hidden');
    },

    handleScrollEffect: function() {
      if (!this.nav) return;
      
      const scrollY = window.scrollY;
      
      if (scrollY > 50) {
        this.nav.classList.add('scrolled');
      } else {
        this.nav.classList.remove('scrolled');
      }
    }
  };

  // Scroll Animations
  const ScrollAnimations = {
    init: function() {
      this.observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      this.observer = new IntersectionObserver(this.handleIntersection.bind(this), this.observerOptions);
      this.setupAnimations();
    },

    setupAnimations: function() {
      // Animate elements on scroll
      const animatedElements = document.querySelectorAll('.animate-on-scroll, .reveal');
      animatedElements.forEach(el => {
        this.observer.observe(el);
      });

      // Animate cards
      const cards = document.querySelectorAll('.card-hover, .issue-card');
      cards.forEach(card => {
        this.observer.observe(card);
      });
    },

    handleIntersection: function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible', 'animate-fade-in-up');
          
          // Stagger animations for grouped elements
          if (entry.target.parentElement && entry.target.parentElement.children.length > 1) {
            const siblings = Array.from(entry.target.parentElement.children);
            const index = siblings.indexOf(entry.target);
            entry.target.style.animationDelay = `${index * 0.1}s`;
          }
        }
      });
    }
  };

  // Smooth Scrolling for Anchor Links
  const SmoothScroll = {
    init: function() {
      const anchorLinks = document.querySelectorAll('a[href^="#"]');
      anchorLinks.forEach(link => {
        link.addEventListener('click', this.handleClick.bind(this));
      });
    },

    handleClick: function(e) {
      const href = e.currentTarget.getAttribute('href');
      if (href === '#' || href === '#top') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = document.getElementById('main-nav')?.offsetHeight || 0;
        utils.scrollToElement(target, navHeight + 20);
      }
    }
  };

  // Enhanced Form Handling
  const Forms = {
    init: function() {
      this.forms = document.querySelectorAll('form');
      this.setupFormValidation();
      this.setupNewsletterForm();
    },

    setupFormValidation: function() {
      this.forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
          input.addEventListener('blur', this.validateField.bind(this));
          input.addEventListener('input', utils.debounce(this.validateField.bind(this), 300));
        });
      });
    },

    validateField: function(e) {
      const field = e.target;
      const value = field.value.trim();
      
      // Remove existing validation classes
      field.classList.remove('valid', 'invalid');
      
      // Email validation
      if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(value)) {
          field.classList.add('valid');
        } else {
          field.classList.add('invalid');
        }
      }
      
      // Required field validation
      if (field.hasAttribute('required')) {
        if (value) {
          field.classList.add('valid');
        } else {
          field.classList.add('invalid');
        }
      }
    },

    setupNewsletterForm: function() {
      const newsletterForms = document.querySelectorAll('form[action*="newsletter"]');
      newsletterForms.forEach(form => {
        form.addEventListener('submit', this.handleNewsletterSubmit.bind(this));
      });
    },

    handleNewsletterSubmit: function(e) {
      e.preventDefault();
      const form = e.target;
      const email = form.querySelector('input[type="email"]');
      const button = form.querySelector('button[type="submit"]');
      
      if (!email || !email.value.trim()) {
        this.showMessage('Please enter a valid email address.', 'error');
        return;
      }

      // Show loading state
      if (button) {
        button.disabled = true;
        button.innerHTML = '<svg class="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Subscribing...';
      }

      // Simulate form submission (replace with actual implementation)
      setTimeout(() => {
        this.showMessage('Thank you for subscribing to our newsletter!', 'success');
        form.reset();
        if (button) {
          button.disabled = false;
          button.innerHTML = '<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>Subscribe';
        }
      }, 1500);
    },

    showMessage: function(message, type = 'info') {
      // Create message element
      const messageEl = document.createElement('div');
      messageEl.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transition-all duration-300 transform translate-x-full opacity-0 ${
        type === 'success' ? 'bg-green-500 text-white' : 
        type === 'error' ? 'bg-red-500 text-white' : 
        'bg-blue-500 text-white'
      }`;
      messageEl.textContent = message;
      
      document.body.appendChild(messageEl);
      
      // Animate in
      setTimeout(() => {
        messageEl.classList.remove('translate-x-full', 'opacity-0');
      }, 100);
      
      // Remove after delay
      setTimeout(() => {
        messageEl.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => {
          if (messageEl.parentNode) {
            messageEl.parentNode.removeChild(messageEl);
          }
        }, 300);
      }, 4000);
    }
  };

  // Sticky CTA Management
  const StickyCTA = {
    init: function() {
      this.stickyCTA = document.getElementById('sticky-cta');
      if (!this.stickyCTA) return;
      
      this.handleScroll();
      window.addEventListener('scroll', utils.throttle(this.handleScroll.bind(this), 16));
    },

    handleScroll: function() {
      if (!this.stickyCTA) return;
      
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show after scrolling past hero section
      if (scrollY > windowHeight * 0.5) {
        this.stickyCTA.classList.add('show');
      } else {
        this.stickyCTA.classList.remove('show');
      }
      
      // Hide near footer
      if (scrollY + windowHeight > documentHeight - 200) {
        this.stickyCTA.classList.remove('show');
      }
    }
  };

  // Performance optimizations
  const Performance = {
    init: function() {
      this.preloadCriticalResources();
      this.lazyLoadImages();
      this.optimizeAnimations();
    },

    preloadCriticalResources: function() {
      // Preload critical fonts
      const fontPreloads = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        'https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&display=swap'
      ];
      
      fontPreloads.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        document.head.appendChild(link);
      });
    },

    lazyLoadImages: function() {
      const images = document.querySelectorAll('img[data-src]');
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    },

    optimizeAnimations: function() {
      // Reduce animations for users who prefer reduced motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        document.documentElement.style.setProperty('--transition-duration', '0.01ms');
      }
    }
  };

  // Accessibility enhancements
  const Accessibility = {
    init: function() {
      this.setupKeyboardNavigation();
      this.setupFocusManagement();
      this.setupARIAUpdates();
    },

    setupKeyboardNavigation: function() {
      // Skip link functionality
      const skipLink = document.querySelector('a[href="#content"]');
      if (skipLink) {
        skipLink.addEventListener('click', (e) => {
          e.preventDefault();
          const content = document.getElementById('content');
          if (content) {
            content.focus();
            content.scrollIntoView();
          }
        });
      }

      // Escape key handlers
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          // Close any open modals, menus, etc.
          const openMenu = document.querySelector('#nav-menu.open');
          if (openMenu) {
            Navigation.closeMobileMenu();
          }
        }
      });
    },

    setupFocusManagement: function() {
      // Ensure focus is visible for keyboard users
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          document.body.classList.add('keyboard-nav');
        }
      });

      document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
      });
    },

    setupARIAUpdates: function() {
      // Update ARIA attributes dynamically
      const expandableElements = document.querySelectorAll('[aria-expanded]');
      expandableElements.forEach(element => {
        const observer = new MutationObserver(() => {
          // Update aria-expanded based on element state
          const isExpanded = element.classList.contains('open') || 
                           element.classList.contains('expanded');
          element.setAttribute('aria-expanded', isExpanded.toString());
        });
        
        observer.observe(element, { attributes: true, attributeFilter: ['class'] });
      });
    }
  };

  // Initialize all modules when DOM is ready
  function init() {
    // Check if DOM is already loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initModules);
    } else {
      initModules();
    }
  }

  function initModules() {
    try {
      Navigation.init();
      ScrollAnimations.init();
      SmoothScroll.init();
      Forms.init();
      StickyCTA.init();
      Performance.init();
      Accessibility.init();
      
      // Custom event for other scripts
      document.dispatchEvent(new CustomEvent('fayetteGOPReady'));
      
    } catch (error) {
      console.error('Error initializing Fayette GOP scripts:', error);
    }
  }

  // Start initialization
  init();

})();