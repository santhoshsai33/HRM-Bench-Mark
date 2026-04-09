import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageFormLayout from '../../shared/components/PageFormLayout';
import RequirementForm from './RequirementForm';
import { toast } from 'react-hot-toast';

const RequirementPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const isEditing = !!id;

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success(`Requirement ${isEditing ? 'updated' : 'raised'} successfully!`, {
        style: { borderRadius: '12px', background: '#333', color: '#fff' }
      });
      navigate('/requirements');
    } catch (err) {
      toast.error(`Failed to ${isEditing ? 'update' : 'raise'} requirement.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageFormLayout 
      title={isEditing ? "Edit Requirement" : "Raise Requirement"}
      description={isEditing ? "Modify the details of an existing requirement." : "Create a new requirement and broadcast it to the talent pool."}
      onBack={() => navigate('/requirements')}
    >
      <RequirementForm 
        initialData={isEditing ? { title: 'Senior Frontend Engineer' } : null}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/requirements')}
        isLoading={isSubmitting}
      />
    </PageFormLayout>
  );
};

export default RequirementPage;
