import React from 'react';
import { Users, Briefcase, TrendingUp, CheckCircle2, UserPlus, ArrowUpRight, ArrowDownRight, TrendingDown, Building2, CalendarDays } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';
import { cn } from '../../shared/utils/cn';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];

const pieData = [
  { name: 'Bench', value: 45, color: '#3b82f6' },
  { name: 'On-Site', value: 25, color: '#10b981' },
  { name: 'Hybrid', value: 20, color: '#f59e0b' },
  { name: 'Remote', value: 10, color: '#ef4444' },
];

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }) => (
  <div className="premium-card p-6 rounded-2xl group cursor-pointer hover:translate-y-[-2px]">
    <div className="flex items-start justify-between">
      <div className={cn("p-3 rounded-xl transition-colors", color)}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className={cn("flex items-center space-x-1 px-2 py-0.5 rounded-full text-sm font-medium", trend === 'up' ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50")}>
        {trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
        <span>{trendValue}%</span>
      </div>
    </div>
    <div className="mt-4">
      <h3 className="text-sm font-medium text-slate-500">{title}</h3>
      <p className="text-3xl font-bold text-slate-800 mt-1">{value}</p>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 border-l-4 border-primary-500 pl-4">Dashboard</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <CalendarDays className="w-4 h-4 mr-2" /> Last 40 Days
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Resources" value="1,280" icon={Users} trend="up" trendValue="12.5" color="bg-blue-500 shadow-blue-500/20" />
        <StatCard title="Bench Strength" value="142" icon={Briefcase} trend="down" trendValue="4.2" color="bg-indigo-500 shadow-indigo-500/20" />
        <StatCard title="Active Requirements" value="86" icon={TrendingUp} trend="up" trendValue="18.1" color="bg-emerald-500 shadow-emerald-500/20" />
        <StatCard title="Placements Rate" value="78%" icon={CheckCircle2} trend="up" trendValue="5.4" color="bg-amber-500 shadow-amber-500/20" />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 premium-card p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Placement Performance</h3>
              <p className="text-sm text-slate-400">Trend over the last 6 months</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="flex items-center text-xs font-semibold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-md">
                +15.2% Growth
              </span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', background: '#fff' }}
                />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="premium-card p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-2">Resource Allocation</h3>
          <p className="text-sm text-slate-400 mb-8">Breakdown by current work mode</p>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={65}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs font-medium text-slate-500">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Requirements */}
        <div className="premium-card overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800">Hot Requirements</h3>
            <button className="text-primary-600 text-sm font-semibold hover:underline">View All</button>
          </div>
          <div className="divide-y divide-slate-50">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Senior React Developer</p>
                    <p className="text-xs text-slate-400 font-medium">Tech Mahindra • Hybrid • 2 Days ago</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-600 font-bold mb-1">High Priority</span>
                  <p className="text-[10px] text-slate-400 font-medium">8 Positions left</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submission Activity */}
        <div className="premium-card overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800">Recent Activities</h3>
            <button className="text-primary-600 text-sm font-semibold hover:underline">Full Audit</button>
          </div>
          <div className="p-6">
            <div className="space-y-6 relative before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
              {[
                { time: '10 Mins ago', title: 'New Submission', desc: 'Arun K submitted to Google L5 role.', color: 'bg-blue-500' },
                { time: '45 Mins ago', title: 'Interview Scheduled', desc: 'Suraj Mehta • AWS Solutions Architect.', color: 'bg-indigo-500' },
                { time: '2 Hours ago', title: 'Status Update', desc: 'Ravi Teja rejected by Microsoft HR.', color: 'bg-rose-500' },
                { time: '4 Hours ago', title: 'Offer Released', desc: 'Priya Sharma • Senior QA at Adobe.', color: 'bg-emerald-500' },
              ].map((item, idx) => (
                <div key={idx} className="relative pl-8">
                  <div className={cn("absolute left-0 top-1 w-5 h-5 rounded-full border-4 border-white shadow-sm", item.color)}></div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 leading-none mb-1">{item.time}</p>
                  <p className="text-sm font-bold text-slate-800">{item.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
