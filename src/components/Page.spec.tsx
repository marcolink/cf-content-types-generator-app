import React from 'react';
import Page from './Page';
import { render } from '@testing-library/react';

describe('Page component', () => {
  it.skip('Component text exists', () => {
    const { getByText } = render(<Page />);

    expect(getByText('Hello Page Component')).toBeInTheDocument();
  });
});
