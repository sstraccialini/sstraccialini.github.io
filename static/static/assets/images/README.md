# Assets/Images Directory

This directory contains image assets for the website.

## Structure
- `avatar.jpg` - Profile picture for the hero section
- `projects/` - Project screenshots and images
- `icons/` - Custom icons and logos

## Usage
Images in this directory can be referenced in components using:
```tsx
<img src="/assets/images/avatar.jpg" alt="Profile" />
```

## Recommended Formats
- **Photos**: JPG/JPEG for photographs
- **Graphics**: PNG for graphics with transparency
- **Icons**: SVG for scalable icons
- **Logos**: SVG or PNG

## Optimization
Consider optimizing images before adding them:
- Compress images to reduce file size
- Use appropriate dimensions for web display
- Consider using Next.js Image component for automatic optimization
