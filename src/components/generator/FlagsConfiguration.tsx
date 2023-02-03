import {Checkbox} from "@contentful/f36-components";
import {pullAt} from "lodash";
import * as React from "react";
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
    const toggleJSDoc = useFlagsToggle('jsdoc', [...selected], onSelect);
    return (
        <div>
            <Checkbox
                title="JSDoc"
                helpText="JSDoc comments"
                name="jsdoc"
                onChange={toggleJSDoc}
                isChecked={selected.includes('jsdoc')}
                value={'checked'}
                id="jsdoc"
            >JSDoc</Checkbox>
            <Checkbox
                title="Localized"
                helpText="localized fields and entries"
                name="localized"
                onChange={toggleLocalized}
                isChecked={selected.includes('localized')}
                value={'checked'}
                id="localized"
            >Localized</Checkbox>
        </div>
    );
};

export default FlagsConfiguration;
