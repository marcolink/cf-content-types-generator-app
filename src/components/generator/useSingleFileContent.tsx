import {SpaceAPI} from "@contentful/app-sdk/dist/types";
import {useMemo} from "react";
import {useBuilder} from "./useBuilder";

export const useSingleFileContent = (api: SpaceAPI) => {
    const builder = useBuilder(api);
    return useMemo(() => builder.toString(), [builder])
}
