import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Mail, Phone, Camera } from 'lucide-react';
import PageFormLayout from '../../shared/components/PageFormLayout';
import Input from '../../shared/components/Input';
import Button from '../../shared/components/Button';
import { useAuthStore } from '../../app/store/useAuthStore';
import { toast } from 'react-hot-toast';

const ProfilePage = () => {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: '+1 (555) 000-0000',
      company: user?.company || '',
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, update the global auth state here too if needed
      toast.success('Profile updated successfully!', {
        style: { borderRadius: '12px', background: '#333', color: '#fff' }
      });
      navigate('/dashboard');
    } catch (err) {
      toast.error('Failed to update profile.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageFormLayout 
      title="My Profile" 
      description="Update your personal information and security settings."
      onBack={() => navigate(-1)}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* Profile Header & Avatar */}
        <div className="flex flex-col md:flex-row gap-8 items-start pb-8 border-b border-slate-100">
          <div className="relative group cursor-pointer flex-shrink-0">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-primary-600 to-primary-800 text-white flex items-center justify-center text-3xl font-black shadow-xl shadow-primary-200">
              {user?.name ? user.name.substring(0, 2).toUpperCase() : 'US'}
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <p className="text-[10px] text-center font-bold text-slate-400 mt-2 uppercase tracking-widest">Change Photo</p>
          </div>

          <div className="flex-1 space-y-4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                {...register('name', { required: 'Name is required' })}
                error={errors.name?.message}
                icon={<User className="w-4 h-4 text-slate-400" />}
              />
              <Input
                label="Email Address"
                type="email"
                {...register('email', { required: 'Email is required' })}
                error={errors.email?.message}
                icon={<Mail className="w-4 h-4 text-slate-400" />}
              />
              <Input
                label="Phone Number"
                {...register('phone')}
                icon={<Phone className="w-4 h-4 text-slate-400" />}
              />
              <Input
                label="Associated Company"
                disabled
                {...register('company')}
              />
            </div>
          </div>
        </div>

        {/* Security / Password Section */}
        <div className="pt-2">
          <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center">
            <Lock className="w-5 h-5 mr-2 text-primary-600" />
            Security
          </h3>
          <p className="text-sm text-slate-500 mb-6">Leave blank if you don't want to change your password.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="New Password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
              icon={<Lock className="w-4 h-4 text-slate-400" />}
            />
            <Input
              label="Confirm New Password"
              type="password"
              placeholder="••••••••"
              {...register('confirmPassword')}
              icon={<Lock className="w-4 h-4 text-slate-400" />}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="pt-6 border-t border-slate-50 flex items-center justify-end space-x-3">
          <Button variant="secondary" type="button" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" className="px-8 shadow-primary-200" isLoading={isSubmitting}>
            Save Changes
          </Button>
        </div>
      </form>
    </PageFormLayout>
  );
};

export default ProfilePage;
