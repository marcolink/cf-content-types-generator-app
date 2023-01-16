import {EditorExtensionSDK} from '@contentful/app-sdk';
import {Paragraph} from '@contentful/f36-components';
import React from 'react';

interface EditorProps {
    sdk: EditorExtensionSDK;
}

const Entry = (props: EditorProps) => {
    return <Paragraph>Hello Entry Editor Component</Paragraph>;
};

export default Entry;
