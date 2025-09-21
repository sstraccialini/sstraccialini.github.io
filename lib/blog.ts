export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  featured: boolean;
  author: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 'welcome-to-my-blog',
    title: 'Welcome to My Blog',
    excerpt: 'An introduction to my blog and what you can expect to find here.',
    content: `
      <h2>Welcome to My Blog</h2>
      <p>
        I've just launched this website, and this blog will slowly take shape as I continue improving things in the coming weeks.
      </p>

      <h3>What You'll Find Here</h3>
      <ul>
        <li>Notes from projects in AI, machine learning, and software development</li>
        <li>Occasional tutorials or small write-ups on topics I find interesting</li>
        <li>Reflections on tools, methods, and ideas I've been exploring</li>
      </ul>

      <p>
        This space is a work in progress, and I'm looking forward to shaping it over time.
      </p>
    `,
    date: '2025-09-21',
    readTime: '<1 min read',
    category: 'Other',
    featured: true,
    author: 'Samuele Nicolò Straccialini',
    tags: []
  },
  // You can add more blog posts here following the same structure
  // Example:
  /*
  {
    id: 'another-post',
    title: 'Another Post Title',
    excerpt: 'Short description of the post',
    content: (
      <>
        <h2>Your Content Here</h2>
        <p>Your paragraphs and other content...</p>
      </>
    ),
    date: '2025-10-01',
    readTime: '5 min read',
    category: 'AI/ML',
    featured: false,
    author: 'Samuele Nicolò Straccialini',
    tags: ['ai', 'machine-learning']
  },
  */
];

// Helper functions
export function getAllBlogPosts() {
  return blogPosts;
}

export function getFeaturedBlogPosts() {
  return blogPosts.filter(post => post.featured);
}

export function getBlogPostById(id: string) {
  return blogPosts.find(post => post.id === id);
}

export function getBlogPostsByCategory(category: string) {
  return blogPosts.filter(post => post.category === category);
}

export function getBlogPostsByTag(tag: string) {
  return blogPosts.filter(post => post.tags.includes(tag));
}
