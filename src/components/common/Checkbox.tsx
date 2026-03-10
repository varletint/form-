import React, { type InputHTMLAttributes } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, id, ...props }, ref) => {
    const inputId =
      id ||
      Array.from({ length: 8 }, () => Math.random().toString(36)[2]).join("");

    return (
      <div className='flex items-start space-x-3 w-full group'>
        <div className='flex h-5 items-center mt-0.5'>
          <input
            id={inputId}
            type='checkbox'
            ref={ref}
            className={cn(
              "h-4 w-4 rounded border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.03)] text-[#6d28d9] transition-all",
              "focus:ring-2 focus:ring-[#6d28d9] focus:ring-offset-1 focus:ring-offset-[#13151f]",
              "hover:border-[#6d28d9] hover:bg-[rgba(255,255,255,0.08)] cursor-pointer",
              error && "border-red-500 focus:ring-red-500 text-red-600",
              className
            )}
            {...props}
          />
        </div>
        <div className='flex flex-col'>
          <label
            htmlFor={inputId}
            className='text-sm font-medium text-gray-200 cursor-pointer group-hover:text-white transition-colors'>
            {label}
          </label>
          {description && (
            <p className='text-xs text-gray-400 mt-1'>{description}</p>
          )}
          {error && <p className='text-xs text-red-500 mt-1'>{error}</p>}
        </div>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
