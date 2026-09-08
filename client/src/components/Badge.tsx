import React from 'react';

interface BadgeProps {
  status: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, className = '' }) => {
  const getStyle = (st: string) => {
    const s = st.toLowerCase();
    if (s === 'active' || s === 'approved' || s === 'verified' || s === 'paid' || s === 'present' || s === 'valid') {
      return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    }
    if (s === 'pending' || s === 'pending verification' || s === 'pending renewal' || s === 'probation' || s === 'late' || s === 'draft' || s === 'expiring soon') {
      return 'bg-amber-50 text-amber-800 border-amber-200';
    }
    if (s === 'rejected' || s === 'archived' || s === 'terminated' || s === 'absent' || s === 'expired') {
      return 'bg-rose-50 text-rose-800 border-rose-200';
    }
    if (s === 'on leave' || s === 'half-day' || s === 'finalized') {
      return 'bg-blue-50 text-blue-800 border-blue-200';
    }
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${getStyle(
        status
      )} ${className}`}
    >
      {status}
    </span>
  );
};
