import React, { useState } from 'react';
import { Briefcase, Clock, MapPin, Building2, Plus, Download, MoreHorizontal, PlusCircle, Clock3, CheckCircle2, AlertTriangle, TrendingUp } from 'lucide-react';
import DataTable from '../../shared/components/DataTable';
import Badge from '../../shared/components/Badge';
import Button from '../../shared/components/Button';
import ConfirmModal from '../../shared/components/ConfirmModal';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../shared/utils/cn';
import { toast } from 'react-hot-toast';

const mockRequirements = [
  {
    id: 'REQ-001',
    client: 'Google',
    title: 'Senior Frontend Engineer',
    skills: ['React', 'TypeScript', 'Tailwind'],
    experience: '5-8 Years',
    location: 'Mountain View, CA',
    mode: 'Hybrid',
    status: 'Open',
    priority: 'High',
    positions: 3,
    budget: '$150k - $180k',
    created: '2026-03-25'
  },
  {
    id: 'REQ-002',
    client: 'Microsoft',
    title: 'Backend Developer',
    skills: ['Node.js', 'PostgreSQL', 'Redis'],
    experience: '4-6 Years',
    location: 'Remote',
    mode: 'Remote',
    status: 'InProgress',
    priority: 'Normal',
    positions: 5,
    budget: '$130k - $160k',
    created: '2026-03-28'
  },
  {
    id: 'REQ-003',
    client: 'Netflix',
    title: 'Senior Data Analyst',
    skills: ['Python', 'SQL', 'Tableau'],
    experience: '6-10 Years',
    location: 'Los Gatos, CA',
    mode: 'On-Site',
    status: 'PendingApproval',
    priority: 'Urgent',
    positions: 2,
    budget: '$170k - $210k',
    created: '2026-04-01'
  },
  {
    id: 'REQ-004',
    client: 'Amazon',
    title: 'Software Development Engineer II',
    skills: ['Java', 'Spring Boot', 'AWS'],
    experience: '4+ Years',
    location: 'Seattle, WA',
    mode: 'On-Site',
    status: 'Open',
    priority: 'Normal',
    positions: 10,
    budget: '$140k - $175k',
    created: '2026-04-03'
  }
];

const RequirementList = () => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState(null);

  const handleCreate = () => navigate('/requirements/new');
  const handleView = (row) => navigate(`/requirements/${row.id}`); // This could just be a view page or edit page
  const handleEdit = (row) => navigate(`/requirements/${row.id}/edit`);

  const handleDeleteClick = (row) => {
    setSelectedRequirement(row);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      toast.success(`${selectedRequirement?.title} requirement deleted successfully.`);
      setIsDeleteModalOpen(false);
      setSelectedRequirement(null);
    } catch {
      toast.error('Failed to delete requirement.');
    }
  };

  const columns = [
    {
      header: 'ID & Title',
      accessor: 'title',
      render: (row) => (
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black text-primary-600 bg-primary-50 px-1.5 py-0.5 rounded w-fit">{row.id}</span>
          <span className="text-sm font-bold text-slate-800">{row.title}</span>
          <div className="flex items-center text-[11px] text-slate-400 font-medium">
            <Building2 className="w-3 h-3 mr-1" /> {row.client}
          </div>
        </div>
      )
    },
    {
      header: 'Mandatory Skills',
      accessor: 'skills',
      render: (row) => (
        <div className="flex flex-wrap gap-1 max-w-[200px]">
          {row.skills.map((skill, idx) => (
            <Badge key={idx} variant="indigo" size="sm">{skill}</Badge>
          ))}
        </div>
      )
    },
    {
      header: 'Location & Mode',
      accessor: 'location',
      render: (row) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center text-slate-600">
            <MapPin className="w-3.5 h-3.5 mr-1.5 opacity-50" />
            <span className="text-xs font-semibold">{row.location}</span>
          </div>
          <Badge variant="primary" size="sm" className="w-fit">{row.mode}</Badge>
        </div>
      )
    },
    {
      header: 'SLA & Status',
      accessor: 'status',
      render: (row) => (
        <div className="flex flex-col gap-2">
          <Badge
            variant={
              row.status === 'Open' ? 'success' :
                row.status === 'InProgress' ? 'primary' :
                  row.status === 'PendingApproval' ? 'warning' : 'default'
            }
            size="md"
          >
            {row.status}
          </Badge>
          <div className="flex items-center text-[10px] text-slate-400 font-bold uppercase tracking-widest pl-1">
            <Clock3 className="w-3 h-3 mr-1 text-rose-500" /> SLA: 3d Left
          </div>
        </div>
      )
    },
    {
      header: 'Priority',
      accessor: 'priority',
      render: (row) => (
        <Badge
          variant={row.priority === 'Urgent' ? 'danger' : row.priority === 'High' ? 'warning' : 'default'}
          size="sm"
          className="uppercase"
        >
          {row.priority}
        </Badge>
      )
    },
    {
      header: 'Budget Range',
      accessor: 'budget',
      render: (row) => (
        <div className="text-sm font-black text-slate-700">
          {row.budget}
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
            <Briefcase className="w-8 h-8 mr-3 text-primary-600" />
            Requirements
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="primary"
            className="px-6 h-12 shadow-md"
            onClick={handleCreate}
          >
            <PlusCircle className="w-5 h-5 mr-2" /> New Requirement
          </Button>
        </div>
      </div>



      <DataTable
        columns={columns}
        data={mockRequirements}
        searchPlaceholder="Find requirements by ID, Client or Title..."
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <ConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Requirement"
        message={`Are you sure you want to delete ${selectedRequirement?.title}?`}
      />
    </div>
  );
};

export default RequirementList;
