import React, { useState, useRef, useEffect, useId } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChevronDown, Check } from "lucide-react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  id?: string;
  className?: string;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    { className, label, value, onChange, options, error, helperText, id },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const generatedId = useId();

    const selectId = id || generatedId;

    const selectedOption = options.find((opt) => opt.value === value);

    // Close when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleSelect = (val: string) => {
      onChange(val);
      setIsOpen(false);
    };

    return (
      <div className='flex flex-col gap-1.5 w-full group' ref={containerRef}>
        <label
          htmlFor={selectId}
          className={cn(
            "text-sm font-medium transition-colors duration-200",
            isOpen
              ? "text-[#a78bfa]"
              : "text-gray-300 group-focus-within:text-[#a78bfa]"
          )}>
          {label}
        </label>

        <div className='relative' ref={ref}>
          {/* Trigger */}
          <button
            type='button'
            id={selectId}
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "flex items-center justify-between h-11 w-full rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] px-4 py-2.5 text-sm transition-all duration-200 cursor-pointer",
              "hover:border-[rgba(255,255,255,0.18)] hover:bg-[rgba(255,255,255,0.05)]",
              "focus:outline-none focus:ring-2 focus:ring-[#6d28d9]/40 focus:border-[#6d28d9] focus:bg-[rgba(255,255,255,0.06)]",
              isOpen &&
                "ring-2 ring-[#6d28d9]/40 border-[#6d28d9] bg-[rgba(255,255,255,0.06)]",
              error &&
                "border-red-500/60 focus:ring-red-500/30 ring-red-500/30 focus:border-red-500",
              className
            )}>
            <span
              className={cn(
                "block truncate",
                !selectedOption && "text-gray-500"
              )}>
              {selectedOption ? selectedOption.label : "Select an option…"}
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-gray-500 transition-transform duration-200",
                isOpen && "rotate-180 text-[#a78bfa]"
              )}
            />
          </button>

          {/* Dropdown Menu */}
          <div
            className={cn(
              "absolute z-100 mt-2 w-full rounded-lg border border-[rgba(255,255,255,0.1)] bg-[#0a0b10] py-1 shadow-2xl shadow-black origin-top transition-all duration-200 ease-out",
              isOpen
                ? "opacity-100 scale-100 visible"
                : "opacity-0 scale-95 invisible"
            )}>
            <ul className='max-h-60 overflow-auto scrollbar-thin scrollbar-thumb-[rgba(255,255,255,0.1)] scrollbar-track-transparent py-1'>
              {options.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <li
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className={cn(
                      "relative flex cursor-pointer select-none items-center py-2.5 pl-10 pr-4 text-sm outline-none transition-colors",
                      "hover:bg-[rgba(109,40,217,0.15)] hover:text-white",
                      isSelected
                        ? "text-white bg-[rgba(109,40,217,0.1)]"
                        : "text-gray-300"
                    )}>
                    <span
                      className={cn(
                        "block truncate",
                        isSelected ? "font-semibold" : "font-normal"
                      )}>
                      {opt.label}
                    </span>
                    {isSelected && (
                      <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-[#a78bfa]'>
                        <Check className='h-4 w-4' />
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
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
