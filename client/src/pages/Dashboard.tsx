import React, { useEffect, useState } from 'react';
import {
  Users,
  CalendarCheck2,
  Receipt,
  Clock,
  TrendingUp,
  ArrowRight,
  UserPlus,
  FileSpreadsheet,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  CartesianGrid
} from 'recharts';
import { StatCard } from '../components/StatCard';
import { Badge } from '../components/Badge';
import { DashboardStats, LeaveRequest } from '../types';
import { api } from '../services/api';

const COLORS = ['#2563eb', '#0f766e', '#b45309', '#6366f1', '#475569', '#be185d'];

const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div
        className="bg-slate-900/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl shadow-2xl border border-slate-700/80 pointer-events-none z-50 text-left min-w-[140px]"
        style={{ color: '#ffffff', backgroundColor: '#0f172a' }}
      >
        <div className="font-bold text-xs flex items-center gap-2" style={{ color: '#ffffff' }}>
          <span
            className="w-2.5 h-2.5 rounded-full inline-block shrink-0 shadow-xs"
            style={{ backgroundColor: data.payload.fill || data.color }}
          />
          <span style={{ color: '#ffffff', fontWeight: 700 }}>{data.name}</span>
        </div>
        <div className="text-xs mt-1.5 flex items-baseline gap-1" style={{ color: '#ffffff' }}>
          <span className="font-black text-white" style={{ color: '#ffffff', fontSize: '14px' }}>
            {data.value}
          </span>
          <span style={{ color: '#cbd5e1', fontSize: '11px' }}>
            {data.value === 1 ? 'Employee' : 'Employees'}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

const CustomBarTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div
        className="bg-slate-900/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl shadow-2xl border border-slate-700/80 pointer-events-none z-50 text-left"
        style={{ color: '#ffffff', backgroundColor: '#0f172a' }}
      >
        <div className="text-[11px] font-semibold" style={{ color: '#cbd5e1' }}>
          Month: <span style={{ color: '#ffffff', fontWeight: 700 }}>{label}</span>
        </div>
        <div className="text-xs font-bold mt-1 flex items-center gap-1.5" style={{ color: '#ffffff' }}>
          <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
          <span style={{ color: '#ffffff' }}>Expenditure:</span>
          <span className="font-black text-emerald-400" style={{ color: '#34d399', fontWeight: 800 }}>
            ${Number(data.value).toLocaleString()}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

interface DashboardProps {
  onNavigate: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await api.getStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to load dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleQuickApprove = async (leaveId: string) => {
    try {
      await api.updateLeaveStatus(leaveId, { status: 'Approved', approverRemarks: 'Quick approved from Executive Dashboard' });
      fetchStats();
    } catch (err) {
      console.error('Quick approve failed:', err);
    }
  };

  if (loading || !stats) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-slate-500">Loading HR Analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 md:p-7 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 mb-2">
            ElevateHR Operations
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
            Workforce & Operations Center
          </h1>
          <p className="text-xs text-slate-600 mt-1 max-w-xl">
            Real-time overview of active headcount, pending leave approvals, payroll totals, and employee records.
          </p>
        </div>

        {/* Action Shortcuts */}
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={() => onNavigate('employees')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-xs transition-colors shadow-xs"
          >
            <UserPlus className="w-4 h-4" />
            <span>Onboard Employee</span>
          </button>
          <button
            onClick={() => onNavigate('payroll')}
            className="flex items-center space-x-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-lg text-xs border border-slate-300 transition-colors shadow-xs"
          >
            <Receipt className="w-4 h-4" />
            <span>Process Payroll</span>
          </button>
        </div>
      </div>


      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Active Workforce"
          value={stats.totalEmployees}
          subtitle="Full-time & Probationary"
          change="+12.5%"
          icon={Users}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="On Leave Today"
          value={stats.onLeaveToday}
          subtitle="Approved Absences"
          icon={CalendarCheck2}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Pending Approvals"
          value={stats.pendingLeaves}
          subtitle="Requires Manager Action"
          icon={AlertCircle}
          iconBgColor="bg-amber-50"
          iconColor="text-amber-600"
        />
        <StatCard
          title="Monthly Payroll Run"
          value={`$${stats.monthlyPayrollEstimate.toLocaleString()}`}
          subtitle="Estimated Total Base"
          change="+3.2%"
          icon={Receipt}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payroll Expense Trend */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Payroll Expenditure Trend</h3>
              <p className="text-xs text-slate-500">Monthly gross payroll costs (USD)</p>
            </div>
            <button
              onClick={() => onNavigate('payroll')}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              View Payroll Engine <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.payrollTrends} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  tickFormatter={val => `$${val}`}
                />
                <Tooltip content={<CustomBarTooltip />} wrapperStyle={{ outline: 'none' }} />
                <Bar dataKey="amount" fill="#2563eb" radius={[4, 4, 0, 0]} />

              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Headcount by Department */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Department Distribution</h3>
            <p className="text-xs text-slate-500 mb-4">Workforce allocation by business unit</p>
            
            <div className="relative h-48 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.departmentBreakdown}
                    dataKey="count"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={75}
                    paddingAngle={3}
                  >
                    {stats.departmentBreakdown.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} wrapperStyle={{ outline: 'none' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-extrabold text-slate-900 leading-tight">{stats.totalEmployees}</span>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Staff</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 mt-2 pt-3 border-t border-slate-100">
            {stats.departmentBreakdown.map((dept, index) => (
              <div key={dept.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-slate-600 font-medium">{dept.name}</span>
                </div>
                <span className="font-bold text-slate-900">{dept.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Leave Requests & Action Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recent Leave Submissions</h3>
            <p className="text-xs text-slate-500">Fast-track approval workflow for managers and HR</p>
          </div>
          <button
            onClick={() => onNavigate('leaves')}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            All Requests ({stats.pendingLeaves} pending) <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5">Employee</th>
                <th className="px-6 py-3.5">Type</th>
                <th className="px-6 py-3.5">Duration</th>
                <th className="px-6 py-3.5">Reason</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stats.recentLeaves.map(leave => (
                <tr key={leave.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{leave.employeeName}</div>
                    <div className="text-xs text-slate-500">{leave.department} • {leave.employeeId}</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">{leave.leaveType}</td>
                  <td className="px-6 py-4">
                    <div className="text-slate-900 font-semibold">{leave.totalDays} day{leave.totalDays > 1 ? 's' : ''}</div>
                    <div className="text-xs text-slate-400">{leave.startDate} to {leave.endDate}</div>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-600 max-w-xs truncate">{leave.reason}</td>
                  <td className="px-6 py-4">
                    <Badge status={leave.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    {leave.status === 'Pending' ? (
                      <button
                        onClick={() => handleQuickApprove(leave.id)}
                        className="inline-flex items-center space-x-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium">Processed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
