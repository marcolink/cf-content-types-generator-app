import {ContentType} from "@contentful/app-sdk";
import {
    CFDefinitionsBuilder,
    ContentTypeRenderer,
    DefaultContentTypeRenderer,
    LocalizedContentTypeRenderer
} from "cf-content-types-generator";
import {UserProps} from "contentful-management/dist/typings/entities/user";
import {useMemo} from "react";
import {useJsDocRenderer} from "./useJsDocRenderer";

export type Flag = 'localized' | 'jsdoc'

type UseBuilderProps = {
    contentTypes: ContentType[]
    flags: Flag[]
    users: UserProps[]
}

export const useBuilder = ({contentTypes = [], flags = [], users = []}: UseBuilderProps) => {
    const jsDocRenderer = useJsDocRenderer({users})

    return useMemo(() => {
        const renderers: ContentTypeRenderer[] = [new DefaultContentTypeRenderer()];
        if (flags.includes('localized')) {
            renderers.push(new LocalizedContentTypeRenderer());
        }
        if (flags.includes('jsdoc')) {
            renderers.push(jsDocRenderer);
        }
        const builder = new CFDefinitionsBuilder(renderers)
        // @ts-ignore
        builder.appendTypes(contentTypes)
        return builder;
    }, [contentTypes, users, flags, jsDocRenderer])
}
