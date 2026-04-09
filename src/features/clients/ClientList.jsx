import React, { useState } from 'react';
import { Building2, MapPin, Globe, Search, Plus, MoreHorizontal, ExternalLink, Briefcase, Users, Target } from 'lucide-react';
import DataTable from '../../shared/components/DataTable';
import Badge from '../../shared/components/Badge';
import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import Modal from '../../shared/components/Modal';
import ConfirmModal from '../../shared/components/ConfirmModal';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../shared/utils/cn';
import { toast } from 'react-hot-toast';

const mockClients = [
  {
    id: 1,
    name: 'Google',
    industry: 'Technology',
    location: 'Mountain View, CA',
    website: 'https://google.com',
    activeRequirements: 12,
    placedResources: 45,
    status: 'Active'
  },
  {
    id: 2,
    name: 'Microsoft',
    industry: 'Software',
    location: 'Redmond, WA',
    website: 'https://microsoft.com',
    activeRequirements: 8,
    placedResources: 32,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Netflix',
    industry: 'Entertainment',
    location: 'Los Gatos, CA',
    website: 'https://netflix.com',
    activeRequirements: 5,
    placedResources: 24,
    status: 'Active'
  },
  {
    id: 4,
    name: 'Amazon',
    industry: 'E-commerce',
    location: 'Seattle, WA',
    website: 'https://amazon.com',
    activeRequirements: 15,
    placedResources: 58,
    status: 'Active'
  }
];

const ClientList = () => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const handleCreate = () => navigate('/clients/new');
  const handleView = (row) => navigate(`/clients/${row.id}`); // Or dedicated view page
  const handleEdit = (row) => navigate(`/clients/${row.id}/edit`);
  
  const handleDeleteClick = (row) => {
    setSelectedClient(row);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      // Mock delete
      await new Promise(resolve => setTimeout(resolve, 800));
      toast.success(`${selectedClient?.name} deleted successfully.`);
      setIsDeleteModalOpen(false);
      setSelectedClient(null);
    } catch {
      toast.error('Failed to delete client.');
    }
  };

  const columns = [
    {
      header: 'Client Portfolio',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-primary-600 font-bold border border-slate-200 overflow-hidden flex-shrink-0">
            {row.name.substring(0, 1)}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800 tracking-tight">{row.name}</p>
            <p className="text-[11px] text-slate-400 font-medium">{row.industry}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Headquarters',
      accessor: 'location',
      render: (row) => (
        <div className="flex items-center text-xs text-slate-500 font-medium">
          <MapPin className="w-3.5 h-3.5 mr-2" /> {row.location}
        </div>
      )
    },
    {
      header: 'Market Engagement',
      accessor: 'activeRequirements',
      render: (row) => (
        <div className="flex flex-col">
          <span className="text-sm font-bold text-slate-700">{row.activeRequirements} Open Reqs</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{row.placedResources} Total Placements</span>
        </div>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <Badge variant={row.status === 'Active' ? 'success' : 'default'} size="md">
          {row.status}
        </Badge>
      )
    },
    {
      header: 'Portal',
      accessor: 'website',
      render: (row) => (
        <a
          href={row.website}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg text-slate-400 hover:text-primary-600 hover:bg-primary-50 transition-colors inline-block"
        >
          <Globe className="w-4 h-4" />
        </a>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center">
            <Building2 className="w-8 h-8 mr-3 text-primary-600" />
            Client Portfolio
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary" className="px-4 border-slate-200">
            <ExternalLink className="w-4 h-4 mr-2" /> Account Reports
          </Button>
          <Button
            variant="primary"
            className="px-6 h-12 shadow-primary-200"
            onClick={handleCreate}
          >
            <Plus className="w-5 h-5 mr-2" /> Onboard Client
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Clients', value: '24', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Total Placements', value: '842', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Market Reqs', value: '156', icon: Target, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'YTD Growth', value: '18%', icon: Briefcase, color: 'text-amber-600', bg: 'bg-amber-50' },
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
        data={mockClients}
        searchPlaceholder="Search clients by name, industry or location..."
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <ConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Client"
        message={`Are you sure you want to completely remove ${selectedClient?.name} from the system? This action cannot be undone.`}
      />
    </div>
  );
};

export default ClientList;
