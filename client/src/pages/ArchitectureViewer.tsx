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
  CheckCircle2,
  Calendar,
  Users,
  Clock,
  Sparkles,
  Fingerprint,
  Smartphone,
  RefreshCw,
  Milestone
} from 'lucide-react';

interface GanttTask {
  id: string;
  name: string;
  phase: string;
  assignee: 'Choeng Dyne' | 'Kith Annsreng' | 'Leng Panhaleap' | 'Kim Menghorpisith' | 'All Members';
  role: string;
  startWeek: number; // 1 to 6 (June W1 to July W6)
  durationWeeks: number;
  progress: number;
  status: 'Completed' | 'In Progress' | 'Planned';
  deliverables: string;
}

const WEEKS_TIMELINE = ['June W1', 'June W2', 'July W3', 'July W4', 'July W5', 'July W6'];

const GANTT_TASKS: GanttTask[] = [
  {
    id: 'TSK-01',
    name: 'Requirements Gathering & Proposal Specification',
    phase: 'Phase 1: Planning',
    assignee: 'Choeng Dyne',
    role: 'Full-Stack Lead',
    startWeek: 1,
    durationWeeks: 1,
    progress: 100,
    status: 'Completed',
    deliverables: 'Proposal Document, Scope, Objectives & Target Personas'
  },
  {
    id: 'TSK-02',
    name: 'Market Research & Competitive Feasibility',
    phase: 'Phase 1: Planning',
    assignee: 'Choeng Dyne',
    role: 'Full-Stack Lead',
    startWeek: 1,
    durationWeeks: 2,
    progress: 100,
    status: 'Completed',
    deliverables: 'Cambodian HRMS landscape & statutory compliance analysis'
  },
  {
    id: 'TSK-03',
    name: 'UI/UX Design System & Figma Wireframes',
    phase: 'Phase 1: Planning',
    assignee: 'Kim Menghorpisith',
    role: 'UI/UX Designer',
    startWeek: 1,
    durationWeeks: 2,
    progress: 100,
    status: 'Completed',
    deliverables: 'Figma Component Library, Color System, Mobile Layouts'
  },
  {
    id: 'TSK-04',
    name: 'Goals, Objectives & System Architecture ERD',
    phase: 'Phase 1: Planning',
    assignee: 'Choeng Dyne',
    role: 'Full-Stack Lead',
    startWeek: 2,
    durationWeeks: 1,
    progress: 100,
    status: 'Completed',
    deliverables: '3-Tier Data Flow Diagram, ERD Relational Entities'
  },
  {
    id: 'TSK-05',
    name: 'Software Requirements & Technology Stack Modeling',
    phase: 'Phase 2: Core Engineering',
    assignee: 'Kith Annsreng',
    role: 'Developer',
    startWeek: 2,
    durationWeeks: 3,
    progress: 100,
    status: 'Completed',
    deliverables: 'Express REST architecture, Vite SPA, SQLite/JSON models'
  },
  {
    id: 'TSK-06',
    name: 'Project Scope & Database Schema Engine',
    phase: 'Phase 2: Core Engineering',
    assignee: 'Kith Annsreng',
    role: 'Developer',
    startWeek: 3,
    durationWeeks: 2,
    progress: 100,
    status: 'Completed',
    deliverables: 'JSON Database Models, CRUD Endpoints, Seed Data'
  },
  {
    id: 'TSK-07',
    name: 'React + Vite Frontend Shell & RBAC Navigation',
    phase: 'Phase 2: Core Engineering',
    assignee: 'Kith Annsreng',
    role: 'Developer',
    startWeek: 3,
    durationWeeks: 2,
    progress: 100,
    status: 'Completed',
    deliverables: 'Sidebar, Top Navbar, 1-Click Role/Persona Switcher'
  },
  {
    id: 'TSK-08',
    name: 'Employee Directory & MoLVT Work Permit Module',
    phase: 'Phase 2: Core Engineering',
    assignee: 'Kith Annsreng',
    role: 'Developer',
    startWeek: 3,
    durationWeeks: 2,
    progress: 100,
    status: 'Completed',
    deliverables: 'Staff Profiles, Expat FWCMS Tracking, Image Compression'
  },
  {
    id: 'TSK-09',
    name: 'Statutory Payroll Calculation & Progressive Tax Engine',
    phase: 'Phase 2: Core Engineering',
    assignee: 'Choeng Dyne',
    role: 'Full-Stack Lead',
    startWeek: 3,
    durationWeeks: 2,
    progress: 100,
    status: 'Completed',
    deliverables: 'Cambodia Tax Brackets, 4% NSSF, Overtime & Deductions'
  },
  {
    id: 'TSK-10',
    name: 'Leave Management & 1-Click Approval System',
    phase: 'Phase 2: Core Engineering',
    assignee: 'Choeng Dyne',
    role: 'Full-Stack Lead',
    startWeek: 4,
    durationWeeks: 2,
    progress: 100,
    status: 'Completed',
    deliverables: 'Cambodia Arts. 166/182 Quotas, Overdraft Guard, Approvals'
  },
  {
    id: 'TSK-11',
    name: 'Daily Attendance Punch Clock & Punctuality Engine',
    phase: 'Phase 2: Core Engineering',
    assignee: 'Kith Annsreng',
    role: 'Developer',
    startWeek: 4,
    durationWeeks: 2,
    progress: 100,
    status: 'Completed',
    deliverables: 'Attendance Punching, Punctuality Metrics, Hours Tracking'
  },
  {
    id: 'TSK-12',
    name: 'System Architecture & Budget Resources Review',
    phase: 'Phase 3: Integration & Testing',
    assignee: 'Leng Panhaleap',
    role: 'QA & Security Tester',
    startWeek: 4,
    durationWeeks: 2,
    progress: 100,
    status: 'Completed',
    deliverables: 'Infrastructure allocation review, cloud cost projection'
  },
  {
    id: 'TSK-13',
    name: 'RBAC Security Audit & Labor Law Compliance',
    phase: 'Phase 3: Integration & Testing',
    assignee: 'Leng Panhaleap',
    role: 'QA & Security Tester',
    startWeek: 4,
    durationWeeks: 2,
    progress: 100,
    status: 'Completed',
    deliverables: 'Rate Limiting, XSS Sanitization, MoLVT Articles 166/182 tests'
  },
  {
    id: 'TSK-14',
    name: 'Executive Dashboard & Department Analytics Charts',
    phase: 'Phase 4: Finalization & UAT',
    assignee: 'Kim Menghorpisith',
    role: 'UI/UX Designer',
    startWeek: 4,
    durationWeeks: 2,
    progress: 100,
    status: 'Completed',
    deliverables: 'High-Contrast White Tooltips, Donut & Bar Charts, Cards'
  },
  {
    id: 'TSK-15',
    name: 'PDF & Excel Reporting Engines (Client-Side Generators)',
    phase: 'Phase 4: Finalization & UAT',
    assignee: 'Kith Annsreng',
    role: 'Developer',
    startWeek: 5,
    durationWeeks: 2,
    progress: 100,
    status: 'Completed',
    deliverables: 'Confidential Payslip PDFs, Roster & Payroll Excel Sheets'
  },
  {
    id: 'TSK-16',
    name: 'Risk Management, Testing & University Defense Sign-off',
    phase: 'Phase 4: Finalization & UAT',
    assignee: 'Kim Menghorpisith',
    role: 'UI/UX Designer',
    startWeek: 5,
    durationWeeks: 2,
    progress: 100,
    status: 'Completed',
    deliverables: 'Production Web App on Render, Defense Presentation, Sign-off'
  }
];

