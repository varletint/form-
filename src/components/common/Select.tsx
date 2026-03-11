import React, { type SelectHTMLAttributes } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChevronDown } from "lucide-react";

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
      <div className='flex flex-col gap-1.5 w-full group'>
        <label
          htmlFor={selectId}
          className='text-sm font-medium text-gray-300 group-focus-within:text-[#a78bfa] transition-colors duration-200'>
          {label}
        </label>
        <div className='relative'>
          <select
            id={selectId}
            ref={ref}
            className={cn(
              "flex h-11 w-full appearance-none rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] px-4 py-2.5 pr-10 text-sm text-white transition-all duration-200",
              "hover:border-[rgba(255,255,255,0.18)] hover:bg-[rgba(255,255,255,0.05)]",
              "focus:outline-none focus:ring-2 focus:ring-[#6d28d9]/40 focus:border-[#6d28d9] focus:bg-[rgba(255,255,255,0.06)]",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error &&
                "border-red-500/60 focus:ring-red-500/30 focus:border-red-500",
              className
            )}
            {...props}>
            <option value='' disabled className='bg-[#13151f] text-gray-400'>
              Select an option…
            </option>
            {options.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                className='bg-[#13151f] text-white'>
                {opt.label}
              </option>
            ))}
          </select>
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 group-focus-within:text-[#a78bfa] transition-colors'>
            <ChevronDown className='h-4 w-4' />
          </div>
        </div>
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

Select.displayName = "Select";
