import * as React from 'react';

export interface Checkbox extends React.ClassAttributes<Checkbox> {
    className?: string;
    style?: React.CSSProperties;
    checked: boolean;
    /**
     * The checkbox label's text.
     */
    label?: string;
    /**
     * The label's class name.
     */
    labelClassName?: string;
    /**
     * CSS Properties for the label.
     */
    labelStyle?: React.CSSProperties;
    /**
     * The control's value.
     */
    value?: string;
    /**
     * An optional event handler that gets called when the value has changed. Return false to prevent the value change.
     */
    onValueChange?: (newValue: boolean) => void | false;
}

export interface CheckboxState {
    checked: boolean;
}

export class Checkbox extends React.Component<Checkbox, Partial<CheckboxState>> {
    constructor(props: Checkbox, context: any) {
        super(props, context);

        this.state = {
            checked: props.checked || false
        }
    }

    state: CheckboxState;

    private onChange(e: React.FormEvent<HTMLInputElement>) {
        const checked = e.currentTarget.checked;

        if (this.props.onValueChange) {
            const result = this.props.onValueChange(checked);

            if (result === false) {
                // Handler indicates that we should not update value.

                return;
            }
        }

        this.setState({ checked });
    }

    /**
     * Gets the current value.
     */
    getValue(): boolean {
        return this.state.checked || this.props.checked || false;
    }

    render() {
        const { onValueChange, ...props } = this.props;
        const { checked, ...state } = this.state;


        return (
            <label
                style={props.labelStyle}
                className={props.labelClassName}>
                <input
                    type="checkbox"
                    style={props.style}
                    className={props.className}
                    onChange={e => this.onChange(e)}
                    checked={checked}
                    value={props.value} />
                {props.label}
            </label>
        )
    }
}

export default Checkbox;