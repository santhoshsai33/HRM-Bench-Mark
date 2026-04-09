import React from 'react';
import { BarChart3, Download, TrendingUp, PieChart, FileText, Filter, Users, Briefcase, Send, ChevronRight } from 'lucide-react';
import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '../../shared/utils/cn';

const data = [
   { name: 'Jan', value: 400 },
   { name: 'Feb', value: 300 },
   { name: 'Mar', value: 600 },
   { name: 'Apr', value: 800 },
   { name: 'May', value: 500 },
   { name: 'Jun', value: 900 },
];

const Reports = () => {
   return (
      <div className="space-y-6">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
               <h1 className="text-3xl font-black text-slate-900 flex items-center">
                  <BarChart3 className="w-8 h-8 mr-3 text-primary-600" />
                  Strategic Reports
               </h1>
            </div>
            <div className="flex items-center space-x-3">
               <Button variant="secondary" className="px-4">
                  <Filter className="w-4 h-4 mr-2" /> Custom Filter
               </Button>
               <Button variant="primary" className="px-6 h-12">
                  <Download className="w-5 h-5 mr-2" /> Export Global Data
               </Button>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Bench Utilization Growth" subtitle="Quarterly analytics" icon={TrendingUp}>
               <div className="h-64 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={data}>
                        <defs>
                           <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValue)" />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </Card>

            <Card title="Top Performing Clients" subtitle="By total placements" icon={PieChart}>
               <div className="space-y-4">
                  {[
                     { name: 'Google', value: 45, color: 'bg-blue-500' },
                     { name: 'Microsoft', value: 32, color: 'bg-indigo-500' },
                     { name: 'Netflix', value: 24, color: 'bg-emerald-500' },
                     { name: 'Amazon', value: 18, color: 'bg-amber-500' },
                  ].map((item, i) => (
                     <div key={i} className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-700">{item.name}</span>
                        <div className="flex items-center space-x-3 flex-1 px-8">
                           <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div className={cn("h-full rounded-full", item.color)} style={{ width: `${(item.value / 45) * 100}%` }}></div>
                           </div>
                        </div>
                        <span className="text-sm font-black text-slate-900">{item.value}</span>
                     </div>
                  ))}
               </div>
            </Card>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
               { label: 'Resource Utilization', icon: Users },
               { label: 'Requirement Velocity', icon: Briefcase },
               { label: 'Vendor Scorecards', icon: Send },
            ].map((item, i) => (
               <div key={i} className="p-6 bg-white rounded-3xl border border-slate-100 flex items-center justify-between group hover:border-primary-200 transition-all cursor-pointer">
                  <div className="flex items-center space-x-4">
                     <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:text-primary-600 group-hover:bg-primary-50 transition-all">
                        {(() => {
                           const ItemIcon = item.icon;
                           return <ItemIcon className="w-6 h-6" />;
                        })()}
                     </div>
                     <div>
                        <h4 className="text-sm font-black text-slate-800">{item.label}</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Detailed Report</p>
                     </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary-600 transition-all" />
               </div>
            ))}
         </div>
      </div>
   );
};

export default Reports;
