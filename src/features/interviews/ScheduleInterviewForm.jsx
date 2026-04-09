import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Calendar, 
  Video, 
  Users, 
  Link as LinkIcon,
  MessageSquare,
  Clock
} from 'lucide-react';
import Button from '../../shared/components/Button';
import Input from '../../shared/components/Input';

const interviewSchema = z.object({
  submission_id: z.string().min(1, 'Submission is required'),
  round_number: z.string().transform(v => parseInt(v) || 1),
  interview_date: z.string().min(1, 'Date and time is required'),
  mode: z.enum(['Voice', 'Video', 'FaceToFace']),
  meeting_link: z.string().optional(),
  interviewer_names: z.string().min(2, 'Interviewer names are required'),
  notes: z.string().optional(),
});

const ScheduleInterviewForm = ({ submissions = [], onSubmit, onCancel, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(interviewSchema),
    defaultValues: {
      round_number: 1,
      mode: 'Video',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-slate-700">Select Candidate Submission</label>
          <select className="input-field" {...register('submission_id')}>
            <option value="">Select a Submission</option>
            {submissions.map(s => (
              <option key={s.id} value={s.id}>{s.resource} - {s.client} ({s.requirement})</option>
            ))}
          </select>
          {errors.submission_id && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.submission_id.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input 
            label="Round Number" 
            type="number" 
            {...register('round_number')} 
            error={errors.round_number?.message} 
          />
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-700">Interview Mode</label>
            <select className="input-field" {...register('mode')}>
              <option value="Video">Video Call</option>
              <option value="Voice">Voice Call</option>
              <option value="FaceToFace">In-Person</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input 
            label="Date & Time" 
            type="datetime-local" 
            {...register('interview_date')} 
            error={errors.interview_date?.message} 
          />
          <Input 
            label="Interviewer(s)" 
            placeholder="e.g. John Doe, Sarah Smith" 
            {...register('interviewer_names')} 
            error={errors.interviewer_names?.message} 
          />
        </div>

        <Input 
          label="Meeting Link / Venue" 
          placeholder="https://zoom.us/j/..." 
          {...register('meeting_link')} 
        />

        <div className="space-y-1.5">
          <label className="block text-sm font-semibold text-slate-700">Internal Notes</label>
          <textarea 
            className="input-field min-h-[100px] py-3"
            placeholder="Preparation notes for the candidate or interviewer..."
            {...register('notes')}
          ></textarea>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-4 pt-4 border-t border-slate-100">
        <Button variant="secondary" type="button" onClick={onCancel} className="px-6">
          Cancel
        </Button>
        <Button variant="primary" type="submit" isLoading={isLoading} className="px-8 shadow-md">
           Schedule Interview
        </Button>
      </div>
    </form>
  );
};

export default ScheduleInterviewForm;
