import React from "react";
import { useNavigate } from "react-router-dom";
import { FormCard } from "../components/form/FormCard";
import { Button } from "../components/common/Button";
import { CheckCircle2 } from "lucide-react";

export const Success: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className='flex-1 flex flex-col items-center justify-center p-4 min-h-screen'>
      <div className='w-full max-w-md animate-fade-in-up'>
        <FormCard className='text-center py-12'>
          <div className='mx-auto w-16 h-16 rounded-full bg-[rgba(16,185,129,0.1)] flex items-center justify-center mb-6'>
            <CheckCircle2 className='w-8 h-8 text-[#10b981]' />
          </div>

          <h1 className='text-3xl font-bold text-white mb-4'>
            You're all set!
          </h1>
          <p className='text-gray-400 mb-8'>
            Your form has been successfully submitted. We've received your
            information.
          </p>

          <Button
            onClick={() => navigate("/")}
            variant='secondary'
            className='w-full'>
            Start Another Form
          </Button>
        </FormCard>
      </div>
    </div>
  );
};
