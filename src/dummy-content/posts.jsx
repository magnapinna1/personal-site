const posts = [
  {
    slug: 'hello-world-dummy',
    title: 'Hello World! (Dummy Post)',
    date: 'Dec 01, 2024',
    excerpt: 'This is a sample post for local development without the private repo.',
    tags: ['test', 'dummy'],
    relatedSlugs: [],
  }
];

export const getAllPosts = () => posts;

export const getPostBySlug = (slug) => posts.find(p => p.slug === slug) || null;

export const getRelatedPosts = (slugs) =>
  slugs.map(s => posts.find(p => p.slug === s)).filter(Boolean);
