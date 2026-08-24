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

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];

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
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            ElevateHR Live Operations
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Workforce & Operations Center
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Real-time analytics for headcount distribution, pending leave authorizations, payroll projections, and employee compliance.
          </p>
        </div>

        {/* Action Shortcuts */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate('employees')}
            className="flex items-center space-x-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-transform transform active:scale-95 shadow-md shadow-emerald-950/40"
          >
            <UserPlus className="w-4 h-4" />
            <span>Onboard Employee</span>
          </button>
          <button
            onClick={() => onNavigate('payroll')}
            className="flex items-center space-x-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs backdrop-blur-md transition-colors border border-white/10"
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
                <Tooltip
                  formatter={(val: any) => [`$${Number(val).toLocaleString()}`, 'Expenditure']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#fff' }}
                />
                <Bar dataKey="amount" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Headcount by Department */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Department Distribution</h3>
            <p className="text-xs text-slate-500 mb-4">Workforce allocation by business unit</p>
            
            <div className="h-48">
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
                    paddingAngle={4}
                  >
                    {stats.departmentBreakdown.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any, name: any) => [`${val} Employees`, name]}
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
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
