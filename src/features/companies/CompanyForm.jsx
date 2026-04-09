import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Building2, Globe, MapPin, Target, Image as ImageIcon } from 'lucide-react';
import Button from '../../shared/components/Button';
import Input from '../../shared/components/Input';
import { cn } from '../../shared/utils/cn';

const companySchema = z.object({
  company_name: z.string().min(2, 'Company name is required').max(200),
  industry: z.string().max(100).optional(),
  website: z.string().url('Must be a valid URL').or(z.literal('')).optional(),
  logo_url: z.string().url('Must be a valid URL').or(z.literal('')).optional(),
  address: z.string().optional(),
  city: z.string().max(100).optional(),
  country: z.string().max(100).optional(),
});

const CompanyForm = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(companySchema),
    defaultValues: initialData || {},
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b pb-2 flex items-center">
           <Building2 className="w-4 h-4 mr-2" /> Company Profile
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Company Name"
            placeholder="e.g. Acme Corp"
            error={errors.company_name?.message}
            {...register('company_name')}
          />
          <Input
            label="Industry"
            placeholder="e.g. Finance, Healthcare"
            error={errors.industry?.message}
            {...register('industry')}
            icon={<Target className="w-4 h-4 text-slate-400" />}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b pb-2 flex items-center">
           <Globe className="w-4 h-4 mr-2" /> Digital Assets
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Website URL"
            placeholder="https://company.com"
            error={errors.website?.message}
            {...register('website')}
          />
          <Input
            label="Logo URL"
            placeholder="https://company.com/logo.png"
            error={errors.logo_url?.message}
            {...register('logo_url')}
            icon={<ImageIcon className="w-4 h-4 text-slate-400" />}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b pb-2 flex items-center">
           <MapPin className="w-4 h-4 mr-2" /> Location
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="City"
            placeholder="e.g. San Francisco"
            error={errors.city?.message}
            {...register('city')}
          />
          <Input
            label="Country"
            placeholder="e.g. USA"
            error={errors.country?.message}
            {...register('country')}
          />
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Address</label>
            <textarea
              className="input-field min-h-[80px]"
              placeholder="123 Market St, Suite 400..."
              {...register('address')}
            ></textarea>
            {errors.address && <p className="text-xs text-rose-500 mt-1 font-semibold">{errors.address.message}</p>}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-4 pt-4 border-t border-slate-100">
        <Button variant="secondary" type="button" onClick={onCancel} className="px-6">
          Cancel
        </Button>
        <Button variant="primary" type="submit" isLoading={isLoading} className="px-8 shadow-primary-200">
          {initialData ? 'Update Company' : 'Register Tenant'}
        </Button>
      </div>
    </form>
  );
};

export default CompanyForm;
