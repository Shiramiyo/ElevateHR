import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  change,
  isPositive = true,
  icon: Icon,
  iconBgColor = 'bg-emerald-50',
  iconColor = 'text-emerald-600',
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</p>
          <h4 className="text-2xl font-bold text-slate-900 mt-1 tracking-tight">{value}</h4>
          {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-xl ${iconBgColor} ${iconColor} group-hover:scale-105 transition-transform`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>

      {change && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center text-xs">
          <span
            className={`font-semibold flex items-center ${
              isPositive ? 'text-emerald-600' : 'text-rose-600'
            }`}
          >
            {isPositive ? '↑' : '↓'} {change}
          </span>
          <span className="text-slate-400 ml-1.5">vs last month</span>
        </div>
      )}
    </div>
  );
};
