import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const PageFormLayout = ({ title, description, children, onBack }) => {
  const navigate = useNavigate();
  
  return (
    <div className="w-full space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex items-center space-x-4">
        <button 
          onClick={onBack || (() => navigate(-1))}
          className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-primary-600 hover:border-primary-200 transition-all shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h1>
          {description && <p className="text-sm text-slate-500 font-medium">{description}</p>}
        </div>
      </div>
      
      <div className="bg-white p-8 rounded-3xl shadow-premium border border-slate-100">
        {children}
      </div>
    </div>
  );
};

export default PageFormLayout;
