import React, { useState } from 'react';
import { Calendar, Video, Users, ExternalLink, MoreHorizontal, Filter, ChevronRight, Clock, CheckCircle2, XCircle, MapPin, Plus } from 'lucide-react';
import DataTable from '../../shared/components/DataTable';
import Badge from '../../shared/components/Badge';
import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import ConfirmModal from '../../shared/components/ConfirmModal';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../shared/utils/cn';
import { toast } from 'react-hot-toast';

const mockInterviews = [
  {
    id: 'INT-501',
    candidate: 'Amit Sharma',
    client: 'Google',
    requirement: 'Senior React Developer',
    date: '2026-04-06 14:00',
    mode: 'Video',
    round: 'Technical Round 1',
    status: 'Scheduled',
    interviewers: 'Sundar P., Sergey B.'
  },
  {
    id: 'INT-502',
    candidate: 'Priya Patel',
    client: 'Microsoft',
    requirement: 'Backend Developer',
    date: '2026-04-06 16:30',
    mode: 'Video',
    round: 'Final HR Round',
    status: 'Scheduled',
    interviewers: 'Satya N.'
  },
  {
    id: 'INT-503',
    candidate: 'Vikas Gupta',
    client: 'Netflix',
    requirement: 'Data Scientist',
    date: '2026-04-05 10:00',
    mode: 'Voice',
    round: 'Technical Screening',
    status: 'Completed',
    interviewers: 'Reed H.'
  },
  {
    id: 'INT-504',
    candidate: 'Anjali Desai',
    client: 'Adobe',
    requirement: 'UI/UX Designer',
    date: '2026-04-04 11:30',
    mode: 'FaceToFace',
    round: 'Design Portfolio Review',
    status: 'Completed',
    interviewers: 'Shantanu N.'
  }
];

const InterviewList = () => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);

  const handleCreate = () => navigate('/interviews/new');
  const handleView = (row) => navigate(`/interviews/${row.id}`);
  const handleEdit = (row) => navigate(`/interviews/${row.id}/edit`);

  const handleDeleteClick = (row) => {
    setSelectedInterview(row);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      toast.success(`Interview for ${selectedInterview?.candidate} cancelled.`);
      setIsDeleteModalOpen(false);
      setSelectedInterview(null);
    } catch {
      toast.error('Failed to clear interview schedule.');
    }
  };

  const columns = [
    {
      header: 'Time & Candidate',
      accessor: 'candidate',
      render: (row) => (
        <div className="flex items-center space-x-3">
          <div className="flex flex-col items-center justify-center w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex-shrink-0">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{row.date.split(' ')[0].split('-')[2]}</span>
            <span className="text-lg font-black text-primary-600 leading-none">{row.date.split(' ')[1]}</span>
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800 uppercase tracking-tight">{row.candidate}</p>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">{row.client}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Type & Round',
      accessor: 'round',
      render: (row) => (
        <div className="flex flex-col gap-1.5">
          <Badge variant="indigo" size="md">{row.round}</Badge>
          <div className="flex items-center text-[10px] text-slate-400 font-bold uppercase tracking-widest pl-1">
            {row.mode === 'Video' ? <Video className="w-3 h-3 mr-1" /> : row.mode === 'Voice' ? <Clock className="w-3 h-3 mr-1" /> : <MapPin className="w-3 h-3 mr-1" />}
            {row.mode}
          </div>
        </div>
      )
    },
    {
      header: 'Interviewers',
      accessor: 'interviewers',
      render: (row) => (
        <div className="flex items-center space-x-2 text-xs text-slate-500 font-semibold italic">
          <Users className="w-3.5 h-3.5 mr-1 text-slate-400" /> {row.interviewers}
        </div>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <Badge variant={row.status === 'Scheduled' ? 'primary' : 'success'} size="md">
          {row.status}
        </Badge>
      )
    },

  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center">
            <Calendar className="w-8 h-8 mr-3 text-primary-600" />
            Interview Schedule
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary" className="px-4">
            <Calendar className="w-4 h-4 mr-2" /> Calendar View
          </Button>
          <Button
            variant="primary"
            className="px-6 h-12 shadow-primary-200"
            onClick={handleCreate}
          >
            <Plus className="w-5 h-5 mr-2" /> New Interview
          </Button>
        </div>
      </div>



      {/* Main Table */}
      <DataTable
        columns={columns}
        data={mockInterviews}
        searchPlaceholder="Find interview by candidate or client..."
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <ConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Cancel Interview"
        message={`Are you sure you want to cancel the interview for ${selectedInterview?.candidate}? Calendar invites will be automatically revoked.`}
      />
    </div>
  );
};

export default InterviewList;
