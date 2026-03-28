import {CFDefinitionsBuilder} from "cf-content-types-generator";
import {useMemo} from "react";

export const useSingleFileContent = (builder: CFDefinitionsBuilder) => {
    return useMemo(() => builder.toString(), [builder])
}
