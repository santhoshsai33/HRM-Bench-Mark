import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User, Mail, Phone, MapPin, Briefcase, Calendar, DollarSign, FileText, Target } from 'lucide-react';
import Button from '../../shared/components/Button';
import Input from '../../shared/components/Input';

const resourceSchema = z.object({
  full_name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Invalid phone number'),
  designation: z.string().min(2, 'Designation is required'),
  resource_type: z.enum(['Bench', 'InHouse', 'Contract']),
  availability: z.enum(['Immediate', '2Weeks', '1Month', 'Unavailable']),
  total_experience: z.string().transform((v) => parseFloat(v) || 0),
  current_location: z.string().min(2, 'Current location is required'),
  preferred_location: z.string().optional(),
  current_ctc: z.string().transform((v) => parseFloat(v) || 0),
  expected_ctc: z.string().transform((v) => parseFloat(v) || 0),
  is_immediate_joiner: z.boolean().default(false),
  profile_summary: z.string().optional(),
});

const ResourceForm = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resourceSchema),
    defaultValues: initialData || {
      resource_type: 'Bench',
      availability: 'Immediate',
      is_immediate_joiner: true,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b pb-2">Basis Information</h3>
          <Input
            label="Full Name"
            placeholder="John Doe"
            error={errors.full_name?.message}
            {...register('full_name')}
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="john.doe@example.com"
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            label="Phone Number"
            placeholder="+91 98765 43210"
            error={errors.phone?.message}
            {...register('phone')}
          />
        </div>

        {/* Professional Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b pb-2">Professional Details</h3>
          <Input
            label="Designation"
            placeholder="Senior Software Engineer"
            error={errors.designation?.message}
            {...register('designation')}
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-700">Resource Type</label>
              <select className="input-field" {...register('resource_type')}>
                <option value="Bench">Bench</option>
                <option value="InHouse">In-House</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-700">Availability</label>
              <select className="input-field" {...register('availability')}>
                <option value="Immediate">Immediate</option>
                <option value="2Weeks">2 Weeks</option>
                <option value="1Month">1 Month</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
          </div>
          <Input
            label="Total Experience (Years)"
            type="number"
            step="0.1"
            placeholder="5.5"
            error={errors.total_experience?.message}
            {...register('total_experience')}
          />
        </div>

        {/* Location & Compensation */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b pb-2">Location & Finance</h3>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Current Location"
              placeholder="Bangalore"
              error={errors.current_location?.message}
              {...register('current_location')}
            />
            <Input
              label="Preferred Location"
              placeholder="Mumbai / Remote"
              {...register('preferred_location')}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Current CTC (LPA)"
              type="number"
              placeholder="12.0"
              {...register('current_ctc')}
            />
            <Input
              label="Expected CTC (LPA)"
              type="number"
              placeholder="18.0"
              {...register('expected_ctc')}
            />
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b pb-2">Status & Summary</h3>
          <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <input
              type="checkbox"
              id="immediate_joiner"
              className="w-5 h-5 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
              {...register('is_immediate_joiner')}
            />
            <label htmlFor="immediate_joiner" className="text-sm font-bold text-slate-700">Immediate Joiner?</label>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-700">Profile Summary</label>
            <textarea
              className="input-field min-h-[100px] py-3 resize-none"
              placeholder="Briefly describe the candidate's core expertise..."
              {...register('profile_summary')}
            ></textarea>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-4 pt-6 border-t border-slate-100">
        <Button variant="secondary" type="button" onClick={onCancel} className="px-8">
          Cancel
        </Button>
        <Button variant="primary" type="submit" isLoading={isLoading} className="px-10">
          {initialData ? 'Update Resource' : 'Register Resource'}
        </Button>
      </div>
    </form>
  );
};

export default ResourceForm;
