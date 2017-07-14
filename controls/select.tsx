import * as React from 'react';

export interface LabeledSelectOption<ValueType extends string> {
    value: ValueType;
    label: string;
}

export interface SelectProps<ValueType extends string> extends React.ClassAttributes<Select<ValueType>> {
    className?: string;
    style?: React.CSSProperties;
    /**
     * The control's default value.
     */
    defaultValue: LabeledSelectOption<ValueType>;
    /**
     * A string array of value options.
     */
    options: LabeledSelectOption<ValueType>[];
    /**
     * An optional event handler that gets called when the value has changed. Return false to prevent the value change.
     */
    onValueChange?: (newSelection: LabeledSelectOption<ValueType>) => void | false;
}

export interface SelectState<ValueType extends string> {
    selected: LabeledSelectOption<ValueType>;
}

export class Select<ValueType extends string> extends React.Component<SelectProps<ValueType>, Partial<SelectState<ValueType>>> {
    constructor(props: SelectProps<ValueType>, context: any) {
        super(props, context);

        this.state = {
            selected: props.defaultValue
        }
    }

    state: SelectState<ValueType>;

    private findOption(value: ValueType) {
        const filtered = this.props.options.filter(opt => opt.value === value);

        return filtered.length === 0 ? undefined : filtered[0];
    }

    private onChange(e: React.FormEvent<HTMLSelectElement>) {
        const value = e.currentTarget.value as ValueType;
        const selected = this.findOption(value);;

        if (selected === undefined) {
            return false;
        }

        if (this.props.onValueChange) {
            const result = this.props.onValueChange(selected);

            if (result === false) {
                // Handler indicates that we should not update value.

                return;
            }
        }

        this.setState({ selected });
    }

    /**
     * Gets the current value.
     */
    getValue(): LabeledSelectOption<ValueType> | undefined {
        return this.state.selected || this.props.defaultValue || undefined;
    }

    render() {
        const { defaultValue, onValueChange, options, ...props } = this.props;
        const { selected, ...state } = this.state;
        const currentValue = this.getValue() || { label: undefined, value: undefined };

        return (
            <select
                value={currentValue.value}
                style={props.style}
                className={props.className}
                onChange={e => this.onChange(e)}>
                {options.map(o => <option value={o.value} key={o.value}>{o.label}</option>)}
            </select>
        )
    }
}

export default Select;