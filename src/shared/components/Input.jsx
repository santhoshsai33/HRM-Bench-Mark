import React from 'react';
import { cn } from '../utils/cn';

const Input = React.forwardRef(({ label, error, className, labelClassName, ...props }, ref) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && <label className={cn("block text-sm font-semibold text-slate-700", labelClassName)}>{label}</label>}
      <div className="relative">
        <input
          ref={ref}
          className={cn(
            "w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white placeholder-slate-400 text-slate-900",
            "focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500",
            "transition-all duration-200",
            error && "border-rose-500 focus:ring-rose-500/10 focus:border-rose-500",
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs font-medium text-rose-500 mt-1">{error}</p>}
    </div>
  );
});

export default Input;
