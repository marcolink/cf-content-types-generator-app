import {ContentType} from "@contentful/app-sdk";
import {
    CFDefinitionsBuilder,
    ContentTypeRenderer,
    DefaultContentTypeRenderer,
    LocalizedContentTypeRenderer, TypeGuardRenderer, V10ContentTypeRenderer
} from "cf-content-types-generator";
import {V10TypeGuardRenderer} from "cf-content-types-generator/lib/renderer/type/v10-type-guard-renderer";

import {UserProps} from "contentful-management/dist/typings/entities/user";
import {useMemo} from "react";
import {useJsDocRenderer} from "./useJsDocRenderer";

export type Flag = 'localized' | 'jsdoc' | 'typeguard'

type UseBuilderProps = {
    contentTypes: ContentType[]
    flags: Flag[]
    users: UserProps[],
    isV10: boolean
}

export const useBuilder = ({contentTypes = [], flags = [], users = [], isV10 = false}: UseBuilderProps) => {
    const jsDocRenderer = useJsDocRenderer({users})

    return useMemo(() => {
        const renderers: ContentTypeRenderer[] = [isV10 ? new V10ContentTypeRenderer() : new DefaultContentTypeRenderer()];
        if (flags.includes('localized') && !isV10) {
            renderers.push(new LocalizedContentTypeRenderer());
        }
        if (flags.includes('typeguard')) {
            renderers.push(isV10 ? new V10TypeGuardRenderer() : new TypeGuardRenderer());
        }
        if (flags.includes('jsdoc')) {
            renderers.push(jsDocRenderer);
        }
        const builder = new CFDefinitionsBuilder(renderers)
        // @ts-ignore
        builder.appendTypes(contentTypes)
        return builder;

    }, [contentTypes, flags, jsDocRenderer, isV10])
}
