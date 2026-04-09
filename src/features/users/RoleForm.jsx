import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Shield, CheckCircle2, Lock, Eye, Edit, Trash2, PlusCircle, Settings } from 'lucide-react';
import Button from '../../shared/components/Button';
import Input from '../../shared/components/Input';
import { cn } from '../../shared/utils/cn';

const roleSchema = z.object({
  name: z.string().min(2, 'Role name is required'),
  description: z.string().optional(),
});

const modules = [
  { id: 'dashboard', label: 'Dashboard', icon: Settings },
  { id: 'resources', label: 'Talent Pool', icon: Shield },
  { id: 'requirements', label: 'Requirements', icon: Shield },
  { id: 'clients', label: 'Client Management', icon: Shield },
  { id: 'vendors', label: 'Vendor Ecosystem', icon: Shield },
  { id: 'submissions', label: 'Pipeline', icon: Shield },
  { id: 'interviews', label: 'Interviews', icon: Shield },
  { id: 'offers', label: 'Offers', icon: Shield },
  { id: 'placements', label: 'Placements', icon: Shield },
  { id: 'reports', label: 'Analytics', icon: Shield },
  { id: 'governance', label: 'User Governance', icon: Lock },
];

const permissionTypes = [
  { id: 'view', label: 'View', icon: Eye, color: 'text-blue-500 bg-blue-50' },
  { id: 'create', label: 'Create', icon: PlusCircle, color: 'text-emerald-500 bg-emerald-50' },
  { id: 'edit', label: 'Edit', icon: Edit, color: 'text-amber-500 bg-amber-50' },
  { id: 'delete', label: 'Delete', icon: Trash2, color: 'text-rose-500 bg-rose-50' },
];

const RoleForm = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const [permissions, setPermissions] = React.useState(
    initialData?.permissions ||
    modules.reduce((acc, mod) => {
      acc[mod.id] = { view: false, create: false, edit: false, delete: false };
      return acc;
    }, {})
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(roleSchema),
    defaultValues: initialData || {},
  });

  const togglePermission = (moduleId, type) => {
    setPermissions(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [type]: !prev[moduleId][type]
      }
    }));
  };

  const toggleAllInModule = (moduleId) => {
    const allSelected = Object.values(permissions[moduleId]).every(v => v);
    setPermissions(prev => ({
      ...prev,
      [moduleId]: {
        view: !allSelected,
        create: !allSelected,
        edit: !allSelected,
        delete: !allSelected
      }
    }));
  };

  const handleFormSubmit = (data) => {
    onSubmit({ ...data, permissions });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Role Designation"
          placeholder="e.g. Senior Recruiter"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Role Description"
          placeholder="Briefly define the scope of this role..."
          error={errors.description?.message}
          {...register('description')}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center">
            <Lock className="w-4 h-4 mr-2" /> Module Access Control List (ACL)
          </h3>
          <span className="text-[10px] text-slate-400 font-bold uppercase italic">Select permissions for each functional block</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Functional Module</th>
                {permissionTypes.map(type => {
                  const TypeIcon = type.icon;
                  return (
                    <th key={type.id} className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                      <div className="flex flex-col items-center gap-1">
                        <TypeIcon className="w-3 h-3" />
                        <span>{type.label}</span>
                      </div>
                    </th>
                  );
                })}
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Bulk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {modules.map((mod) => (
                <tr key={mod.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-1.5 bg-slate-100 rounded-lg text-slate-500 group-hover:bg-primary-50 group-hover:text-primary-600 transition-all">
                        {(() => {
                          const ModuleIcon = mod.icon;
                          return <ModuleIcon className="w-4 h-4" />;
                        })()}
                      </div>
                      <span className="text-sm font-bold text-slate-700">{mod.label}</span>
                    </div>
                  </td>
                  {permissionTypes.map(type => (
                    <td key={type.id} className="px-4 py-4 text-center">
                      <label className="inline-flex items-center justify-center cursor-pointer p-2 rounded-lg hover:bg-slate-100 transition-all">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded-md border-slate-300 text-primary-600 focus:ring-primary-500"
                          checked={permissions[mod.id][type.id]}
                          onChange={() => togglePermission(mod.id, type.id)}
                        />
                      </label>
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => toggleAllInModule(mod.id)}
                      className="text-[10px] font-black text-primary-600 hover:underline uppercase tracking-tight"
                    >
                      All / None
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-end space-x-4 pt-6 border-t border-slate-100 sticky bottom-0 bg-white">
        <Button variant="secondary" type="button" onClick={onCancel} className="px-8">
          Cancel
        </Button>
        <Button variant="primary" type="submit" isLoading={isLoading} className="px-10 h-12 shadow-lg shadow-primary-200">
          {initialData ? 'Save Changes' : 'Initialize Role'}
        </Button>
      </div>
    </form>
  );
};

export default RoleForm;
