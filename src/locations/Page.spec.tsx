import React from 'react';
import {renderContainer} from "../../test/renderContainer";
import Page from './Page';
import { mockCma, mockSdk } from '../../test/mocks';

jest.mock('@contentful/react-apps-toolkit', () => ({
    useSDK: () => mockSdk,
    useCMA: () => mockCma,
}));

describe('Page component', () => {
    it('Component text exists', () => {
        const { getByText } = renderContainer(<Page />);

        expect(getByText('Typescript - Content Types')).toBeInTheDocument();
    });
});
