import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FileText, User, Briefcase, Building2, Calendar, Send } from 'lucide-react';
import Button from '../../shared/components/Button';

const submissionSchema = z.object({
  resource_id: z.string().min(1, 'Please select a resource'),
  requirement_id: z.string().min(1, 'Please select a requirement'),
  vendor_id: z.string().min(1, 'Vendor information is required'),
  notes: z.string().optional(),
});

const SubmissionForm = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(submissionSchema),
    defaultValues: initialData || {
      vendor_id: '1', // Mock default vendor
    },
  });

  // Mock data for dropdowns
  const mockResources = [
    { id: '1', name: 'Amit Sharma (React Specialist)' },
    { id: '2', name: 'Suraj Mehta (Java Developer)' },
    { id: '3', name: 'Priya Verma (UI/UX)' }
  ];

  const mockRequirements = [
    { id: '101', title: 'Senior Frontend Engineer - Google' },
    { id: '102', title: 'Full Stack Dev - Microsoft' },
    { id: '103', title: 'QA Automation - Adobe' }
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-6">
        {/* Selection Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-700 flex items-center">
              <User className="w-4 h-4 mr-2 text-primary-500" /> Select Talent
            </label>
            <select className="input-field" {...register('resource_id')}>
              <option value="">Choose a resource...</option>
              {mockResources.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
            {errors.resource_id && <p className="text-xs text-rose-500 font-bold mt-1">{errors.resource_id.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-700 flex items-center">
              <Briefcase className="w-4 h-4 mr-2 text-indigo-500" /> Target Requirement
            </label>
            <select className="input-field" {...register('requirement_id')}>
              <option value="">Choose a requirement...</option>
              {mockRequirements.map(req => <option key={req.id} value={req.id}>{req.title}</option>)}
            </select>
            {errors.requirement_id && <p className="text-xs text-rose-500 font-bold mt-1">{errors.requirement_id.message}</p>}
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-slate-700">Submission Notes / Highlights</label>
          <textarea
            className="input-field min-h-[120px] py-3 resize-none"
            placeholder="Key talking points, availability, or skill match highlights..."
            {...register('notes')}
          ></textarea>
        </div>

        {/* Policy Notice */}
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex items-start space-x-3">
          <div className="p-1 bg-amber-100 text-amber-600 rounded">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-amber-800 uppercase tracking-tight">Double Submission Check</p>
            <p className="text-[10px] text-amber-700 mt-0.5">By submitting, you confirm that this candidate has not been submitted to this client within the last 6 months.</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-4 pt-6 border-t border-slate-100">
        <Button variant="secondary" type="button" onClick={onCancel} className="px-8">
          Cancel
        </Button>
        <Button variant="primary" type="submit" isLoading={isLoading} className="px-10 h-12 shadow-lg shadow-primary-200">
          <Send className="w-4 h-4 mr-2" /> Initial Submission
        </Button>
      </div>
    </form>
  );
};

export default SubmissionForm;
