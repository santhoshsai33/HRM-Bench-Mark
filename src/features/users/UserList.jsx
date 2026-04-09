import React, { useState } from 'react';
import { Users, ShieldCheck, Plus, MoreVertical, CheckCircle2, XCircle, Key, Mail, Phone, BarChart2, Lock, Search, UserPlus } from 'lucide-react';
import DataTable from '../../shared/components/DataTable';
import Badge from '../../shared/components/Badge';
import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import ConfirmModal from '../../shared/components/ConfirmModal';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../shared/utils/cn';
import { toast } from 'react-hot-toast';

const mockUsers = [
  {
    id: 101,
    name: 'Suresh Kumar',
    email: 'suresh.k@distrom.com',
    role: 'Admin',
    status: 'Active',
    company: 'DISTROM Corp',
    permissions: ['all_access'],
    lastLogin: '2026-04-06 10:20 AM'
  },
  {
    id: 102,
    name: 'Meera Nair',
    email: 'meera.n@distrom.com',
    role: 'HR Manager',
    status: 'Active',
    company: 'DISTROM Corp',
    permissions: ['manage_resources', 'create_requirements'],
    lastLogin: '2026-04-06 09:15 AM'
  },
  {
    id: 103,
    name: 'Rahul Verma',
    email: 'rahul.v@google.com',
    role: 'Client POC',
    status: 'Active',
    company: 'Google',
    permissions: ['view_submissions', 'schedule_interviews'],
    lastLogin: '2026-04-05 04:50 PM'
  },
  {
    id: 104,
    name: 'Deepak Rao',
    email: 'deepak.r@vendor.com',
    role: 'Vendor',
    status: 'Inactive',
    company: 'Tech Staffing LLC',
    permissions: ['submit_candidates'],
    lastLogin: '2026-04-01 11:30 AM'
  }
];

const UserList = () => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleCreate = () => navigate('/users/new');
  const handleView = (row) => navigate(`/users/${row.id}`);
  const handleEdit = (row) => navigate(`/users/${row.id}/edit`);

  const handleDeleteClick = (row) => {
    setSelectedUser(row);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      toast.success(`${selectedUser?.name} deleted successfully.`);
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    } catch {
      toast.error('Failed to delete user.');
    }
  };

  const columns = [
    {
      header: 'Full Name',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-primary-600 font-bold border-2 border-white shadow-sm overflow-hidden flex-shrink-0">
            <div className="w-full h-full bg-gradient-to-tr from-slate-200 to-slate-50 flex items-center justify-center">
              {row.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800 tracking-tight">{row.name}</p>
            <div className="flex items-center space-x-2 text-[11px] text-slate-400 font-medium">
              <Mail className="w-3 h-3" /> <span>{row.email}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'Role & Permissions',
      accessor: 'role',
      render: (row) => (
        <div className="flex flex-col gap-1.5">
          <Badge variant="indigo" size="md">{row.role}</Badge>
          <div className="flex items-center text-[10px] text-slate-400 font-bold uppercase tracking-widest pl-1">
            <Key className="w-3 h-3 mr-1" /> {row.permissions.length} Permissions
          </div>
        </div>
      )
    },
    {
      header: 'Organization',
      accessor: 'company',
      render: (row) => (
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold text-slate-700">{row.company}</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">Member since 2024</span>
        </div>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <div className="flex items-center space-x-2">
          <div className={cn("w-2 h-2 rounded-full", row.status === 'Active' ? "bg-emerald-500 animate-pulse" : "bg-slate-300")}></div>
          <span className={cn("text-xs font-bold uppercase", row.status === 'Active' ? "text-emerald-600" : "text-slate-400")}>
            {row.status}
          </span>
        </div>
      )
    },
    {
      header: 'Last Active',
      accessor: 'lastLogin',
      render: (row) => (
        <div className="flex flex-col text-xs text-slate-500 font-medium">
          <span className="flex items-center"><Lock className="w-3 h-3 mr-1 text-slate-300" /> {row.lastLogin}</span>
        </div>
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
            User Management
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="primary"
            className="px-6 h-12 shadow-primary-200"
            onClick={handleCreate}
          >
            <UserPlus className="w-5 h-5 mr-2" /> Create User
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <DataTable
        columns={columns}
        data={mockUsers}
        searchPlaceholder="Search users by name, role or email..."
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <ConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete User"
        message={`Are you sure you want to revoke access and delete ${selectedUser?.name}?`}
      />
    </div>
  );
};

export default UserList;
