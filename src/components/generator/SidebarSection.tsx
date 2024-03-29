import {Subheading} from "@contentful/f36-components";
import {css} from "emotion";
import * as React from "react";
import {PropsWithChildren} from "react";

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
}

type Props = PropsWithChildren<{
    title: string,
    isNew?: boolean
}>;

const SidebarSection: React.FC<Props> = ({title, isNew, children}) => {
    return (
        <>
            <Subheading className={styles.sidebarHeadline}>{title} </Subheading>
            <div>{children}</div>
        </>
    );
};

export default SidebarSection;
