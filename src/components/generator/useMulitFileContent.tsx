import CFDefinitionsBuilder from "cf-content-types-generator/lib/cf-definitions-builder";
import {useEffect, useState} from "react";
import {FileStore} from "../../types";

export const useMultiFileContent = (builder: CFDefinitionsBuilder) => {
    const [files, setFiles] = useState<FileStore>({})
    useEffect(() => {
        const data: FileStore = {};
        const writer = async (dir: string, content: string): Promise<void> => {
            data[dir.substring(1)] = content;
            return Promise.resolve()
        }
        builder.write('', writer).then(() => setFiles(data));
    }, [builder, setFiles])
    return files;
}
