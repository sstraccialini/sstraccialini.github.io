# Samuele Nicolò Straccialini — Personal Portfolio

A modern, accessible, and performant personal portfolio website built with vanilla HTML, CSS, and JavaScript.

## 🎯 Design Goals

- **Performance**: Targeting Lighthouse scores ≥95 across all metrics
- **Accessibility**: WCAG 2.1 AA compliant with semantic HTML and ARIA labels
- **Maintainability**: CSS custom properties for easy theming, modular JavaScript
- **No Build Step**: Pure HTML/CSS/JS, deployable anywhere

## 📁 Project Structure

```
new_website/
├── index.html          # Home page
├── about.html          # About page
├── projects.html       # Projects listing
├── contact.html        # Contact page
├── 404.html            # Error page
├── sitemap.xml         # SEO sitemap
├── robots.txt          # Search engine directives
├── site.webmanifest    # PWA manifest
├── css/
│   └── styles.css      # Complete design system
├── js/
│   └── main.js         # Theme toggle, mobile nav, etc.
└── assets/
    ├── favicon.svg     # SVG favicon
    └── images/         # Images (add your avatar, project screenshots)
```

## 🚀 Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/sstraccialini/sstraccialini.github.io.git
   cd sstraccialini.github.io/new_website
   ```

2. **Start a local server**
   
   Using Python:
   ```bash
   python -m http.server 8000
   ```
   
   Using Node.js (npx):
   ```bash
   npx serve .
   ```
   
   Or use VS Code's Live Server extension.

3. **Open in browser**
   Navigate to `http://localhost:8000`

## 🌐 Deployment to GitHub Pages

### Option 1: Deploy from `new_website` folder

1. Move contents of `new_website/` to root or configure GitHub Pages to serve from a subfolder
2. Go to repository Settings → Pages
3. Select source branch and folder
4. Save and wait for deployment

### Option 2: Replace existing site

1. Back up existing files if needed
2. Copy contents of `new_website/` to repository root
3. Push changes to GitHub
4. GitHub Pages will automatically rebuild

## ✅ Pre-Deployment Checklist

- [ ] Update `sitemap.xml` with correct URLs and dates
- [ ] Replace placeholder avatar in `assets/images/`
- [ ] Add actual CV/resume file and update download link in `about.html`
- [ ] Test all links (internal and external)
- [ ] Run Lighthouse audit and verify scores
- [ ] Test on mobile devices
- [ ] Verify dark/light theme toggle works
- [ ] Check 404 page displays correctly for invalid URLs

## 🎨 Customization

### Colors

Edit CSS custom properties in `css/styles.css`:

```css
:root {
  --color-accent: #2563eb;        /* Primary accent color */
  --color-accent-hover: #1d4ed8;  /* Accent hover state */
  --color-accent-subtle: #dbeafe; /* Accent background */
}
```

### Typography

The site uses system fonts for optimal performance. To use custom fonts:

1. Add font files to `assets/fonts/`
2. Update `--font-family-sans` in CSS
3. Consider performance impact on Lighthouse scores

### Content

All content is in plain HTML files. Edit directly:

- **Personal info**: Update name, tagline, bio in respective pages
- **Projects**: Edit project cards in `projects.html`
- **Contact**: Update email, location, social links in `contact.html`
- **Meta tags**: Update Open Graph and Twitter meta tags in each HTML file

## 🧪 Testing

### Lighthouse Audit

1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Run audit for Performance, Accessibility, Best Practices, SEO
4. Target scores: Performance ≥95, Accessibility ≥95, Best Practices ≥95, SEO ≥90

### Accessibility Testing

- Test with keyboard navigation (Tab, Enter, Escape)
- Use screen reader (NVDA, VoiceOver)
- Check color contrast ratios
- Verify focus indicators are visible

### Cross-Browser Testing

Test in:
- Chrome/Edge (Chromium)
- Firefox
- Safari (if available)
- Mobile browsers

## 📝 License

© 2025 Samuele Nicolò Straccialini. All rights reserved.

---

Built with ❤️ using vanilla HTML, CSS, and JavaScript.
