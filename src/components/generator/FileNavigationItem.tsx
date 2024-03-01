import {TextLink} from "@contentful/f36-components";
import tokens from "@contentful/f36-tokens";
import {css} from "emotion";
import * as React from "react";

const styles = {
  link: css({
    marginBottom: tokens.fontSizeS,
    fontFamily: 'monospace',
    fontSize: 'small'
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
      <TextLink
        variant={selected ? "positive" : 'primary'}
        className={styles.link}
        onClick={() => onSelect(file)}
      >{file}</TextLink>
    </div>
  );
};

export default FileNavigationItem;
