import {PageExtensionSDK} from '@contentful/app-sdk';
import {Button, Paragraph, Typography, Workbench} from '@contentful/forma-36-react-components';
import CFDefinitionsBuilder from "cf-content-types-generator/lib/cf-definitions-builder";
import {Field} from "contentful";
import {css} from "emotion";

import {saveAs} from 'file-saver';
import JSZip from 'jszip'
import Prism from 'prismjs';
// import 'prismjs/themes/prism.css'
import 'prism-themes/themes/prism-vs.css'
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FileStore} from "../types";
import FilesNavigation from "./generator/FilesNavigation";
import SidebarSection from "./generator/SidebarSection";

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
    const [files, setFiles] = useState<FileStore>({})

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

    useEffect(() => {
        const data: FileStore = {};
        const writer = async (dir: string, content: string): Promise<void> => {
            data[dir.substring(1)] = content;
            return Promise.resolve()
        }
        // setOutput(builder.toString())
        builder.write('', writer).then(() => setFiles(data));
    }, [builder, setFiles, setOutput])

    useEffect(() => {
        Prism.highlightAll();
    })

    const createZip = useCallback(async () => {
        const zip = new JSZip();

        for (let fileName in files) {
            zip.file(fileName, files[fileName]);
        }

        const zipContent = await zip.generateAsync({type: "blob"})
        saveAs(zipContent, "types.zip")
    }, [builder])

    const createFile = useCallback(async () => {
        const file = new Blob([output], {type: "text/plain;charset=utf-8"})
        saveAs(file, "types.ts")
    }, [output])

    const selectFile = (fileName: string) => setOutput(files[fileName])

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

                <SidebarSection title={'Files'}>
                    <FilesNavigation files={Object.keys(files)} onSelect={selectFile}/>
                </SidebarSection>

                <SidebarSection title={'Downloads'}>
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
                </SidebarSection>

                <SidebarSection title={'Project Info'}>
                    <Typography>
                        <Paragraph>
                            Use <a
                            target={'_top'}
                            href={'https://github.com/contentful-labs/cf-content-types-generator'}>CLI</a> version to
                            integrate directly with your workflow.
                        </Paragraph>
                        <Paragraph>
                            Version <code>{require('../../package.json').version}</code>
                        </Paragraph>
                    </Typography>
                </SidebarSection>

            </Workbench.Sidebar>
        </Workbench>
    );
};

export default Page;
