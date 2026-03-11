import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FormCardProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export const FormCard: React.FC<FormCardProps> = ({
  children,
  title,
  description,
  className,
}) => {
  return (
    <div
      className={cn(
        "glass-panel w-full max-w-2xl mx-auto p-8 md:p-10 flex flex-col",
        "hover:border-[rgba(255,255,255,0.15)] transition-all duration-300",
        className
      )}>
      {(title || description) && (
        <div className='mb-8 pb-6 border-b border-[rgba(255,255,255,0.08)]'>
          {title && (
            <h2 className='text-2xl font-bold text-white mb-2 tracking-tight'>
              {title}
            </h2>
          )}
          {description && (
            <p className='text-[15px] text-gray-400 leading-relaxed'>
              {description}
            </p>
          )}
        </div>
      )}
      <div className='flex-1'>{children}</div>
    </div>
  );
};
