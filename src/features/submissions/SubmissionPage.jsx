import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageFormLayout from '../../shared/components/PageFormLayout';
import SubmissionForm from './SubmissionForm';
import { toast } from 'react-hot-toast';

const SubmissionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const isEditing = !!id;

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success(`Candidate ${isEditing ? 'updated' : 'submitted'} successfully!`, {
        style: { borderRadius: '12px', background: '#333', color: '#fff' }
      });
      navigate('/submissions');
    } catch (err) {
      toast.error(`Failed to ${isEditing ? 'update' : 'submit'} candidate.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageFormLayout 
      title={isEditing ? "Edit Candidate Submission" : "New Candidate Submission"}
      description={isEditing ? "Modify the details of the candidate submission." : "Submit an existing bench resource to a client requirement."}
      onBack={() => navigate('/submissions')}
    >
      <SubmissionForm 
        initialData={isEditing ? { resource: 'Amit Sharma' } : null}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/submissions')}
        isLoading={isSubmitting}
      />
    </PageFormLayout>
  );
};

export default SubmissionPage;
