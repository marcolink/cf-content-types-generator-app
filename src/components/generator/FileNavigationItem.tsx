import {TextLink} from "@contentful/forma-36-react-components";
import tokens from "@contentful/forma-36-tokens";
import {css} from "emotion";
import * as React from "react";

const styles = {
    link: css({
        marginBottom: tokens.fontSizeS
    })
}

type Props = {
    file: string
    onSelect: (file: string) => void;
    selected: boolean;
};

const FileNavigationItem: React.FC<Props> = ({file, onSelect, selected}) => {
    return (
        <div>
            <TextLink linkType={selected ? "positive" : 'primary'} className={styles.link}
                      onClick={() => onSelect(file)}>{file}</TextLink>
        </div>
    );
};

export default FileNavigationItem;
