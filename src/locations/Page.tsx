import {
    Checkbox,
    CopyButton,
    GlobalStyles,
    IconButton,
    Paragraph,
    Spinner,
    Typography
} from '@contentful/f36-components';
import {DownloadIcon} from "@contentful/f36-icons";
import {Workbench} from '@contentful/f36-workbench';
import {useCMA, useSDK} from "@contentful/react-apps-toolkit";
import {useQuery} from "@tanstack/react-query";

import {css} from "emotion";

import {saveAs} from 'file-saver';
import JSZip from 'jszip'
import React, {useCallback, useEffect, useState} from 'react';
import FilesNavigation from "../components/generator/FilesNavigation";
import FlagsConfiguration from "../components/generator/FlagsConfiguration";
import SidebarSection from "../components/generator/SidebarSection";
import {Flag, useBuilder} from "../components/generator/useBuilder";
import {useMultiFileContent} from "../components/generator/useMulitFileContent";
import {useSingleFileContent} from "../components/generator/useSingleFileContent";
import {PageAppSDK} from "@contentful/app-sdk";
import {createHighlighter} from "shiki";

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
    marginLeft: '-1px',
    borderTopLeftRadius: '0',
    borderBottomLeftRadius: '0'
  })
}

const SINGLE_FILE_NAME = 'content-types.ts';
const THEME = "github-light"

const Page: React.FC = () => {
  const sdk = useSDK<PageAppSDK>();
  const cma = useCMA();
  const [output, setOutput] = useState('')
  const [selectedFile, setSelectedFile] = useState<string | undefined>(SINGLE_FILE_NAME)
  const [flags, setFlags] = useState<Flag[]>([]);

  const [isV10, setIsV10] = useState(true)

  const {data: contentTypesData} = useQuery({
    queryKey: [sdk.ids.space, sdk.ids.environment, 'content-types'],
    queryFn: () => cma.contentType.getMany({}),
  })

  const {
    data: userData,
    isLoading: isLoadingUsers,
  } = useQuery({
    queryKey: [sdk.ids.space, 'users'],
    queryFn: () => cma.user.getManyForSpace({})
  })

  const builder = useBuilder({
    contentTypes: contentTypesData?.items || [],
    users: userData?.items || [],
    flags,
    isV10
  })

  const files = useMultiFileContent(builder)
  const singleFileContent = useSingleFileContent(builder)

  // navigate
  useEffect(() => {
    if (selectedFile === SINGLE_FILE_NAME) {
      setOutput(singleFileContent)
    } else if (selectedFile && files[selectedFile]) {
      setOutput(files[selectedFile])
    } else {
      setOutput('')
    }
  }, [setOutput, selectedFile, files, singleFileContent])


  const {data: highlighter, isLoading: IsLoadingHighlighter} = useQuery({
    queryKey: ['highlighter'],
    queryFn: async () => {
      return createHighlighter({
        themes: [THEME],
        langs: ['typescript'],
      })
    },
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
  }, [singleFileContent])

  return (
    <>
      <GlobalStyles/>
      <Workbench>
        <Workbench.Header
          title={'Content Types (TS) Generator'}
          description={'Generate Typescript type definitions based on content types'}
        />
        <Workbench.Content type={"full"}>
          {(isLoadingUsers || IsLoadingHighlighter) ? <Spinner>Loading meta data</Spinner> :
            <>
              <CopyButton className={styles.copyButton} value={output}/>
              <div dangerouslySetInnerHTML={{__html: highlighter!.codeToHtml(output, {
                  lang: 'typescript',
                  theme: THEME
                })}}>
              </div>
            </>
          }
        </Workbench.Content>
        <Workbench.Sidebar position="right">

          <SidebarSection title={'Config'} isNew={true}>

            <Checkbox
              title="V10"
              helpText="contentful@v10"
              name="contentful@10"
              onChange={() => setIsV10((value) => !value)}
              isChecked={isV10}
              value={'checked'}
              id="v10"
            >v10</Checkbox>

            <FlagsConfiguration onSelect={setFlags} selected={flags} isV10={isV10}/>
          </SidebarSection>

          <SidebarSection title={'single File'}>
            <FilesNavigation selected={selectedFile} files={[SINGLE_FILE_NAME]}
                             onSelect={setSelectedFile}/>
          </SidebarSection>
          <SidebarSection title={'Files'}>
            <FilesNavigation selected={selectedFile} files={Object.keys(files)}
                             onSelect={setSelectedFile}/>
          </SidebarSection>

          <SidebarSection title={'Downloads'}>
            <IconButton
              aria-label={"Download"}
              variant={'primary'}
              icon={<DownloadIcon/>}
              className={styles.downloadButton}
              onClick={createZip}
              isFullWidth
            >
              Download zip
            </IconButton>
            <Typography>
              <Paragraph>
                Download a zip file including separate files for each content type.
              </Paragraph>
            </Typography>

            <IconButton
              aria-label={"Download"}
              variant={'primary'}
              icon={<DownloadIcon/>}
              className={styles.downloadButton}
              onClick={createFile}
              isFullWidth
            >
              Download file
            </IconButton>
            <Typography>
              <Paragraph>
                Download a single file with all types combined.
              </Paragraph>
            </Typography>
          </SidebarSection>

          <SidebarSection title={'Feedback'}>
            <Typography>
              <Paragraph>
                You have ideas on how to improve this tool or things are not working as expected? Please file a <a
                target={'_top'}
                href={'https://github.com/marcolink/cf-content-types-generator-app/issues'}>Github issue</a>!
              </Paragraph>
            </Typography>
          </SidebarSection>

          <SidebarSection title={'Project Info'}>
            <Typography>

              <Paragraph>
                <strong>Author:</strong> <a
                rel="noopener noreferrer"
                target={'_top'}
                href={'https://github.com/marcolink'}>Marco Link</a>
              </Paragraph>

              <Paragraph>
                Use <a
                rel="noopener noreferrer"
                target={'_blank'}
                href={'https://github.com/contentful-labs/cf-content-types-generator'}>CLI</a> to integrate directly
                with your workflow CI/CD.
              </Paragraph>
            </Typography>
          </SidebarSection>

        </Workbench.Sidebar>
      </Workbench>
    </>
  );
};

export default Page;
