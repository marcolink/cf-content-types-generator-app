import React from 'react';
import {mockCma, mockSdk} from '../../test/mocks';
import {renderContainer} from "../../test/renderContainer";
import Dialog from './Dialog';

jest.mock('@contentful/react-apps-toolkit', () => ({
    useSDK: () => mockSdk,
    useCMA: () => mockCma,
}));

describe('Dialog component', () => {
    it('Component text exists', () => {
        const {getByText} = renderContainer(<Dialog/>);

        expect(getByText('Hello Dialog Component (AppId: test-app)')).toBeInTheDocument();
    });
});
