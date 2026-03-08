import { describe, it, expect } from 'vitest';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '../data/posts.jsx';

describe('getAllPosts', () => {
  it('returns an array', () => {
    expect(Array.isArray(getAllPosts())).toBe(true);
  });

  it('returns at least one post', () => {
    expect(getAllPosts().length).toBeGreaterThan(0);
  });

  it('each post has required fields', () => {
    getAllPosts().forEach(post => {
      expect(post).toHaveProperty('slug');
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('date');
      expect(post).toHaveProperty('excerpt');
      expect(post).toHaveProperty('tags');
      expect(Array.isArray(post.tags)).toBe(true);
    });
  });
});

describe('getPostBySlug', () => {
  it('returns the correct post for a valid slug', () => {
    const slug = getAllPosts()[0].slug;
    const post = getPostBySlug(slug);
    expect(post).not.toBeNull();
    expect(post.slug).toBe(slug);
  });

  it('returns null for an unknown slug', () => {
    expect(getPostBySlug('this-does-not-exist')).toBeNull();
  });

  it('returns null for empty string', () => {
    expect(getPostBySlug('')).toBeNull();
  });
});

describe('getRelatedPosts', () => {
  it('returns an empty array when given no slugs', () => {
    expect(getRelatedPosts([])).toEqual([]);
  });

  it('filters out slugs that do not match any post', () => {
    const result = getRelatedPosts(['totally-fake-slug', 'another-fake']);
    expect(result).toEqual([]);
  });

  it('returns matching posts for valid slugs', () => {
    const validSlug = getAllPosts()[0].slug;
    const result = getRelatedPosts([validSlug]);
    expect(result.length).toBe(1);
    expect(result[0].slug).toBe(validSlug);
  });
});
