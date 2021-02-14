import {SpaceAPI} from "@contentful/app-sdk";
import CFDefinitionsBuilder from "cf-content-types-generator/lib/cf-definitions-builder";
import {Field} from "contentful";
import * as React from "react";
import {useEffect, useState} from "react";

type Props = {
    api: SpaceAPI
};

const GeneratorView: React.FC<Props> = ({api}) => {

    const [output, setOutput] = useState('')

    useEffect(() => {
        const contentTypes = api.getCachedContentTypes();
        const stringContent = new CFDefinitionsBuilder()
        contentTypes.forEach(contentType => {
            stringContent.appendType({
                id: contentType.sys.id,
                sys: contentType.sys,
                fields: (contentType.fields as Field[]),
                name: contentType.name
            })
        })
        setOutput(stringContent.toString)
    }, [api, setOutput])

    return (
        <pre>{output}</pre>
    );
};

export default GeneratorView;
