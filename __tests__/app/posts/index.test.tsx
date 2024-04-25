/**
 * @jest-environment jsdom
 */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import PostsPage from '@/src/app/posts/page';

describe('Posts Page', () => {
  it('should render properly', () => {
    render(<PostsPage searchParams={{}} />);

    const header = screen.getByRole('heading');
    const headerText = 'Post';
    expect(header).toHaveTextContent(headerText);
  });
});
