import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageFormLayout from '../../shared/components/PageFormLayout';
import UserForm from './UserForm';
import { toast } from 'react-hot-toast';

const UserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const isEditing = !!id;

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success(`User ${isEditing ? 'updated' : 'invited'} successfully!`, {
        style: { borderRadius: '12px', background: '#333', color: '#fff' }
      });
      navigate('/users');
    } catch (err) {
      toast.error(`Failed to ${isEditing ? 'update' : 'invite'} user.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageFormLayout 
      title={isEditing ? "Edit User Governance" : "Grant System Access"}
      description={isEditing ? "Update identity details and module permissions for this user." : "Invite a new user to the platform and assign their security clearance."}
      onBack={() => navigate('/users')}
    >
      <UserForm 
        initialData={isEditing ? { name: 'Suresh Kumar', email: 'suresh.k@distrom.com', role: 'Admin', company: 'DISTROM Corp' } : null}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/users')}
        isLoading={isSubmitting}
      />
    </PageFormLayout>
  );
};

export default UserPage;
