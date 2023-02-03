import React from 'react';
import {mockCma, mockSdk} from '../../test/mocks';
import {renderContainer} from "../../test/renderContainer";
import EntryEditor from './EntryEditor';

jest.mock('@contentful/react-apps-toolkit', () => ({
    useSDK: () => mockSdk,
    useCMA: () => mockCma,
}));

describe('Entry component', () => {
    it('Component text exists', () => {
        const {getByText} = renderContainer(<EntryEditor/>);

        expect(getByText('Hello Entry Editor Component (AppId: test-app)')).toBeInTheDocument();
    });
});
