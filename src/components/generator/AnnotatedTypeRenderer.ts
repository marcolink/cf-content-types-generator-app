import {BaseContentTypeRenderer} from "cf-content-types-generator/lib/renderer/type";
import {CFContentType} from "cf-content-types-generator/lib/types";
import stripIndent from "strip-indent";

export class AnnotatedTypeRenderer extends BaseContentTypeRenderer {

    private readonly timestamp: Date;

    constructor() {
        super();
        this.timestamp = new Date();
    }

    // @ts-ignore
    public render = (contentType: CFContentType, file) => {

        file.insertStatements(0, stripIndent(`            /*
             * Types for "${contentType.name}" (id:${contentType.sys.id}) 
             * Created at ${this.timestamp} 
             */
        `));

        file.formatText();
    }
}
