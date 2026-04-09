import React, { useState } from 'react';
import { Building2, Plus, Globe, MapPin, MoreHorizontal, ShieldCheck } from 'lucide-react';
import DataTable from '../../shared/components/DataTable';
import Badge from '../../shared/components/Badge';
import Button from '../../shared/components/Button';
import ConfirmModal from '../../shared/components/ConfirmModal';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../shared/utils/cn';
import { toast } from 'react-hot-toast';

const mockCompanies = [
  {
    company_id: 1,
    company_name: 'DISTROM Corp',
    industry: 'Technology Parent',
    website: 'https://distrom.com',
    city: 'San Francisco',
    country: 'USA',
    is_active: true,
    created_at: '2024-01-10 10:00:00'
  },
  {
    company_id: 2,
    company_name: 'Acme Solutions HQ',
    industry: 'Healthcare IT',
    website: 'https://acmehealth.io',
    city: 'Boston',
    country: 'USA',
    is_active: true,
    created_at: '2024-03-22 09:15:00'
  },
  {
    company_id: 3,
    company_name: 'Global Finance LLC',
    industry: 'Fintech',
    website: 'https://gfinance.com',
    city: 'London',
    country: 'UK',
    is_active: false,
    created_at: '2024-02-15 14:30:00'
  }
];

const CompanyList = () => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleCreate = () => navigate('/companies/new');
  const handleView = (row) => navigate(`/companies/${row.company_id}`);
  const handleEdit = (row) => navigate(`/companies/${row.company_id}/edit`);

  const handleDeleteClick = (row) => {
    setSelectedCompany(row);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      toast.success(`${selectedCompany?.company_name} tenant terminated.`);
      setIsDeleteModalOpen(false);
      setSelectedCompany(null);
    } catch {
      toast.error('Failed to terminate tenant.');
    }
  };

  const columns = [
    {
      header: 'Company / Tenant',
      accessor: 'company_name',
      render: (row) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-primary-600 font-bold border border-slate-200 overflow-hidden flex-shrink-0">
            {row.company_name.substring(0, 1)}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800 tracking-tight">{row.company_name}</p>
            <p className="text-[11px] text-slate-400 font-medium">{row.industry || 'No Industry Specified'}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Location',
      accessor: 'city',
      render: (row) => (
        <div className="flex flex-col text-xs font-medium text-slate-600">
          <span className="flex items-center"><MapPin className="w-3 h-3 justify-center mr-1 text-slate-400" /> {row.city || 'N/A'}</span>
          <span className="text-[10px] text-slate-400 uppercase tracking-widest pl-4">{row.country}</span>
        </div>
      )
    },
    {
      header: 'Website',
      accessor: 'website',
      render: (row) => (
        row.website ? (
          <a
            href={row.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-xs font-bold text-primary-600 hover:text-primary-700 hover:underline"
          >
            <Globe className="w-3 h-3 mr-1" /> Visit Site
          </a>
        ) : <span className="text-xs text-slate-400">N/A</span>
      )
    },
    {
      header: 'Status',
      accessor: 'is_active',
      render: (row) => (
        <Badge variant={row.is_active ? 'success' : 'default'} size="md">
          {row.is_active ? 'Active Tenant' : 'Suspended'}
        </Badge>
      )
    },
    {
      header: 'Onboarded At',
      accessor: 'created_at',
      render: (row) => (
        <div className="text-xs text-slate-500 font-medium">
          {new Date(row.created_at).toLocaleDateString()}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center">
            <Building2 className="w-8 h-8 mr-3 text-primary-600" />
            Company Management
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="primary"
            className="px-6 h-12 shadow-primary-200"
            onClick={handleCreate}
          >
            <Plus className="w-5 h-5 mr-2" /> Register New Tenant
          </Button>
        </div>
      </div>



      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Active Tenants', value: '2', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Total Placements (Global)', value: '1,420', icon: Building2, color: 'text-primary-600', bg: 'bg-primary-50' },
          { label: 'Suspended Accounts', value: '1', icon: Globe, color: 'text-slate-500', bg: 'bg-slate-100' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-5 rounded-3xl shadow-premium border border-slate-50 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
              <h3 className={cn("text-2xl font-black", item.color)}>{item.value}</h3>
            </div>
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", item.bg, item.color)}>
              {(() => {
                const ItemIcon = item.icon;
                return <ItemIcon className="w-6 h-6" />;
              })()}
            </div>
          </div>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={mockCompanies}
        searchPlaceholder="Search tenants by name or industry..."
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <ConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Terminate Tenant"
        message={`Are you sure you want to terminate ${selectedCompany?.company_name} and suspend all associated users?`}
        confirmText="Terminate"
      />
    </div>
  );
};

export default CompanyList;
