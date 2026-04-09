import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageFormLayout from '../../shared/components/PageFormLayout';
import CompanyForm from './CompanyForm';
import { toast } from 'react-hot-toast';

const CompanyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const isEditing = !!id;

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success(`Tenant ${isEditing ? 'updated' : 'registered'} successfully!`, {
        style: { borderRadius: '12px', background: '#333', color: '#fff' }
      });
      navigate('/companies');
    } catch (err) {
      toast.error(`Failed to ${isEditing ? 'update' : 'register'} tenant.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageFormLayout 
      title={isEditing ? "Edit Tenant Company" : "Register Tenant Company"}
      description={isEditing ? "Update existing tenant organizational details." : "Register a new tenant isolation layer and company profile."}
      onBack={() => navigate('/companies')}
    >
      <CompanyForm 
        initialData={isEditing ? { company_name: 'DISTROM Corp' } : null}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/companies')}
        isLoading={isSubmitting}
      />
    </PageFormLayout>
  );
};

export default CompanyPage;
