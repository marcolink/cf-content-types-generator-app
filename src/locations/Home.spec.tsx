import React from 'react';
import {renderContainer} from "../../test/renderContainer";
import Home from './Home';
import {mockCma, mockSdk} from '../../test/mocks';

jest.mock('@contentful/react-apps-toolkit', () => ({
    useSDK: () => mockSdk,
    useCMA: () => mockCma,
}));

describe('Home component', () => {
    it('Component text exists', () => {
        const {getByText} = renderContainer(<Home/>);

        expect(getByText('Hello Home Component (AppId: test-app)')).toBeInTheDocument();
    });
});
