import {SpaceAPI} from "@contentful/app-sdk/dist/types";
import {useEffect, useState} from "react";
import {FileStore} from "../../types";
import {useBuilder} from "./useBuilder";

export const useMultiFileContent = (api: SpaceAPI) => {
    const builder = useBuilder(api);
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
