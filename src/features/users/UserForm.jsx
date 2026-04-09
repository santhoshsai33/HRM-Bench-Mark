import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  User, 
  Mail, 
  Shield, 
  Building2, 
  Lock,
  ChevronRight
} from 'lucide-react';
import Button from '../../shared/components/Button';
import Input from '../../shared/components/Input';

const userSchema = z.object({
  name: z.string().min(2, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['Admin', 'HR Manager', 'Client POC', 'Vendor', 'Recruiter']),
  company: z.string().min(2, 'Organization is required'),
  password: z.string().min(8, 'Password must be at least 8 characters').optional().or(z.literal('')),
});

const UserForm = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: initialData || {
      role: 'Recruiter',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Profile */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b pb-2 flex items-center">
             <User className="w-4 h-4 mr-2" /> Identity
          </h3>
          <Input
            label="Full Name"
            placeholder="e.g. Rahul Sharma"
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            label="Work Email"
            type="email"
            placeholder="rahul.s@distrom.com"
            error={errors.email?.message}
            {...register('email')}
          />
        </div>

        {/* Access Control */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b pb-2 flex items-center">
             <Shield className="w-4 h-4 mr-2" /> Governance
          </h3>
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-700">System Role</label>
            <select className="input-field" {...register('role')}>
              <option value="Admin">Admin</option>
              <option value="HR Manager">HR Manager</option>
              <option value="Recruiter">Recruiter</option>
              <option value="Client POC">Client POC</option>
              <option value="Vendor">Vendor</option>
            </select>
          </div>
          <Input
            label="Organization"
            placeholder="e.g. DISTROM Corp"
            error={errors.company?.message}
            {...register('company')}
          />
        </div>
      </div>

      {!initialData && (
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-center justify-between">
           <div className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                 <Mail className="w-6 h-6" />
              </div>
              <div>
                 <h4 className="text-sm font-black text-slate-800">Send Invitation Email</h4>
                 <p className="text-xs text-slate-500 mt-1">The user will receive a link to set their password.</p>
              </div>
           </div>
           <Button variant="secondary" className="px-4 text-xs font-black uppercase">Preview Email</Button>
        </div>
      )}

      <div className="flex items-center justify-end space-x-4 pt-6 border-t border-slate-100">
        <Button variant="secondary" type="button" onClick={onCancel} className="px-8">
          Cancel
        </Button>
        <Button variant="primary" type="submit" isLoading={isLoading} className="px-10 h-12 shadow-lg shadow-primary-200">
          {initialData ? 'Update User' : 'Grant Access'}
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
