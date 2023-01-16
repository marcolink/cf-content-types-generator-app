import {DialogExtensionSDK} from '@contentful/app-sdk';
import {Paragraph} from '@contentful/f36-components';
import React from 'react';

interface DialogProps {
    sdk: DialogExtensionSDK;
}

const Dialog = (props: DialogProps) => {
    return <Paragraph>Hello Dialog Component</Paragraph>;
};

export default Dialog;
