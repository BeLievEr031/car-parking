import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "danger" | "outline";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
    iconLeft?: React.ElementType;
    iconRight?: React.ElementType;
}

const Button: React.FC<ButtonProps> = ({
    variant = "primary",
    size = "md",
    isLoading = false,
    iconLeft: IconLeft,
    iconRight: IconRight,
    children,
    className = "",
    disabled,
    ...props
}) => {
    // Define button styles based on variant
    const baseStyles = "flex items-center justify-center font-medium rounded-lg transition duration-200";
    const variantStyles = {
        primary: "bg-blue-500 text-white hover:bg-blue-600",
        secondary: "bg-gray-500 text-white hover:bg-gray-600",
        danger: "bg-red-500 text-white hover:bg-red-600",
        outline: "border border-gray-500 text-gray-700 hover:bg-gray-100",
    };

    // Define button sizes
    const sizeStyles = {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-5 py-3 text-lg",
    };

    return (
        <button
            className={clsx(
                baseStyles,
                variantStyles[variant],
                sizeStyles[size],
                disabled || isLoading ? "opacity-50 cursor-not-allowed" : "",
                className
            )}
            disabled={disabled || isLoading}
            {...props}
        >
            {/* Left Icon */}
            {IconLeft && <IconLeft className="w-5 h-5 mr-2" />}

            {/* Button Text */}
            {isLoading ? "Submitting.." : children}

            {/* Right Icon */}
            {IconRight && <IconRight className="w-5 h-5 ml-2" />}
        </button>
    );
};

export default Button;
