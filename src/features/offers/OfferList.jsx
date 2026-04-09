import React, { useState } from 'react';
import { FileCheck, DollarSign, CheckCircle2, XCircle, Clock, ShieldCheck, ArrowUpRight, Download, PlusCircle, MoreVertical, Activity } from 'lucide-react';
import DataTable from '../../shared/components/DataTable';
import Badge from '../../shared/components/Badge';
import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import Modal from '../../shared/components/Modal';
import { cn } from '../../shared/utils/cn';
import { toast } from 'react-hot-toast';

const mockOffers = [
  {
    id: 'OFF-1001',
    candidate: 'Amit Sharma',
    client: 'Google',
    req: 'Senior React Developer',
    ctc: '22.5 LPA',
    offerDate: '2026-04-01',
    joiningDate: '2026-05-15',
    status: 'Released',
    validTill: '2026-04-10'
  },
  {
    id: 'OFF-1002',
    candidate: 'Priya Patel',
    client: 'Microsoft',
    req: 'Backend Developer',
    ctc: '18.0 LPA',
    offerDate: '2026-03-25',
    joiningDate: '2026-04-20',
    status: 'Accepted',
    validTill: '2026-03-31'
  },
  {
    id: 'OFF-1003',
    candidate: 'Anjali Desai',
    client: 'Adobe',
    req: 'UI/UX Designer',
    ctc: '15.5 LPA',
    offerDate: '2026-04-03',
    joiningDate: '2026-05-01',
    status: 'Draft',
    validTill: '2026-04-12'
  }
];

const OfferList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = [
    {
      header: 'ID & Candidate',
      accessor: 'candidate',
      render: (row) => (
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-primary-600 bg-primary-50 px-1.5 py-0.5 rounded w-fit mb-1">{row.id}</span>
          <span className="text-sm font-bold text-slate-800">{row.candidate}</span>
          <span className="text-[11px] text-slate-400 font-medium">{row.client} • {row.req}</span>
        </div>
      )
    },
    {
      header: 'Compensation',
      accessor: 'ctc',
      render: (row) => (
        <div className="flex flex-col">
          <span className="text-sm font-black text-slate-700">{row.ctc}</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">Fixed + Variable</span>
        </div>
      )
    },
    {
      header: 'Timeline',
      accessor: 'offerDate',
      render: (row) => (
        <div className="flex flex-col gap-1 text-[11px]">
          <div className="flex items-center text-slate-500 font-medium">
            <Clock className="w-3 h-3 mr-1.5" /> Released: {row.offerDate}
          </div>
          <div className="flex items-center text-emerald-600 font-bold">
            <CheckCircle2 className="w-3 h-3 mr-1.5" /> Joining: {row.joiningDate}
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
            row.status === 'Accepted' || row.status === 'Released' ? 'success' :
              row.status === 'Draft' ? 'warning' : 'default'
          }
          size="md"
        >
          {row.status}
        </Badge>
      )
    },
    {
      header: 'Validity',
      accessor: 'validTill',
      render: (row) => (
        <div className="flex flex-col">
          <span className="text-[11px] font-black text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full w-fit">
            Expires {row.validTill}
          </span>
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
            <FileCheck className="w-8 h-8 mr-3 text-emerald-600" />
            Offers
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="secondary" className="px-4">
            <Activity className="w-4 h-4 mr-2" /> Offer Analytics
          </Button>
          <Button variant="primary" className="px-6 h-12 bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100">
            <PlusCircle className="w-5 h-5 mr-2" /> Draft Offer
          </Button>
        </div>
      </div>

      {/* Financial KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Released', value: '42', color: 'text-blue-600', sub: 'Total this month' },
          { label: 'Accepted', value: '18', color: 'text-emerald-600', sub: 'Success rate: 42%' },
          { label: 'Pending Appr', value: '08', color: 'text-amber-600', sub: 'Action required' },
          { label: 'Avg CTC', value: '14.2', color: 'text-indigo-600', sub: 'Lakhs Per Annum' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-5 rounded-3xl shadow-premium border border-slate-50 relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className={cn("text-3xl font-black mb-1", item.color)}>{item.value}</h4>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
              <p className="text-[10px] font-bold text-slate-400 italic mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {item.sub}
              </p>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-4 text-slate-50 group-hover:scale-125 transition-transform">
              <DollarSign className="w-16 h-16" />
            </div>
          </div>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={mockOffers}
        searchPlaceholder="Find offers by candidate or client..."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Offer Lifecycle" subtitle="Internal Status Tracking" icon={ShieldCheck}>
          <div className="relative pt-4 pl-4 border-l-2 border-slate-100 space-y-8">
            {[
              { step: 'Internal HR Approval', status: 'Completed', date: 'Mar 28', color: 'bg-emerald-500' },
              { step: 'Client Budget Verification', status: 'In-Progress', date: 'Apr 02', color: 'bg-amber-500 animate-pulse' },
              { step: 'Final Release to Candidate', status: 'Pending', date: 'Apr 04', color: 'bg-slate-200' },
            ].map((step, i) => (
              <div key={i} className="relative flex items-center justify-between group cursor-default">
                <div className={cn("absolute -left-[2.3rem] w-6 h-6 rounded-full border-4 border-white shadow-sm", step.color)}></div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{step.step}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{step.status}</p>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">{step.date}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Approval Queue" subtitle="Pending your signature" icon={FileCheck}>
          <div className="space-y-4">
            {[
              { candidate: 'Rahul Kumar', role: 'DevOps Lead', ctc: '28 LPA' },
              { candidate: 'Meera Nair', role: 'Product Manager', ctc: '24 LPA' },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between hover:border-primary-200 transition-colors cursor-pointer group">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[10px] font-black text-primary-600">APP</div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 group-hover:text-primary-600 transition-colors uppercase">{item.candidate}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.role}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="indigo" size="sm">{item.ctc}</Badge>
                  <ArrowUpRight className="w-4 h-4 text-slate-300" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OfferList;
