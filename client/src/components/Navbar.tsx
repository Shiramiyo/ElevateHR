import React, { useState, useEffect } from 'react';
import {
  Bell,
  Clock,
  RotateCcw,
  User,
  ChevronDown,
  LogOut,
  ShieldCheck,
  Briefcase,
  CheckCircle2,
  Menu
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Employee } from '../types';

interface NavbarProps {
  onRefreshAll?: () => void;
  onToggleMobileMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRefreshAll, onToggleMobileMenu }) => {
  const { currentUser, role, switchUser, isClockedIn, setIsClockedIn, clockInTime, setClockInTime } = useAuth();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [employeesList, setEmployeesList] = useState<Employee[]>([]);

  useEffect(() => {
    api.getEmployees().then(setEmployeesList).catch(console.error);
  }, [showRoleMenu]);

  const handleClockToggle = async () => {
    if (!currentUser) return;
    try {
      const action = isClockedIn ? 'clock-out' : 'clock-in';
      await api.clockAttendance(currentUser.id, action);
      if (action === 'clock-in') {
        const now = new Date().toLocaleTimeString();
        setClockInTime(now);
        setIsClockedIn(true);
      } else {
        setIsClockedIn(false);
      }
    } catch (err) {
      console.error('Failed to clock in/out:', err);
    }
  };

  const handleResetDemo = async () => {
    if (!window.confirm('Reset all demo data (employees, leaves, payroll, attendance) to initial baseline?')) return;
    try {
      setResetting(true);
      await api.resetDemoData();
      if (onRefreshAll) onRefreshAll();
      window.location.reload();
    } catch (err) {
      console.error('Failed to reset demo:', err);
    } finally {
      setResetting(false);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/90 px-4 md:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Mobile Hamburger & Environment Badge */}
      <div className="flex items-center space-x-3">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200"
            title="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold px-2 py-1 rounded-lg bg-slate-100 text-slate-600 border border-slate-200 truncate max-w-[150px] sm:max-w-none">
            🏢 ElevateHR Demo
          </span>
          <span className="text-xs text-slate-400 hidden lg:inline">
            System: <strong>Monday, Aug 24, 2026</strong>
          </span>
        </div>
      </div>

      {/* Right Controls: Punch Clock & Persona Switcher */}
      <div className="flex items-center space-x-3">
        {/* Punch Clock Quick Button */}
        <button
          onClick={handleClockToggle}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border shadow-2xs ${
            isClockedIn
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
          }`}
          title="Toggle Daily Attendance Clock In / Out"
        >
          <Clock className={`w-3.5 h-3.5 ${isClockedIn ? 'text-emerald-600 animate-pulse' : 'text-slate-400'}`} />
          <span className="hidden sm:inline">
            {isClockedIn ? `In (${clockInTime || '08:00'})` : 'Clock In'}
          </span>
          <span className="sm:hidden">
            {isClockedIn ? 'In' : 'Clock'}
          </span>
        </button>

        {/* Reset Demo Button */}
        <button
          onClick={handleResetDemo}
          disabled={resetting}
          className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200"
          title="Reset database to seed records"
        >
          <RotateCcw className={`w-3.5 h-3.5 ${resetting ? 'animate-spin' : ''}`} />
          <span>Reset Demo</span>
        </button>

        {/* Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center space-x-2 p-1.5 sm:pr-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all text-left"
          >
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.firstName}
                className="w-8 h-8 rounded-lg object-cover border border-slate-200 shadow-2xs"
              />
            ) : (
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                {currentUser ? currentUser.firstName[0] : 'U'}
              </div>
            )}
            <div className="hidden md:block leading-tight">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                <span>{currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Select User'}</span>
              </div>
              <div className="text-[10px] text-slate-500 capitalize">
                {role} • {currentUser?.department || 'Operations'}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showRoleMenu && (
            <div
              className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
            >
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <span>Switch User / Persona</span>
                <span className="text-[10px] font-mono text-slate-400">{employeesList.length || 6} Profiles</span>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
                {employeesList.length > 0 ? (
                  employeesList.map(emp => (
                    <button
                      key={emp.id}
                      onClick={() => {
                        switchUser(emp.id);
                        setShowRoleMenu(false);
                      }}
                      className={`w-full text-left px-3.5 py-2.5 hover:bg-slate-50 flex items-center justify-between text-xs transition-colors ${
                        currentUser?.id === emp.id ? 'bg-emerald-50/70 font-bold text-emerald-950' : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        {emp.avatar ? (
                          <img
                            src={emp.avatar}
                            alt={emp.firstName}
                            className="w-7 h-7 rounded-lg object-cover border border-slate-200 shrink-0"
                          />
                        ) : (
                          <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[10px] shrink-0">
                            {emp.firstName[0]}
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-slate-900 flex items-center gap-1">
                            <span>{emp.firstName} {emp.lastName}</span>
                            {emp.isForeignWorker && (
                              <span className="text-[9px] px-1 py-0.2 bg-blue-50 text-blue-700 rounded border border-blue-200 font-semibold">
                                Expat
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-500 capitalize">
                            <span className="font-semibold text-slate-700">{emp.role}</span> • {emp.position}
                          </div>
                        </div>
                      </div>
                      {currentUser?.id === emp.id && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />}
                    </button>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-slate-400">Loading profiles...</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
