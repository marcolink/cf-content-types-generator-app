import {PageExtensionSDK} from '@contentful/app-sdk';
import {Button, Paragraph, Subheading, Typography, Workbench} from '@contentful/forma-36-react-components';
import CFDefinitionsBuilder from "cf-content-types-generator/lib/cf-definitions-builder";
import {Field} from "contentful";
import {css} from "emotion";

import {saveAs} from 'file-saver';
import JSZip from 'jszip'
import Prism from 'prismjs';
import 'prismjs/themes/prism.css'
import React, {useCallback, useEffect, useMemo, useState} from 'react';

require('prismjs/components/prism-typescript');

const styles = {
    sidebarHeadline: css({
        fontFamily: '-apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        letterSpacing: '1px',
        fontSize: '0.75em',
        borderBottom: '1px solid var(--color-element-base)',
        lineHeight: '24px',
        textTransform: 'uppercase',
        color: 'rgb(106, 120, 137)',
        borderBottomColor: 'rgb(195, 207, 213)',
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        marginTop: '23px',
        marginBlockStart: '0.83em',
        marginBlockEnd: '0.83em',
        marginBottom: '23px',
        paddingTop: '24px',
        boxSizing: 'border-box'
    }),

    downloadButton: css({
        marginBottom: '8px'
    })
}


interface PageProps {
    sdk: PageExtensionSDK;
}

const Page: React.FC<PageProps> = ({sdk}) => {
    const [output, setOutput] = useState('')

    const api = sdk.space;

    const builder = useMemo(() => {
        const contentTypes = api.getCachedContentTypes();
        const builder = new CFDefinitionsBuilder()
        contentTypes.forEach(contentType => {
            builder.appendType({
                id: contentType.sys.id,
                sys: contentType.sys,
                fields: (contentType.fields as Field[]),
                name: contentType.name
            })
        })
        return builder;
    }, [api])

    const createZip = useCallback(async () => {
        const zip = new JSZip();
        const writer = async (dir: string, content: string) => {
            zip.file(dir, content);
        }
        await builder.write('', writer);
        const zipContent = await zip.generateAsync({type: "blob"})
        saveAs(zipContent, "types.zip")
    }, [builder])

    const createFile = useCallback(async () => {
        const file = new Blob([output], {type: "text/plain;charset=utf-8"})
        saveAs(file, "types.ts")
    }, [output])


    useEffect(() => {
        setOutput(builder.toString())
    }, [api, setOutput])

    useEffect(() => {
        Prism.highlightAll();
    })

    return (
        <Workbench>
            <Workbench.Header
                title={'Typescript - Content Types'}
                description={'Generate TS types based on content types'}
            />
            <Workbench.Content type={"full"}>
                <pre><code className={'lang-typescript'}>{output}</code></pre>
            </Workbench.Content>
            <Workbench.Sidebar position="right">
                <Subheading className={styles.sidebarHeadline}>Downloads</Subheading>
                <Button
                    icon="Folder"
                    className={styles.downloadButton}
                    onClick={createZip}
                    isFullWidth
                >
                    Download zip
                </Button>
                <Typography>
                    <Paragraph>
                        Download a zip file including separate files for each content type.
                    </Paragraph>
                </Typography>

                <Button
                    icon="Download"
                    className={styles.downloadButton}
                    onClick={createFile}
                    isFullWidth
                >
                    Download file
                </Button>
                <Typography>
                    <Paragraph>
                        Download a single file with all types combined.
                    </Paragraph>
                </Typography>

                <Subheading className={styles.sidebarHeadline}>Project Info</Subheading>
                <Typography>
                    <Paragraph>
                        Version {require('../../package.json').version}
                    </Paragraph>
                </Typography>


            </Workbench.Sidebar>
        </Workbench>
    );
};

export default Page;
