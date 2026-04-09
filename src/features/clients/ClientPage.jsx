import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageFormLayout from '../../shared/components/PageFormLayout';
import ClientForm from './ClientForm';
import { toast } from 'react-hot-toast';

const ClientPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const isEditing = !!id;

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success(`Client ${isEditing ? 'updated' : 'onboarded'} successfully!`, {
        style: { borderRadius: '12px', background: '#333', color: '#fff' }
      });
      navigate('/clients');
    } catch (err) {
      toast.error(`Failed to ${isEditing ? 'update' : 'onboard'} client.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageFormLayout 
      title={isEditing ? "Edit Client Profile" : "Onboard New Client"}
      description={isEditing ? "Update existing client portfolio details and preferences." : "Add a new client to the system to start managing requirements."}
      onBack={() => navigate('/clients')}
    >
      <ClientForm 
        initialData={isEditing ? { name: 'Google', industry: 'Technology' } : null} // Mock fetch
        onSubmit={handleSubmit}
        onCancel={() => navigate('/clients')}
        isLoading={isSubmitting}
      />
    </PageFormLayout>
  );
};

export default ClientPage;
