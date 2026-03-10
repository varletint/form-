import React, { useState, useEffect } from "react";
import { Input } from "../common/Input";
import { Select } from "../common/Select";
import { Checkbox } from "../common/Checkbox";
import { Button } from "../common/Button";

interface DynamicFormProps {
  answers: Record<string, any>;
  updateAnswers: (answers: Record<string, any>) => void;
  onSubmit: () => Promise<boolean>;
  isSaving: boolean;
  isSubmitting: boolean;
  lastSaved: Date | null;
  serverError: string | null;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  answers,
  updateAnswers,
  onSubmit,
  isSaving,
  isSubmitting,
  lastSaved,
  serverError,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Real-time validation could go here, but we'll stick to validating on submit for simplicity,
  // or simple HTML required validation.

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!answers.fullName?.trim()) newErrors.fullName = "Full Name is required";
    if (!answers.email?.trim()) newErrors.email = "Email Address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!answers.role) newErrors.role = "Please select a role";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      await onSubmit();
    }
  };

  const handleChange = (field: string, value: any) => {
    updateAnswers({ [field]: value });
    // Clear error for the field being typed in
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined } as any));
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6 animate-fade-in'>
      {serverError && (
        <div className='p-3 mb-6 rounded-md bg-[rgba(239,68,68,0.1)] border border-red-500 text-red-400 text-sm'>
          {serverError}
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Input
          label='Full Name'
          placeholder='Jane Doe'
          value={answers.fullName || ""}
          onChange={(e) => handleChange("fullName", e.target.value)}
          error={errors.fullName}
          required
        />
        <Input
          label='Email Address'
          type='email'
          placeholder='jane@example.com'
          value={answers.email || ""}
          onChange={(e) => handleChange("email", e.target.value)}
          error={errors.email}
          required
        />
      </div>

      <Select
        label='Primary Role'
        value={answers.role || ""}
        onChange={(e) => handleChange("role", e.target.value)}
        error={errors.role}
        options={[
          { value: "developer", label: "Software Developer" },
          { value: "designer", label: "UI/UX Designer" },
          { value: "product", label: "Product Manager" },
          { value: "other", label: "Other" },
        ]}
      />

      <div className='pt-2'>
        <Checkbox
          label='Subscribe to our newsletter'
          description="We'll only send you the good stuff. No spam, ever."
          checked={answers.subscribe || false}
          onChange={(e) => handleChange("subscribe", e.target.checked)}
        />
      </div>

      <div className='pt-6 mt-6 border-t border-[rgba(255,255,255,0.1)] flex items-center justify-between'>
        <div className='flex items-center text-xs text-gray-400 min-h-[20px]'>
          {isSaving ? (
            <span className='flex items-center text-[#6d28d9] font-medium animate-pulse-slow'>
              <span className='w-2 h-2 rounded-full bg-[#6d28d9] mr-2'></span>
              Autosaving draft...
            </span>
          ) : lastSaved ? (
            <span className='text-gray-500'>
              Last saved: {lastSaved.toLocaleTimeString()}
            </span>
          ) : (
            <span>Draft will Auto-save as you type</span>
          )}
        </div>

        <Button
          type='submit'
          size='lg'
          isLoading={isSubmitting}
          className='w-full md:w-auto min-w-[140px]'>
          Submit Form
        </Button>
      </div>
    </form>
  );
};
