import {SpaceAPI} from "@contentful/app-sdk/dist/types";
import CFDefinitionsBuilder from "cf-content-types-generator/lib/cf-definitions-builder";
import {Field} from "contentful";
import {useMemo} from "react";

export const useBuilder = (api: SpaceAPI) => {
    return useMemo(() => {
        const contentTypes = api.getCachedContentTypes();
        const builder = new CFDefinitionsBuilder()
        contentTypes.forEach(contentType => {
            builder.appendType({
                id: contentType.sys.id,
                sys: contentType.sys,
                fields: (contentType.fields as Field[]),
                name: contentType.name
            })
        })
        return builder;
    }, [api])
}
