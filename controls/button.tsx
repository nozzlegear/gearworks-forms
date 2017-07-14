import * as React from 'react';

export interface ButtonProps {
    className?: string;
    style?: React.CSSProperties;
    /**
     * The button's type. Defaults to 'button'.
     */
    type?: "button" | "submit";
    /**
     * The button's label text.
     */
    label: string;
    /**
     * An optional event handler that gets called when the button is clicked.
     */
    onClick?: (event: React.FormEvent<HTMLButtonElement>) => void;
}

export function Button({ label, onClick, type, ...props }: ButtonProps) {
    return (
        <button
            type={type || "button"}
            onClick={onclick}
            {...props as any}>
            {label}
        </button>
    )
}

export default Button;