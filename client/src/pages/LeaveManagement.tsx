import React, { useState, useEffect } from 'react';
import {
  CalendarCheck2,
  CheckCircle2,
  XCircle,
  Clock,
  Plus,
  Filter,
  FileSpreadsheet,
  FileText,
  User,
  Calendar,
  AlertCircle,
  MessageSquare
} from 'lucide-react';
import { Badge } from '../components/Badge';
import { Modal } from '../components/Modal';
import { LeaveRequest, Employee } from '../types';
import { api } from '../services/api';
import { exportService } from '../services/exportService';
import { pdfService } from '../services/pdfService';
import { useAuth } from '../context/AuthContext';

export const LeaveManagement: React.FC = () => {
  const { currentUser } = useAuth();
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');

  // Action Modal State
  const [selectedLeave, setSelectedLeave] = useState<LeaveRequest | null>(null);
  const [actionType, setActionType] = useState<'Approved' | 'Rejected'>('Approved');
  const [approverRemarks, setApproverRemarks] = useState('');
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);

  // New Request Modal State
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [newLeaveData, setNewLeaveData] = useState({
    employeeId: '',
    leaveType: 'Annual Leave',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    totalDays: 1,
    reason: ''
  });
  const [submitError, setSubmitError] = useState('');

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const [leaveData, empData] = await Promise.all([
        api.getLeaves({ status: statusFilter }),
        api.getEmployees()
      ]);
      setLeaves(leaveData);
      setEmployees(empData);
      if (empData.length > 0 && !newLeaveData.employeeId) {
        setNewLeaveData(prev => ({ ...prev, employeeId: empData[0].id }));
      }
    } catch (err) {
      console.error('Failed to fetch leaves:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [statusFilter]);

  const handleOpenActionModal = (leave: LeaveRequest, type: 'Approved' | 'Rejected') => {
    setSelectedLeave(leave);
    setActionType(type);
    setApproverRemarks(type === 'Approved' ? 'Approved by Management' : 'Unable to approve due to conflicting schedule');
    setIsActionModalOpen(true);
  };

  const handleConfirmAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLeave) return;
    try {
      await api.updateLeaveStatus(selectedLeave.id, {
        status: actionType,
        approverName: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'HR Manager',
        approverRemarks
      });
      setIsActionModalOpen(false);
      fetchLeaves();
    } catch (err) {
      console.error('Failed to process leave request:', err);
    }
  };

  const handleCreateLeave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    try {
      await api.applyLeave(newLeaveData);
      setIsNewModalOpen(false);
      setNewLeaveData({
        employeeId: employees[0]?.id || '',
        leaveType: 'Annual Leave',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        totalDays: 1,
        reason: ''
      });
      fetchLeaves();
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to submit leave request');
    }
  };

  const pendingCount = leaves.filter(l => l.status === 'Pending').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Leave Approvals & Scheduling</h1>
            {pendingCount > 0 && (
              <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-xs font-bold rounded-full border border-amber-300">
                {pendingCount} Pending
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            1-Click managerial authorization, automated quota deductions, and calendar tracking
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => exportService.exportLeavesToExcel(leaves)}
            className="flex items-center space-x-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-xs transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Export Excel</span>
          </button>
          <button
            onClick={() => pdfService.generateLeaveReportPDF(leaves)}
            className="flex items-center space-x-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-xs transition-colors"
          >
            <FileText className="w-4 h-4 text-rose-600" />
            <span>Export PDF</span>
          </button>
          <button
            onClick={() => setIsNewModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-700/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Submit Leave Request</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-3">
        {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              statusFilter === status
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Leaves Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs">Loading leave requests...</div>
        ) : leaves.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">No leave requests found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3.5">Employee</th>
                  <th className="px-6 py-3.5">Leave Type</th>
                  <th className="px-6 py-3.5">Duration & Dates</th>
                  <th className="px-6 py-3.5">Reason</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Approver / Note</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leaves.map(leave => (
                  <tr key={leave.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{leave.employeeName}</div>
                      <div className="text-xs text-slate-500">{leave.department} • {leave.employeeId}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-slate-800">{leave.leaveType}</span>
                      <div className="text-[11px] text-slate-400">Applied: {leave.appliedDate}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{leave.totalDays} day{leave.totalDays > 1 ? 's' : ''}</div>
                      <div className="text-xs text-slate-500">{leave.startDate} → {leave.endDate}</div>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-600 max-w-xs">{leave.reason}</td>
                    <td className="px-6 py-4">
                      <Badge status={leave.status} />
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {leave.approverName ? (
                        <div>
                          <div className="font-semibold text-slate-700">{leave.approverName}</div>
                          {leave.approverRemarks && (
                            <div className="text-[11px] text-slate-400 italic">"{leave.approverRemarks}"</div>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-400">Pending Review</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {leave.status === 'Pending' ? (
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleOpenActionModal(leave, 'Approved')}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center space-x-1"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => handleOpenActionModal(leave, 'Rejected')}
                            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-semibold border border-rose-200 flex items-center space-x-1"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 font-medium">Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Decision Modal */}
      <Modal
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        title={`${actionType === 'Approved' ? 'Approve' : 'Reject'} Leave Request`}
        subtitle={selectedLeave ? `${selectedLeave.employeeName} — ${selectedLeave.leaveType} (${selectedLeave.totalDays} days)` : ''}
        maxWidth="md"
      >
        <form onSubmit={handleConfirmAction} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Approver Remarks / Reason *
            </label>
            <textarea
              required
              rows={3}
              value={approverRemarks}
              onChange={e => setApproverRemarks(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
              placeholder="Provide comments for employee record..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsActionModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-5 py-2 text-xs font-bold text-white rounded-xl transition-all ${
                actionType === 'Approved'
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-rose-600 hover:bg-rose-700'
              }`}
            >
              Confirm {actionType}
            </button>
          </div>
        </form>
      </Modal>

      {/* Submit Leave Modal */}
      <Modal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        title="Submit Leave Request"
        subtitle="Submit a formal leave request with balance verification"
        maxWidth="lg"
      >
        <form onSubmit={handleCreateLeave} className="space-y-4">
          {submitError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Employee *</label>
            <select
              value={newLeaveData.employeeId}
              onChange={e => setNewLeaveData({ ...newLeaveData, employeeId: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none font-semibold text-slate-700"
            >
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {emp.firstName} {emp.lastName} ({emp.position} - {emp.department})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Leave Category *</label>
            <select
              value={newLeaveData.leaveType}
              onChange={e => setNewLeaveData({ ...newLeaveData, leaveType: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
            >
              <option value="Annual Leave">Annual Leave (18 days/yr standard)</option>
              <option value="Sick Leave">Sick Leave (10 days/yr)</option>
              <option value="Casual Leave">Casual Leave (5 days/yr)</option>
              <option value="Maternity Leave">Maternity Leave (90 days)</option>
              <option value="Unpaid Leave">Unpaid Leave</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Start Date *</label>
              <input
                required
                type="date"
                value={newLeaveData.startDate}
                onChange={e => setNewLeaveData({ ...newLeaveData, startDate: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">End Date *</label>
              <input
                required
                type="date"
                value={newLeaveData.endDate}
                onChange={e => setNewLeaveData({ ...newLeaveData, endDate: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Total Days *</label>
            <input
              required
              type="number"
              min="0.5"
              step="0.5"
              value={newLeaveData.totalDays}
              onChange={e => setNewLeaveData({ ...newLeaveData, totalDays: Number(e.target.value) })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Reason for Leave *</label>
            <textarea
              required
              rows={2}
              value={newLeaveData.reason}
              onChange={e => setNewLeaveData({ ...newLeaveData, reason: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
              placeholder="e.g. Family vacation, medical appointment..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsNewModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-700/20 transition-all"
            >
              Submit Application
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
