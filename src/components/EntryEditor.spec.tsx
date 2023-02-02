import React from 'react';
import EntryEditor from './EntryEditor';
import {render} from '@testing-library/react';

describe('Entry component', () => {
    it('Component text exists', () => {
        const mockSdk: any = {
            app: {
                onConfigure: jest.fn(),
                getParameters: jest.fn().mockReturnValueOnce({}),
                setReady: jest.fn(),
                getCurrentState: jest.fn()
            }
        };
        const {getByText} = render(<EntryEditor sdk={mockSdk}/>);

        expect(getByText('Hello Entry Editor Component')).toBeInTheDocument();
    });
});
