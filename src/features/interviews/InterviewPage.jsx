import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageFormLayout from '../../shared/components/PageFormLayout';
import ScheduleInterviewForm from './ScheduleInterviewForm';
import { toast } from 'react-hot-toast';

const InterviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const isEditing = !!id;

  const submissions = [
    { id: '1', resource: 'Amit Sharma', client: 'Google', requirement: 'Senior React Developer' },
    { id: '2', resource: 'Priya Patel', client: 'Microsoft', requirement: 'Backend Developer' }
  ];

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success(`Interview ${isEditing ? 'updated' : 'scheduled'}! Calendar invite sent.`, {
        style: { borderRadius: '12px', background: '#333', color: '#fff' }
      });
      navigate('/interviews');
    } catch (err) {
      toast.error(`Failed to ${isEditing ? 'update' : 'schedule'} interview.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageFormLayout 
      title={isEditing ? "Reschedule Interview" : "Schedule New Interview"}
      description={isEditing ? "Modify the time, mode, or participants." : "Coordinate an interview for a submitted candidate."}
      onBack={() => navigate('/interviews')}
    >
      <ScheduleInterviewForm 
        submissions={submissions}
        initialData={isEditing ? { candidate: 'Amit Sharma' } : null}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/interviews')}
        isLoading={isSubmitting}
      />
    </PageFormLayout>
  );
};

export default InterviewPage;
