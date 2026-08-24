import React from 'react';
import {
  LayoutDashboard,
  Users,
  CalendarCheck2,
  Receipt,
  Clock,
  FileText,
  BarChart3,
  UserCheck,
  Network,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pendingLeavesCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, pendingLeavesCount = 0 }) => {
  const { role } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'manager'] },
    { id: 'employees', label: 'Employee Directory', icon: Users, roles: ['admin', 'manager'] },
    { id: 'leaves', label: 'Leave Management', icon: CalendarCheck2, badge: pendingLeavesCount > 0 ? pendingLeavesCount : undefined, roles: ['admin', 'manager'] },
    { id: 'payroll', label: 'Automated Payroll', icon: Receipt, roles: ['admin'] },
    { id: 'attendance', label: 'Attendance & Time', icon: Clock, roles: ['admin', 'manager'] },
    { id: 'documents', label: 'Document Repository', icon: FileText, roles: ['admin', 'manager'] },
    { id: 'reports', label: 'Reports & Export', icon: BarChart3, roles: ['admin', 'manager'] },
    { id: 'portal', label: 'Employee Self-Service', icon: UserCheck, roles: ['admin', 'manager', 'employee'], highlight: true }
  ];


  const visibleItems = navItems.filter(item => item.roles.includes(role));

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800 select-none min-h-screen">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-emerald-500/20">
            E
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1">
              Elevate<span className="text-emerald-400">HR</span>
            </span>
            <span className="block text-[10px] text-slate-400 font-medium tracking-wide uppercase">
              Operations Cloud
            </span>
          </div>
        </div>
      </div>

      {/* Role Badge Indicator */}
      <div className="px-4 py-3 bg-slate-800/40 border-b border-slate-800/60 flex items-center justify-between">
        <span className="text-xs text-slate-400">Active Mode:</span>
        <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
          role === 'admin' 
            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
            : role === 'manager' 
            ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
        }`}>
          {role}
        </span>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          {role === 'employee' ? 'Self-Service Space' : 'Management & Core'}
        </div>

        {visibleItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30 font-semibold'
                  : item.highlight
                  ? 'text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/40 hover:text-emerald-200 border border-emerald-800/40'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : item.highlight ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className={`px-2 py-0.5 text-xs rounded-full font-bold ${
                  isActive ? 'bg-white text-emerald-700' : 'bg-amber-500 text-slate-950'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Cloud Security & Footer Info */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/30 space-y-2">
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>AES-256 Cloud Encrypted</span>
        </div>
        <div className="text-[11px] text-slate-500">
          ElevateHR v1.0 • Mid-Market Edition
        </div>
      </div>
    </aside>
  );
};
