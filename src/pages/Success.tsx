import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/common/Button";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

export const Success: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className='flex-1 flex flex-col items-center justify-center p-4 min-h-screen'>
      <div className='w-full max-w-md text-center'>
        {/* Success Icon */}
        <div className='relative mx-auto w-20 h-20 mb-8'>
          <div className='absolute inset-0 rounded-full bg-[#10b981] opacity-15 blur-xl animate-pulse-slow' />
          <div className='relative w-full h-full rounded-full bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)] flex items-center justify-center animate-check-pop'>
            <CheckCircle2 className='w-10 h-10 text-[#10b981]' />
          </div>
        </div>

        {/* Sparkle badge */}
        <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(16,185,129,0.08)] border border-[rgba(16,185,129,0.2)] text-[#34d399] text-xs font-semibold uppercase tracking-widest mb-6 animate-fade-in stagger-1'>
          <Sparkles className='w-3.5 h-3.5' />
          Submission Complete
        </div>

        <h1 className='text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight animate-fade-in-up stagger-2'>
          You're all set!
        </h1>
        <p className='text-gray-400 mb-10 text-base leading-relaxed animate-fade-in-up stagger-3'>
          Your form has been submitted successfully. We've securely received all
          your information.
        </p>

        <div className='flex flex-col gap-3 animate-fade-in-up stagger-4'>
          <Button
            onClick={() => navigate("/")}
            variant='primary'
            className='w-full gap-2'>
            Start Another Form
            <ArrowRight className='w-4 h-4' />
          </Button>
        </div>
      </div>
    </div>
  );
};
