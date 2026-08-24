import React, { useState } from 'react';
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

interface NavbarProps {
  onRefreshAll?: () => void;
  onToggleMobileMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRefreshAll, onToggleMobileMenu }) => {
  const { currentUser, role, switchUser, switchRole, isClockedIn, setIsClockedIn, clockInTime, setClockInTime } = useAuth();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [resetting, setResetting] = useState(false);

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

      {/* Right Controls */}
      <div className="flex items-center space-x-2 sm:space-x-3.5">
        {/* Attendance Punch Clock Button */}
        <button
          onClick={handleClockToggle}
          className={`flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            isClockedIn
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
              : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200'
          }`}
          title={isClockedIn ? 'Click to clock out' : 'Click to clock in'}
        >
          <Clock className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isClockedIn ? 'text-emerald-600 animate-pulse' : 'text-slate-500'}`} />
          <span className="hidden sm:inline">{isClockedIn ? `Clocked In (${clockInTime || '08:00 AM'})` : 'Clock In Now'}</span>
          <span className="sm:hidden">{isClockedIn ? 'In' : 'Clock'}</span>
        </button>

        {/* Reset Database Button */}
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
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              {currentUser ? currentUser.firstName[0] : 'U'}
            </div>
            <div className="hidden md:block leading-tight">
              <div className="text-xs font-bold text-slate-900">
                {currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Select User'}
              </div>
              <div className="text-[10px] text-slate-500 capitalize">
                {role} • {currentUser?.department || 'Operations'}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showRoleMenu && (
            <div
              className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
              onClick={() => setShowRoleMenu(false)}
            >
              <div className="px-4 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Switch Role / Demo Persona
              </div>

              {/* Admin Persona */}
              <button
                onClick={() => {
                  switchUser('EHR-1001');
                }}
                className={`w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center justify-between text-xs transition-colors ${
                  currentUser?.id === 'EHR-1001' ? 'bg-emerald-50/60 font-bold text-emerald-900' : 'text-slate-700'
                }`}
              >
                <div>
                  <div className="font-semibold text-slate-900">Sophea Chan (HR Admin)</div>
                  <div className="text-[11px] text-slate-500">Full System & Payroll Admin</div>
                </div>
                {currentUser?.id === 'EHR-1001' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              </button>

              {/* Manager Persona */}
              <button
                onClick={() => {
                  switchUser('EHR-1002');
                }}
                className={`w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center justify-between text-xs transition-colors ${
                  currentUser?.id === 'EHR-1002' ? 'bg-emerald-50/60 font-bold text-emerald-900' : 'text-slate-700'
                }`}
              >
                <div>
                  <div className="font-semibold text-slate-900">Vannak Rath (Manager)</div>
                  <div className="text-[11px] text-slate-500">Engineering Lead • Approvals</div>
                </div>
                {currentUser?.id === 'EHR-1002' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              </button>

              {/* Employee Persona */}
              <button
                onClick={() => {
                  switchUser('EHR-1003');
                }}
                className={`w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center justify-between text-xs transition-colors ${
                  currentUser?.id === 'EHR-1003' ? 'bg-emerald-50/60 font-bold text-emerald-900' : 'text-slate-700'
                }`}
              >
                <div>
                  <div className="font-semibold text-slate-900">Darith Sok (Employee)</div>
                  <div className="text-[11px] text-slate-500">Self-Service Portal • Payslips</div>
                </div>
                {currentUser?.id === 'EHR-1003' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              </button>

              {/* Another Employee Persona */}
              <button
                onClick={() => {
                  switchUser('EHR-1004');
                }}
                className={`w-full text-left px-4 py-2.5 hover:bg-slate-50 flex items-center justify-between text-xs transition-colors ${
                  currentUser?.id === 'EHR-1004' ? 'bg-emerald-50/60 font-bold text-emerald-900' : 'text-slate-700'
                }`}
              >
                <div>
                  <div className="font-semibold text-slate-900">Bopha Chea (Employee)</div>
                  <div className="text-[11px] text-slate-500">Design Specialist • Leave Requests</div>
                </div>
                {currentUser?.id === 'EHR-1004' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
