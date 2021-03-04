import CFDefinitionsBuilder from "cf-content-types-generator/lib/cf-definitions-builder";
import {useMemo} from "react";

export const useSingleFileContent = (builder: CFDefinitionsBuilder) => {
    return useMemo(() => builder.toString(), [builder])
}
