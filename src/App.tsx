import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FormFill } from "./pages/FormFill";
import { Success } from "./pages/Success";

function App() {
  return (
    <BrowserRouter>
      <div className='min-h-screen bg-[#0a0b10] text-[#f8fafc] font-sans bg-dot-pattern relative'>
        {/* Ambient glow orbs */}
        <div className='fixed inset-0 pointer-events-none overflow-hidden z-0'>
          <div className='absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#6d28d9] opacity-[0.04] blur-[120px]' />
          <div className='absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#6d28d9] opacity-[0.03] blur-[120px]' />
        </div>

        <main className='relative z-10 w-full'>
          <Routes>
            <Route path='/' element={<Navigate to='/forms/demo' replace />} />
            <Route path='/forms/:formId' element={<FormFill />} />
            <Route path='/success' element={<Success />} />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
