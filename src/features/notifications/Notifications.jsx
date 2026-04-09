import React from 'react';
import { Bell, CheckCircle2, AlertTriangle, Info, Clock, Search, MoreVertical, XCircle, Briefcase, Users } from 'lucide-react';
import Badge from '../../shared/components/Badge';
import { cn } from '../../shared/utils/cn';

const notifications = [
   {
      id: 1,
      title: 'New Requirement Raised',
      desc: 'Google raised a requirement for "Senior Frontend Engineer"',
      time: '2 mins ago',
      type: 'Update',
      icon: Briefcase,
      color: 'bg-blue-50 text-blue-600',
      read: false
   },
   {
      id: 2,
      title: 'Interview Scheduled',
      desc: 'Technical Round 1 for Amit Sharma (Client: Google) scheduled.',
      time: '45 mins ago',
      type: 'Event',
      icon: Clock,
      color: 'bg-primary-50 text-primary-600',
      read: false
   },
   {
      id: 3,
      title: 'Candidate Placed!',
      desc: 'John Smith has successfully joined Microsoft Cloud team.',
      time: '2 hours ago',
      type: 'Success',
      icon: CheckCircle2,
      color: 'bg-emerald-50 text-emerald-600',
      read: true
   },
   {
      id: 4,
      title: 'SLA Breach Warning',
      desc: 'Requirement REQ-004 has passed its 48h matching SLA.',
      time: '1 day ago',
      type: 'Alert',
      icon: AlertTriangle,
      color: 'bg-rose-50 text-rose-600',
      read: true
   }
];

const Notifications = () => {
   return (
      <div className="space-y-6">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
               <h1 className="text-3xl font-black text-slate-900 flex items-center">
                  <Bell className="w-8 h-8 mr-3 text-primary-600" />
                  Intelligence Center
               </h1>
            </div>
            <div className="flex items-center space-x-3">
               <button className="px-4 py-2 text-xs font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-colors">
                  Mark all as read
               </button>
               <button className="px-4 py-2 text-xs font-black text-slate-400 hover:text-rose-500 uppercase tracking-widest transition-colors">
                  Clear all
               </button>
            </div>
         </div>

         <div className="max-w-4xl space-y-3">
            {notifications.map((notif) => (
               <div key={notif.id} className={cn(
                  "p-6 rounded-3xl border border-slate-100 flex items-start space-x-6 transition-all group cursor-pointer",
                  notif.read ? "bg-white opacity-80" : "bg-white shadow-xl shadow-slate-100 ring-2 ring-primary-500/10"
               )}>
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0", notif.color)}>
                     {(() => {
                       const NotifIcon = notif.icon;
                       return <NotifIcon className="w-6 h-6" />;
                     })()}
                  </div>
                  <div className="flex-grow">
                     <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-black text-slate-800 tracking-tight uppercase">{notif.title}</h4>
                        <Badge variant="default" size="sm" className="bg-slate-50 text-slate-400">{notif.time}</Badge>
                     </div>
                     <p className="text-sm text-slate-500 font-medium leading-relaxed">{notif.desc}</p>

                     <div className="mt-4 flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-[10px] font-black text-primary-600 hover:underline uppercase tracking-widest">
                           Take Action
                        </button>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                        <button className="text-[10px] font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest">
                           Archive
                        </button>
                     </div>
                  </div>
                  {!notif.read && <div className="w-2.5 h-2.5 bg-primary-600 rounded-full animate-pulse mt-2"></div>}
               </div>
            ))}
         </div>
      </div>
   );
};

export default Notifications;
