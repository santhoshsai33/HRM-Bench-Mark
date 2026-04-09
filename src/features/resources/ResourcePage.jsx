import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageFormLayout from '../../shared/components/PageFormLayout';
import ResourceForm from './ResourceForm';
import { toast } from 'react-hot-toast';

const ResourcePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const isEditing = !!id;

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success(`Resource ${isEditing ? 'updated' : 'registered'} successfully!`, {
        style: { borderRadius: '12px', background: '#333', color: '#fff' }
      });
      navigate('/resources');
    } catch (err) {
      toast.error(`Failed to ${isEditing ? 'update' : 'register'} resource.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageFormLayout 
      title={isEditing ? "Edit Bench Resource" : "Register New Talent"}
      description={isEditing ? "Update talent profile, skills, and availability." : "Add a new resource to the bench and start tracking their assignments."}
      onBack={() => navigate('/resources')}
    >
      <ResourceForm 
        initialData={isEditing ? { name: 'Amit Sharma' } : null}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/resources')}
        isLoading={isSubmitting}
      />
    </PageFormLayout>
  );
};

export default ResourcePage;
