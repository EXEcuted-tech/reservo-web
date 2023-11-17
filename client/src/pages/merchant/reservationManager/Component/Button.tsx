import React, { ButtonHTMLAttributes, FC } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

    children?: React.ReactNode;
    ref?: React.MutableRefObject<number>

}

const Button: FC<ButtonProps> = ({ className, ref, children, ...props }) => {

    return (
        <button className={className} {...props}>{children}</button>
    );
}

export default Button