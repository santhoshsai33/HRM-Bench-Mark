import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-50 z-50">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 font-medium animate-pulse">Loading DISTROM...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
