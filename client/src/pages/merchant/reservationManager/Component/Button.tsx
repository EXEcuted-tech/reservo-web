import React, { ButtonHTMLAttributes, FC } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {


    children?: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ className, disabled, children, ...props }) => {

    return (
        <button className={className} disabled={disabled} {...props}>{children}</button>
    );
}

export default Button