import React from 'react';
import Page from './Page';
import { render } from '@testing-library/react';

describe('Page component', () => {
  it.skip('Component text exists', () => {
      const mockSdk: any = {
          app: {
              onConfigure: jest.fn(),
              getParameters: jest.fn().mockReturnValueOnce({}),
              setReady: jest.fn(),
              getCurrentState: jest.fn()
          }
      };
    const { getByText } = render(<Page sdk={mockSdk}/>);

    expect(getByText('Hello Page Component')).toBeInTheDocument();
  });
});
