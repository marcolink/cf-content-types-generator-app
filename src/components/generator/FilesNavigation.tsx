import * as React from "react";
import FileNavigationItem from "./FileNavigationItem";

type Props = {
    files: string[],
    onSelect: (file: string) => void;
    selected?: string
};

const FilesNavigation: React.FC<Props> = ({files, onSelect, selected}) => {
    return (
        <div>
            {
                files.map(file => <FileNavigationItem selected={selected === file} key={file} onSelect={onSelect} file={file}/>)
            }
        </div>
    );
};

export default FilesNavigation;
