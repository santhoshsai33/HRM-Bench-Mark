import React from 'react';
import { cn } from '../utils/cn';

const Badge = ({ children, variant = 'default', size = 'md', className, ...props }) => {
  const variants = {
    default: 'bg-slate-100 text-slate-600',
    primary: 'bg-primary-50 text-primary-600 border border-primary-100',
    success: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    warning: 'bg-amber-50 text-amber-600 border border-amber-100',
    danger: 'bg-rose-50 text-rose-600 border border-rose-100',
    indigo: 'bg-indigo-50 text-indigo-600 border border-indigo-100',
    violet: 'bg-violet-50 text-violet-600 border border-violet-100',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold',
    md: 'px-2.5 py-0.5 text-xs font-semibold',
    lg: 'px-3 py-1 text-sm font-semibold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full leading-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
