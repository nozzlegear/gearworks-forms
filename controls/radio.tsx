import * as React from 'react';

export interface LabeledRadioOption<ValueType extends string> {
    value: ValueType;
    label: string;
}

export interface SelectProps<ValueType extends string> extends React.ClassAttributes<Select<ValueType>> {
    className?: string;
    style?: React.CSSProperties;
    /**
     * ClassName for the radio group's container div.
     */
    containerClassName?: string;
    /**
     * CSS properties for the radio group's container div.
     */
    containerStyle?: React.CSSProperties;
    /**
     * Required. The name of the radio group.
     */
    groupName: string;
    /**
     * Required. The control's default value.
     */
    defaultValue: LabeledRadioOption<ValueType>;
    /**
     * Required. A string array of value options.
     */
    options: LabeledRadioOption<ValueType>[];
    /**
     * An optional event handler that gets called when the value has changed. Return false to prevent the value change.
     */
    onValueChange?: (newSelection: LabeledRadioOption<ValueType>) => void | false;
}

export interface RadioState<ValueType extends string> {
    selected: LabeledRadioOption<ValueType>;
}

export class Select<ValueType extends string> extends React.Component<SelectProps<ValueType>, Partial<RadioState<ValueType>>> {
    constructor(props: SelectProps<ValueType>, context: any) {
        super(props, context);

        this.state = {
            selected: props.defaultValue
        }
    }

    state: RadioState<ValueType>;

    private findOption(value: ValueType) {
        const filtered = this.props.options.filter(opt => opt.value === value);

        return filtered.length === 0 ? undefined : filtered[0];
    }

    private onChange(e: React.FormEvent<HTMLInputElement>) {
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
    getValue(): LabeledRadioOption<ValueType> | undefined {
        return this.state.selected || this.props.defaultValue || undefined;
    }

    render() {
        const { defaultValue, onValueChange, options, ...props } = this.props;
        const { selected, ...state } = this.state;
        const currentValue = this.getValue() || { label: undefined, value: undefined };

        return (
            <div style={props.containerStyle} className={props.containerClassName}>
                {options.map(o =>
                    <label key={o.value}>
                        <input
                            type="radio"
                            value={o.value}
                            checked={o.value === currentValue.value}
                            style={props.style}
                            className={props.className}
                            onChange={e => this.onChange(e)} />
                        {o.label}
                    </label>
                )}
            </div>
        )
    }
}

export default Select;