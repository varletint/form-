import React, { type InputHTMLAttributes } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId =
      id ||
      Array.from({ length: 8 }, () => Math.random().toString(36)[2]).join("");

    return (
      <div className='flex flex-col space-y-1.5 w-full'>
        <label
          htmlFor={inputId}
          className='text-sm font-medium text-gray-200 transition-colors pointer-events-none'>
          {label}
        </label>
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "flex h-10 w-full rounded-md border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] px-3 py-2 text-sm text-white transition-all",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-gray-500",
            "focus:outline-none focus:ring-1 focus:ring-[#6d28d9] focus:border-[#6d28d9] focus:bg-[rgba(255,255,255,0.06)]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus:ring-red-500 focus:border-red-500",
            className
          )}
          {...props}
        />
        {error && <p className='text-xs text-red-500 mt-1'>{error}</p>}
        {helperText && !error && (
          <p className='text-xs text-gray-400 mt-1'>{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
