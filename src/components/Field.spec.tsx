import React from 'react';
import Field from './Field';
import { render } from '@testing-library/react';

describe('Field component', () => {
  it('Component text exists', () => {
      const mockSdk: any = {
          app: {
              onConfigure: jest.fn(),
              getParameters: jest.fn().mockReturnValueOnce({}),
              setReady: jest.fn(),
              getCurrentState: jest.fn()
          }
      };
    const { getByText } = render(<Field sdk={mockSdk}/>);

    expect(getByText('Hello Entry Field Component')).toBeInTheDocument();
  });
});
