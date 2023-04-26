import {ContentType} from "@contentful/app-sdk";
import {useSDK} from "@contentful/react-apps-toolkit";
import {JsDocRenderer} from "cf-content-types-generator";
import {
    defaultJsDocRenderOptions,
    JSDocRenderOptions
} from "cf-content-types-generator/lib/renderer/type/js-doc-renderer";
import {UserProps} from "contentful-management/dist/typings/entities/user";
import {useMemo} from "react";
import {JSDocStructure, OptionalKind} from "ts-morph";

type UseJsDocRendererProps = {
    users: UserProps[]
}

export function useJsDocRenderer({users}: UseJsDocRendererProps) {
    const {ids: {space, environment}} = useSDK()

    return useMemo(() => {
        const customRendererOptions: JSDocRenderOptions = {
            renderFieldsDocs: defaultJsDocRenderOptions.renderFieldsDocs,
            renderEntryDocs: ({contentType, name}) => {
                // @ts-ignore
                const jsDoc: OptionalKind<JSDocStructure> = defaultJsDocRenderOptions.renderEntryDocs({
                    contentType,
                    name
                })

                const user = users.find(user => user.sys.id === (contentType as ContentType).sys.updatedBy?.sys.id)

                if (user) {
                    const tag = jsDoc.tags?.find(tag => tag.tagName === 'author')
                    if (tag) {
                        tag.text = `${user.firstName} ${user.lastName}<${user.email}>`
                    }
                }

                jsDoc.tags?.push({
                    tagName: 'link',
                    text: `https://app.contentful.com/spaces/${space}/environments/${environment}/content_types/${contentType.sys.id}`
                })

                return jsDoc;
            },
        };
        return new JsDocRenderer({renderOptions: customRendererOptions});
    }, [space, environment, users])
}
