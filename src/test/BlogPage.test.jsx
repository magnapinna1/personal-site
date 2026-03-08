import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BlogPage from '../components/BlogPage.jsx';

// NeutronStar uses canvas which jsdom doesn't support — mock it
vi.mock('../components/NeutronStar.jsx', () => ({
  default: () => <div data-testid="neutron-star-mock" />,
}));

const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe('BlogPage', () => {
  it('renders the Notes heading', () => {
    renderWithRouter(<BlogPage />);
    expect(screen.getByText('Notes')).toBeInTheDocument();
  });

  it('renders a card for each post in the data', async () => {
    const { getAllPosts } = await import('../data/posts.jsx');
    renderWithRouter(<BlogPage />);
    getAllPosts().forEach(post => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    });
  });

  it('renders tags for each post', async () => {
    const { getAllPosts } = await import('../data/posts.jsx');
    renderWithRouter(<BlogPage />);
    getAllPosts().forEach(post => {
      post.tags.forEach(tag => {
        expect(screen.getAllByText(tag).length).toBeGreaterThan(0);
      });
    });
  });
});
