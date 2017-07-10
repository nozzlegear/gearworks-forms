import * as React from 'react';

export interface InputProps extends React.ClassAttributes<Input> {
    className?: string;
    style?: React.CSSProperties;
    placeholder?: string;
    /**
     * The type of the input. Defaults to text.
     */
    type?: "text" | "password" | "email" | "date" | "textarea";
    /**
     * The control's default value. Defaults to an empty string.
     */
    defaultValue?: string;
    /**
     * An optional event handler that gets called when the value has changed. Return false to prevent the value change.
     */
    onValueChange?: (newValue: string) => void | false;
}

interface IState {
    value: string;
}

export class Input extends React.Component<InputProps, Partial<IState>> {
    state: IState = {
        value: ""
    }

    private onChange(e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const value = e.currentTarget.value;

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
        const { defaultValue, onValueChange, type, ...props } = this.props;
        const { value, ...state } = this.state;
        const controlProps: React.HTMLProps<HTMLTextAreaElement | HTMLInputElement> = {
            placeholder: props.placeholder,
            className: props.className,
            style: props.style,
            value: this.getValue(),
            onChange: e => this.onChange(e),
        }

        return type === "textarea" ? <textarea {...controlProps} /> : <input type={type || "text"} {...controlProps} />;
    }
}

export default Input;