import React, { useState } from 'react';
import { FileText, CheckCircle2, Clock, XCircle, Send, MessageSquare, ChevronRight, MoreVertical, Plus } from 'lucide-react';
import Badge from '../../shared/components/Badge';
import Button from '../../shared/components/Button';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../shared/utils/cn';
import { toast } from 'react-hot-toast';

const pipelineStages = [
   { id: 'Submitted', label: 'CV Submitted', color: 'bg-blue-100 text-blue-700' },
   { id: 'Shortlisted', label: 'Shortlisted', color: 'bg-indigo-100 text-indigo-700' },
   { id: 'InterviewScheduled', label: 'Interviewing', color: 'bg-primary-100 text-primary-700' },
   { id: 'InterviewCompleted', label: 'Interview Done', color: 'bg-violet-100 text-violet-700' },
   { id: 'OfferMade', label: 'Offer Released', color: 'bg-emerald-100 text-emerald-700' },
   { id: 'Placed', label: 'Placed', color: 'bg-emerald-600 text-white' },
];

const mockSubmissions = [
   {
      id: 'SUB-1201',
      resource: 'Amit Sharma',
      requirement: 'Senior React Developer',
      client: 'Google',
      status: 'Submitted',
      date: '2h ago',
      avatar: 'AS'
   },
   {
      id: 'SUB-1202',
      resource: 'Priya Patel',
      requirement: 'Backend Developer',
      client: 'Microsoft',
      status: 'Shortlisted',
      date: '4h ago',
      avatar: 'PP'
   },
   {
      id: 'SUB-1203',
      resource: 'Vikas Gupta',
      requirement: 'Data Scientist',
      client: 'Netflix',
      status: 'InterviewScheduled',
      date: 'Yesterday',
      avatar: 'VG'
   },
   {
      id: 'SUB-1204',
      resource: 'Anjali Desai',
      requirement: 'UI/UX Designer',
      client: 'Adobe',
      status: 'OfferMade',
      date: '1 day ago',
      avatar: 'AD'
   }
];

const SubmissionPipeline = () => {
   const navigate = useNavigate();

   const handleCreate = () => {
      navigate('/submissions/new');
   };

   const handleEdit = (id) => {
      navigate(`/submissions/${id}/edit`);
   };

   return (
      <div className="space-y-6">
         {/* Header */}
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
               <h1 className="text-3xl font-black text-slate-900 flex items-center">
                  <FileText className="w-8 h-8 mr-3 text-primary-600" />
                  Submission Pipeline
               </h1>
            </div>
            <div className="flex items-center space-x-3">
               <Button variant="secondary" className="px-4 border-slate-200">
                  Kanban View
               </Button>
               <Button
                  variant="primary"
                  className="px-6 h-12 shadow-primary-200"
                  onClick={handleCreate}
               >
                  <Plus className="w-5 h-5 mr-2" /> New Submission
               </Button>
            </div>
         </div>



         {/* Pipeline Board */}
         <div className="flex overflow-x-auto pb-6 space-x-4 custom-scrollbar">
            {pipelineStages.map((stage) => (
               <div key={stage.id} className="min-w-[280px] flex-shrink-0">
                  <div className="flex items-center justify-between mb-4 px-2">
                     <div className="flex items-center space-x-2">
                        <h3 className="text-sm font-black text-slate-700 uppercase tracking-wider">{stage.label}</h3>
                        <span className="w-5 h-5 bg-slate-200 text-slate-600 text-[10px] font-bold rounded-full flex items-center justify-center">
                           {mockSubmissions.filter(s => s.status === stage.id).length}
                        </span>
                     </div>
                     <button className="text-slate-400 hover:text-slate-600">
                        <MoreVertical className="w-4 h-4" />
                     </button>
                  </div>

                  <div className="space-y-3">
                     {mockSubmissions.filter(s => s.status === stage.id).map((sub) => (
                        <div key={sub.id} onClick={() => handleEdit(sub.id)} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group border-l-4 border-l-primary-500">
                           <div className="flex justify-between items-start mb-3">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{sub.id}</span>
                              <span className="text-[10px] font-bold text-slate-400 flex items-center italic">
                                 <Clock className="w-3 h-3 mr-1" /> {sub.date}
                              </span>
                           </div>
                           <h4 className="text-sm font-bold text-slate-800 group-hover:text-primary-600 transition-colors uppercase">{sub.resource}</h4>
                           <p className="text-xs text-slate-500 mt-1 font-medium">{sub.requirement}</p>
                           <p className="text-[10px] font-black text-primary-600 mt-2 bg-primary-50 px-1.5 py-0.5 rounded w-fit">{sub.client}</p>

                           <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                              <div className="flex -space-x-2 overflow-hidden">
                                 <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[8px] font-bold text-slate-500">
                                    {sub.avatar}
                                 </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                 <button className="text-slate-300 hover:text-primary-500 transition-colors">
                                    <MessageSquare className="w-4 h-4" />
                                 </button>
                                 <ChevronRight className="w-4 h-4 text-slate-300" />
                              </div>
                           </div>
                        </div>
                     ))}
                     {mockSubmissions.filter(s => s.status === stage.id).length === 0 && (
                        <div className="h-24 border-2 border-dashed border-slate-100 rounded-xl flex items-center justify-center">
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Drop here</p>
                        </div>
                     )}
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

// Reusable Button component for this scope if not imported
// const Button = ({ variant, className, children }) => {
//    const base = "inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-bold transition-all";
//    const variants = {
//       primary: "bg-primary-600 text-white hover:bg-primary-700 shadow-md",
//       secondary: "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
//    };
//    return <button className={cn(base, variants[variant], className)}>{children}</button>
// }

export default SubmissionPipeline;
