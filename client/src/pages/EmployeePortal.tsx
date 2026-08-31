import React, { useState, useEffect, useRef } from 'react';
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
  ShieldCheck,
  Camera,
  X
} from 'lucide-react';
import { Badge } from '../components/Badge';
import { Modal } from '../components/Modal';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { pdfService } from '../services/pdfService';
import { LeaveRequest, PayrollRun, DocumentItem } from '../types';

const PRESET_AVATARS = [
  { label: 'Female 1 (Sophea)', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80' },
  { label: 'Male 1 (Vannak)', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80' },
  { label: 'Male 2 (Jean-Luc)', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80' },
  { label: 'Female 2 (Sarah)', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80' },
  { label: 'Male 3 (Darith)', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80' },
  { label: 'Female 3 (Bopha)', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80' },
  { label: 'Male 4 (Kosal)', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80' },
  { label: 'Female 4 (Sokha)', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80' },
];

export const EmployeePortal: React.FC = () => {
  const { currentUser, isClockedIn, setIsClockedIn, clockInTime, setClockInTime, refreshUser } = useAuth();
  const [myLeaves, setMyLeaves] = useState<LeaveRequest[]>([]);
  const [payrollRuns, setPayrollRuns] = useState<PayrollRun[]>([]);
  const [myDocs, setMyDocs] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Avatar Modal State
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [avatarSaving, setAvatarSaving] = useState(false);
  const avatarFileInputRef = useRef<HTMLInputElement>(null);

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

  const handleAvatarFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Photo size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleOpenAvatarModal = () => {
    setSelectedAvatar(currentUser?.avatar || '');
    setIsAvatarModalOpen(true);
  };

  const handleSaveAvatar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    try {
      setAvatarSaving(true);
      await api.updateEmployee(currentUser.id, { avatar: selectedAvatar });
      await refreshUser();
      setIsAvatarModalOpen(false);
      loadPortalData();
    } catch (err) {
      console.error('Failed to update avatar:', err);
    } finally {
      setAvatarSaving(false);
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
          <div className="relative group cursor-pointer" onClick={handleOpenAvatarModal} title="Click to Change Portrait Photo">
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt={`${currentUser.firstName} ${currentUser.lastName}`}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400 shadow-lg shadow-emerald-500/20 group-hover:brightness-75 transition-all"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-slate-950 font-black text-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:brightness-75 transition-all">
                {currentUser.firstName[0]}
                {currentUser.lastName[0]}
              </div>
            )}
            <div className="absolute inset-0 rounded-2xl bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-5 h-5 text-white drop-shadow" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Employee Self-Service Portal
              </span>
              {currentUser.isForeignWorker ? (
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  🌐 Foreign Worker ({currentUser.nationality})
                </span>
              ) : (
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  🇰🇭 Cambodian National
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Welcome back, {currentUser.firstName}!
              </h1>
              <button
                onClick={handleOpenAvatarModal}
                className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-emerald-300 hover:text-white border border-emerald-500/30 hover:border-emerald-400 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all"
                title="Change your portrait photo"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Change Photo</span>
              </button>
            </div>
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

      {/* Foreign Worker Compliance Alert Banner if applicable */}
      {currentUser.isForeignWorker && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-blue-900">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-blue-950 flex items-center gap-2">
                <span>Cambodia MoLVT Foreign Work Permit Card</span>
                {currentUser.workPermitStatus === 'Valid' && (
                  <span className="text-[10px] px-2 py-0.2 bg-emerald-100 text-emerald-800 rounded font-bold">
                    FWCMS Active
                  </span>
                )}
                {currentUser.workPermitStatus === 'Expiring Soon' && (
                  <span className="text-[10px] px-2 py-0.2 bg-amber-100 text-amber-900 rounded font-bold animate-pulse">
                    Expiring Soon
                  </span>
                )}
              </div>
              <p className="text-slate-600 text-[11px] mt-0.5">
                Card ID: <strong className="font-mono">{currentUser.workPermitNumber || 'FWCMS-PENDING'}</strong> &nbsp;|&nbsp;
                Expires: <strong>{currentUser.workPermitExpiryDate || 'N/A'}</strong> &nbsp;|&nbsp;
                Visa: <strong>{currentUser.visaType || 'EB Business'}</strong> (Exp: {currentUser.visaExpiryDate || 'N/A'})
              </p>
            </div>
          </div>
          <span className="text-[11px] text-blue-700 font-semibold px-2.5 py-1 bg-white rounded-lg border border-blue-200 shadow-2xs">
            Cambodia Labour Law Arts. 261-265
          </span>
        </div>
      )}

      {/* Leave Balances Strip (Cambodia Statutory Leaves) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">My Statutory Leave Quotas & Balances</h3>
            <p className="text-xs text-slate-500">Regulated by Cambodia Labour Law (Articles 166-171, Prakas 267)</p>
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
            <div className="text-xs font-semibold text-emerald-800">Annual Leave (Art. 166)</div>
            <div className="text-2xl font-extrabold text-emerald-600 mt-1">
              {currentUser.leaveBalance?.annual?.remaining || 15} <span className="text-xs font-medium text-emerald-700">days left</span>
            </div>
            <div className="text-[11px] text-emerald-700/80 mt-0.5">
              {currentUser.leaveBalance?.annual?.used || 0} taken of {currentUser.leaveBalance?.annual?.total || 18} days
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-50/50 border border-purple-100">
            <div className="text-xs font-semibold text-purple-800">Special Leave (Prakas 267)</div>
            <div className="text-2xl font-extrabold text-purple-600 mt-1">
              {currentUser.leaveBalance?.special?.remaining ?? currentUser.leaveBalance?.casual?.remaining ?? 6} <span className="text-xs font-medium text-purple-700">days left</span>
            </div>
            <div className="text-[11px] text-purple-700/80 mt-0.5">
              7 days/yr family events (marriage, birth, bereavement)
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100">
            <div className="text-xs font-semibold text-blue-800">Sick Leave (Prakas 084)</div>
            <div className="text-2xl font-extrabold text-blue-600 mt-1">
              {currentUser.leaveBalance?.sick?.remaining || 9} <span className="text-xs font-medium text-blue-700">days left</span>
            </div>
            <div className="text-[11px] text-blue-700/80 mt-0.5">
              {currentUser.leaveBalance?.sick?.used || 0} taken of {currentUser.leaveBalance?.sick?.total || 10} days
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-100">
            <div className="text-xs font-semibold text-amber-800">
              {currentUser.gender === 'Female' ? 'Maternity Leave (Art. 182)' : 'Paternity Leave'}
            </div>
            <div className="text-2xl font-extrabold text-amber-600 mt-1">
              {currentUser.gender === 'Female'
                ? `${currentUser.leaveBalance?.maternity?.remaining || 90} days`
                : `${currentUser.leaveBalance?.paternity?.remaining || 3} days`}
            </div>
            <div className="text-[11px] text-amber-700/80 mt-0.5">
              {currentUser.gender === 'Female' ? '90 calendar days' : '3 days special leave'}
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
            <label className="block text-xs font-semibold text-slate-700 mb-1">Leave Type (Cambodia Labour Law) *</label>
            <select
              value={leaveData.leaveType}
              onChange={e => setLeaveData({ ...leaveData, leaveType: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none font-semibold text-slate-800"
            >
              <option value="Annual Leave">Annual Leave (Art. 166: {currentUser.leaveBalance?.annual?.remaining || 15} days remaining)</option>
              <option value="Special Leave (Family Events)">Special Leave (Prakas 267: {currentUser.leaveBalance?.special?.remaining ?? currentUser.leaveBalance?.casual?.remaining ?? 6} days remaining)</option>
              <option value="Sick Leave">Sick Leave (Prakas 084: {currentUser.leaveBalance?.sick?.remaining || 9} days remaining)</option>
              {currentUser.gender === 'Female' && (
                <option value="Maternity Leave">Maternity Leave (Art. 182: 90 calendar days)</option>
              )}
              {currentUser.gender === 'Male' && (
                <option value="Paternity Leave">Paternity Leave (3 days special leave)</option>
              )}
              <option value="Marriage Leave">Marriage Leave (3 days special leave)</option>
              <option value="Bereavement Leave">Bereavement Leave (3 days special leave)</option>
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

      {/* Change Portrait Photo Modal */}
      <Modal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        title="Update Profile Portrait"
        subtitle={`Employee: ${currentUser.firstName} ${currentUser.lastName} (${currentUser.id})`}
        maxWidth="lg"
      >
        <form onSubmit={handleSaveAvatar} className="space-y-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
            <label className="block text-xs font-bold text-slate-800 mb-2">Live Photo Preview</label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative group shrink-0">
                {selectedAvatar ? (
                  <img
                    src={selectedAvatar}
                    alt="Preview"
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-slate-200 text-slate-500 flex flex-col items-center justify-center text-xs font-semibold border-2 border-dashed border-slate-300">
                    <Camera className="w-6 h-6 mb-1 text-slate-400" />
                    <span>No Photo</span>
                  </div>
                )}
                {selectedAvatar && (
                  <button
                    type="button"
                    onClick={() => setSelectedAvatar('')}
                    className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white rounded-full p-1 shadow-xs hover:bg-rose-700 transition-colors"
                    title="Remove Photo"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              <div className="flex-1 space-y-2.5 text-center sm:text-left w-full">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <input
                    type="file"
                    ref={avatarFileInputRef}
                    onChange={handleAvatarFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => avatarFileInputRef.current?.click()}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-all"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Portrait File</span>
                  </button>
                  <span className="text-[11px] text-slate-400">PNG, JPG, WebP up to 5MB</span>
                </div>

                <div>
                  <span className="text-[11px] text-slate-500 block mb-1 font-medium">Or pick a preset avatar photo:</span>
                  <div className="flex items-center gap-1.5 justify-center sm:justify-start flex-wrap">
                    {PRESET_AVATARS.map((p, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setSelectedAvatar(p.url)}
                        className={`p-0.5 rounded-lg border-2 transition-all ${
                          selectedAvatar === p.url ? 'border-emerald-600 ring-2 ring-emerald-500/30 scale-110' : 'border-transparent opacity-70 hover:opacity-100 hover:border-slate-300'
                        }`}
                        title={p.label}
                      >
                        <img
                          src={p.url}
                          alt={p.label}
                          className="w-7 h-7 rounded-md object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAvatarModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={avatarSaving}
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-700/20 flex items-center gap-1.5"
            >
              {avatarSaving ? <span>Saving...</span> : <span>Save Portrait Photo</span>}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
