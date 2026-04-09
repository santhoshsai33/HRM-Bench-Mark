import React, { useState } from 'react';
import { ShieldCheck, Plus, Lock, } from 'lucide-react';
import DataTable from '../../shared/components/DataTable';
import Badge from '../../shared/components/Badge';
import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import ConfirmModal from '../../shared/components/ConfirmModal';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../shared/utils/cn';
import { toast } from 'react-hot-toast';

// Icon definition at top to avoid hoisting issues
const TrendingUp = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const mockRoles = [
  {
    id: 1,
    name: 'Super Admin',
    description: 'Unhindered access to all system modules and security settings.',
    userCount: 3,
    status: 'System Restricted',
    permissions: 44 // All
  },
  {
    id: 2,
    name: 'HR Manager',
    description: 'Full control over Talent Pool and Requirement lifecycle.',
    userCount: 8,
    status: 'Active',
    permissions: 28
  },
  {
    id: 3,
    name: 'Recruiter',
    description: 'Read talent, create submissions and schedule interviews.',
    userCount: 24,
    status: 'Active',
    permissions: 12
  },
  {
    id: 4,
    name: 'Vendor Partner',
    description: 'Limited access to submit candidates and view their specific pipeline.',
    userCount: 56,
    status: 'Active',
    permissions: 4
  }
];

const RoleList = () => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleCreate = () => navigate('/roles/new');
  const handleView = (row) => navigate(`/roles/${row.id}`);
  const handleEdit = (row) => navigate(`/roles/${row.id}/edit`);

  const handleDeleteClick = (row) => {
    setSelectedRole(row);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      toast.success(`${selectedRole?.name} role deleted successfully.`);
      setIsDeleteModalOpen(false);
      setSelectedRole(null);
    } catch {
      toast.error('Failed to delete role.');
    }
  };

  const columns = [
    {
      header: 'Designation & Scope',
      accessor: 'name',
      render: (row) => (
        <div className="flex flex-col">
          <span className="text-sm font-black text-slate-800 tracking-tight flex items-center">
            {row.name}
            {row.status === 'System Restricted' && <Lock className="w-3 h-3 ml-2 text-slate-400" />}
          </span>
          <span className="text-[11px] text-slate-400 font-medium max-w-[250px] line-clamp-1">{row.description}</span>
        </div>
      )
    },
    {
      header: 'Assigned Users',
      accessor: 'userCount',
      render: (row) => (
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-2 overflow-hidden">
            {[...Array(Math.min(row.userCount, 3))].map((_, i) => (
              <div key={i} className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-slate-500 uppercase">
                {String.fromCharCode(65 + i)}
              </div>
            ))}
            {row.userCount > 3 && (
              <div className="w-6 h-6 rounded-full bg-primary-50 border-2 border-white flex items-center justify-center text-[8px] font-bold text-primary-600">
                +{row.userCount - 3}
              </div>
            )}
          </div>
          <span className="text-xs font-bold text-slate-500">{row.userCount} Active Users</span>
        </div>
      )
    },
    {
      header: 'Granularity',
      accessor: 'permissions',
      render: (row) => (
        <div className="flex items-center">
          <div className="w-16 h-1.5 bg-slate-100 rounded-full mr-3 overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(row.permissions / 44) * 100}%` }}></div>
          </div>
          <span className="text-[11px] font-black text-slate-600 uppercase italic">{row.permissions} Rules</span>
        </div>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <Badge
          variant={row.status === 'Active' ? 'success' : 'primary'}
          size="md"
          className={cn(row.status === 'System Restricted' && "bg-slate-100 text-slate-500 border-slate-200")}
        >
          {row.status}
        </Badge>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center">
            <ShieldCheck className="w-8 h-8 mr-3 text-primary-600" />
            Role Management
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="primary"
            className="px-6 h-12 shadow-primary-200"
            onClick={handleCreate}
          >
            <Plus className="w-5 h-5 mr-2" /> New Role
          </Button>
        </div>
      </div>



      <DataTable
        columns={columns}
        data={mockRoles}
        searchPlaceholder="Search roles by designation..."
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <ConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Role"
        message={`Are you sure you want to permanently delete the ${selectedRole?.name} role? Users assigned to this role will lose access.`}
      />
    </div>
  );
};

export default RoleList;
