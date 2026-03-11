import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormSession } from "../hooks/useFormSession";
import { FormCard } from "../components/form/FormCard";
import { DynamicForm } from "../components/form/DynamicForm";
import { Loader2, FileText, Shield, Zap } from "lucide-react";

export const FormFill: React.FC = () => {
  const navigate = useNavigate();
  const {
    answers,
    updateAnswers,
    submitForm,
    isInitializing,
    isSaving,
    isSubmitting,
    error,
    lastSaved,
  } = useFormSession({ autoSaveInterval: 1500 });

  const handleSubmit = async () => {
    const success = await submitForm();
    if (success) {
      navigate("/success");
      return true;
    }
    return false;
  };

  if (isInitializing) {
    return (
      <div className='flex-1 flex flex-col items-center justify-center min-h-screen gap-4'>
        <div className='relative'>
          <div className='absolute inset-0 rounded-full bg-[#6d28d9] opacity-20 blur-xl animate-pulse-slow' />
          <Loader2 className='relative w-10 h-10 text-[#6d28d9] animate-spin' />
        </div>
        <p className='text-gray-400 text-sm font-medium animate-pulse-slow'>
          Initializing your session…
        </p>
      </div>
    );
  }

  return (
    <div className='flex-1 flex flex-col min-h-screen'>
      {/* Hero Header */}
      <header className='pt-16 pb-10 px-4 text-center'>
        <div className='max-w-2xl mx-auto animate-fade-in-down'>
          {/* Badge */}
          <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(109,40,217,0.1)] border border-[rgba(109,40,217,0.25)] text-[#a78bfa] text-xs font-semibold uppercase tracking-widest mb-6'>
            <Zap className='w-3.5 h-3.5' />
            Auto-Saving Enabled
          </div>

          <h1 className='text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-white mb-5 tracking-tight leading-[1.1]'>
            Join the <span className='text-[#6d28d9]'>Dev Program</span>
          </h1>
          <p className='text-base md:text-lg text-gray-400 max-w-xl mx-auto leading-relaxed'>
            Your progress is saved automatically — refresh, close the tab, or
            come back later. Every keystroke is preserved.
          </p>
        </div>
      </header>

      {/* Feature Pills */}
      <div className='flex flex-wrap justify-center gap-3 px-4 mb-10 animate-fade-in stagger-2'>
        <FeaturePill
          icon={<FileText className='w-3.5 h-3.5' />}
          text='Draft Recovery'
        />
        <FeaturePill
          icon={<Shield className='w-3.5 h-3.5' />}
          text='Secure Submission'
        />
        <FeaturePill
          icon={<Zap className='w-3.5 h-3.5' />}
          text='Real-time Sync'
        />
      </div>

      {/* Form Area */}
      <div className='w-full flex-1 px-4 pb-16 animate-fade-in-up stagger-3'>
        <FormCard>
          <DynamicForm
            answers={answers}
            updateAnswers={updateAnswers}
            onSubmit={handleSubmit}
            isSaving={isSaving}
            isSubmitting={isSubmitting}
            lastSaved={lastSaved}
            serverError={error}
          />
        </FormCard>
      </div>
    </div>
  );
};

/* Small feature pill component */
function FeaturePill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-gray-400 text-xs font-medium hover:bg-[rgba(255,255,255,0.07)] hover:text-gray-300 transition-all duration-200 cursor-default'>
      {icon}
      {text}
    </span>
  );
}
