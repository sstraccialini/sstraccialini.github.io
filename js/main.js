/**
 * Main JavaScript for Samuele Nicolò Straccialini Portfolio
 * Handles: theme toggle, mobile navigation, copy email, scroll effects
 */

(function() {
  'use strict';

  // ============================================
  // Theme Toggle
  // ============================================
  const ThemeManager = {
    STORAGE_KEY: 'theme',
    DARK: 'dark',
    LIGHT: 'light',
    
    init() {
      this.toggle = document.getElementById('theme-toggle');
      if (!this.toggle) return;
      
      // Set initial theme
      this.setTheme(this.getPreferredTheme());
      
      // Listen for toggle clicks
      this.toggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === this.DARK ? this.LIGHT : this.DARK;
        this.setTheme(newTheme);
        this.saveTheme(newTheme);
      });
      
      // Listen for system theme changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(this.STORAGE_KEY)) {
          this.setTheme(e.matches ? this.DARK : this.LIGHT);
        }
      });
    },
    
    getPreferredTheme() {
      // Check localStorage first
      const savedTheme = localStorage.getItem(this.STORAGE_KEY);
      if (savedTheme) return savedTheme;
      
      // Fall back to system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? this.DARK : this.LIGHT;
    },
    
    setTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      this.toggle?.setAttribute('aria-label', `Switch to ${theme === this.DARK ? 'light' : 'dark'} mode`);
    },
    
    saveTheme(theme) {
      localStorage.setItem(this.STORAGE_KEY, theme);
    }
  };

  // ============================================
  // Mobile Navigation
  // ============================================
  const MobileNav = {
    init() {
      this.toggle = document.getElementById('menu-toggle');
      this.nav = document.getElementById('mobile-nav');
      
      if (!this.toggle || !this.nav) return;
      
      this.toggle.addEventListener('click', () => this.toggleMenu());
      
      // Close menu when clicking on a link
      this.nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => this.closeMenu());
      });
      
      // Close menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen()) {
          this.closeMenu();
          this.toggle.focus();
        }
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (this.isOpen() && !this.nav.contains(e.target) && !this.toggle.contains(e.target)) {
          this.closeMenu();
        }
      });
    },
    
    isOpen() {
      return this.nav.classList.contains('mobile-nav--open');
    },
    
    toggleMenu() {
      if (this.isOpen()) {
        this.closeMenu();
      } else {
        this.openMenu();
      }
    },
    
    openMenu() {
      this.nav.classList.add('mobile-nav--open');
      this.toggle.setAttribute('aria-expanded', 'true');
      this.toggle.setAttribute('aria-label', 'Close menu');
      document.body.style.overflow = 'hidden';
    },
    
    closeMenu() {
      this.nav.classList.remove('mobile-nav--open');
      this.toggle.setAttribute('aria-expanded', 'false');
      this.toggle.setAttribute('aria-label', 'Open menu');
      document.body.style.overflow = '';
    }
  };

  // ============================================
  // Header Scroll Effect
  // ============================================
  const HeaderScroll = {
    init() {
      this.header = document.getElementById('header');
      if (!this.header) return;
      
      let lastScrollY = window.scrollY;
      let ticking = false;
      
      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            this.update(window.scrollY, lastScrollY);
            lastScrollY = window.scrollY;
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
      
      // Initial state
      this.update(window.scrollY, 0);
    },
    
    update(scrollY, lastScrollY) {
      // Add shadow when scrolled
      if (scrollY > 10) {
        this.header.classList.add('header--scrolled');
      } else {
        this.header.classList.remove('header--scrolled');
      }
    }
  };

  // ============================================
  // Copy Email
  // ============================================
  const CopyEmail = {
    init() {
      const buttons = document.querySelectorAll('.copy-email');
      
      buttons.forEach(button => {
        button.addEventListener('click', async () => {
          const email = button.dataset.email;
          if (!email) return;
          
          try {
            await navigator.clipboard.writeText(email);
            this.showFeedback(button, 'Copied!');
          } catch (err) {
            // Fallback for older browsers
            this.fallbackCopy(email);
            this.showFeedback(button, 'Copied!');
          }
        });
      });
    },
    
    showFeedback(button, message) {
      const originalText = button.innerHTML;
      button.innerHTML = `
        <svg class="btn__icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        ${message}
      `;
      button.classList.add('copy-email--success');
      
      setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.remove('copy-email--success');
      }, 2000);
    },
    
    fallbackCopy(text) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  };

  // ============================================
  // Smooth Scroll for Anchor Links
  // ============================================
  const SmoothScroll = {
    init() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          const href = anchor.getAttribute('href');
          if (href === '#') return;
          
          const target = document.querySelector(href);
          if (!target) return;
          
          e.preventDefault();
          
          // Check for reduced motion preference
          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          
          target.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
            block: 'start'
          });
          
          // Update URL without scrolling
          history.pushState(null, '', href);
        });
      });
    }
  };

  // ============================================
  // Intersection Observer for Animations
  // ============================================
  const ScrollAnimations = {
    init() {
      // Check for reduced motion preference
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      
      const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);
      
      // Observe elements with animation classes
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
      });
    }
  };

  // ============================================
  // Focus Management
  // ============================================
  const FocusManagement = {
    init() {
      // Add focus-visible polyfill behavior
      document.body.addEventListener('mousedown', () => {
        document.body.classList.add('using-mouse');
      });
      
      document.body.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          document.body.classList.remove('using-mouse');
        }
      });
    }
  };

  // ============================================
  // Project Filter
  // ============================================
  const ProjectFilter = {
    init() {
      this.tabs = document.querySelectorAll('.filter-tab');
      this.projects = document.querySelectorAll('.project-card');
      
      if (!this.tabs.length || !this.projects.length) return;
      
      this.tabs.forEach(tab => {
        tab.addEventListener('click', (e) => this.handleFilter(e));
      });
    },
    
    handleFilter(e) {
      const clickedTab = e.currentTarget;
      const filter = clickedTab.dataset.filter;
      
      // Update active tab
      this.tabs.forEach(tab => {
        tab.classList.remove('active');
        tab.setAttribute('aria-selected', 'false');
      });
      clickedTab.classList.add('active');
      clickedTab.setAttribute('aria-selected', 'true');
      
      // Filter projects with smooth animation
      this.projects.forEach(project => {
        const categories = project.dataset.category || '';
        const shouldShow = filter === 'all' || categories.includes(filter);
        
        if (shouldShow) {
          project.classList.remove('hidden');
        } else {
          project.classList.add('hidden');
        }
      });
    }
  };

  // ============================================
  // Initialize All Modules
  // ============================================
  function init() {
    ThemeManager.init();
    MobileNav.init();
    HeaderScroll.init();
    CopyEmail.init();
    SmoothScroll.init();
    ScrollAnimations.init();
    FocusManagement.init();
    ProjectFilter.init();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
