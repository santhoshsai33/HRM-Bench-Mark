import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../shared/components/Button';
import Badge from '../../shared/components/Badge';
import Card from '../../shared/components/Card';
import ConfirmModal from '../../shared/components/ConfirmModal';
import { toast } from 'react-hot-toast';
import { MapPin, Mail, Phone, Download, Award, FileText, Clock, ArrowLeft, ShieldCheck, Zap, Trash2, Edit } from 'lucide-react';

const ResourceDetail = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

   const confirmDelete = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));
        toast.success(`Resource deleted successfully.`);
        setIsDeleteModalOpen(false);
        navigate('/resources');
      } catch {
        toast.error('Failed to delete resource.');
      }
   };

   // Mock Resource Data
   const resource = {
      id: 1,
      name: 'Amit Sharma',
      role: 'Senior React Developer',
      experience: '6.5 Years',
      type: 'InHouse',
      status: 'Bench',
      availability: 'Immediate',
      email: 'amit.sharma@distrom.com',
      phone: '+91 9876543210',
      location: 'Bangalore, India',
      currentCtc: '14.5 LPA',
      expectedCtc: '18.0 LPA',
      benchSince: '2026-03-01',
      summary: 'Senior Software Engineer with 6+ years of experience specializing in high-performance frontend applications using React and TypeScript. Proven track record of optimizing rendering performance and architecture.',
      skills: ['React', 'TypeScript', 'Redux', 'Node.js', 'Next.js', 'PostgreSQL', 'Tailwind CSS', 'AWS', 'Docker'],
      certifications: [
         { name: 'AWS Certified Developer', date: 'Dec 2024' },
         { name: 'Professional React Architect', date: 'Jan 2025' }
      ],
      experience_list: [
         { company: 'TechNova Solutions', pos: 'Lead Developer', duration: '2022 - Present', desc: 'Leading a team of 5 frontend developers.' },
         { company: 'DataWave Inc', pos: 'Full Stack Engineer', duration: '2020 - 2022', desc: 'Built real-time data pipelines.' }
      ]
   };

   return (
      <div className="space-y-6 animate-in slide-up duration-500 pb-12">
         {/* Back button & Header Actions */}
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <button
               onClick={() => navigate('/resources')}
               className="flex items-center text-sm font-bold text-slate-400 hover:text-primary-600 transition-colors w-fit group"
            >
               <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
               Back to Marketplace
            </button>
             <div className="flex items-center justify-end flex-wrap gap-3">
               <Button variant="secondary" className="px-4 bg-white text-slate-600 border-slate-200">
                  <Download className="w-4 h-4 mr-2" /> Resume
               </Button>
               <Button variant="outline" className="px-4 border-slate-200 hover:border-slate-300" onClick={() => navigate(`/resources/${id || 1}/edit`)}>
                  <Edit className="w-4 h-4 mr-2" /> Edit
               </Button>
               <Button variant="outline" className="px-4 text-rose-600 bg-rose-50 border-rose-100 hover:bg-rose-100" onClick={() => setIsDeleteModalOpen(true)}>
                  <Trash2 className="w-4 h-4 mr-2" /> Delete
               </Button>
               <Button variant="primary" className="px-6 shadow-indigo-100">
                  Allocate Now <Zap className="w-4 h-4 ml-2" />
               </Button>
            </div>
         </div>

         {/* Main Grid Profile Header */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sidebar Bio Card */}
            <Card className="lg:col-span-1 border-none shadow-none bg-white p-0 overflow-visible">
               <div className="relative pt-12 pb-8 px-8 flex flex-col items-center text-center">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-[2rem] bg-gradient-to-tr from-primary-600 to-indigo-700 p-1 shadow-2xl shadow-primary-200">
                     <div className="w-full h-full rounded-[1.8rem] bg-white flex items-center justify-center text-3xl font-black text-primary-600">
                        {resource.name.split(' ').map(n => n[0]).join('')}
                     </div>
                  </div>
                  <div className="mt-8">
                     <h2 className="text-2xl font-black text-slate-800 tracking-tight">{resource.name}</h2>
                     <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">{resource.role}</p>
                     <div className="mt-4 flex flex-wrap justify-center gap-2">
                        <Badge variant="success" size="md">{resource.status}</Badge>
                        <Badge variant="primary" size="md">{resource.type}</Badge>
                     </div>
                  </div>
                  <div className="w-full mt-10 space-y-4 pt-6 border-t border-slate-50">
                     <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                           <Mail className="w-3.5 h-3.5 mr-2" /> Email
                        </div>
                        <span className="font-bold text-slate-700">{resource.email}</span>
                     </div>
                     <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                           <Phone className="w-3.5 h-3.5 mr-2" /> Phone
                        </div>
                        <span className="font-bold text-slate-700">{resource.phone}</span>
                     </div>
                     <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                           <MapPin className="w-3.5 h-3.5 mr-2" /> Location
                        </div>
                        <span className="font-bold text-slate-700">{resource.location}</span>
                     </div>
                  </div>
               </div>
            </Card>

            {/* Content Area */}
            <div className="lg:col-span-2 space-y-6">
               {/* Summary & Skills */}
               <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-premium">
                  <h3 className="text-lg font-black text-slate-800 flex items-center mb-4">
                     <FileText className="w-5 h-5 mr-3 text-primary-600" />
                     Professional Summary
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-medium">
                     {resource.summary}
                  </p>

                  <div className="mt-8">
                     <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Core Skill Competencies</h3>
                     <div className="flex flex-wrap gap-2">
                        {resource.skills.map((skill, i) => (
                           <span key={i} className="px-3 py-1.5 bg-slate-50 border border-slate-100 text-slate-600 text-xs font-bold rounded-xl hover:bg-primary-50 hover:text-primary-600 transition-colors cursor-default">
                              {skill}
                           </span>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Experience & Certs Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card title="Career Timeline" subtitle="Employment history" icon={Clock}>
                     <div className="space-y-6">
                        {resource.experience_list.map((exp, i) => (
                           <div key={i} className="relative pl-6 border-l-2 border-slate-100 space-y-1">
                              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-primary-500 shadow-sm"></div>
                              <p className="text-sm font-black text-slate-800">{exp.pos}</p>
                              <p className="text-[11px] font-bold text-primary-600 uppercase tracking-wider">{exp.company} • {exp.duration}</p>
                              <p className="text-xs text-slate-500 mt-1">{exp.desc}</p>
                           </div>
                        ))}
                     </div>
                  </Card>

                  <Card title="Acclades & Certs" subtitle="Verified badges" icon={Award}>
                     <div className="space-y-3">
                        {resource.certifications.map((cert, i) => (
                           <div key={i} className="flex items-center space-x-3 p-3 bg-slate-50/50 rounded-2xl border border-slate-50 group hover:border-primary-100 hover:bg-primary-50/20 transition-all cursor-default">
                              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary-600">
                                 <ShieldCheck className="w-5 h-5" />
                              </div>
                              <div>
                                 <p className="text-sm font-bold text-slate-800">{cert.name}</p>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{cert.date}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </Card>
               </div>
            </div>
         </div>

         <ConfirmModal 
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={confirmDelete}
            title="Delete Resource"
            message={`Are you sure you want to completely remove ${resource.name} from the roster?`}
            confirmText="Delete"
         />
      </div>
   );
};

export default ResourceDetail;
