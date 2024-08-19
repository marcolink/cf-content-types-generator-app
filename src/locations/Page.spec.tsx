import {describe, expect, it, vi} from 'vitest';
import {mockCma, mockSdk} from '../../test/mocks';
import Page from './Page';
import {renderContainer} from "../../test/renderContainer";

vi.mock('@contentful/react-apps-toolkit', () => ({
  useSDK: () => mockSdk,
  useCMA: () => mockCma,
}));

describe('Page component', () => {
  it('Component text exists', () => {
    const {getByText} = renderContainer(<Page/>);
    expect(getByText('Content Types (TS) Generator')).toBeTruthy();
  });
});