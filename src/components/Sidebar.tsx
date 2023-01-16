import {SidebarExtensionSDK} from '@contentful/app-sdk';
import {Paragraph} from '@contentful/f36-components';
import React from 'react';

interface SidebarProps {
    sdk: SidebarExtensionSDK;
}

const Sidebar = (props: SidebarProps) => {
    return <Paragraph>Hello Sidebar Component</Paragraph>;
};

export default Sidebar;
