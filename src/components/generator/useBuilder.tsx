import {ContentType} from "@contentful/app-sdk";
import {
    CFDefinitionsBuilder,
    ContentTypeRenderer,
    ResponseTypeRenderer,
    type Renderer,
    TypeGuardRenderer
} from "cf-content-types-generator";

import {UserProps} from "contentful-management/dist/typings/entities/user";
import {useMemo} from "react";
import {useJsDocRenderer} from "./useJsDocRenderer";

export type Flag = 'localized' | 'jsdoc' | 'typeguard' | 'response-types'

type UseBuilderProps = {
    contentTypes: ContentType[]
    flags: Flag[]
    users: UserProps[],
}

export const useBuilder = ({contentTypes = [], flags = [], users = []}: UseBuilderProps) => {
    const jsDocRenderer = useJsDocRenderer({users})

    return useMemo(() => {
        const renderers: Renderer[] = [new ContentTypeRenderer()];
        if (flags.includes('typeguard')) {
            renderers.push(new TypeGuardRenderer());
        }
        if (flags.includes('jsdoc')) {
            renderers.push(jsDocRenderer);
        }
        if (flags.includes('response-types')) {
            renderers.push(new ResponseTypeRenderer());
        }
        const builder = new CFDefinitionsBuilder(renderers)
        // @ts-ignore
        builder.appendTypes(contentTypes)
        return builder;

    }, [contentTypes, flags, jsDocRenderer])
}
