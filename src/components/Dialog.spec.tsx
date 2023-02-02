import React from 'react';
import Dialog from './Dialog';
import { render } from '@testing-library/react';

describe('Dialog component', () => {
  it('Component text exists', () => {
      const mockSdk: any = {
          app: {
              onConfigure: jest.fn(),
              getParameters: jest.fn().mockReturnValueOnce({}),
              setReady: jest.fn(),
              getCurrentState: jest.fn()
          }
      };
    const { getByText } = render(<Dialog sdk={mockSdk}/>);

    expect(getByText('Hello Dialog Component')).toBeInTheDocument();
  });
});
