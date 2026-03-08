import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import BlogPostPage from '../components/BlogPostPage.jsx';

// Mock fetch so tests don't hit the real filesystem
beforeEach(() => {
  global.fetch = vi.fn();
});

const renderAtSlug = (slug) =>
  render(
    <MemoryRouter initialEntries={[`/blog/${slug}`]}>
      <Routes>
        <Route path="/blog/:slug" element={<BlogPostPage effectsOn={false} />} />
        <Route path="/blog/*" element={<BlogPostPage effectsOn={false} />} />
      </Routes>
    </MemoryRouter>
  );

describe('BlogPostPage', () => {
  it('renders "Post not found" for an unknown slug', () => {
    renderAtSlug('does-not-exist');
    expect(screen.getByText(/post not found/i)).toBeInTheDocument();
  });

  it('shows a back link for unknown slugs', () => {
    renderAtSlug('does-not-exist');
    expect(screen.getByText(/back to notes/i)).toBeInTheDocument();
  });

  it('shows loading state while fetching content for a known post', async () => {
    // Make fetch hang indefinitely so we catch the loading state
    global.fetch = vi.fn(() => new Promise(() => {}));
    renderAtSlug('ruminations-at-the-end-of-the-world');
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders post title and date for a known slug', () => {
    global.fetch = vi.fn(() => new Promise(() => {}));
    renderAtSlug('ruminations-at-the-end-of-the-world');
    expect(screen.getByText('Ruminations at the End of the World')).toBeInTheDocument();
    expect(screen.getByText('Mar 07, 2026')).toBeInTheDocument();
  });

  it('renders post content after fetch resolves', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({ ok: true, text: () => Promise.resolve('# Hello World\n\nTest content.') })
    );
    renderAtSlug('ruminations-at-the-end-of-the-world');
    await waitFor(() => expect(screen.getByText('Hello World')).toBeInTheDocument());
  });
});
