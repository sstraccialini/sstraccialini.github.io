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
  // Markdown Parser for Project Pages
  // ============================================
  const MarkdownParser = {
    init() {
      // Find all elements with markdown-content class
      const markdownContainers = document.querySelectorAll('.markdown-content');
      
      if (markdownContainers.length === 0) return;
      
      // Check if marked.js is loaded
      if (typeof marked === 'undefined') {
        console.warn('marked.js is not loaded. Markdown parsing skipped.');
        return;
      }
      
      // Helper to generate slug from text
      const slugify = (text) => {
        return text
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')  // Remove non-word chars except spaces and dashes
          .replace(/\s+/g, '-')       // Replace spaces with dashes
          .replace(/-+/g, '-');       // Remove consecutive dashes
      };
      
      // Custom renderer for links and headings
      const renderer = {
        // Generate heading with ID for anchor links
        heading(text, level) {
          // Handle marked.js v5+ API where first arg is an object
          let headingText, headingLevel;
          if (typeof text === 'object' && text !== null) {
            headingText = text.text;
            headingLevel = text.depth;
          } else {
            headingText = text;
            headingLevel = level;
          }
          
          const id = slugify(headingText);
          return `<h${headingLevel} id="${id}">${headingText}</h${headingLevel}>`;
        },
        
        link(href, title, text) {
          // Handle marked.js v5+ API where first arg is an object
          let url, linkTitle, linkText;
          if (typeof href === 'object' && href !== null) {
            url = href.href;
            linkTitle = href.title;
            linkText = href.text;
          } else {
            url = href;
            linkTitle = title;
            linkText = text;
          }
          
          const titleAttr = linkTitle ? ` title="${linkTitle}"` : '';
          
          // Internal anchor links (start with #)
          if (url && url.startsWith('#')) {
            return `<a href="${url}" class="anchor-link"${titleAttr}>${linkText}</a>`;
          }
          // External links - open in new tab
          return `<a href="${url}" target="_blank" rel="noopener noreferrer"${titleAttr}>${linkText}</a>`;
        }
      };
      
      // Configure marked with custom renderer
      marked.use({
        breaks: true,        // Convert \n to <br>
        gfm: true,           // GitHub Flavored Markdown
        renderer: renderer
      });
      
      // Parse each markdown container
      markdownContainers.forEach(container => {
        let markdownText = container.textContent;
        
        // Process LaTeX math before markdown parsing
        markdownText = this.processLaTeX(markdownText);
        
        const htmlContent = marked.parse(markdownText);
        container.innerHTML = htmlContent;
        
        // Render KaTeX if available
        this.renderKaTeX(container);
        
        // Setup smooth scrolling for anchor links
        this.setupAnchorLinks(container);
      });
    },
    
    // Process LaTeX: protect math expressions from markdown parsing
    processLaTeX(text) {
      // Replace block math $$...$$ with placeholder FIRST
      text = text.replace(/\$\$([\s\S]*?)\$\$/g, (match, math) => {
        return `<div class="math-block" data-math="${this.escapeHtml(math.trim())}"></div>`;
      });
      
      // Replace inline math $...$ 
      // Match $ followed by non-$ non-newline content, ending with $
      // Use word boundaries and ensure content exists
      text = text.replace(/\$([^\$\n]+?)\$/g, (match, math) => {
        // Skip if it looks like a price (e.g., $10, $5.00)
        if (/^\d+(\.\d+)?$/.test(math.trim())) {
          return match;
        }
        return `<span class="math-inline" data-math="${this.escapeHtml(math.trim())}"></span>`;
      });
      
      return text;
    },
    
    // Escape HTML for data attributes
    escapeHtml(text) {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    },
    
    // Render KaTeX math expressions
    renderKaTeX(container) {
      if (typeof katex === 'undefined') {
        // KaTeX not loaded - show raw math as fallback
        container.querySelectorAll('.math-block, .math-inline').forEach(el => {
          const math = el.getAttribute('data-math');
          el.textContent = el.classList.contains('math-block') ? `$$${math}$$` : `$${math}$`;
        });
        return;
      }
      
      // Render block math
      container.querySelectorAll('.math-block').forEach(el => {
        const math = el.getAttribute('data-math');
        try {
          katex.render(math, el, { displayMode: true, throwOnError: false });
        } catch (e) {
          el.textContent = `$$${math}$$`;
          console.warn('KaTeX error:', e);
        }
      });
      
      // Render inline math
      container.querySelectorAll('.math-inline').forEach(el => {
        const math = el.getAttribute('data-math');
        try {
          katex.render(math, el, { displayMode: false, throwOnError: false });
        } catch (e) {
          el.textContent = `$${math}$`;
          console.warn('KaTeX error:', e);
        }
      });
    },
    
    // Setup anchor link click handlers for smooth scrolling
    setupAnchorLinks(container) {
      // Slugify helper (same as used for heading IDs)
      const slugify = (text) => {
        return text
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-');
      };
      
      container.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          const href = this.getAttribute('href');
          if (!href || href === '#') return;
          
          // Get the raw target from href (e.g., "#overview" -> "overview")
          const rawTarget = decodeURIComponent(href.slice(1));
          
          // The ID we're looking for is the slugified version
          const targetId = slugify(rawTarget);
          
          // Find the element
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            // Calculate position accounting for fixed header
            const headerOffset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
            
            // Update URL hash
            history.replaceState(null, null, `#${targetId}`);
          } else {
            console.warn('Anchor target not found:', targetId, 'from href:', href);
          }
        });
      });
    }
  };

  // ============================================
  // Projects Renderer
  // ============================================
  const ProjectsRenderer = {
    // SVG icons
    icons: {
      github: `<svg class="btn__icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
        <path d="M9 18c-4.51 2-5-2-7-2"></path>
      </svg>`,
      document: `<svg class="btn__icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
        <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
        <path d="M10 9H8"></path>
        <path d="M16 13H8"></path>
        <path d="M16 17H8"></path>
      </svg>`,
      link: `<svg class="btn__icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
      </svg>`,
      arrow: `<svg class="btn__icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M5 12h14"></path>
        <path d="m12 5 7 7-7 7"></path>
      </svg>`
    },

    // Helper to get URL and label from link (supports string or object format)
    getLinkData(link, defaultLabel) {
      if (typeof link === 'string') {
        return { url: link, label: defaultLabel };
      }
      return { url: link.url, label: link.label || defaultLabel };
    },

    init() {
      // Check if projects data is available
      if (typeof PROJECTS_DATA === 'undefined') return;
      
      // Render featured projects on homepage
      const featuredContainer = document.getElementById('featured-projects-grid');
      if (featuredContainer) {
        this.renderProjects(featuredContainer, PROJECTS_DATA.filter(p => p.featured), true);
      }
      
      // Render all projects on projects page
      const allProjectsContainer = document.getElementById('projects-grid');
      if (allProjectsContainer) {
        this.renderProjects(allProjectsContainer, PROJECTS_DATA, false);
      }
    },

    renderProjects(container, projects, isHomepage) {
      // Determine the base path for links
      const basePath = isHomepage ? '' : '';
      const headingTag = isHomepage ? 'h3' : 'h2';
      
      const html = projects.map(project => this.createProjectCard(project, basePath, headingTag)).join('');
      container.innerHTML = html;
    },

    createProjectCard(project, basePath, headingTag) {
      const statusClass = project.status === 'Completed' ? 'badge--success' : 
                         project.status === 'In Progress' ? 'badge--warning' : 'badge--info';
      
      // Build tags HTML
      const tagsHtml = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
      
      // Build actions HTML
      let actionsHtml = '';
      
      if (project.links.code) {
        const { url, label } = this.getLinkData(project.links.code, 'Code');
        actionsHtml += `
          <a href="${url}" target="_blank" rel="noopener noreferrer" class="btn btn--secondary">
            ${this.icons.github}
            ${label}
          </a>`;
      }
      
      if (project.links.report) {
        const { url, label } = this.getLinkData(project.links.report, 'Report');
        actionsHtml += `
          <a href="${url}" target="_blank" rel="noopener noreferrer" class="btn btn--secondary">
            ${this.icons.document}
            ${label}
          </a>`;
      }
      
      if (project.links.link) {
        const { url, label } = this.getLinkData(project.links.link, 'Link');
        actionsHtml += `
          <a href="${url}" target="_blank" rel="noopener noreferrer" class="btn btn--secondary">
            ${this.icons.link}
            ${label}
          </a>`;
      }
      
      if (project.links.page) {
        actionsHtml += `
          <a href="${basePath}${project.links.page}" class="btn btn--primary">
            Read More
            ${this.icons.arrow}
          </a>`;
      }

      return `
        <article class="card card--interactive project-card" data-category="${project.category}">
          <header class="project-card__header">
            <${headingTag} class="project-card__title">${project.title}</${headingTag}>
            <span class="badge ${statusClass}">${project.status}</span>
          </header>
          <p class="project-card__description">${project.description}</p>
          <div class="project-card__tags">
            ${tagsHtml}
          </div>
          <div class="project-card__actions">
            ${actionsHtml}
          </div>
        </article>`;
    }
  };

  // ============================================
  // Project Page Renderer (for individual project pages)
  // ============================================
  const ProjectPageRenderer = {
    icons: ProjectsRenderer.icons,

    getLinkData(link, defaultLabel) {
      if (typeof link === 'string') {
        return { url: link, label: defaultLabel };
      }
      return { url: link.url, label: link.label || defaultLabel };
    },

    init() {
      // Find project header with data-project-id
      const projectHeader = document.querySelector('.project-header[data-project-id]');
      if (!projectHeader || typeof PROJECTS_DATA === 'undefined') return;

      const projectId = projectHeader.dataset.projectId;
      const project = PROJECTS_DATA.find(p => p.id === projectId);
      
      if (!project) {
        console.warn(`Project with id "${projectId}" not found in PROJECTS_DATA`);
        return;
      }

      this.renderProjectHeader(projectHeader, project);
      this.renderProjectSidebar(project);
    },

    renderProjectHeader(header, project) {
      // Set title
      const titleEl = header.querySelector('.project-header__title');
      if (titleEl) titleEl.textContent = project.title;

      // Set description
      const descEl = header.querySelector('.project-header__description');
      if (descEl) descEl.textContent = project.description;

      // Set tags
      const tagsEl = header.querySelector('.project-header__tags');
      if (tagsEl) {
        tagsEl.innerHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
      }

      // Set actions/buttons
      const actionsEl = header.querySelector('.project-header__actions');
      if (actionsEl) {
        actionsEl.innerHTML = this.createActions(project);
      }
    },

    renderProjectSidebar(project) {
      // Render project details
      const detailsEl = document.querySelector('.project-meta[data-auto]');
      if (detailsEl) {
        detailsEl.innerHTML = this.createProjectMeta(project);
      }

      // Render technologies
      const techEl = document.querySelector('.tech-list[data-auto]');
      if (techEl && project.technologies) {
        techEl.innerHTML = project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('');
      }
    },

    createProjectMeta(project) {
      const statusClass = project.status === 'Completed' ? 'badge--success' : 
                         project.status === 'In Progress' ? 'badge--warning' : 'badge--info';
      
      let html = '';
      
      if (project.date) {
        html += `
          <dt>Completion Date</dt>
          <dd>${project.date}</dd>`;
      }
      
      if (project.categoryDisplay) {
        html += `
          <dt>Category</dt>
          <dd>${project.categoryDisplay}</dd>`;
      }
      
      html += `
          <dt>Status</dt>
          <dd><span class="badge ${statusClass}">${project.status}</span></dd>`;
      
      if (project.organization) {
        html += `
          <dt>Organization</dt>
          <dd>${project.organization}</dd>`;
      }
      
      return html;
    },

    createActions(project) {
      let html = '';

      // Code button (primary style - GitHub icon)
      if (project.links.code) {
        const { url, label } = this.getLinkData(project.links.code, 'View Code');
        html += `
          <a href="${url}" target="_blank" rel="noopener noreferrer" class="btn btn--primary">
            ${this.icons.github}
            ${label}
          </a>`;
      }

      // Report button (secondary style)
      if (project.links.report) {
        const { url, label } = this.getLinkData(project.links.report, 'Read Report');
        html += `
          <a href="${url}" target="_blank" rel="noopener noreferrer" class="btn btn--secondary">
            ${this.icons.document}
            ${label}
          </a>`;
      }

      // Link button (secondary style)
      if (project.links.link) {
        const { url, label } = this.getLinkData(project.links.link, 'Visit Link');
        html += `
          <a href="${url}" target="_blank" rel="noopener noreferrer" class="btn btn--secondary">
            ${this.icons.link}
            ${label}
          </a>`;
      }

      return html;
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
    ProjectsRenderer.init();
    ProjectPageRenderer.init();
    ProjectFilter.init();
    MarkdownParser.init();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
