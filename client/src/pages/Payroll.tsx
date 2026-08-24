import React, { useState, useEffect } from 'react';
import {
  Receipt,
  Calculator,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  FileText,
  Edit3,
  DollarSign,
  AlertCircle,
  Sparkles,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Badge } from '../components/Badge';
import { Modal } from '../components/Modal';
import { PayrollRun, PayrollItem } from '../types';
import { api } from '../services/api';
import { pdfService } from '../services/pdfService';
import { exportService } from '../services/exportService';

export const Payroll: React.FC = () => {
  const [runs, setRuns] = useState<PayrollRun[]>([]);
  const [currentRun, setCurrentRun] = useState<PayrollRun | null>(null);
  const [selectedMonth, setSelectedMonth] = useState('2026-08');
  const [loading, setLoading] = useState(false);
  const [finalizing, setFinalizing] = useState(false);

  // Edit Item Modal
  const [editingItem, setEditingItem] = useState<PayrollItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchPayrollHistory = async () => {
    try {
      setLoading(true);
      const data = await api.getPayrollRuns();
      setRuns(data);
      if (data.length > 0) {
        setCurrentRun(data[0]);
      }
    } catch (err) {
      console.error('Failed to fetch payroll runs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayrollHistory();
  }, []);

  const handleCalculate = async () => {
    try {
      setLoading(true);
      const draft = await api.calculatePayroll(selectedMonth);
      setCurrentRun(draft);
    } catch (err) {
      console.error('Failed to calculate payroll:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFinalize = async () => {
    if (!currentRun) return;
    if (!window.confirm(`Finalize and approve payroll for ${currentRun.monthLabel}? Net total: $${currentRun.totalNet.toLocaleString()}`)) return;

    try {
      setFinalizing(true);
      const finalized = await api.finalizePayroll(currentRun);
      setCurrentRun(finalized);
      fetchPayrollHistory();
      // Celebrate with confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.error('Failed to finalize payroll:', err);
    } finally {
      setFinalizing(false);
    }
  };

  const handleOpenEditItem = (item: PayrollItem) => {
    setEditingItem({ ...item });
    setIsEditModalOpen(true);
  };

  const handleSaveItemEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !currentRun) return;

    // Recalculate this item's gross, tax, and net
    const base = Number(editingItem.baseSalary) || 0;
    const allow = Number(editingItem.allowances) || 0;
    const otHours = Number(editingItem.overtimeHours) || 0;
    const otPay = Number((otHours * (base / 160) * 1.5).toFixed(2));
    const bonus = Number(editingItem.bonus) || 0;
    const gross = Number((base + allow + otPay + bonus).toFixed(2));
    
    // Tax
    let taxRate = 0;
    let taxAmount = 0;
    if (gross > 3125) { taxRate = 20; taxAmount = 318.75 + (gross - 3125) * 0.20; }
    else if (gross > 2125) { taxRate = 15; taxAmount = 168.75 + (gross - 2125) * 0.15; }
    else if (gross > 500) { taxRate = 10; taxAmount = 6.25 + (gross - 500) * 0.10; }
    else if (gross > 375) { taxRate = 5; taxAmount = (gross - 375) * 0.05; }
    taxAmount = Number(taxAmount.toFixed(2));

    const nssf = Number((Math.min(base, 3000) * 0.04).toFixed(2));
    const ded = Number(editingItem.deductions) || 0;
    const net = Number((gross - taxAmount - nssf - ded).toFixed(2));

    const updatedItem: PayrollItem = {
      ...editingItem,
      overtimePay: otPay,
      grossSalary: gross,
      taxRate,
      taxAmount,
      nssfContribution: nssf,
      netPay: net
    };

    const updatedItems = currentRun.items.map(it => it.employeeId === updatedItem.employeeId ? updatedItem : it);
    const totalGross = Number(updatedItems.reduce((s, i) => s + i.grossSalary, 0).toFixed(2));
    const totalNet = Number(updatedItems.reduce((s, i) => s + i.netPay, 0).toFixed(2));
    const totalTax = Number(updatedItems.reduce((s, i) => s + i.taxAmount, 0).toFixed(2));
    const totalNssf = Number(updatedItems.reduce((s, i) => s + i.nssfContribution, 0).toFixed(2));

    setCurrentRun({
      ...currentRun,
      totalGross,
      totalNet,
      totalTax,
      totalNssf,
      items: updatedItems
    });

    setIsEditModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Automated Payroll & Compensation</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated salary calculations factoring progressive tax brackets, 4% NSSF, and overtime multipliers
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Cycle:</span>
            <input
              type="month"
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
              className="text-xs font-bold text-slate-800 bg-transparent focus:outline-none"
            />
          </div>

          <button
            onClick={handleCalculate}
            disabled={loading}
            className="flex items-center space-x-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
          >
            <Calculator className="w-4 h-4 text-emerald-400" />
            <span>Generate Run</span>
          </button>

          {currentRun && (
            <>
              <button
                onClick={() => exportService.exportPayrollToExcel(currentRun)}
                className="flex items-center space-x-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-xs transition-colors"
                title="Export entire run to Excel"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>Export XLSX</span>
              </button>
              <button
                onClick={() => pdfService.generatePayrollSummaryPDF(currentRun)}
                className="flex items-center space-x-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-xs transition-colors"
                title="Export Payroll Summary PDF"
              >
                <FileText className="w-4 h-4 text-rose-600" />
                <span>Export PDF</span>
              </button>
            </>
          )}
        </div>
      </div>

      {currentRun && (
        <>
          {/* Summary Metric Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs font-semibold uppercase text-slate-400">Total Gross Payroll</span>
              <div className="text-xl font-extrabold text-slate-900 mt-1">${currentRun.totalGross.toLocaleString()}</div>
              <span className="text-[11px] text-slate-500">Includes OT & Allowances</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs font-semibold uppercase text-slate-400">Total Net Disbursement</span>
              <div className="text-xl font-extrabold text-emerald-600 mt-1">${currentRun.totalNet.toLocaleString()}</div>
              <span className="text-[11px] text-emerald-700 font-medium">To be disbursed via ABA/Bank</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs font-semibold uppercase text-slate-400">Salary Tax Withheld</span>
              <div className="text-xl font-extrabold text-rose-600 mt-1">${currentRun.totalTax.toLocaleString()}</div>
              <span className="text-[11px] text-slate-500">Cambodian Tax on Salary</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
              <span className="text-xs font-semibold uppercase text-slate-400">NSSF Contribution</span>
              <div className="text-xl font-extrabold text-blue-600 mt-1">${currentRun.totalNssf.toLocaleString()}</div>
              <span className="text-[11px] text-slate-500">Statutory Health & Pension</span>
            </div>
          </div>

          {/* Payroll Run Status & Finalize Action Banner */}
          <div className="bg-gradient-to-r from-emerald-900 to-slate-900 rounded-2xl p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <Receipt className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-base">{currentRun.monthLabel} Payroll Run</h3>
                  <Badge status={currentRun.status} />
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  Processed by {currentRun.processedBy} on {currentRun.processedDate} • {currentRun.items.length} employee records
                </p>
              </div>
            </div>

            {currentRun.status === 'Draft' ? (
              <button
                onClick={handleFinalize}
                disabled={finalizing}
                className="flex items-center space-x-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-emerald-950/40 transition-transform transform active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{finalizing ? 'Finalizing...' : 'Finalize & Approve Payroll Run'}</span>
              </button>
            ) : (
              <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-300 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Finalized & Paid</span>
              </div>
            )}
          </div>

          {/* Detailed Calculation Breakdown Table */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Individual Compensation & Breakdown</h3>
                <p className="text-xs text-slate-500">Granular earnings, tax rates, and PDF payslip generation</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100">
                  <tr>
                    <th className="px-4 py-3.5">Employee</th>
                    <th className="px-3 py-3.5">Base</th>
                    <th className="px-3 py-3.5">Allowances</th>
                    <th className="px-3 py-3.5">OT (hrs)</th>
                    <th className="px-3 py-3.5">Gross Pay</th>
                    <th className="px-3 py-3.5">Tax (USD)</th>
                    <th className="px-3 py-3.5">NSSF (4%)</th>
                    <th className="px-3 py-3.5">Net Pay</th>
                    <th className="px-3 py-3.5">Status</th>
                    <th className="px-4 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentRun.items.map(item => (
                    <tr key={item.employeeId} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="font-bold text-slate-900">{item.employeeName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{item.employeeId} • {item.department}</div>
                      </td>
                      <td className="px-3 py-3.5 font-medium">${item.baseSalary.toFixed(2)}</td>
                      <td className="px-3 py-3.5 text-slate-600">${item.allowances.toFixed(2)}</td>
                      <td className="px-3 py-3.5 text-slate-600">
                        {item.overtimeHours > 0 ? (
                          <span className="font-semibold text-emerald-700">
                            {item.overtimeHours}h (${item.overtimePay.toFixed(2)})
                          </span>
                        ) : (
                          '0h'
                        )}
                      </td>
                      <td className="px-3 py-3.5 font-bold text-slate-900">${item.grossSalary.toFixed(2)}</td>
                      <td className="px-3 py-3.5 font-semibold text-rose-600">
                        ${item.taxAmount.toFixed(2)} ({item.taxRate}%)
                      </td>
                      <td className="px-3 py-3.5 text-blue-600 font-medium">${item.nssfContribution.toFixed(2)}</td>
                      <td className="px-3 py-3.5 font-extrabold text-emerald-700 text-sm">
                        ${item.netPay.toFixed(2)}
                      </td>
                      <td className="px-3 py-3.5">
                        <Badge status={item.paymentStatus} />
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          {currentRun.status === 'Draft' && (
                            <button
                              onClick={() => handleOpenEditItem(item)}
                              className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Manual Adjustments / Overrides"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                          )}
                          <button
                            onClick={() => pdfService.generatePayslipPDF(item, currentRun.monthLabel)}
                            className="inline-flex items-center space-x-1 px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg font-semibold border border-emerald-200 transition-colors shadow-2xs"
                            title="Download PDF Payslip"
                          >
                            <Download className="w-3 h-3" />
                            <span>Payslip</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Manual Adjustment Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Adjust Compensation: ${editingItem?.employeeName}`}
        subtitle={`ID: ${editingItem?.employeeId}`}
        maxWidth="md"
      >
        {editingItem && (
          <form onSubmit={handleSaveItemEdit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Base Salary (USD)</label>
              <input
                type="number"
                value={editingItem.baseSalary}
                onChange={e => setEditingItem({ ...editingItem, baseSalary: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Fixed Allowances (USD)</label>
              <input
                type="number"
                value={editingItem.allowances}
                onChange={e => setEditingItem({ ...editingItem, allowances: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Overtime Hours (1.5x)</label>
              <input
                type="number"
                min="0"
                value={editingItem.overtimeHours}
                onChange={e => setEditingItem({ ...editingItem, overtimeHours: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Performance Bonus (USD)</label>
              <input
                type="number"
                min="0"
                value={editingItem.bonus}
                onChange={e => setEditingItem({ ...editingItem, bonus: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Deductions / Unpaid Leave (USD)</label>
              <input
                type="number"
                min="0"
                value={editingItem.deductions}
                onChange={e => setEditingItem({ ...editingItem, deductions: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl"
              >
                Apply Adjustments
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
