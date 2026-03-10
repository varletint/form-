import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FormFill } from "./pages/FormFill";
import { Success } from "./pages/Success";

function App() {
  return (
    <BrowserRouter>
      <div className='min-h-screen bg-[#0a0b10] text-[#f8fafc] font-sans'>
        <main className='container mx-auto'>
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
