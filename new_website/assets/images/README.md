# Images Directory

Place your images here:

## Required Images

1. **avatar.jpg** (or .png, .webp)
   - Your profile photo for the hero section
   - Recommended size: 400x400px minimum
   - Aspect ratio: 1:1 (square)
   - Update the `src` attribute in `index.html` hero section

2. **og-image.jpg**
   - Open Graph image for social sharing
   - Recommended size: 1200x630px
   - Update `og:image` meta tags in all HTML files

## Optional Images

- Project screenshots (for enhanced project cards)
- Icons (if not using inline SVGs)

## Performance Tips

- Use WebP format when possible for smaller file sizes
- Compress images using tools like:
  - [Squoosh](https://squoosh.app/)
  - [TinyPNG](https://tinypng.com/)
- Use appropriate dimensions (don't serve 2000px images for 200px displays)
- Consider using `loading="lazy"` for below-the-fold images
