import React from 'react';
import {renderContainer} from "../../test/renderContainer";
import Field from './Field';
import {mockCma, mockSdk} from '../../test/mocks';

jest.mock('@contentful/react-apps-toolkit', () => ({
    useSDK: () => mockSdk,
    useCMA: () => mockCma,
}));

describe('Field component', () => {
    it('Component text exists', () => {
        const {getByText} = renderContainer(<Field/>);

        expect(getByText('Hello Entry Field Component (AppId: test-app)')).toBeInTheDocument();
    });
});
