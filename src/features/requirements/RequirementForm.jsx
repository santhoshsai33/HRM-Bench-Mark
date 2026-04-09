import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Building2, 
  Briefcase, 
  Target, 
  MapPin, 
  DollarSign, 
  Users,
  AlertCircle
} from 'lucide-react';
import Button from '../../shared/components/Button';
import Input from '../../shared/components/Input';

const requirementSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  client_id: z.string().min(1, 'Please select a client'),
  mandatory_skills: z.string().min(2, 'At least one skill is required'),
  exp_min: z.string().transform(v => parseInt(v) || 0),
  exp_max: z.string().transform(v => parseInt(v) || 0),
  location: z.string().min(2, 'Location is required'),
  job_mode: z.enum(['Remote', 'OnSite', 'Hybrid']),
  priority: z.enum(['Normal', 'High', 'Urgent']),
  positions_count: z.string().transform(v => parseInt(v) || 1),
  budget_range: z.string().optional(),
  description: z.string().min(10, 'Description is required'),
});

const RequirementForm = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(requirementSchema),
    defaultValues: initialData || {
      job_mode: 'Hybrid',
      priority: 'Normal',
      positions_count: 1,
    },
  });

  // Mock clients
  const clients = [
    { id: '1', name: 'Google' },
    { id: '2', name: 'Microsoft' },
    { id: '3', name: 'Netflix' },
    { id: '4', name: 'Amazon' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Core Info */}
        <div className="space-y-5">
           <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b pb-2 flex items-center">
              <Building2 className="w-4 h-4 mr-2" /> Client & Role
           </h3>
           <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-700">Client</label>
              <select className="input-field" {...register('client_id')}>
                 <option value="">Select a Client</option>
                 {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              {errors.client_id && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.client_id.message}</p>}
           </div>
           <Input 
             label="Requirement Title" 
             placeholder="e.g. Senior Frontend Engineer" 
             error={errors.title?.message}
             {...register('title')}
           />
           <Input 
             label="Mandatory Skills" 
             placeholder="React, TypeScript, Tailwind (Comma separated)" 
             error={errors.mandatory_skills?.message}
             {...register('mandatory_skills')}
           />
        </div>

        {/* Requirements & Budget */}
        <div className="space-y-5">
           <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b pb-2 flex items-center">
              <Target className="w-4 h-4 mr-2" /> Specifics
           </h3>
           <div className="grid grid-cols-2 gap-4">
              <Input label="Min Exp (Years)" type="number" {...register('exp_min')} error={errors.exp_min?.message} />
              <Input label="Max Exp (Years)" type="number" {...register('exp_max')} error={errors.exp_max?.message} />
           </div>
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-700">Work Mode</label>
                <select className="input-field" {...register('job_mode')}>
                   <option value="Remote">Remote</option>
                   <option value="OnSite">On-Site</option>
                   <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-700">Priority</label>
                <select className="input-field" {...register('priority')}>
                   <option value="Normal">Normal</option>
                   <option value="High">High</option>
                   <option value="Urgent">Urgent</option>
                </select>
              </div>
           </div>
           <div className="grid grid-cols-2 gap-4">
              <Input label="No. of Positions" type="number" {...register('positions_count')} error={errors.positions_count?.message} />
              <Input label="Budget Range" placeholder="$120k - $150k" {...register('budget_range')} />
           </div>
        </div>
      </div>

      {/* Full Description */}
      <div className="space-y-5">
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b pb-2 flex items-center">
           <AlertCircle className="w-4 h-4 mr-2" /> Detailed Information
        </h3>
        <Input label="Work Location" placeholder="Mountain View, CA" error={errors.location?.message} {...register('location')} />
        <div className="space-y-1.5">
           <label className="block text-sm font-semibold text-slate-700">Job Description</label>
           <textarea 
             className="input-field min-h-[150px] py-4"
             placeholder="Paste the full job description or scope of work here..."
             {...register('description')}
           ></textarea>
           {errors.description && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.description.message}</p>}
        </div>
      </div>

      <div className="flex items-center justify-end space-x-4 pt-6 border-t border-slate-100">
        <Button variant="secondary" type="button" onClick={onCancel} className="px-8">
          Cancel
        </Button>
        <Button variant="primary" type="submit" isLoading={isLoading} className="px-10 h-12 shadow-lg shadow-primary-200">
          Raise Requirement
        </Button>
      </div>
    </form>
  );
};

export default RequirementForm;
