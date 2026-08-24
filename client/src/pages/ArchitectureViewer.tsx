import React, { useState } from 'react';
import {
  Network,
  Database,
  Server,
  Monitor,
  Mail,
  Lock,
  Layers,
  ArrowDown,
  ArrowRight,
  Shield,
  FileCode2,
  CheckCircle2
} from 'lucide-react';

export const ArchitectureViewer: React.FC = () => {
  const [activeView, setActiveView] = useState<'architecture' | 'erd' | 'scope'>('architecture');

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Architecture & ERD Diagram</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Technical specifications, client-server data flow, and relational database schema
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveView('architecture')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeView === 'architecture' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            System Architecture
          </button>
          <button
            onClick={() => setActiveView('erd')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeView === 'erd' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ERD Relational Schema
          </button>
          <button
            onClick={() => setActiveView('scope')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeView === 'scope' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Proposal Compliance
          </button>
        </div>
      </div>

      {activeView === 'architecture' && (
        <div className="space-y-6">
          {/* Architecture Diagram Canvas */}
          <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl border border-slate-800 space-y-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Multi-Tier Architecture</span>
                <h3 className="text-lg font-extrabold text-white mt-0.5">ElevateHR Client-Server & Data Flow</h3>
              </div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-semibold">
                Cloud Deployed
              </span>
            </div>

            {/* Visual Stack Flow */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              {/* Layer 1: Client */}
              <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 hover:border-emerald-500/50 transition-all text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <Monitor className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Client Layer</h4>
                  <p className="text-xs text-slate-400 mt-1">React.js + Vite SPA</p>
                  <p className="text-[11px] text-slate-500 mt-1">Tailwind CSS • Responsive Web & Mobile</p>
                </div>
                <div className="text-[10px] bg-slate-900/80 text-emerald-400 py-1 rounded-lg border border-slate-700">
                  Role: Admin / Manager / ESS
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex flex-col items-center justify-center text-emerald-400 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-mono">JSON / REST</span>
                <ArrowRight className="w-6 h-6 animate-pulse" />
                <span className="text-[10px] text-slate-400 font-mono">AES-256</span>
              </div>

              {/* Layer 2: API & Logic */}
              <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 hover:border-blue-500/50 transition-all text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 mx-auto flex items-center justify-center">
                  <Server className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">API & Logic Layer</h4>
                  <p className="text-xs text-slate-400 mt-1">REST API & Node Engine</p>
                  <p className="text-[11px] text-slate-500 mt-1">Payroll Calculator • Leave Engine</p>
                </div>
                <div className="text-[10px] bg-slate-900/80 text-blue-400 py-1 rounded-lg border border-slate-700">
                  RBAC Auth & Quotas
                </div>
              </div>

              {/* Layer 3: Database & Services */}
              <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700 hover:border-purple-500/50 transition-all text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 mx-auto flex items-center justify-center">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Data & Services Layer</h4>
                  <p className="text-xs text-slate-400 mt-1">Relational Database</p>
                  <p className="text-[11px] text-slate-500 mt-1">PostgreSQL Schema • Storage</p>
                </div>
                <div className="text-[10px] bg-slate-900/80 text-purple-400 py-1 rounded-lg border border-slate-700">
                  Email & Audit Logs
                </div>
              </div>
            </div>

            {/* Architecture Details Box */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 space-y-2">
              <h5 className="font-bold text-white flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-emerald-400" /> Operational Protocol & Security
              </h5>
              <p>
                1. <strong>Authentication & Routing:</strong> Requests from the browser client pass through authenticated REST endpoints with role permissions (HR Admin, Manager, Employee).
              </p>
              <p>
                2. <strong>Leave Engine & Balance Verification:</strong> When an employee submits a leave request, the backend verifies their remaining quota, checks against department overlaps, and initiates an approval task.
              </p>
              <p>
                3. <strong>Payroll Engine:</strong> Automated salary calculations compute progressive salary tax brackets, 4% NSSF contributions, overtime pay (1.5x), and unpaid leaves before locking the finalized run.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeView === 'erd' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Entity Relationship Diagram (ERD)</h3>
            <p className="text-xs text-slate-500">Relational schema between core HR entities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Entity: Employee */}
            <div className="rounded-2xl border-2 border-emerald-500/40 bg-emerald-50/20 overflow-hidden">
              <div className="bg-emerald-600 text-white px-4 py-2 text-xs font-bold flex items-center justify-between">
                <span>EMPLOYEE (PK: id)</span>
                <span>Parent Entity</span>
              </div>
              <div className="p-4 text-xs font-mono space-y-1.5 text-slate-700">
                <div>🔑 <strong>id</strong>: VARCHAR(20) [PK]</div>
                <div>firstName: VARCHAR(100)</div>
                <div>lastName: VARCHAR(100)</div>
                <div>email: VARCHAR(150) [UNIQUE]</div>
                <div>position: VARCHAR(100)</div>
                <div>department: VARCHAR(100)</div>
                <div>role: ENUM('admin','manager','employee')</div>
                <div>baseSalary: DECIMAL(10,2)</div>
                <div>nssfNumber: VARCHAR(50)</div>
                <div>contractStart: DATE</div>
                <div>contractEnd: DATE</div>
              </div>
            </div>

            {/* Entity: LeaveRequest */}
            <div className="rounded-2xl border-2 border-blue-500/40 bg-blue-50/20 overflow-hidden">
              <div className="bg-blue-600 text-white px-4 py-2 text-xs font-bold flex items-center justify-between">
                <span>LEAVE_REQUEST (PK: id)</span>
                <span>1 : N to Employee</span>
              </div>
              <div className="p-4 text-xs font-mono space-y-1.5 text-slate-700">
                <div>🔑 <strong>id</strong>: VARCHAR(20) [PK]</div>
                <div>🔗 <strong>employeeId</strong>: VARCHAR(20) [FK]</div>
                <div>leaveType: VARCHAR(50)</div>
                <div>startDate: DATE</div>
                <div>endDate: DATE</div>
                <div>totalDays: DECIMAL(3,1)</div>
                <div>reason: TEXT</div>
                <div>status: ENUM('Pending','Approved','Rejected')</div>
                <div>approverName: VARCHAR(100)</div>
                <div>approverRemarks: TEXT</div>
              </div>
            </div>

            {/* Entity: PayrollItem */}
            <div className="rounded-2xl border-2 border-purple-500/40 bg-purple-50/20 overflow-hidden">
              <div className="bg-purple-600 text-white px-4 py-2 text-xs font-bold flex items-center justify-between">
                <span>PAYROLL_ITEM (PK: id)</span>
                <span>1 : N to PayrollRun</span>
              </div>
              <div className="p-4 text-xs font-mono space-y-1.5 text-slate-700">
                <div>🔑 <strong>id</strong>: VARCHAR(20) [PK]</div>
                <div>🔗 <strong>payrollRunId</strong>: VARCHAR(20) [FK]</div>
                <div>🔗 <strong>employeeId</strong>: VARCHAR(20) [FK]</div>
                <div>baseSalary: DECIMAL(10,2)</div>
                <div>allowances: DECIMAL(10,2)</div>
                <div>overtimePay: DECIMAL(10,2)</div>
                <div>grossSalary: DECIMAL(10,2)</div>
                <div>taxAmount: DECIMAL(10,2)</div>
                <div>nssfContribution: DECIMAL(10,2)</div>
                <div>netPay: DECIMAL(10,2)</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeView === 'scope' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Proposal Specification Checklist</h3>
            <p className="text-xs text-slate-500">Verification against Limkokwing University Software Project Specification</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Functional Requirements
              </div>
              <ul className="space-y-1.5 text-slate-600 list-disc pl-5">
                <li><strong>User Management:</strong> Create, update, archive profiles with full NSSF, ID, salary, and dates.</li>
                <li><strong>Leave Management:</strong> Employee submission, balance checking, 1-click approve/deny.</li>
                <li><strong>Payroll Processing:</strong> Automated calculations, tax brackets, NSSF, manual override, PDF/Excel export.</li>
                <li><strong>Self-Service Portal:</strong> Personal clock-in, leave quotas, and confidential payslip downloads.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Non-Functional Requirements & Deliverables
              </div>
              <ul className="space-y-1.5 text-slate-600 list-disc pl-5">
                <li><strong>Security:</strong> AES-256 standard encryption & RBAC access controls.</li>
                <li><strong>Performance:</strong> Sub-2s dashboard load times and reactive updates.</li>
                <li><strong>Compliance & Reports:</strong> Exportable master rosters, payroll workbooks, and PDF payslips.</li>
                <li><strong>Document Management:</strong> NSSF card, passport/ID, and CV verification tracking.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
