import React from 'react';
import {mockCma, mockSdk} from '../../test/mocks';
import {renderContainer} from "../../test/renderContainer";
import ConfigScreen from './ConfigScreen';

jest.mock('@contentful/react-apps-toolkit', () => ({
    useSDK: () => mockSdk,
    useCMA: () => mockCma,
}));

describe('Config Screen component', () => {
    it('Component text exists', async () => {
        const {getByText} = renderContainer(<ConfigScreen/>);

        // simulate the user clicking the install button
        await mockSdk.app.onConfigure.mock.calls[0][0]();

        expect(
            getByText('Welcome to your contentful app. This is your config page.')
        ).toBeInTheDocument();
    });
});