const TEAM_MEMBERS = [
  {
    name: 'Choeng Dyne',
    role: 'Full-Stack Lead / Problem-Solving',
    email: 'dynechhoeng@gmail.com',
    quote: 'Focused on understanding user needs to build practical HR solutions.',
    color: 'border-rose-500 bg-rose-50 text-rose-700',
    barColor: 'bg-[#e11d48]',
    tasksCount: 5,
    hours: '350 - 500 hrs'
  },
  {
    name: 'Kith Annsreng',
    role: 'Developer / Integration',
    email: 'sreng.kith@gmail.com',
    quote: 'Good user experience is key.',
    color: 'border-blue-500 bg-blue-50 text-blue-700',
    barColor: 'bg-[#2563eb]',
    tasksCount: 5,
    hours: '300 - 450 hrs'
  },
  {
    name: 'Leng Panhaleap',
    role: 'QA & Security Tester',
    email: 'lengpanhaleap@gmail.com',
    quote: 'Test app and observe missing implementation.',
    color: 'border-emerald-500 bg-emerald-50 text-emerald-700',
    barColor: 'bg-[#16a34a]',
    tasksCount: 3,
    hours: '80 - 120 hrs'
  },
  {
    name: 'Kim Menghorpisith',
    role: 'UI/UX Designer',
    email: 'kmhpisith@gmail.com',
    quote: 'Functions over forms.',
    color: 'border-orange-500 bg-orange-50 text-orange-700',
    barColor: 'bg-[#ea580c]',
    tasksCount: 3,
    hours: '60 - 80 hrs'
  }
];

