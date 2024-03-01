import {Badge, Checkbox} from "@contentful/f36-components";
import {pullAt} from "lodash";
import * as React from "react";
import {Flag} from "./useBuilder";

type Props = {
    onSelect: (flags: Flag[]) => void;
    selected: Flag[],
    isV10: boolean
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

const FlagsConfiguration: React.FC<Props> = ({onSelect, selected, isV10}) => {
    const toggleLocalized = useFlagsToggle('localized', [...selected], onSelect);
    const toggleJSDoc = useFlagsToggle('jsdoc', [...selected], onSelect);
    const toggleTypeGuard = useFlagsToggle('typeguard', [...selected], onSelect);
    const toggleResponseTypes = useFlagsToggle('response-types', [...selected], onSelect);
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
                isChecked={isV10 || selected.includes('localized')}
                isDisabled={isV10}
                value={'checked'}
                id="localized"
            >Localized</Checkbox>
            <Checkbox
                title="Type Guard"
                helpText="type guard functions"
                name="typeguard"
                onChange={toggleTypeGuard}
                isChecked={selected.includes('typeguard')}
                value={'checked'}
                id="typeguard"
            >Type Guards</Checkbox>
          <Checkbox
            isDisabled={!isV10}
            title="Response Types"
            helpText="Chain modifiers response types"
            name="response-types"
            onChange={toggleResponseTypes}
            isChecked={isV10 && selected.includes('response-types')}
            value={'checked'}
            id="response-types"
          >Response Types <Badge size={'small'}>new</Badge></Checkbox>
        </div>
    );
};

export default FlagsConfiguration;
