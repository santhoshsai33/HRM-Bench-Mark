import React from 'react';
import { ShieldCheck, Terminal, Download } from 'lucide-react';
import DataTable from '../../shared/components/DataTable';
import Badge from '../../shared/components/Badge';
import Button from '../../shared/components/Button';
import { cn } from '../../shared/utils/cn';

const mockLogs = [
  {
    id: 'LOG-8801',
    user: 'Suresh Kumar',
    email: 'suresh.k@distrom.com',
    action: 'LOGIN_SUCCESS',
    details: 'User logged in via Web Interface (Chrome IP: 192.168.1.1)',
    timestamp: '2026-04-06 10:20:45',
    severity: 'Info'
  },
  {
    id: 'LOG-8802',
    user: 'Meera Nair',
    email: 'meera.n@distrom.com',
    action: 'RESOURCE_CREATED',
    details: 'Added resource "Amit Sharma" (#1) to Bench Ecosystem',
    timestamp: '2026-04-06 10:15:22',
    severity: 'Update'
  },
  {
    id: 'LOG-8803',
    user: 'System Admin',
    email: 'admin@distrom.com',
    action: 'SECURITY_ACCESS_DENIED',
    details: 'Unauthorized API request from unknown source IP: 203.45.1.22',
    timestamp: '2026-04-06 10:02:11',
    severity: 'Critical'
  },
  {
    id: 'LOG-8804',
    user: 'Deepak Rao',
    email: 'deepak.r@vendor.com',
    action: 'SUBMISSION_UPLOADING',
    details: 'Candidate CV uploaded: "CV_RahulKumar_final.pdf"',
    timestamp: '2026-04-06 09:45:00',
    severity: 'Info'
  }
];

const AuditLogs = () => {
  const columns = [
    {
      header: 'Event & Timestamp',
      accessor: 'timestamp',
      render: (row) => (
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-primary-600 bg-primary-50 px-1.5 py-0.5 rounded w-fit mb-1">{row.id}</span>
          <span className="text-sm font-bold text-slate-800">{row.timestamp}</span>
        </div>
      )
    },
    {
      header: 'Principal Identity',
      accessor: 'user',
      render: (row) => (
        <div className="flex flex-col">
          <span className="text-sm font-bold text-slate-800">{row.user}</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{row.email}</span>
        </div>
      )
    },
    {
      header: 'Action Token',
      accessor: 'action',
      render: (row) => (
        <div className="flex items-center text-xs font-black text-slate-600 font-mono bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
          {row.action}
        </div>
      )
    },
    {
      header: 'Event Severity',
      accessor: 'severity',
      render: (row) => (
        <Badge
          variant={row.severity === 'Critical' ? 'danger' : row.severity === 'Update' ? 'indigo' : 'default'}
          size="md"
        >
          {row.severity}
        </Badge>
      )
    },
    {
      header: 'Detailed Metadata',
      accessor: 'details',
      render: (row) => (
        <div className="text-xs text-slate-500 font-medium max-w-[300px]">
          {row.details}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center">
            <ShieldCheck className="w-8 h-8 mr-3 text-slate-900" />
            Audit Log
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary" className="px-4">
            <Download className="w-4 h-4 mr-2" /> Global Export
          </Button>
        </div>
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 mb-8 border border-white/10 shadow-2xl relative overflow-hidden group">
        <div className="relative z-10 flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-3 text-emerald-400 font-black text-xs uppercase tracking-[0.2em] mb-4 outline outline-1 outline-emerald-400 px-3 py-1 rounded w-fit animate-pulse">
              <Terminal className="w-4 h-4" /> System: Stable
            </div>
            <h3 className="text-5xl font-black text-white tracking-tighter">42,801</h3>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Total immutable events recorded this period</p>
          </div>
          <ShieldCheck className="w-40 h-40 absolute -right-6 -bottom-6 text-white/5 group-hover:scale-110 transition-transform duration-700" />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={mockLogs}
        searchPlaceholder="Search audit trails by user, action or IP..."
      />
    </div>
  );
};

export default AuditLogs;
