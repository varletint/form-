import React, { useId, type InputHTMLAttributes } from "react";
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
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <div className='flex flex-col gap-1.5 w-full group'>
        <label
          htmlFor={inputId}
          className='text-sm font-medium text-gray-300 group-focus-within:text-[#a78bfa] transition-colors duration-200'>
          {label}
        </label>
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "flex h-11 w-full rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] px-4 py-2.5 text-sm text-white transition-all duration-200",
            "placeholder:text-gray-600",
            "hover:border-[rgba(255,255,255,0.18)] hover:bg-[rgba(255,255,255,0.05)]",
            "focus:outline-none focus:ring-2 focus:ring-[#6d28d9]/40 focus:border-[#6d28d9] focus:bg-[rgba(255,255,255,0.06)]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error &&
              "border-red-500/60 focus:ring-red-500/30 focus:border-red-500",
            className
          )}
          {...props}
        />
        {error && (
          <p className='text-xs text-red-400 mt-0.5 flex items-center gap-1'>
            <span className='inline-block w-1 h-1 rounded-full bg-red-400' />
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className='text-xs text-gray-500 mt-0.5'>{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
