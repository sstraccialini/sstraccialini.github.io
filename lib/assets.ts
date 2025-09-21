/**
 * Asset utilities for managing static assets paths and configurations
 */

export const ASSETS_CONFIG = {
  images: {
    base: '/assets/images',
    avatar: '/assets/images/avatar.jpg',
    projects: '/assets/images/projects',
    icons: '/assets/images/icons',
  },
  documents: {
    base: '/assets/documents',
    cv: '/assets/documents/cv.pdf',
  },
} as const;

/**
 * Get the full path for a project image
 */
export function getProjectImagePath(projectId: string): string {
  return `${ASSETS_CONFIG.images.projects}/${projectId}.jpg`;
}

/**
 * Get the full path for an avatar image
 */
export function getAvatarImagePath(): string {
  return ASSETS_CONFIG.images.avatar;
}

/**
 * Get the full path for a document
 */
export function getDocumentPath(filename: string): string {
  return `${ASSETS_CONFIG.documents.base}/${filename}`;
}

/**
 * Get the CV download path
 */
export function getCVPath(): string {
  return ASSETS_CONFIG.documents.cv;
}

/**
 * Check if an image exists (client-side only)
 */
export function checkImageExists(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

/**
 * Get a fallback image path for when the main image fails to load
 */
export function getFallbackImagePath(): string {
  return '/assets/images/placeholder.jpg';
}
