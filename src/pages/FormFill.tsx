import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormSession } from "../hooks/useFormSession";
import { FormCard } from "../components/form/FormCard";
import { DynamicForm } from "../components/form/DynamicForm";
import { Loader2 } from "lucide-react";

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
      <div className='flex-1 flex flex-col items-center justify-center min-h-screen'>
        <Loader2 className='w-10 h-10 text-[#6d28d9] animate-spin mb-4' />
        <p className='text-gray-400'>Loading your persistent session...</p>
      </div>
    );
  }

  return (
    <div className='flex-1 flex flex-col py-12 px-4 min-h-screen'>
      <div className='max-w-4xl mx-auto w-full mb-8 text-center animate-fade-in-down'>
        <h1 className='text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight'>
          Join the <span className='text-[#6d28d9]'>Dev Program</span>
        </h1>
        <p className='text-lg text-gray-400 max-w-2xl mx-auto'>
          We auto-save your progress locally and to our database. You can safely
          refresh, close the tab, or come back later without losing a single
          keystroke.
        </p>
      </div>

      <div className='w-full flex-1 animate-fade-in-up'>
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
