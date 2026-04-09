import React from 'react';
import { Briefcase, MapPin, DollarSign, CheckCircle2, ArrowUpRight, Clock, Activity, Download, Calendar, Building2, TrendingUp, Award, Users } from 'lucide-react';
import DataTable from '../../shared/components/DataTable';
import Badge from '../../shared/components/Badge';
import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import { cn } from '../../shared/utils/cn';

const mockPlacements = [
  {
    id: 'PLC-201',
    candidate: 'John Smith',
    client: 'Google',
    role: 'Lead Cloud Architect',
    startDate: '2026-03-01',
    status: 'Active',
    billing: '$120/hr',
    term: '12 Months'
  },
  {
    id: 'PLC-202',
    candidate: 'Meera Nair',
    client: 'Netflix',
    role: 'Senior Product Manager',
    startDate: '2026-02-15',
    status: 'Active',
    billing: '$140/hr',
    term: '6 Months'
  },
  {
    id: 'PLC-203',
    candidate: 'Deepak Rao',
    client: 'Amazon',
    role: 'SDE III',
    startDate: '2025-10-01',
    status: 'Completed',
    billing: '$110/hr',
    term: 'Permanent'
  }
];

const PlacementList = () => {
  const columns = [
    {
      header: 'Placement Details',
      accessor: 'candidate',
      render: (row) => (
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-primary-600 font-bold border border-slate-200">
            {row.candidate.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800 tracking-tight underline underline-offset-4 decoration-primary-200">{row.candidate}</p>
            <p className="text-[11px] text-slate-400 font-medium">{row.role}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Client & Tenure',
      accessor: 'client',
      render: (row) => (
        <div className="flex flex-col">
          <span className="text-sm font-bold text-slate-700">{row.client}</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{row.term}</span>
        </div>
      )
    },
    {
      header: 'Financial Metrics',
      accessor: 'billing',
      render: (row) => (
        <div className="flex flex-col text-sm border-l-2 border-slate-100 pl-3">
          <span className="font-black text-slate-800">{row.billing}</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">Net Billing Rate</span>
        </div>
      )
    },
    {
      header: 'Engagement Status',
      accessor: 'status',
      render: (row) => (
        <Badge variant={row.status === 'Active' ? 'success' : 'default'} size="md">
          {row.status === 'Active' ? 'Engaged' : 'Terminated'}
        </Badge>
      )
    },
    {
      header: 'Commencement',
      accessor: 'startDate',
      render: (row) => (
        <div className="flex items-center text-xs text-slate-500 font-medium">
          <Calendar className="w-3.5 h-3.5 mr-2" /> {row.startDate}
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
            <Award className="w-8 h-8 mr-3 text-primary-600" />
            Revenue & Placements
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary" className="px-4">
            <Download className="w-4 h-4 mr-2" /> Payroll Export
          </Button>
          <Button variant="primary" className="px-6 h-12 shadow-primary-200">
            <Activity className="w-5 h-5 mr-2" /> Performance Hub
          </Button>
        </div>
      </div>

      {/* Sub-KPI Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-slate-900 to-indigo-900 p-7 rounded-[2rem] shadow-2xl shadow-indigo-100 relative overflow-hidden group">
          <div className="relative z-10 text-white">
            <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-2">Portfolio Value</p>
            <div className="flex items-baseline space-x-2 mb-6">
              <h2 className="text-5xl font-black tracking-tight">$428K</h2>
              <span className="text-xs font-bold text-emerald-400">/ Monthly</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-xs font-bold bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-md">
                <TrendingUp className="w-3.5 h-3.5 mr-2" /> +14.2% MTD
              </div>
              <div className="flex -space-x-2 items-center text-[10px] font-black uppercase tracking-widest text-white/40">
                <span>Live Now</span>
              </div>
            </div>
          </div>
          <Activity className="w-32 h-32 absolute -right-6 -bottom-6 text-white/5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700" />
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Headcount</p>
              <h3 className="text-2xl font-black text-slate-800">142</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Average Margin</p>
              <h3 className="text-2xl font-black text-emerald-600">32.4%</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>

        <Card title="Expiring Contracts" subtitle="Next 30 Days" icon={Clock} className="border-none shadow-none p-0 bg-transparent overflow-visible">
          <div className="space-y-3">
            {[
              { name: 'David Lee', date: 'Apr 12', client: 'Google' },
              { name: 'Sarah Wu', date: 'Apr 18', client: 'Microsoft' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white rounded-3xl border border-slate-100 group hover:border-rose-200 transition-all">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-500 font-black text-[10px]">FIX</div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 uppercase tracking-tight">{item.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.client}</p>
                  </div>
                </div>
                <span className="text-[10px] font-black text-rose-500">{item.date}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Placement List Table */}
      <DataTable
        columns={columns}
        data={mockPlacements}
        searchPlaceholder="Find placement by candidate or client..."
      />
    </div>
  );
};

export default PlacementList;
