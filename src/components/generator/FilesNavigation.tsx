import * as React from "react";
import FileNavigationItem from "./FileNavigationItem";

type Props = {
    files: string[],
    onSelect: (file: string) => void;
};

const FilesNavigation: React.FC<Props> = ({files, onSelect}) => {
    return (
        <div>
            {
                files.map(file => <FileNavigationItem key={file} onSelect={onSelect} file={file}/>)
            }
        </div>
    );
};

export default FilesNavigation;
