import React, { useState } from "react";
import { Input } from "../common/Input";
import { Select } from "../common/Select";
import { Checkbox } from "../common/Checkbox";
import { Button } from "../common/Button";
import { Save, Send } from "lucide-react";

interface DynamicFormProps {
  answers: Record<string, string | boolean | undefined>;
  updateAnswers: (
    answers: Record<string, string | boolean | undefined>
  ) => void;
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const fullName = answers.fullName;
    const email = answers.email;

    if (!fullName || (typeof fullName === "string" && !fullName.trim()))
      newErrors.fullName = "Full Name is required";
    if (!email || (typeof email === "string" && !email.trim()))
      newErrors.email = "Email Address is required";
    else if (
      typeof email === "string" &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
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

  const handleChange = (field: string, value: string | boolean) => {
    updateAnswers({ [field]: value });
    if (errors[field]) {
      const next = { ...errors };
      delete next[field];
      setErrors(next);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-8'>
      {/* Server error banner */}
      {serverError && (
        <div className='flex items-start gap-3 p-4 rounded-lg bg-[rgba(239,68,68,0.08)] border border-red-500/30 animate-fade-in'>
          <div className='shrink-0 mt-0.5 w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center'>
            <span className='text-red-400 text-xs font-bold'>!</span>
          </div>
          <p className='text-sm text-red-300 leading-relaxed'>{serverError}</p>
        </div>
      )}

      {/* Section: Personal Info */}
      <div className='space-y-2 relative z-30'>
        <h3 className='text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4'>
          Personal Information
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <div className='animate-fade-in-up stagger-1'>
            <Input
              label='Full Name'
              placeholder='Jane Doe'
              value={(answers.fullName as string) || ""}
              onChange={(e) => handleChange("fullName", e.target.value)}
              error={errors.fullName}
              required
            />
          </div>
          <div className='animate-fade-in-up stagger-2'>
            <Input
              label='Email Address'
              type='email'
              placeholder='jane@example.com'
              value={(answers.email as string) || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              error={errors.email}
              required
            />
          </div>
        </div>
      </div>

      {/* Section: Role */}
      <div className='space-y-2 relative z-20'>
        <h3 className='text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4'>
          Professional Details
        </h3>
        <div className='animate-fade-in-up stagger-3'>
          <Select
            label='Primary Role'
            value={(answers.role as string) || ""}
            onChange={(val: string) => handleChange("role", val)}
            error={errors.role}
            options={[
              { value: "developer", label: "Software Developer" },
              { value: "designer", label: "UI/UX Designer" },
              { value: "product", label: "Product Manager" },
              { value: "data", label: "Data Scientist" },
              { value: "devops", label: "DevOps Engineer" },
              { value: "other", label: "Other" },
            ]}
          />
        </div>
      </div>

      {/* Section: Preferences */}
      <div className='space-y-2 relative z-10'>
        <h3 className='text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4'>
          Preferences
        </h3>
        <div className='animate-fade-in-up stagger-4'>
          <Checkbox
            label='Subscribe to our newsletter'
            description='Weekly curated insights. No spam, unsubscribe anytime.'
            checked={(answers.subscribe as boolean) || false}
            onChange={(e) => handleChange("subscribe", e.target.checked)}
          />
        </div>
      </div>

      {/* Footer: Status + Submit */}
      <div className='relative z-0 pt-6 mt-4 border-t border-[rgba(255,255,255,0.06)] flex flex-col sm:flex-row items-center justify-between gap-4'>
        <div className='flex items-center text-xs text-gray-500 min-h-[24px] gap-2'>
          {isSaving ? (
            <span className='flex items-center text-[#6d28d9] font-medium animate-pulse-slow gap-2'>
              <Save className='w-3.5 h-3.5' />
              Saving draft…
            </span>
          ) : lastSaved ? (
            <span className='flex items-center gap-2 text-gray-500'>
              <Save className='w-3.5 h-3.5' />
              Saved at {lastSaved.toLocaleTimeString()}
            </span>
          ) : (
            <span className='flex items-center gap-2'>
              <Save className='w-3.5 h-3.5' />
              Auto-saves as you type
            </span>
          )}
        </div>

        <Button
          type='submit'
          size='lg'
          isLoading={isSubmitting}
          className='w-full sm:w-auto min-w-[160px] gap-2'>
          <Send className='w-4 h-4' />
          Submit Form
        </Button>
      </div>
    </form>
  );
};
