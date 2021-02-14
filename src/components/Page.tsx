import {PageExtensionSDK} from '@contentful/app-sdk';
import {Workbench} from '@contentful/forma-36-react-components';
import {css} from "emotion";
import React from 'react';
import GeneratorView from "../generator/GeneratorView";

interface PageProps {
    sdk: PageExtensionSDK;
}

const Page: React.FC<PageProps> = ({sdk}) => {
    return (
        <Workbench className={css({margin: '80px'})}>
            <Workbench.Header title={'Typescript - Content Types'}/>
            <Workbench.Content type={"full"}>
                <GeneratorView api={sdk.space}/>
            </Workbench.Content>
        </Workbench>);
};

export default Page;
