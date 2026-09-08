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
  ShieldAlert,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pendingLeavesCount?: number;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  pendingLeavesCount = 0,
  mobileOpen,
  setMobileOpen
}) => {
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

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileOpen(false);
  };

  const sidebarContent = (
    <div className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800 select-none h-full">
      {/* Brand Header */}
      <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800 bg-slate-950">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-base shadow-xs">
            E
          </div>
          <div>
            <span className="font-bold text-base tracking-tight text-white">
              Elevate<span className="text-slate-300">HR</span>
            </span>
            <span className="block text-[10px] text-slate-400 font-medium tracking-wide uppercase">
              Management Platform
            </span>
          </div>
        </div>

        {/* Mobile Close Button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Role Badge Indicator */}
      <div className="px-5 py-3 bg-slate-950 border-b border-slate-800/80 flex items-center justify-between">
        <span className="text-xs text-slate-400">Viewing As:</span>
        <span className="text-xs px-2.5 py-0.5 rounded-md font-medium capitalize bg-slate-800 text-slate-200 border border-slate-700">
          {role === 'admin' ? 'HR Administrator' : role}
        </span>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          {role === 'employee' ? 'Self-Service' : 'Workspace'}
        </div>

        {visibleItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className={`px-2 py-0.2 rounded text-xs font-semibold ${
                  isActive ? 'bg-white text-blue-700' : 'bg-amber-500 text-slate-950'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-800 bg-slate-950 text-xs text-slate-500">
        <div>ElevateHR System</div>
        <div className="text-[11px] text-slate-500 mt-0.5">Version 1.2</div>
      </div>
    </div>
  );


  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:flex md:h-screen md:sticky md:top-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer Slide */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-slate-900 z-10 shadow-2xl animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
