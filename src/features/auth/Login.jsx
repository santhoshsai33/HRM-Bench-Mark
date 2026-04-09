import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuthStore } from '../../app/store/useAuthStore';
import Button from '../../shared/components/Button';
import Input from '../../shared/components/Input';
import { toast } from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('super_admin');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const roleNames = {
        'super_admin': 'Super Admin',
        'admin': 'Company Admin',
        'hr_recruiter': 'HR Recruiter',
        'resource': 'Bench Resource',
        'vendor': 'Vendor Partner',
        'client': 'Client Admin'
      };

      const mockUser = {
        id: 1,
        name: roleNames[selectedRole],
        email: data.email,
        role: selectedRole,
        company: selectedRole === 'super_admin' ? 'DISTROM System' : 'Acme Corp (Demo)'
      };
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
      
      login(mockUser, mockToken);
      toast.success(`Welcome back, ${mockUser.name}!`, {
        icon: '👋',
        style: { borderRadius: '12px', background: '#333', color: '#fff' }
      });
      navigate('/dashboard');
    } catch (error) {
      toast.error('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md space-y-8 animate-in fade-in zoom-in duration-500">
        {/* Logo & Branding */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-200 group-hover:rotate-6 transition-transform">
             <span className="text-3xl font-black text-white italic">D</span>
          </div>
          <h2 className="mt-6 text-3xl font-black text-slate-900 tracking-tight">DISTROM</h2>
          <p className="mt-2 text-slate-500 font-medium">Enterprise HRM Bench & Marketplace</p>
        </div>

        {/* Login Form */}
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 via-primary-600 to-primary-800"></div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
              <p className="text-xs font-bold text-amber-700 uppercase tracking-widest mb-2">Demo Mode Active</p>
              <label className="block text-sm font-semibold text-amber-900 mb-1">Select User Role</label>
              <select 
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full bg-white border border-amber-200 rounded-xl px-3 py-2 text-sm text-slate-700 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
              >
                <option value="super_admin">Super Admin (System)</option>
                <option value="admin">Company Admin (Tenant)</option>
                <option value="hr_recruiter">HR / Recruiter</option>
                <option value="resource">Bench Resource</option>
                <option value="vendor">Vendor</option>
                <option value="client">Client</option>
              </select>
            </div>

            <Input
              label="Email Address"
              type="email"
              placeholder="name@company.com"
              autoComplete="email"
              error={errors.email?.message}
              {...register('email')}
              icon={<Mail className="w-5 h-5 text-slate-400" />}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                error={errors.password?.message}
                {...register('password')}
                icon={<Lock className="w-5 h-5 text-slate-400" />}
              />
              <button
                type="button"
                className="absolute right-3 top-[38px] text-slate-400 hover:text-slate-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-slate-300 rounded cursor-pointer"
                  {...register('rememberMe')}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm font-semibold text-slate-600 cursor-pointer">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="/forgot-password" title="Recover your password" className="font-bold text-primary-600 hover:text-primary-500 transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-4 text-lg"
              isLoading={isLoading}
              disabled={isLoading}
            >
               Sign in to Workspace
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Internal Secure Access System. Licensed to <span className="font-bold text-slate-700">DISTROM Corp</span>.
          </p>
        </div>

        {/* Footer */}
        <div className="text-center text-slate-400 text-xs font-medium">
          <p>© 2026 DISTROM. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
