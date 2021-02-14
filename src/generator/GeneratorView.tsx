import {AppExtensionSDK} from "@contentful/app-sdk";
import CFDefinitionsBuilder from "cf-content-types-generator/lib/cf-definitions-builder";
import {Field} from "contentful";
import {useEffect} from "react";
import * as React from "react";

type Props = {
    sdk: AppExtensionSDK
};

const GeneratorView: React.FC<Props> = ({sdk}) => {

    useEffect(() => {
        const contentTypes = sdk.space.getCachedContentTypes();
        console.log(contentTypes)
        const stringContent = new CFDefinitionsBuilder()
        /*
        contentTypes.forEach(contentType => {
            stringContent.appendType({
                id: contentType.sys.id,
                sys: contentType.sys,
                fields: (contentType.fields as Field[]),
                name: contentType.name
            })
        })
         */
    }, [sdk])


    return (
        <div>
            Generator
        </div>
    );
};

export default GeneratorView;
