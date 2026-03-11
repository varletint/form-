import React, { type ButtonHTMLAttributes } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Loader2 } from "lucide-react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0b10] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none";

    const variants = {
      primary:
        "bg-[#6d28d9] hover:bg-[#5b21b6] active:bg-[#4c1d95] text-white focus:ring-[#6d28d9] shadow-[0_0_20px_rgba(109,40,217,0.25)] hover:shadow-[0_0_30px_rgba(109,40,217,0.4)] active:shadow-[0_0_10px_rgba(109,40,217,0.3)]",
      secondary:
        "bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] text-white border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.18)] focus:ring-[rgba(255,255,255,0.2)]",
      danger:
        "bg-red-600 hover:bg-red-700 active:bg-red-800 text-white focus:ring-red-600",
      ghost:
        "bg-transparent hover:bg-[rgba(255,255,255,0.05)] text-gray-300 hover:text-white",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-10 px-5 text-sm gap-2",
      lg: "h-12 px-6 text-base gap-2",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}>
        {isLoading && <Loader2 className='w-4 h-4 animate-spin' />}
        {!isLoading && children}
        {isLoading && <span className='opacity-0'>{children}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
