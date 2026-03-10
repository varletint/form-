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
        "glass-panel w-full max-w-2xl mx-auto p-6 md:p-8 flex flex-col",
        className
      )}>
      {(title || description) && (
        <div className='mb-6 border-b border-[rgba(255,255,255,0.1)] pb-4'>
          {title && (
            <h2 className='text-2xl font-bold text-white mb-2'>{title}</h2>
          )}
          {description && <p className='text-gray-400'>{description}</p>}
        </div>
      )}
      <div className='flex-1'>{children}</div>
    </div>
  );
};
