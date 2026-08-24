import React, { useState, useEffect } from 'react';
import {
  Clock,
  Calendar,
  Receipt,
  FileText,
  Upload,
  Download,
  Plus,
  CheckCircle2,
  AlertCircle,
  Laptop,
  Building,
  User,
  ShieldCheck
} from 'lucide-react';
import { Badge } from '../components/Badge';
import { Modal } from '../components/Modal';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { pdfService } from '../services/pdfService';
import { LeaveRequest, PayrollRun, DocumentItem } from '../types';

export const EmployeePortal: React.FC = () => {
  const { currentUser, isClockedIn, setIsClockedIn, clockInTime, setClockInTime, refreshUser } = useAuth();
  const [myLeaves, setMyLeaves] = useState<LeaveRequest[]>([]);
  const [payrollRuns, setPayrollRuns] = useState<PayrollRun[]>([]);
  const [myDocs, setMyDocs] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Apply Leave Modal
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [leaveData, setLeaveData] = useState({
    leaveType: 'Annual Leave',
    startDate: '2026-08-28',
    endDate: '2026-08-29',
    totalDays: 2,
    reason: ''
  });
  const [applyError, setApplyError] = useState('');
  const [applySuccess, setApplySuccess] = useState(false);

  // Upload Doc Modal
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [docUpload, setDocUpload] = useState({
    docType: 'NSSF Card',
    fileName: '',
    category: 'Identification'
  });

  const loadPortalData = async () => {
    if (!currentUser) return;
    try {
      setLoading(true);
      const [leaves, runs, docs] = await Promise.all([
        api.getLeaves({ employeeId: currentUser.id }),
        api.getPayrollRuns(),
        api.getDocuments({ employeeId: currentUser.id })
      ]);
      setMyLeaves(leaves);
      setPayrollRuns(runs);
      setMyDocs(docs);
    } catch (err) {
      console.error('Failed to load portal data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPortalData();
  }, [currentUser]);

  const handlePunchClock = async (action: 'clock-in' | 'clock-out') => {
    if (!currentUser) return;
    try {
      await api.clockAttendance(currentUser.id, action);
      if (action === 'clock-in') {
        const timeNow = new Date().toLocaleTimeString();
        setClockInTime(timeNow);
        setIsClockedIn(true);
      } else {
        setIsClockedIn(false);
      }
    } catch (err) {
      console.error('Punch clock error:', err);
    }
  };

  const handleApplyLeave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setApplyError('');
    setApplySuccess(false);

    try {
      await api.applyLeave({
        employeeId: currentUser.id,
        leaveType: leaveData.leaveType,
        startDate: leaveData.startDate,
        endDate: leaveData.endDate,
        totalDays: Number(leaveData.totalDays),
        reason: leaveData.reason
      });
      setApplySuccess(true);
      setTimeout(() => {
        setIsApplyModalOpen(false);
        setApplySuccess(false);
      }, 1200);
      loadPortalData();
      refreshUser();
    } catch (err: any) {
      setApplyError(err.message || 'Failed to submit request');
    }
  };

  const handleUploadDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    try {
      await api.uploadDocument({
        employeeId: currentUser.id,
        docType: docUpload.docType,
        fileName: docUpload.fileName || `${currentUser.firstName}_${docUpload.docType.replace(/\s+/g, '_')}.pdf`,
        category: docUpload.category
      });
      setIsDocModalOpen(false);
      loadPortalData();
    } catch (err) {
      console.error('Doc upload error:', err);
    }
  };

  // Find user payslip items in past payroll runs
  const myPayslips = payrollRuns.flatMap(run =>
    run.items
      .filter(item => item.employeeId === currentUser?.id)
      .map(item => ({ ...item, monthLabel: run.monthLabel, status: run.status }))
  );

  if (!currentUser) return null;

  return (
    <div className="space-y-6 pb-12">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-slate-950 font-black text-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            {currentUser.firstName[0]}
            {currentUser.lastName[0]}
          </div>
          <div>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Employee Self-Service Portal
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1">
              Welcome back, {currentUser.firstName}!
            </h1>
            <p className="text-xs text-slate-300 mt-0.5">
              {currentUser.position} • {currentUser.department} • ID: <span className="font-mono">{currentUser.id}</span>
            </p>
          </div>
        </div>

        {/* Punch Clock Widget */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center space-x-4">
          <div>
            <div className="text-[11px] text-slate-300 uppercase font-semibold">Today's Attendance</div>
            <div className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
              <span className={`w-2.5 h-2.5 rounded-full ${isClockedIn ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`}></span>
              {isClockedIn ? `Clocked In at ${clockInTime || '08:00 AM'}` : 'Not Clocked In'}
            </div>
          </div>
          <button
            onClick={() => handlePunchClock(isClockedIn ? 'clock-out' : 'clock-in')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all shadow-md ${
              isClockedIn
                ? 'bg-rose-500 hover:bg-rose-600 text-white'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
            }`}
          >
            {isClockedIn ? 'Clock Out' : 'Clock In'}
          </button>
        </div>
      </div>

      {/* Leave Balances Strip */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">My Leave Quotas & Balances</h3>
            <p className="text-xs text-slate-500">Statutory entitlements for the 2026 calendar year</p>
          </div>
          <button
            onClick={() => setIsApplyModalOpen(true)}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Apply for Leave</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100">
            <div className="text-xs font-semibold text-emerald-800">Annual Leave</div>
            <div className="text-2xl font-extrabold text-emerald-600 mt-1">
              {currentUser.leaveBalance?.annual?.remaining || 15} <span className="text-xs font-medium text-emerald-700">days left</span>
            </div>
            <div className="text-[11px] text-emerald-700/80 mt-0.5">
              {currentUser.leaveBalance?.annual?.used || 0} taken of {currentUser.leaveBalance?.annual?.total || 18} days
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100">
            <div className="text-xs font-semibold text-blue-800">Sick Leave</div>
            <div className="text-2xl font-extrabold text-blue-600 mt-1">
              {currentUser.leaveBalance?.sick?.remaining || 9} <span className="text-xs font-medium text-blue-700">days left</span>
            </div>
            <div className="text-[11px] text-blue-700/80 mt-0.5">
              {currentUser.leaveBalance?.sick?.used || 0} taken of {currentUser.leaveBalance?.sick?.total || 10} days
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-50/50 border border-purple-100">
            <div className="text-xs font-semibold text-purple-800">Casual Leave</div>
            <div className="text-2xl font-extrabold text-purple-600 mt-1">
              {currentUser.leaveBalance?.casual?.remaining || 5} <span className="text-xs font-medium text-purple-700">days left</span>
            </div>
            <div className="text-[11px] text-purple-700/80 mt-0.5">
              {currentUser.leaveBalance?.casual?.used || 0} taken of {currentUser.leaveBalance?.casual?.total || 5} days
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-100">
            <div className="text-xs font-semibold text-amber-800">Base Compensation</div>
            <div className="text-2xl font-extrabold text-amber-600 mt-1">
              ${currentUser.baseSalary.toLocaleString()}
            </div>
            <div className="text-[11px] text-amber-700/80 mt-0.5">
              Paid monthly via {currentUser.bankName}
            </div>
          </div>
        </div>
      </div>

      {/* Grid: My Leave History & My Payslips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Leave Requests */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between">
          <div>
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">My Leave Applications</h3>
                <p className="text-xs text-slate-500">Track managerial approval status & history</p>
              </div>
            </div>

            {myLeaves.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">No leave requests logged yet.</div>
            ) : (
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {myLeaves.map(l => (
                  <div key={l.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-xs text-slate-900">{l.leaveType}</span>
                        <Badge status={l.status} />
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {l.startDate} to {l.endDate} ({l.totalDays} day{l.totalDays > 1 ? 's' : ''})
                      </div>
                      <div className="text-[11px] text-slate-400 italic mt-0.5">"{l.reason}"</div>
                    </div>
                    {l.approverRemarks && (
                      <div className="text-right text-[11px] text-emerald-700 font-medium">
                        Approved: {l.approverRemarks}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* My Payslips */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between">
          <div>
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">My Monthly Payslips</h3>
                <p className="text-xs text-slate-500">Confidential earnings & tax breakdown PDFs</p>
              </div>
            </div>

            {myPayslips.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">No payslips issued yet.</div>
            ) : (
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {myPayslips.map((ps, idx) => (
                  <div key={idx} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-xs text-slate-900">{ps.monthLabel}</span>
                        <Badge status={ps.paymentStatus} />
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Gross: ${ps.grossSalary.toFixed(2)} | Net Take-Home: <strong className="text-emerald-700">${ps.netPay.toFixed(2)}</strong>
                      </div>
                    </div>
                    <button
                      onClick={() => pdfService.generatePayslipPDF(ps, ps.monthLabel)}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold border border-emerald-200 shadow-2xs transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* My Documents & NSSF Verification */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">My Compliance Documents</h3>
            <p className="text-xs text-slate-500">NSSF card, National ID, employment agreement, and qualifications</p>
          </div>
          <button
            onClick={() => setIsDocModalOpen(true)}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
          >
            <Upload className="w-4 h-4 text-emerald-400" />
            <span>Upload Document</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {myDocs.map(doc => (
            <div key={doc.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">{doc.docType}</span>
                  <Badge status={doc.status} />
                </div>
                <div className="text-xs text-slate-500 font-mono mt-1 truncate">{doc.fileName}</div>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400">
                <span>{doc.uploadedAt}</span>
                <span className="text-emerald-700 font-semibold">{doc.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Apply Leave Modal */}
      <Modal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        title="Apply for Time Off / Leave"
        subtitle={`Logged in as ${currentUser.firstName} ${currentUser.lastName}`}
        maxWidth="md"
      >
        <form onSubmit={handleApplyLeave} className="space-y-4">
          {applyError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{applyError}</span>
            </div>
          )}

          {applySuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Leave request submitted successfully!</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Leave Type *</label>
            <select
              value={leaveData.leaveType}
              onChange={e => setLeaveData({ ...leaveData, leaveType: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
            >
              <option value="Annual Leave">Annual Leave ({currentUser.leaveBalance?.annual?.remaining || 15} days remaining)</option>
              <option value="Sick Leave">Sick Leave ({currentUser.leaveBalance?.sick?.remaining || 9} days remaining)</option>
              <option value="Casual Leave">Casual Leave ({currentUser.leaveBalance?.casual?.remaining || 5} days remaining)</option>
              {currentUser.gender === 'Female' && <option value="Maternity Leave">Maternity Leave (90 days)</option>}
              <option value="Unpaid Leave">Unpaid Leave</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Start Date *</label>
              <input
                required
                type="date"
                value={leaveData.startDate}
                onChange={e => setLeaveData({ ...leaveData, startDate: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">End Date *</label>
              <input
                required
                type="date"
                value={leaveData.endDate}
                onChange={e => setLeaveData({ ...leaveData, endDate: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Requested Days *</label>
            <input
              required
              type="number"
              min="0.5"
              step="0.5"
              value={leaveData.totalDays}
              onChange={e => setLeaveData({ ...leaveData, totalDays: Number(e.target.value) })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Reason / Notes *</label>
            <textarea
              required
              rows={2}
              value={leaveData.reason}
              onChange={e => setLeaveData({ ...leaveData, reason: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
              placeholder="e.g. Family trip, urgent personal errands..."
            />
          </div>

          <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsApplyModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-700/20"
            >
              Submit Application
            </button>
          </div>
        </form>
      </Modal>

      {/* Upload Doc Modal */}
      <Modal
        isOpen={isDocModalOpen}
        onClose={() => setIsDocModalOpen(false)}
        title="Upload Document"
        subtitle="Upload your ID, NSSF card or certificate"
        maxWidth="md"
      >
        <form onSubmit={handleUploadDoc} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Document Type *</label>
            <select
              value={docUpload.docType}
              onChange={e => setDocUpload({ ...docUpload, docType: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
            >
              <option value="NSSF Card">NSSF Card</option>
              <option value="National ID / Passport">National ID / Passport</option>
              <option value="CV / Resume">CV / Resume</option>
              <option value="Certificate">Certificate</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">File Name *</label>
            <input
              required
              type="text"
              placeholder="e.g. My_Passport_Copy.pdf"
              value={docUpload.fileName}
              onChange={e => setDocUpload({ ...docUpload, fileName: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsDocModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-700/20"
            >
              Upload
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