// Exact task breakdown from the user-uploaded 6-week timeline image
const IMAGE_MEMBER_TASKS = [
  {
    member: 'Choeng Dyne',
    color: 'text-[#e11d48]',
    barColor: 'bg-[#e11d48]',
    tasks: [
      { name: 'Requirements Gathering', start: 1, duration: 1 },
      { name: 'Market Research', start: 1, duration: 2 },
      { name: 'Goals & Objectives', start: 2, duration: 1 }
    ]
  },
  {
    member: 'Kith Annsreng',
    color: 'text-[#2563eb]',
    barColor: 'bg-[#2563eb]',
    tasks: [
      { name: 'Software Requirements', start: 2, duration: 3 },
      { name: 'Project Scope', start: 3, duration: 2 },
      { name: 'Technology Stack', start: 3, duration: 2 }
    ]
  },
  {
    member: 'Leng Panhaleap',
    color: 'text-[#16a34a]',
    barColor: 'bg-[#16a34a]',
    tasks: [
      { name: 'System Architecture', start: 4, duration: 2 },
      { name: 'Budget & Resources', start: 4, duration: 2 }
    ]
  },
  {
    member: 'Kim Menghorpisith',
    color: 'text-[#ea580c]',
    barColor: 'bg-[#ea580c]',
    tasks: [
      { name: 'Risk Management', start: 5, duration: 2 },
      { name: 'Testing & Quality Assurance', start: 5, duration: 2 },
      { name: 'Final Presentation & University Defense', start: 6, duration: 1 }
    ]
  }
];

