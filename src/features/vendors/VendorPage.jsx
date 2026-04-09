import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageFormLayout from '../../shared/components/PageFormLayout';
import VendorForm from './VendorForm';
import { toast } from 'react-hot-toast';

const VendorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const isEditing = !!id;

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success(`Vendor ${isEditing ? 'updated' : 'onboarded'} successfully!`, {
        style: { borderRadius: '12px', background: '#333', color: '#fff' }
      });
      navigate('/vendors');
    } catch (err) {
      toast.error(`Failed to ${isEditing ? 'update' : 'onboard'} vendor.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageFormLayout 
      title={isEditing ? "Edit Vendor Profile" : "Onboard External Vendor"}
      description={isEditing ? "Update POC and vendor profile details." : "Register an external agency or partner to handle requirements."}
      onBack={() => navigate('/vendors')}
    >
      <VendorForm 
        initialData={isEditing ? { name: 'Tech Staffing LLC' } : null}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/vendors')}
        isLoading={isSubmitting}
      />
    </PageFormLayout>
  );
};

export default VendorPage;
