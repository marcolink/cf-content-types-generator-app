import {CheckboxField, FieldGroup} from "@contentful/forma-36-react-components";
import * as React from "react";
import {pullAt} from "lodash";
import {Flag} from "./useBuilder";

type Props = {
    onSelect: (flags: Flag[]) => void;
    selected: Flag[]
};

const useFlagsToggle = (flag: Flag, selected: Flag[], onSelect: (flags: Flag[]) => void) => {
    return () => {
        if (selected.includes(flag)) {
            pullAt(selected, [selected.indexOf(flag)])
        } else {
            selected.push(flag)
        }
        onSelect(selected)
    }
}

const FlagsConfiguration: React.FC<Props> = ({onSelect, selected}) => {
    const toggleLocalized = useFlagsToggle('localized', [...selected], onSelect);
    const toggleAnnotated = useFlagsToggle('annotated', [...selected], onSelect);
    return (
        <div>
            <FieldGroup>
                <CheckboxField
                    labelText="Annotated (JSDoc)"
                    helpText="Annotate types with additional information"
                    name="annotated"
                    onChange={toggleAnnotated}
                    checked={selected.includes('annotated')}
                    value={'checked'}
                    id="annotated"
                />
                <CheckboxField
                    labelText="Localized"
                    helpText="Add types for localized fields and entries"
                    name="localized"
                    onChange={toggleLocalized}
                    checked={selected.includes('localized')}
                    value={'checked'}
                    id="localized"
                />
            </FieldGroup>
        </div>
    );
};

export default FlagsConfiguration;
