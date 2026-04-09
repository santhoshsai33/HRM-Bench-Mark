import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Briefcase, 
  User, 
  Mail, 
  Phone, 
  Calendar,
  Activity,
  Award,
  Send
} from 'lucide-react';
import Button from '../../shared/components/Button';
import Input from '../../shared/components/Input';

const vendorSchema = z.object({
  name: z.string().min(2, 'Vendor name is required'),
  vendor_type: z.enum(['Agency', 'Freelance', 'Partner']),
  poc_name: z.string().min(2, 'POC Name is required'),
  poc_email: z.string().email('Invalid POC email'),
  poc_phone: z.string().min(10, 'Invalid POC phone number'),
  agreement_expiry_date: z.string().min(1, 'Agreement expiry date is required'),
  status: z.enum(['Preferred', 'Standard', 'Blacklisted']).default('Standard'),
  performance_score: z.string().transform(v => parseFloat(v) || 0),
});

const VendorForm = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(vendorSchema),
    defaultValues: initialData || {
      vendor_type: 'Agency',
      status: 'Standard',
      performance_score: '0',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Vendor Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b pb-2 flex items-center">
             <Send className="w-4 h-4 mr-2" /> Vendor Identity
          </h3>
          <Input
            label="Vendor Name"
            placeholder="e.g. Global Tech Staffing"
            error={errors.name?.message}
            {...register('name')}
          />
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-700">Vendor Type</label>
            <select className="input-field" {...register('vendor_type')}>
              <option value="Agency">Agency</option>
              <option value="Freelance">Freelance</option>
              <option value="Partner">Partner</option>
            </select>
          </div>
          <Input
            label="Agreement Expiry"
            type="date"
            error={errors.agreement_expiry_date?.message}
            {...register('agreement_expiry_date')}
          />
        </div>

        {/* POC Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b pb-2 flex items-center">
             <User className="w-4 h-4 mr-2" /> Point of Contact
          </h3>
          <Input
            label="POC Name"
            placeholder="Jane Smith"
            error={errors.poc_name?.message}
            {...register('poc_name')}
          />
          <Input
            label="POC Email"
            type="email"
            placeholder="jane.smith@vendor.com"
            error={errors.poc_email?.message}
            {...register('poc_email')}
          />
          <Input
            label="POC Phone"
            placeholder="+1 555-9876"
            error={errors.poc_phone?.message}
            {...register('poc_phone')}
          />
        </div>
      </div>

      {/* Strategy & Performance */}
      <div className="space-y-4">
        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b pb-2 flex items-center">
           <Activity className="w-4 h-4 mr-2" /> Tiering & Performance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-700">Service Status</label>
            <select className="input-field" {...register('status')}>
              <option value="Standard">Standard</option>
              <option value="Preferred">Preferred</option>
              <option value="Blacklisted">Blacklisted</option>
            </select>
          </div>
          <Input
            label="Initial Performance Score (0-100)"
            type="number"
            placeholder="85"
            error={errors.performance_score?.message}
            {...register('performance_score')}
          />
        </div>
      </div>

      <div className="flex items-center justify-end space-x-4 pt-6 border-t border-slate-100">
        <Button variant="secondary" type="button" onClick={onCancel} className="px-8">
          Cancel
        </Button>
        <Button variant="primary" type="submit" isLoading={isLoading} className="px-10 h-12 shadow-lg shadow-indigo-200">
          {initialData ? 'Update Vendor' : 'Onboard Vendor'}
        </Button>
      </div>
    </form>
  );
};

export default VendorForm;
