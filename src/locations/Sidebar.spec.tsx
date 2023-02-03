import React from 'react';
import {renderContainer} from "../../test/renderContainer";
import Sidebar from './Sidebar';
import { mockCma, mockSdk } from '../../test/mocks';

jest.mock('@contentful/react-apps-toolkit', () => ({
    useSDK: () => mockSdk,
    useCMA: () => mockCma,
}));

describe('Sidebar component', () => {
    it('Component text exists', () => {
        const { getByText } = renderContainer(<Sidebar />);

        expect(getByText('Hello Sidebar Component (AppId: test-app)')).toBeInTheDocument();
    });
});
