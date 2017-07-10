import * as React from 'react';

export interface SelectProps<ValueType extends string> extends React.ClassAttributes<Select<ValueType>> {
    className?: string;
    style?: React.CSSProperties;
    /**
     * The control's default value.
     */
    defaultValue: ValueType;
    /**
     * A string array of value options.
     */
    options: ValueType[];
    /**
     * An optional event handler that gets called when the value has changed. Return false to prevent the value change.
     */
    onValueChange?: (newValue: ValueType) => void | false;
}

interface IState<ValueType extends string> {
    value: ValueType;
}

export class Select<ValueType extends string> extends React.Component<SelectProps<ValueType>, Partial<IState<ValueType>>> {
    constructor(props: SelectProps<ValueType>, context: any) {
        super(props, context);

        this.state = {
            value: props.defaultValue
        }
    }

    state: IState<ValueType>;

    private onChange(e: React.FormEvent<HTMLSelectElement>) {
        const value = e.currentTarget.value as ValueType;

        if (this.props.onValueChange) {
            const result = this.props.onValueChange(value);

            if (result === false) {
                // Handler indicates that we should not update value.

                return;
            }
        }

        this.setState({ value });
    }

    /**
     * Gets the current value.
     */
    getValue(): string {
        return this.state.value || this.props.defaultValue || "";
    }

    render() {
        const { defaultValue, onValueChange, options, ...props } = this.props;
        const { value, ...state } = this.state;

        return (
            <select
                value={this.getValue()}
                style={props.style}
                className={props.className}
                onChange={e => this.onChange(e)}>
                {options.map(o => <option value={o} key={o}>{o}</option>)}
            </select>
        )
    }
}

export default Select;