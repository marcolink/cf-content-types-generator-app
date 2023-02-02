import {SpaceAPI} from "@contentful/app-sdk/dist/types";
import CFDefinitionsBuilder from "cf-content-types-generator";
import {
    ContentTypeRenderer,
    DefaultContentTypeRenderer,
    LocalizedContentTypeRenderer
} from "cf-content-types-generator/lib/renderer/type";
import {Field} from "contentful";
import {useMemo} from "react";

export type Flag = 'localized'

export const useBuilder = (api: SpaceAPI, flags: Flag[] = []) => {
    return useMemo(() => {
        const contentTypes = api.getCachedContentTypes();

        const renderers: ContentTypeRenderer[] = [new DefaultContentTypeRenderer()];
        if (flags.includes('localized')) {
            renderers.push(new LocalizedContentTypeRenderer());
        }

        const builder = new CFDefinitionsBuilder(renderers)
        contentTypes.forEach(contentType => {
            builder.appendType({
                sys: contentType.sys,
                fields: (contentType.fields as Field[]),
                name: contentType.name
            })
        })
        return builder;
    }, [api, flags])
}
