import React from 'react';

interface BadgeProps {
  status: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, className = '' }) => {
  const getStyle = (st: string) => {
    const s = st.toLowerCase();
    if (s === 'active' || s === 'approved' || s === 'verified' || s === 'paid' || s === 'present') {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
    if (s === 'pending' || s === 'pending verification' || s === 'probation' || s === 'late' || s === 'draft') {
      return 'bg-amber-50 text-amber-700 border-amber-200';
    }
    if (s === 'rejected' || s === 'archived' || s === 'terminated' || s === 'absent') {
      return 'bg-rose-50 text-rose-700 border-rose-200';
    }
    if (s === 'on leave' || s === 'half-day' || s === 'finalized') {
      return 'bg-blue-50 text-blue-700 border-blue-200';
    }
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStyle(
        status
      )} ${className}`}
    >
      <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-current opacity-70"></span>
      {status}
    </span>
  );
};
