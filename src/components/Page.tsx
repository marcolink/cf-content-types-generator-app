import {PageExtensionSDK} from '@contentful/app-sdk';
import {Button, CopyButton, Paragraph, Typography, Workbench} from '@contentful/forma-36-react-components';
import {css} from "emotion";

import {saveAs} from 'file-saver';
import JSZip from 'jszip'
// import 'prismjs/themes/prism.css'
import 'prism-themes/themes/prism-vs.css'
import Prism from 'prismjs';
import React, {useCallback, useEffect, useState} from 'react';
import FilesNavigation from "./generator/FilesNavigation";
import SidebarSection from "./generator/SidebarSection";
import {useMultiFileContent} from "./generator/useMulitFileContent";
import {useSingleFileContent} from "./generator/useSingleFileContent";

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
    }),
    copyButton: css({
        float: 'right',
        marginBottom: '-20px',
        marginLeft: '-1px'
    })
}

const SINGLE_FILE_NAME = 'content-types.ts';

interface PageProps {
    sdk: PageExtensionSDK;
}

const Page: React.FC<PageProps> = ({sdk}) => {
    const [output, setOutput] = useState('')
    const [selectedFile, setSelectedFile] = useState<string | undefined>()

    const files = useMultiFileContent(sdk.space)
    const singleFileContent = useSingleFileContent(sdk.space)

    // navigate
    useEffect(() => {
        if (selectedFile === SINGLE_FILE_NAME) {
            setOutput(singleFileContent)
        } else if (selectedFile && files[selectedFile]) {
            setOutput(files[selectedFile])
        } else {
            setOutput('')
        }
    }, [setOutput, selectedFile])

    useEffect(() => {
        Prism.highlightAll();
    })

    const createZip = useCallback(async () => {
        const zip = new JSZip();
        for (let fileName in files) {
            zip.file(fileName, files[fileName]);
        }
        const zipContent = await zip.generateAsync({type: "blob"})
        saveAs(zipContent, "content-types.zip")
    }, [files])

    const createFile = useCallback(async () => {
        const content = new Blob([singleFileContent], {type: "text/plain;charset=utf-8"})
        saveAs(content, SINGLE_FILE_NAME)
    }, [output])

    return (
        <Workbench>
            <Workbench.Header
                title={'Typescript - Content Types'}
                description={'Generate TS types based on content types'}
            />
            <Workbench.Content type={"full"}>
                <CopyButton className={styles.copyButton} copyValue={output}/>
                <pre><code className={'lang-typescript'}>{output}</code></pre>
            </Workbench.Content>
            <Workbench.Sidebar position="right">

                <SidebarSection title={'single File'}>
                    <FilesNavigation selected={selectedFile} files={[SINGLE_FILE_NAME]}
                                     onSelect={setSelectedFile}/>
                </SidebarSection>
                <SidebarSection title={'Files'}>
                    <FilesNavigation selected={selectedFile} files={Object.keys(files)}
                                     onSelect={setSelectedFile}/>
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
