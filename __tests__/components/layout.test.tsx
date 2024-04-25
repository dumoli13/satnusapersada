import React from 'react';
import { render } from '@testing-library/react';
import Layout from '@/src/components/Layout';

describe('Layout', () => {
  test('should render children', () => {
    const { getByText } = render(
      <Layout>
        <div>Test Child</div>
      </Layout>,
    );

    const childElement = getByText('Test Child');
    expect(childElement).toBeInTheDocument();
  });
});