export const ArchitectureViewer: React.FC = () => {
  const [activeView, setActiveView] = useState<'architecture' | 'erd' | 'scope' | 'timeline'>('timeline');
  const [selectedAssignee, setSelectedAssignee] = useState<string>('All');
  const [ganttViewType, setGanttViewType] = useState<'detailed' | 'image' | 'both'>('detailed');

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Architecture & Project Work Plan</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Limkokwing University • Software Project Management (Carlos Perez) • 14-Week MVP Roadmap
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center space-x-1 sm:space-x-2 bg-slate-100 p-1 rounded-xl flex-wrap gap-y-1">
          <button
            onClick={() => setActiveView('timeline')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeView === 'timeline' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Gantt Chart</span>
          </button>
          <button
            onClick={() => setActiveView('architecture')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeView === 'architecture' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Architecture
          </button>
          <button
            onClick={() => setActiveView('erd')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeView === 'erd' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ERD Schema
          </button>
          <button
            onClick={() => setActiveView('scope')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeView === 'scope' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Proposal Specs
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

      {activeView === 'timeline' && (
        <div className="space-y-6">
          {/* Team Contribution Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TEAM_MEMBERS.map(m => (
              <div
                key={m.name}
                onClick={() => setSelectedAssignee(selectedAssignee === m.name ? 'All' : m.name)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer bg-white shadow-xs hover:shadow-md ${
                  selectedAssignee === m.name ? 'border-emerald-600 ring-2 ring-emerald-500/20' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${m.color}`}>
                    {m.tasksCount} Tasks
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono font-semibold">{m.hours}</span>
                </div>
                <div className="font-extrabold text-sm text-slate-900 mt-2">{m.name}</div>
                <div className="text-xs font-semibold text-slate-500">{m.role}</div>
                <div className="text-[11px] text-slate-400 mt-2 italic line-clamp-2">“{m.quote}”</div>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                  <span>{m.email}</span>
                  <span className="text-emerald-600 font-bold">100% On-Track</span>
                </div>
              </div>
            ))}
          </div>

          {/* Gantt Chart Container */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full border border-emerald-300">
                    6-Week Project Timeline
                  </span>
                  <span className="text-xs text-slate-500 font-mono font-bold">June W1 – July W6</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-1">Project Work Plan & Team Gantt Roadmap</h3>
                <p className="text-xs text-slate-500">
                  Milestone execution schedule for Limkokwing University Software Project Management
                </p>
              </div>

              {/* View Switcher & Member Filter */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* View Switcher */}
                <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs font-bold">
                  <button
                    onClick={() => setGanttViewType('detailed')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      ganttViewType === 'detailed' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    15-Task Work Plan
                  </button>
                  <button
                    onClick={() => setGanttViewType('image')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      ganttViewType === 'image' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Team Gantt (June–July)
                  </button>
                  <button
                    onClick={() => setGanttViewType('both')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      ganttViewType === 'both' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Both Views
                  </button>
                </div>

                {/* Filter by Team Member */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setSelectedAssignee('All')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedAssignee === 'All' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    All ({GANTT_TASKS.length})
                  </button>
                  {TEAM_MEMBERS.map(m => (
                    <button
                      key={m.name}
                      onClick={() => setSelectedAssignee(selectedAssignee === m.name ? 'All' : m.name)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        selectedAssignee === m.name ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {m.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* VIEW 1: TEAM MEMBER GROUPED GANTT (Exact Match to User's Uploaded Timeline Image) */}
            {(ganttViewType === 'image' || ganttViewType === 'both') && (
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs">
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">ElevateHR — Project Timeline</h4>
                    <p className="text-[11px] text-slate-500 font-medium">6-Week Gantt Chart - June W1 – July W6</p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Team-Grouped Schedule</span>
                </div>

                <div className="overflow-x-auto">
                  <div className="min-w-[750px]">
                    {/* Header Columns */}
                    <div className="grid grid-cols-12 bg-white text-slate-800 text-xs font-bold border-b border-slate-200 divide-x divide-slate-200">
                      <div className="col-span-4 p-3 text-left">Team Member / Task</div>
                      {WEEKS_TIMELINE.map(w => (
                        <div key={w} className="col-span-1 p-3 text-center truncate font-mono text-[11px]">{w}</div>
                      ))}
                      <div className="col-span-2 hidden"></div>
                    </div>

                    {/* Member Sections */}
                    <div className="divide-y divide-slate-200">
                      {IMAGE_MEMBER_TASKS.filter(m => selectedAssignee === 'All' || m.member === selectedAssignee).map(group => (
                        <div key={group.member} className="p-1">
                          {/* Member Heading */}
                          <div className={`font-bold text-xs ${group.color} px-3 pt-2 pb-1`}>
                            {group.member}
                          </div>

                          {/* Member Tasks */}
                          <div className="space-y-1 pb-1">
                            {group.tasks.map(t => {
                              const startPercent = ((t.start - 1) / 6) * 100;
                              const widthPercent = (t.duration / 6) * 100;

                              return (
                                <div key={t.name} className="grid grid-cols-12 items-center hover:bg-slate-50/60 rounded-lg">
                                  <div className="col-span-4 px-3 py-1.5 text-xs text-slate-700 truncate font-medium">
                                    {t.name}
                                  </div>
                                  <div className="col-span-8 p-1 relative h-8 flex items-center">
                                    {/* Vertical grid lines */}
                                    <div className="absolute inset-0 grid grid-cols-6 divide-x divide-slate-100 pointer-events-none">
                                      {WEEKS_TIMELINE.map((_, i) => (
                                        <div key={i} className="h-full" />
                                      ))}
                                    </div>
                                    {/* Gantt Bar */}
                                    <div
                                      className={`absolute h-6 rounded-md ${group.barColor} text-white shadow-xs flex items-center px-2 text-[10px] font-bold truncate`}
                                      style={{
                                        left: `${startPercent}%`,
                                        width: `${Math.max(widthPercent, 14)}%`
                                      }}
                                      title={`${group.member}: ${t.name} (${WEEKS_TIMELINE[t.start - 1]} to ${WEEKS_TIMELINE[t.start + t.duration - 2]})`}
                                    >
                                      <span className="truncate">{t.name}</span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 2: COMPREHENSIVE 15-TASK WORK PLAN (The Old Distribution with June-July Timeline Dates) */}
            {(ganttViewType === 'detailed' || ganttViewType === 'both') && (
              <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-xs bg-white">
                <div className="min-w-[850px]">
                  {/* Timeline Month Header (June W1-W2, July W3-W6) */}
                  <div className="grid grid-cols-12 bg-slate-900 text-white text-[11px] font-bold border-b border-slate-800 divide-x divide-slate-800">
                    <div className="col-span-5 p-3 text-left">Task Deliverable & Assignee</div>
                    <div className="col-span-2 p-3 text-center bg-slate-800/90 font-mono">June 2026 (W1 – W2)</div>
                    <div className="col-span-5 p-3 text-center bg-slate-800/70 font-mono">July 2026 (W3 – W6)</div>
                  </div>

                  {/* 6-Week Columns Subheader */}
                  <div className="grid grid-cols-12 bg-slate-100 text-slate-600 text-[10px] font-mono border-b border-slate-200 divide-x divide-slate-200">
                    <div className="col-span-5 px-3 py-1.5 font-sans font-semibold text-slate-700">6-Week Execution Schedule</div>
                    <div className="col-span-7 grid grid-cols-6 divide-x divide-slate-200 text-center font-bold">
                      {WEEKS_TIMELINE.map(w => (
                        <div key={w} className="py-1.5 truncate">{w}</div>
                      ))}
                    </div>
                  </div>

                  {/* Task Rows (The 15 Tasks) */}
                  <div className="divide-y divide-slate-100">
                    {GANTT_TASKS.filter(t => selectedAssignee === 'All' || t.assignee === selectedAssignee || t.assignee === 'All Members').map(task => {
                      const member = TEAM_MEMBERS.find(m => m.name === task.assignee);
                      const barColor = member ? member.barColor : 'bg-slate-700';

                      // Compute start offset and width in % across the 6-week timeline
                      const startPercent = ((task.startWeek - 1) / 6) * 100;
                      const widthPercent = (task.durationWeeks / 6) * 100;

                      return (
                        <div key={task.id} className="grid grid-cols-12 items-center hover:bg-slate-50/80 transition-colors">
                          {/* Task Meta (Left 5 columns) */}
                          <div className="col-span-5 p-3 border-r border-slate-100 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-slate-900 leading-tight">
                                <span className="text-slate-400 font-mono text-[10px] mr-1">{task.id}</span>
                                {task.name}
                              </span>
                              <span className="text-[9px] font-mono text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 shrink-0 ml-1">
                                ✓ 100%
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-slate-500">
                              <span className={`font-semibold ${member ? member.color.replace('border-', 'text-').replace('bg-', '') : 'text-slate-700'}`}>
                                {task.assignee}
                              </span>
                              <span>•</span>
                              <span className="text-slate-400 font-mono">
                                {WEEKS_TIMELINE[task.startWeek - 1]}–{WEEKS_TIMELINE[Math.min(task.startWeek + task.durationWeeks - 2, 5)]} ({task.durationWeeks}wks)
                              </span>
                            </div>
                            <div className="text-[10px] text-slate-400 truncate">
                              🎯 {task.deliverables}
                            </div>
                          </div>

                          {/* Gantt Bar Visualization (Right 7 columns = 6 weeks) */}
                          <div className="col-span-7 p-3 relative h-12 flex items-center">
                            {/* Background Grid Lines (6 weeks) */}
                            <div className="absolute inset-0 grid grid-cols-6 divide-x divide-slate-100 pointer-events-none">
                              {WEEKS_TIMELINE.map((_, idx) => (
                                <div key={idx} className="h-full" />
                              ))}
                            </div>

                            {/* The Active Task Bar */}
                            <div
                              className={`absolute h-7 rounded-lg ${barColor} text-white shadow-xs flex items-center px-2.5 text-[10px] font-bold tracking-tight overflow-hidden transition-all`}
                              style={{
                                left: `${startPercent}%`,
                                width: `${Math.max(widthPercent, 14)}%`
                              }}
                              title={`${task.name} (${task.assignee}) - ${WEEKS_TIMELINE[task.startWeek - 1]} to ${WEEKS_TIMELINE[Math.min(task.startWeek + task.durationWeeks - 2, 5)]}`}
                            >
                              <span className="truncate">{task.name}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Milestone Summary & Signoff */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Phase 1: Planning (June W1–W2)
                </div>
                <div className="text-slate-500 text-[11px]">Requirements specification, Figma design library, system architecture & ERD schema.</div>
                <div className="text-emerald-700 font-semibold text-[10px]">Status: Verified & Approved</div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Phase 2 & 3: Dev & QA (July W3–W5)
                </div>
                <div className="text-slate-500 text-[11px]">REST API, Cambodia payroll tax engine, leave approval rules, attendance tracking, and penetration audit.</div>
                <div className="text-emerald-700 font-semibold text-[10px]">Status: Verified & Approved</div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Phase 4: Deploy & Defense (July W5–W6)
                </div>
                <div className="text-slate-500 text-[11px]">Render cloud deployment, automated PDF/Excel reports, and final university defense.</div>
                <div className="text-emerald-700 font-semibold text-[10px]">Status: Production Ready (Render)</div>
              </div>
            </div>
          </div>

          {/* Section 14: Future Plan & Multi-Phase Implementation Roadmap */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-blue-50 text-blue-800 text-xs font-bold rounded-full border border-blue-300">
                    Post-MVP Horizon 2027
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Proposal Section 14</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-1">Future Plan & Implementation Roadmap</h3>
                <p className="text-xs text-slate-500">
                  Phased rollout milestones expanding ElevateHR beyond MVP into enterprise hardware & mobile apps
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-xs">
              {/* Phase 1 */}
              <div className="p-4 rounded-2xl border-2 border-emerald-500/40 bg-emerald-50/20 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      Phase 1
                    </span>
                    <span className="text-[10px] font-mono text-emerald-600 font-bold">Q4 2026 - Q1 2027</span>
                  </div>
                  <div className="font-extrabold text-slate-900 mt-2 text-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>MVP Core Stabilization</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Leave tracking, statutory Cambodian payroll engine, attendance punch clock, and role-based portals.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-emerald-200/60 font-semibold text-[10px] text-emerald-700">
                  ● Status: Active / Live on Render
                </div>
              </div>

              {/* Phase 2 */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-2 flex flex-col justify-between hover:border-blue-400 transition-all">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      Phase 2
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Q1 2027</span>
                  </div>
                  <div className="font-extrabold text-slate-900 mt-2 text-sm flex items-center gap-1.5">
                    <Fingerprint className="w-4 h-4 text-blue-600" />
                    <span>Hardware Biometrics</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Single-location optical/capacitive fingerprint scanner pilot integration for anti-buddy punching.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 font-semibold text-[10px] text-blue-600">
                  ○ Status: Planned Architecture
                </div>
              </div>

              {/* Phase 3 */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-2 flex flex-col justify-between hover:border-indigo-400 transition-all">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      Phase 3
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Q2 2027</span>
                  </div>
                  <div className="font-extrabold text-slate-900 mt-2 text-sm flex items-center gap-1.5">
                    <RefreshCw className="w-4 h-4 text-indigo-600" />
                    <span>Biometric Rollout</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Multi-branch fingerprint biometric hardware synchronization with centralized cloud punch logs.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 font-semibold text-[10px] text-indigo-600">
                  ○ Status: Planned Scaling
                </div>
              </div>

              {/* Phase 4 */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-2 flex flex-col justify-between hover:border-amber-400 transition-all">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Phase 4
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Q3 2027</span>
                  </div>
                  <div className="font-extrabold text-slate-900 mt-2 text-sm flex items-center gap-1.5">
                    <Milestone className="w-4 h-4 text-amber-600" />
                    <span>Accounting Sync</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Two-way automated journal ledger sync with QuickBooks, Xero, and local tax compliance software.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 font-semibold text-[10px] text-amber-600">
                  ○ Status: Planned Integration
                </div>
              </div>

              {/* Phase 5 */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-2 flex flex-col justify-between hover:border-purple-400 transition-all">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                      Phase 5
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Q4 2027</span>
                  </div>
                  <div className="font-extrabold text-slate-900 mt-2 text-sm flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-purple-600" />
                    <span>Native Mobile App</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Dedicated iOS and Android Employee Self-Service applications with push notifications and GPS clock-in.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 font-semibold text-[10px] text-purple-600">
                  ○ Status: Planned Mobile
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
