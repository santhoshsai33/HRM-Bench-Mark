import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageFormLayout from '../../shared/components/PageFormLayout';
import RoleForm from './RoleForm';
import { toast } from 'react-hot-toast';

const RolePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const isEditing = !!id;

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success(`Role ${isEditing ? 'updated' : 'defined'} successfully!`, {
        style: { borderRadius: '12px', background: '#333', color: '#fff' }
      });
      navigate('/roles');
    } catch (err) {
      toast.error(`Failed to ${isEditing ? 'update' : 'define'} role.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageFormLayout 
      title={isEditing ? "Edit Role & ACL" : "Define New Security Role"}
      description={isEditing ? "Modify module access matrix for this security role." : "Create a new role and grant precise module-level capabilities."}
      onBack={() => navigate('/roles')}
    >
      <RoleForm 
        initialData={isEditing ? { name: 'Recruiter' } : null}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/roles')}
        isLoading={isSubmitting}
      />
    </PageFormLayout>
  );
};

export default RolePage;
