import React, { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  MoreHorizontal,
  Mail,
  Phone,
  TrendingUp,
  BarChart2,
  Send,
  Star,
  Activity,
  Award
} from 'lucide-react';
import DataTable from '../../shared/components/DataTable';
import Badge from '../../shared/components/Badge';
import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import ConfirmModal from '../../shared/components/ConfirmModal';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../shared/utils/cn';
import { toast } from 'react-hot-toast';

const mockVendors = [
  {
    id: 1,
    name: 'Tech Staffing LLC',
    type: 'Agency',
    poc: 'Sundar P.',
    email: 'sundar@techstaffing.com',
    submissions: 156,
    activeResources: 42,
    performanceScore: 92,
    status: 'Preferred'
  },
  {
    id: 2,
    name: 'Global Talent Corp',
    type: 'Partner',
    poc: 'Satya N.',
    email: 'satya@globaltalent.com',
    submissions: 84,
    activeResources: 28,
    performanceScore: 78,
    status: 'Standard'
  },
  {
    id: 3,
    name: 'DevPool Freelance',
    type: 'Freelance',
    poc: 'Liza Ray',
    email: 'liza@devpool.com',
    submissions: 32,
    activeResources: 5,
    performanceScore: 85,
    status: 'Premium'
  }
];

const VendorList = () => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  const handleCreate = () => navigate('/vendors/new');
  const handleView = (row) => navigate(`/vendors/${row.id}`);
  const handleEdit = (row) => navigate(`/vendors/${row.id}/edit`);

  const handleDeleteClick = (row) => {
    setSelectedVendor(row);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      toast.success(`${selectedVendor?.name} removed from vendor network.`);
      setIsDeleteModalOpen(false);
      setSelectedVendor(null);
    } catch {
      toast.error('Failed to remove vendor.');
    }
  };

  const columns = [
    {
      header: 'Vendor Identity',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-indigo-600 font-bold border-2 border-white shadow-sm overflow-hidden flex-shrink-0">
            {row.name.substring(0, 1)}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800 tracking-tight">{row.name}</p>
            <div className="flex items-center text-[11px] text-slate-400 font-medium">
              <span>POC: {row.poc}</span>
            </div>
          </div>
        </div>
      )
    },
    {
      header: 'Engagement',
      accessor: 'submissions',
      render: (row) => (
        <div className="flex flex-col">
          <span className="text-sm font-bold text-slate-700">{row.submissions} Submissions</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{row.activeResources} Active Resources</span>
        </div>
      )
    },
    {
      header: 'Performance',
      accessor: 'performanceScore',
      render: (row) => (
        <div className="flex flex-col gap-1.5 min-w-[120px]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Score</span>
            <span className={cn("text-xs font-black", row.performanceScore > 80 ? "text-emerald-500" : row.performanceScore > 50 ? "text-amber-500" : "text-rose-500")}>
              {row.performanceScore}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all duration-500", row.performanceScore > 80 ? "bg-emerald-500" : row.performanceScore > 50 ? "bg-amber-500" : "bg-rose-500")}
              style={{ width: `${row.performanceScore}%` }}
            ></div>
          </div>
        </div>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <Badge
          variant={
            row.status === 'Preferred' || row.status === 'Premium' ? 'success' :
              row.status === 'Standard' ? 'primary' : 'danger'
          }
          size="md"
        >
          {row.status}
        </Badge>
      )
    },
    {
      header: 'Actions',
      accessor: 'email',
      render: (row) => (
        <div className="flex items-center space-x-2">
          <button className="p-1.5 rounded-lg text-slate-400 hover:text-primary-600 hover:bg-primary-50 transition-colors">
            <Mail className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-lg text-slate-400 hover:text-primary-600 hover:bg-primary-50 transition-colors">
            <Phone className="w-4 h-4" />
          </button>
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
            <Send className="w-8 h-8 mr-3 text-indigo-600" />
            Vendor
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="primary"
            className="px-6 h-12 bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100"
            onClick={handleCreate}
          >
            <Plus className="w-5 h-5 mr-2" /> Onboard Vendor
          </Button>
        </div>
      </div>



      {/* Vendors Table */}
      <DataTable
        columns={columns}
        data={mockVendors}
        searchPlaceholder="Search vendors..."
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <ConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Remove Vendor"
        message={`Are you sure you want to remove ${selectedVendor?.name}? They will no longer be able to submit API requests or platform access.`}
      />
    </div>
  );
};

export default VendorList;
