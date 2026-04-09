import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Building2, Globe, User, Mail, Phone, MapPin, Briefcase } from 'lucide-react';
import Button from '../../shared/components/Button';
import Input from '../../shared/components/Input';

const clientSchema = z.object({
  name: z.string().min(2, 'Client name is required'),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  industry: z.string().min(2, 'Industry is required'),
  contact_person_name: z.string().min(2, 'Contact person name is required'),
  contact_email: z.string().email('Invalid contact email'),
  contact_phone: z.string().min(10, 'Invalid contact phone number'),
  address: z.string().optional(),
  status: z.enum(['Active', 'Inactive']).default('Active'),
});

const ClientForm = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(clientSchema),
    defaultValues: initialData || {
      status: 'Active',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Company Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b pb-2 flex items-center">
            <Building2 className="w-4 h-4 mr-2" /> Company Profile
          </h3>
          <Input
            label="Client Name"
            placeholder="e.g. Acme Corp"
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            label="Website URL"
            placeholder="https://www.acmecorp.com"
            error={errors.website?.message}
            {...register('website')}
          />
          <Input
            label="Industry"
            placeholder="e.g. Technology, Finance"
            error={errors.industry?.message}
            {...register('industry')}
          />
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b pb-2 flex items-center">
            <User className="w-4 h-4 mr-2" /> Primary Contact
          </h3>
          <Input
            label="Contact Person"
            placeholder="John Doe"
            error={errors.contact_person_name?.message}
            {...register('contact_person_name')}
          />
          <Input
            label="Contact Email"
            type="email"
            placeholder="john.doe@acmecorp.com"
            error={errors.contact_email?.message}
            {...register('contact_email')}
          />
          <Input
            label="Contact Phone"
            placeholder="+1 555-0123"
            error={errors.contact_phone?.message}
            {...register('contact_phone')}
          />
        </div>
      </div>

      {/* Additional Details */}
      <div className="space-y-4">
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b pb-2 flex items-center">
          <MapPin className="w-4 h-4 mr-2" /> Logistics & Status
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-700">Office Address</label>
            <textarea
              className="input-field min-h-[100px] py-3 resize-none"
              placeholder="Full company address..."
              {...register('address')}
            ></textarea>
          </div>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-700">Client Status</label>
              <select className="input-field" {...register('status')}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-4 pt-6 border-t border-slate-100">
        <Button variant="secondary" type="button" onClick={onCancel} className="px-8">
          Cancel
        </Button>
        <Button variant="primary" type="submit" isLoading={isLoading} className="px-10 h-12 shadow-lg shadow-primary-200">
          {initialData ? 'Update Client' : 'Onboard Client'}
        </Button>
      </div>
    </form>
  );
};

export default ClientForm;
