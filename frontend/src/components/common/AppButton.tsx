import React from 'react'


type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    variant: "primary" | "danger" | "secondary";
    className?: string;
}


function AppButton({ children, variant = "primary", className, ...rest }: ButtonProps) {
    const baseStyle = "font-bold py-2 px-4 rounded transition duration-200";
    const variants = {
        primary: "bg-blue-600 hover:bg-blue-800 text-white",
        secondary: "bg-gray-200 hover:bg-gray-400 text-gray-700",
        danger: "bg-gray-200 hover:bg-gray-400 text-red-600",
    };

    return (
        <button className={`${baseStyle} ${variants[variant]} ${className}`} {...rest}>
            {children}
        </button>
    )
}

export default AppButton
