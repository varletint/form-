import React, { type SelectHTMLAttributes } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, error, helperText, id, ...props }, ref) => {
    const selectId =
      id ||
      Array.from({ length: 8 }, () => Math.random().toString(36)[2]).join("");

    return (
      <div className='flex flex-col space-y-1.5 w-full'>
        <label
          htmlFor={selectId}
          className='text-sm font-medium text-gray-200 transition-colors pointer-events-none'>
          {label}
        </label>
        <div className='relative'>
          <select
            id={selectId}
            ref={ref}
            className={cn(
              "flex h-10 w-full appearance-none rounded-md border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] px-3 py-2 text-sm text-white transition-all",
              "focus:outline-none focus:ring-1 focus:ring-[#6d28d9] focus:border-[#6d28d9] focus:bg-[rgba(255,255,255,0.06)]",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-red-500 focus:ring-red-500 focus:border-red-500",
              className
            )}
            {...props}>
            <option value='' disabled className='bg-gray-900 text-gray-400'>
              Select an option...
            </option>
            {options.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                className='bg-gray-900 text-white'>
                {opt.label}
              </option>
            ))}
          </select>
          {/* Custom Dropdown Arrow */}
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400'>
            <svg
              className='h-4 w-4 fill-current'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'>
              <path d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' />
            </svg>
          </div>
        </div>
        {error && <p className='text-xs text-red-500 mt-1'>{error}</p>}
        {helperText && !error && (
          <p className='text-xs text-gray-400 mt-1'>{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
