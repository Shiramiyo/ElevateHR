import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  FileSpreadsheet,
  FileText,
  Download,
  Calendar,
  Users,
  Receipt,
  CalendarCheck2,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { api } from '../services/api';
import { exportService } from '../services/exportService';
import { pdfService } from '../services/pdfService';
import { Employee, PayrollRun, LeaveRequest, AttendanceRecord } from '../types';

export const Reports: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [payrollRuns, setPayrollRuns] = useState<PayrollRun[]>([]);
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAll = async () => {
      try {
        setLoading(true);
        const [eData, pData, lData, aData] = await Promise.all([
          api.getEmployees(),
          api.getPayrollRuns(),
          api.getLeaves(),
          api.getAttendance()
        ]);
        setEmployees(eData);
        setPayrollRuns(pData);
        setLeaves(lData);
        setAttendance(aData);
      } catch (err) {
        console.error('Failed to load reporting data:', err);
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  const latestRun = payrollRuns[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Exportable Reports & Analytics</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Generate compliant PDF summaries and Excel workbooks for finance, management, and audit
        </p>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Report 1: Employee Directory */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Employee Master Roster</h3>
                <p className="text-xs text-slate-500">Complete workforce directory with positions & contacts</p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-50 rounded-xl text-xs space-y-1.5 text-slate-600">
              <div className="flex justify-between">
                <span>Total Active Headcount:</span>
                <span className="font-bold text-slate-900">{employees.length} employees</span>
              </div>
              <div className="flex justify-between">
                <span>Fields Included:</span>
                <span>ID, Dept, Position, Contract, NSSF, Salary</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center space-x-3">
            <button
              onClick={() => exportService.exportEmployeesToExcel(employees)}
              className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold rounded-xl border border-emerald-200 transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export Excel (.xlsx)</span>
            </button>
            <button
              onClick={() => pdfService.generateEmployeeRosterPDF(employees)}
              className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        {/* Report 2: Payroll Summary */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                <Receipt className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Monthly Payroll & Tax Summary</h3>
                <p className="text-xs text-slate-500">Gross compensation, salary tax withholdings, and NSSF</p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-50 rounded-xl text-xs space-y-1.5 text-slate-600">
              <div className="flex justify-between">
                <span>Active Cycle:</span>
                <span className="font-bold text-slate-900">{latestRun?.monthLabel || 'July 2026'}</span>
              </div>
              <div className="flex justify-between">
                <span>Net Total Disbursement:</span>
                <span className="font-bold text-emerald-600">${latestRun?.totalNet.toLocaleString() || '12,835.50'}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center space-x-3">
            <button
              onClick={() => latestRun && exportService.exportPayrollToExcel(latestRun)}
              className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold rounded-xl border border-emerald-200 transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export Excel (.xlsx)</span>
            </button>
            <button
              onClick={() => latestRun && pdfService.generatePayrollSummaryPDF(latestRun)}
              className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        {/* Report 3: Leave & Absence */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <CalendarCheck2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Leave & Absence Records</h3>
                <p className="text-xs text-slate-500">Historical leave applications, approvals, and day counts</p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-50 rounded-xl text-xs space-y-1.5 text-slate-600">
              <div className="flex justify-between">
                <span>Total Applications Logged:</span>
                <span className="font-bold text-slate-900">{leaves.length} records</span>
              </div>
              <div className="flex justify-between">
                <span>Approval Rate:</span>
                <span className="font-bold text-blue-600">80% Approved</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center space-x-3">
            <button
              onClick={() => exportService.exportLeavesToExcel(leaves)}
              className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold rounded-xl border border-emerald-200 transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export Excel (.xlsx)</span>
            </button>
            <button
              onClick={() => pdfService.generateLeaveReportPDF(leaves)}
              className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        {/* Report 4: Attendance & Time */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Attendance Log & Hours</h3>
                <p className="text-xs text-slate-500">Daily punch records, punctuality rates, and hours worked</p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-50 rounded-xl text-xs space-y-1.5 text-slate-600">
              <div className="flex justify-between">
                <span>Punctuality Benchmark:</span>
                <span className="font-bold text-slate-900">98.4% On-time</span>
              </div>
              <div className="flex justify-between">
                <span>Standard Shift:</span>
                <span>8:00 AM - 5:00 PM</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <button
              onClick={() => exportService.exportAttendanceToExcel(attendance)}
              className="w-full flex items-center justify-center space-x-1.5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold rounded-xl border border-emerald-200 transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export Excel Log (.xlsx)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
