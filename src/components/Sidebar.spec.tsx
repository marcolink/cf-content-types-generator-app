import React from 'react';
import Sidebar from './Sidebar';
import {render} from '@testing-library/react';

describe('Sidebar component', () => {
    it('Component text exists', () => {

        const mockSdk: any = {
            app: {
                onConfigure: jest.fn(),
                getParameters: jest.fn().mockReturnValueOnce({}),
                setReady: jest.fn(),
                getCurrentState: jest.fn()
            }
        };

        const {getByText} = render(<Sidebar sdk={mockSdk}/>);

        expect(getByText('Hello Sidebar Component')).toBeInTheDocument();
    });
});
