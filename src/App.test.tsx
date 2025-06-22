import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mock window.open for external link test
beforeAll(() => {
  window.open = jest.fn();
});

describe('Navigation and Links', () => {
  test('renders main navigation links', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Apartments/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /About/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Attractions/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Contact/i })).toBeInTheDocument();
  });

  test('Explore All Attractions button opens external site', () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    const button = screen.getByRole('button', { name: /Explore All Attractions/i });
    expect(button).toBeInTheDocument();
    // The button is wrapped in an <a> tag
    const link = button.closest('a');
    expect(link).toHaveAttribute('href', 'https://www.visitthegambia.gm/');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  // You can add more tests for navigation and scrolling if you set up jsdom mocks for scrollIntoView
}); 