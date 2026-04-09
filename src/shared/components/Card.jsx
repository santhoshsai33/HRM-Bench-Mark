import React from 'react';
import { cn } from '../utils/cn';

const Card = ({ title, subtitle, icon: Icon, action, children, className, bodyClassName, footer, ...props }) => {
  return (
    <div className={cn("premium-card flex flex-col h-full bg-white transition-all overflow-hidden", className)} {...props}>
      {(title || subtitle || Icon || action) && (
        <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between min-h-[64px]">
          <div className="flex items-center space-x-3">
             {Icon && <div className="p-2 rounded-lg bg-primary-50 text-primary-600"><Icon className="w-5 h-5" /></div>}
             <div>
                {title && <h3 className="text-lg font-bold text-slate-900 leading-none">{title}</h3>}
                {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
             </div>
          </div>
          {action && <div className="ml-4 flex-shrink-0">{action}</div>}
        </div>
      )}
      <div className={cn("flex-1 p-6", bodyClassName)}>
         {children}
      </div>
      {footer && (
        <div className="px-6 py-3 bg-slate-50/50 border-t border-slate-50 text-sm text-slate-500">
           {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
