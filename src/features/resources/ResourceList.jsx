import React, { useState } from 'react';
import { Users, MapPin, Briefcase, Search, Filter, Plus, Download, MoreHorizontal, Mail, Phone, FileBadge, TrendingUp, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DataTable from '../../shared/components/DataTable';
import Badge from '../../shared/components/Badge';
import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import Input from '../../shared/components/Input';
import ConfirmModal from '../../shared/components/ConfirmModal';
import { cn } from '../../shared/utils/cn';
import { toast } from 'react-hot-toast';

const mockResources = [
  {
    id: 1,
    name: 'Amit Sharma',
    role: 'Senior React Developer',
    experience: '6.5 Years',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
    location: 'Bangalore, India',
    status: 'Bench',
    availability: 'Immediate',
    email: 'amit.sharma@distrom.com',
    phone: '+91 9876543210',
    type: 'InHouse',
    benchSince: '2026-03-01'
  },
  {
    id: 2,
    name: 'Priya Patel',
    role: 'Full Stack Engineer',
    experience: '4.2 Years',
    skills: ['Python', 'Django', 'React', 'PostgreSQL'],
    location: 'Mumbai, India',
    status: 'Bench',
    availability: '2Weeks',
    email: 'priya.patel@distrom.com',
    phone: '+91 9876543211',
    type: 'Bench',
    benchSince: '2026-02-15'
  },
  {
    id: 3,
    name: 'Vikas Gupta',
    role: 'Data Scientist',
    experience: '8.0 Years',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Azure'],
    location: 'Pune, India',
    status: 'Bench',
    availability: 'Immediate',
    email: 'vikas.gupta@distrom.com',
    phone: '+91 9876543212',
    type: 'Vendor',
    benchSince: '2026-03-10'
  },
  {
    id: 4,
    name: 'Anjali Desai',
    role: 'UI/UX Designer',
    experience: '3.5 Years',
    skills: ['Figma', 'Adobe XD', 'Sketch', 'React'],
    location: 'Remote',
    status: 'Bench',
    availability: 'Immediate',
    email: 'anjali.desai@distrom.com',
    phone: '+91 9876543213',
    type: 'InHouse',
    benchSince: '2026-03-20'
  },
  {
    id: 5,
    name: 'Rahul Kumar',
    role: 'DevOps Engineer',
    experience: '5.2 Years',
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
    location: 'Hyderabad, India',
    status: 'On-Site',
    availability: 'Unavailable',
    email: 'rahul.kumar@distrom.com',
    phone: '+91 9876543214',
    type: 'InHouse',
    benchSince: null
  }
];

const ResourceList = () => {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  const handleCreate = () => navigate('/resources/new');
  const handleView = (row) => navigate(`/resources/${row.id}`);
  const handleEdit = (row) => navigate(`/resources/${row.id}/edit`);

  const handleDeleteClick = (row) => {
    setSelectedResource(row);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      toast.success(`${selectedResource?.name} deleted successfully.`);
      setIsDeleteModalOpen(false);
      setSelectedResource(null);
    } catch {
      toast.error('Failed to delete resource.');
    }
  };

  const columns = [
    {
      header: 'Resource',
      accessor: 'name',
      render: (row) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-primary-600 font-bold border border-slate-200">
            {row.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">{row.name}</p>
            <p className="text-[11px] text-slate-400 font-medium">{row.role}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Skills',
      accessor: 'skills',
      render: (row) => (
        <div className="flex flex-wrap gap-1 max-w-[200px]">
          {row.skills.slice(0, 3).map((skill, idx) => (
            <Badge key={idx} variant="primary" size="sm">{skill}</Badge>
          ))}
          {row.skills.length > 3 && <Badge variant="default" size="sm">+{row.skills.length - 3}</Badge>}
        </div>
      )
    },
    {
      header: 'Experience',
      accessor: 'experience',
      render: (row) => (
        <div className="flex flex-col">
          <span className="text-sm font-bold text-slate-700">{row.experience}</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{row.type}</span>
        </div>
      )
    },
    {
      header: 'Location',
      accessor: 'location',
      render: (row) => (
        <div className="flex items-center text-slate-500">
          <MapPin className="w-3.5 h-3.5 mr-1.5 opacity-50" />
          <span className="text-xs font-medium">{row.location}</span>
        </div>
      )
    },
    {
      header: 'Availability',
      accessor: 'availability',
      render: (row) => (
        <Badge
          variant={row.availability === 'Immediate' ? 'success' : row.availability === 'Unavailable' ? 'danger' : 'warning'}
          size="md"
        >
          {row.availability}
        </Badge>
      )
    },
    {
      header: 'Bench Since',
      accessor: 'benchSince',
      render: (row) => (
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Clock className="w-3.5 h-3.5" />
          {row.benchSince ? row.benchSince : 'N/A'}
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
            <Users className="w-8 h-8 mr-3 text-primary-600" />
            Bench Resources
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary" className="px-4">
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
          <Button variant="primary" className="px-6" onClick={handleCreate}>
            <Plus className="w-4 h-4 mr-2" /> Add Resource
          </Button>
        </div>
      </div>



      {/* Analytics Mini-Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Bench', value: '142', sub: '+12 this week', color: 'bg-blue-600' },
          { label: 'Immediate Joiners', value: '58', sub: 'Action required', color: 'bg-emerald-600' },
          { label: 'Awaiting Feedback', value: '24', sub: '3 Pending > 48h', color: 'bg-amber-600' },
          { label: 'Expiring Soon', value: '15', sub: 'Contracts ending', color: 'bg-indigo-600' },
        ].map((stat, i) => (
          <div key={i} className="premium-card p-4 flex items-center space-x-4 border-l-4" style={{ borderColor: 'var(--tw-gradient-from)' }}>
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg", stat.color)}>
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <div className="flex items-baseline space-x-2">
                <h4 className="text-xl font-black text-slate-800">{stat.value}</h4>
                <span className="text-[10px] font-bold text-slate-400 italic">{stat.sub}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Table */}
      <div className="grid grid-cols-1 gap-6">
        <DataTable
          columns={columns}
          data={mockResources}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          searchPlaceholder="Search by name, role or skill..."
          actions={
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={cn(
                  "p-2 rounded-xl border border-slate-200 transition-all",
                  isFilterOpen ? "bg-primary-600 text-white border-primary-600" : "bg-white text-slate-500 hover:bg-slate-50"
                )}
              >
                <Filter className="w-4 h-4" />
              </button>
            </div>
          }
        />
      </div>

      <ConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Resource"
        message={`Are you sure you want to completely remove ${selectedResource?.name} from the roster?`}
      />

      {/* Side Filters Sidebar (Optional Drawer placeholder) */}
      {isFilterOpen && (
        <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-2xl z-[60] border-l border-slate-100 p-6 animate-in slide-in-from-right duration-300">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900">Filters</h3>
            <button onClick={() => setIsFilterOpen(false)} className="text-slate-400 hover:text-slate-600 text-sm font-bold uppercase tracking-widest">Close</button>
          </div>
          <div className="space-y-6">
            <Input label="Primary Skill" placeholder="e.g. React" />
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-700">Availability</label>
              <select className="input-field appearance-none bg-slate-50">
                <option>Any Availability</option>
                <option>Immediate</option>
                <option>2 Weeks</option>
                <option>1 Month</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-700">Years of Experience</label>
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="Min" type="number" />
                <Input placeholder="Max" type="number" />
              </div>
            </div>
            <Button className="w-full mt-4">Apply Filters</Button>
            <button className="w-full text-center text-sm font-bold text-slate-400 hover:text-rose-500 transition-colors">Clear All Filters</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceList;
