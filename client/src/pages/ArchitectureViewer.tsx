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
  Milestone,
  Camera,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Check,
  Download,
  Eye
} from 'lucide-react';

interface GanttTask {
  id: string;
  name: string;
  phase: string;
  assignee: 'Chhong Dyne' | 'Kith Annsreng' | 'Leng Panhaleap' | 'Kim Menghorpisith' | 'All Members';
  role: string;
  startWeek: number; // 1 to 14
  durationWeeks: number;
  progress: number;
  status: 'Completed' | 'In Progress' | 'Planned';
  deliverables: string;
}

const GANTT_TASKS: GanttTask[] = [
  {
    id: 'TSK-01',
    name: 'Requirements Gathering & Proposal Specification',
    phase: 'Phase 1: Planning',
    assignee: 'Chhong Dyne',
    role: 'Full-Stack Lead',
    startWeek: 1,
    durationWeeks: 2,
    progress: 100,
    status: 'Completed',
    deliverables: 'Proposal Document, Scope, Objectives & Target Personas'
  },
  {
    id: 'TSK-02',
    name: 'UI/UX Design System & Figma Wireframes',
    phase: 'Phase 1: Planning',
    assignee: 'Kim Menghorpisith',
    role: 'UI/UX Designer',
    startWeek: 2,
    durationWeeks: 3,
    progress: 100,
    status: 'Completed',
    deliverables: 'Figma Component Library, Color System, Mobile Layouts'
  },
  {
    id: 'TSK-03',
    name: 'System Architecture & Relational ERD Modeling',
    phase: 'Phase 1: Planning',
    assignee: 'Chhong Dyne',
    role: 'Full-Stack Lead',
    startWeek: 2,
    durationWeeks: 2,
    progress: 100,
    status: 'Completed',
    deliverables: '3-Tier Data Flow Diagram, ERD Relational Entities'
  },
  {
    id: 'TSK-04',
    name: 'Express REST API & Database Schema Engine',
    phase: 'Phase 2: Core Engineering',
    assignee: 'Chhong Dyne',
    role: 'Full-Stack Lead',
    startWeek: 4,
    durationWeeks: 3,
    progress: 100,
    status: 'Completed',
    deliverables: 'JSON Database Models, CRUD Endpoints, Seed Data'
  },
  {
    id: 'TSK-05',
    name: 'React + Vite Frontend Shell & RBAC Navigation',
    phase: 'Phase 2: Core Engineering',
    assignee: 'Kith Annsreng',
    role: 'Developer',
    startWeek: 4,
    durationWeeks: 3,
    progress: 100,
    status: 'Completed',
    deliverables: 'Sidebar, Top Navbar, 1-Click Role/Persona Switcher'
  },
  {
    id: 'TSK-06',
    name: 'Employee Directory & MoLVT Work Permit Module',
    phase: 'Phase 2: Core Engineering',
    assignee: 'Kith Annsreng',
    role: 'Developer',
    startWeek: 5,
    durationWeeks: 4,
    progress: 100,
    status: 'Completed',
    deliverables: 'Staff Profiles, Expat FWCMS Tracking, Image Compression'
  },
  {
    id: 'TSK-07',
    name: 'Statutory Payroll Calculation & Progressive Tax Engine',
    phase: 'Phase 2: Core Engineering',
    assignee: 'Chhong Dyne',
    role: 'Full-Stack Lead',
    startWeek: 6,
    durationWeeks: 4,
    progress: 100,
    status: 'Completed',
    deliverables: 'Cambodia Tax Brackets, 4% NSSF, Overtime & Deductions'
  },
  {
    id: 'TSK-08',
    name: 'Leave Management & 1-Click Approval System',
    phase: 'Phase 2: Core Engineering',
    assignee: 'Chhong Dyne',
    role: 'Full-Stack Lead',
    startWeek: 7,
    durationWeeks: 3,
    progress: 100,
    status: 'Completed',
    deliverables: 'Cambodia Arts. 166/182 Quotas, Overdraft Guard, Approvals'
  },
  {
    id: 'TSK-09',
    name: 'Daily Attendance Punch Clock & Punctuality Engine',
    phase: 'Phase 3: Integration & Testing',
    assignee: 'Kith Annsreng',
    role: 'Developer',
    startWeek: 8,
    durationWeeks: 3,
    progress: 100,
    status: 'Completed',
    deliverables: 'Attendance Punching, Punctuality Metrics, Hours Tracking'
  },
  {
    id: 'TSK-10',
    name: 'Compliance Document Repository & Real File Uploads',
    phase: 'Phase 3: Integration & Testing',
    assignee: 'Kith Annsreng',
    role: 'Developer',
    startWeek: 9,
    durationWeeks: 3,
    progress: 100,
    status: 'Completed',
    deliverables: 'NSSF Card, Passport & Contract Uploads/Downloads'
  },
  {
    id: 'TSK-11',
    name: 'RBAC Security Audit & Endpoint Vulnerability Testing',
    phase: 'Phase 3: Integration & Testing',
    assignee: 'Leng Panhaleap',
    role: 'QA & Security Tester',
    startWeek: 10,
    durationWeeks: 3,
    progress: 100,
    status: 'Completed',
    deliverables: 'Rate Limiting, XSS Sanitization, Helmet Headers, Auth Checks'
  },
  {
    id: 'TSK-12',
    name: 'Cambodian Labor Law Compliance & Edge Case Audit',
    phase: 'Phase 3: Integration & Testing',
    assignee: 'Leng Panhaleap',
    role: 'QA & Security Tester',
    startWeek: 11,
    durationWeeks: 3,
    progress: 100,
    status: 'Completed',
    deliverables: 'Seniority Accruals, Maternity Pay, Sick Tier Validation'
  },
  {
    id: 'TSK-13',
    name: 'Executive Dashboard & Department Distribution Charts',
    phase: 'Phase 4: Finalization & UAT',
    assignee: 'Kim Menghorpisith',
    role: 'UI/UX Designer',
    startWeek: 11,
    durationWeeks: 3,
    progress: 100,
    status: 'Completed',
    deliverables: 'High-Contrast White Tooltips, Donut & Bar Charts, Cards'
  },
  {
    id: 'TSK-14',
    name: 'PDF & Excel Reporting Engines (Client-Side Generators)',
    phase: 'Phase 4: Finalization & UAT',
    assignee: 'Kith Annsreng',
    role: 'Developer',
    startWeek: 12,
    durationWeeks: 2,
    progress: 100,
    status: 'Completed',
    deliverables: 'Confidential Payslip PDFs, Roster & Payroll Excel Sheets'
  },
  {
    id: 'TSK-15',
    name: 'Cloud Deployment on Render & Final Presentation UAT',
    phase: 'Phase 4: Finalization & UAT',
    assignee: 'All Members',
    role: 'Core Project Team',
    startWeek: 13,
    durationWeeks: 2,
    progress: 100,
    status: 'Completed',
    deliverables: 'Production Web App on Render, Technical Documentation'
  }
];

const TEAM_MEMBERS = [
  {
    name: 'Chhong Dyne',
    role: 'Full-Stack Lead / Problem-Solving',
    email: 'dynechhoeng@gmail.com',
    quote: 'Focused on understanding user needs to build practical HR solutions.',
    color: 'border-emerald-500 bg-emerald-50 text-emerald-700',
    barColor: 'bg-emerald-600',
    tasksCount: 5,
    hours: '350 - 500 hrs'
  },
  {
    name: 'Kith Annsreng',
    role: 'Developer / Integration',
    email: 'sreng.kith@gmail.com',
    quote: 'Good user experience is key.',
    color: 'border-blue-500 bg-blue-50 text-blue-700',
    barColor: 'bg-blue-600',
    tasksCount: 5,
    hours: '300 - 450 hrs'
  },
  {
    name: 'Leng Panhaleap',
    role: 'QA & Security Tester',
    email: 'lengpanhaleap@gmail.com',
    quote: 'Test app and observe missing implementation.',
    color: 'border-amber-500 bg-amber-50 text-amber-700',
    barColor: 'bg-amber-600',
    tasksCount: 3,
    hours: '80 - 120 hrs'
  },
  {
    name: 'Kim Menghorpisith',
    role: 'UI/UX Designer',
    email: 'kmhpisith@gmail.com',
    quote: 'Functions over forms.',
    color: 'border-purple-500 bg-purple-50 text-purple-700',
    barColor: 'bg-purple-600',
    tasksCount: 3,
    hours: '60 - 80 hrs'
  }
];

interface TimelineTask {
  name: string;
  startCol: number; // 0 to 5
  endCol: number; // 0 to 5
  deliverable?: string;
}

interface MemberTimeline {
  name: string;
  role: string;
  color: string;
  barColor: string;
  tasks: TimelineTask[];
}

const MVP_COLUMNS = ['June W1', 'June W2', 'July W3', 'July W4', 'July W5', 'July W6'];

const MVP_TIMELINE: MemberTimeline[] = [
  {
    name: 'Choeng Dyne',
    role: 'Full-Stack Lead / Problem-Solving',
    color: 'text-[#e11d48]',
    barColor: 'bg-[#e11d48]',
    tasks: [
      { name: 'Requirements Gathering', startCol: 0, endCol: 0, deliverable: 'Project scope document & user persona matrix' },
      { name: 'Market Research', startCol: 0, endCol: 1, deliverable: 'Competitive analysis of local Cambodian HRMS solutions' },
      { name: 'Goals & Objectives', startCol: 1, endCol: 1, deliverable: 'Core MVP milestone definition & Limkokwing proposal' }
    ]
  },
  {
    name: 'Kith Annsreng',
    role: 'Developer / Integration',
    color: 'text-[#2563eb]',
    barColor: 'bg-[#2563eb]',
    tasks: [
      { name: 'Software Requirements', startCol: 1, endCol: 3, deliverable: 'MoLVT labor compliance rules & tax bracket models' },
      { name: 'Project Scope', startCol: 2, endCol: 3, deliverable: 'Role-based access matrix & sprint deliverables' },
      { name: 'Technology Stack', startCol: 2, endCol: 3, deliverable: 'React + Vite, Tailwind CSS, Express REST API, SQLite' }
    ]
  },
  {
    name: 'Leng Panhaleap',
    role: 'QA & Security Tester',
    color: 'text-[#16a34a]',
    barColor: 'bg-[#16a34a]',
    tasks: [
      { name: 'System Architecture', startCol: 3, endCol: 4, deliverable: 'Multi-tier architecture & relational ERD data models' },
      { name: 'Budget & Resources', startCol: 3, endCol: 4, deliverable: 'Cloud infrastructure cost projection & test lab plan' }
    ]
  },
  {
    name: 'Kim Menghorpisith',
    role: 'UI/UX Designer',
    color: 'text-[#ea580c]',
    barColor: 'bg-[#ea580c]',
    tasks: [
      { name: 'Risk Management', startCol: 4, endCol: 5, deliverable: 'Contingency plan for statutory tax changes & data security' },
      { name: 'Testing & Quality Assurance', startCol: 4, endCol: 5, deliverable: 'Payroll accuracy verification & automated test cases' },
      { name: 'Final Defense & University Sign-off', startCol: 5, endCol: 5, deliverable: 'Live presentation, demo on Render, final proposal thesis' }
    ]
  }
];

interface FuturePhase {
  phase: string;
  title: string;
  lead: string;
  color: string;
  barColor: string;
  tasks: {
    name: string;
    startCol: number; // 0: Q1 2027, 1: Q2 2027, 2: Q3 2027, 3: Q4 2027
    endCol: number;
    deliverables: string;
  }[];
}

const FUTURE_COLUMNS = ['Q1 2027 (Pilot)', 'Q2 2027 (Multi-Branch)', 'Q3 2027 (Accounting)', 'Q4 2027 (Mobile Apps)'];

const FUTURE_PHASES: FuturePhase[] = [
  {
    phase: 'Phase 2',
    title: 'Hardware Biometrics Integration',
    lead: 'Kith Annsreng & Choeng Dyne',
    color: 'text-[#0284c7]',
    barColor: 'bg-[#0284c7]',
    tasks: [
      { name: 'Biometric Hardware Evaluation & Vendor Selection', startCol: 0, endCol: 0, deliverables: 'Optical & capacitive reader bench tests' },
      { name: 'Fingerprint Reader SDK Driver Daemon', startCol: 0, endCol: 0, deliverables: 'Node.js USB/IP daemon driver listener' },
      { name: 'Single-Location Flagship Branch Pilot', startCol: 0, endCol: 1, deliverables: 'Phnom Penh live anti-buddy punching pilot' }
    ]
  },
  {
    phase: 'Phase 3',
    title: 'Multi-Branch Cloud Biometric Rollout',
    lead: 'Choeng Dyne & Leng Panhaleap',
    color: 'text-[#6366f1]',
    barColor: 'bg-[#6366f1]',
    tasks: [
      { name: 'Multi-Branch WireGuard Mesh Network Topology', startCol: 1, endCol: 1, deliverables: 'Secure edge-to-cloud mesh VPN' },
      { name: 'Edge-to-Cloud Biometric Template Synchronization', startCol: 1, endCol: 1, deliverables: 'Distributed roster push to branch readers' },
      { name: 'Offline Punch Buffering & Resilient Cloud Queue', startCol: 1, endCol: 2, deliverables: 'Local SQLite cache with auto-sync on reconnect' }
    ]
  },
  {
    phase: 'Phase 4',
    title: 'Enterprise Accounting Integration',
    lead: 'Choeng Dyne & Kith Annsreng',
    color: 'text-[#d97706]',
    barColor: 'bg-[#d97706]',
    tasks: [
      { name: 'General Ledger Chart of Accounts Mapping', startCol: 2, endCol: 2, deliverables: 'Salary & tax journal cost center split' },
      { name: 'QuickBooks Online & Xero OAuth2 Integration', startCol: 2, endCol: 2, deliverables: 'Automated two-way ledger sync' },
      { name: 'Cambodia GDT E-Tax Format & ABA PayWay Disbursal', startCol: 2, endCol: 3, deliverables: 'Official tax exporter & batch payroll payouts' }
    ]
  },
  {
    phase: 'Phase 5',
    title: 'Native Mobile Applications (iOS & Android)',
    lead: 'Kim Menghorpisith & All Members',
    color: 'text-[#8b5cf6]',
    barColor: 'bg-[#8b5cf6]',
    tasks: [
      { name: 'React Native Cross-Platform ESS Architecture', startCol: 3, endCol: 3, deliverables: 'iOS and Android self-service portals' },
      { name: 'Geofenced GPS Mobile Attendance Clock-In', startCol: 3, endCol: 3, deliverables: 'Radius-restricted clock-in with tamper guard' },
      { name: 'TouchID / FaceID Biometric Mobile Authentication', startCol: 3, endCol: 3, deliverables: 'Hardware biometric keychain authentication' },
      { name: 'App Store & Google Play Store Enterprise Launch', startCol: 3, endCol: 3, deliverables: 'Production store releases & final university defense' }
    ]
  }
];

export const ArchitectureViewer: React.FC = () => {
  const [activeView, setActiveView] = useState<'architecture' | 'erd' | 'scope' | 'timeline'>('timeline');
  const [selectedAssignee, setSelectedAssignee] = useState<string>('All');
  const [timelineViewMode, setTimelineViewMode] = useState<'all' | 'mvp' | 'future'>('all');
  const [screenshotMode, setScreenshotMode] = useState<boolean>(false);

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

          {/* Controls & Mode Toolbar */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-slate-500 mr-1">View Schedule:</span>
              <button
                onClick={() => setTimelineViewMode('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  timelineViewMode === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Combined (All-in-One)
              </button>
              <button
                onClick={() => setTimelineViewMode('mvp')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  timelineViewMode === 'mvp'
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                6-Week MVP Timeline
              </button>
              <button
                onClick={() => setTimelineViewMode('future')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  timelineViewMode === 'future'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Future Development (2027)
              </button>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs font-bold">
                <span className="px-2 text-slate-400 text-[10px] uppercase font-mono">Member:</span>
                <button
                  onClick={() => setSelectedAssignee('All')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    selectedAssignee === 'All' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All
                </button>
                {MVP_TIMELINE.map(m => (
                  <button
                    key={m.name}
                    onClick={() => setSelectedAssignee(selectedAssignee === m.name ? 'All' : m.name)}
                    className={`px-2 py-1 rounded-lg transition-all ${
                      selectedAssignee === m.name ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {m.name.split(' ')[0]}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setScreenshotMode(!screenshotMode)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                  screenshotMode
                    ? 'bg-rose-600 text-white border-rose-700 shadow-xs'
                    : 'bg-emerald-600 text-white border-emerald-700 hover:bg-emerald-700 shadow-xs'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{screenshotMode ? 'Exit Fullscreen' : '📸 Focus for Screenshot'}</span>
              </button>
            </div>
          </div>

          {/* MVP 6-WEEK GANTT CHART (Exact replica of user's uploaded image) */}
          {(timelineViewMode === 'all' || timelineViewMode === 'mvp') && (
            <div className={`bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-7 space-y-4 transition-all ${
              screenshotMode ? 'fixed inset-0 z-50 rounded-none overflow-auto p-8 bg-white' : ''
            }`}>
              {/* Header Title from user's image */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#0f172a] tracking-tight font-sans">
                    ElevateHR — Project Timeline
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                    6-Week Gantt Chart - June W1 – July W6
                  </p>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Limkokwing Software Project Management
                </div>
              </div>

              {/* Table Container */}
              <div className="w-full border border-slate-200 rounded-lg overflow-hidden bg-white">
                {/* Table Header */}
                <div className="flex border-b border-slate-200 bg-white font-bold text-xs text-slate-800 divide-x divide-slate-200">
                  <div className="w-[30%] min-w-[160px] py-2.5 px-4 text-left">
                    Team Member / Task
                  </div>
                  {MVP_COLUMNS.map(col => (
                    <div key={col} className="flex-1 py-2.5 px-1 text-center truncate">
                      {col}
                    </div>
                  ))}
                </div>

                {/* Member Sections */}
                <div className="divide-y divide-slate-200">
                  {MVP_TIMELINE.map(member => {
                    const isMemberActive =
                      selectedAssignee === 'All' ||
                      selectedAssignee === member.name;

                    return (
                      <div
                        key={member.name}
                        className={`transition-opacity ${isMemberActive ? 'opacity-100' : 'opacity-25'}`}
                      >
                        {/* Member Name Row */}
                        <div className="flex items-center h-8 bg-slate-50/40 border-b border-slate-100">
                          <div className={`w-[30%] min-w-[160px] px-4 font-bold text-xs ${member.color}`}>
                            {member.name}
                          </div>
                          <div className="flex-1 h-full divide-x divide-slate-100 flex">
                            {MVP_COLUMNS.map(col => (
                              <div key={col} className="flex-1 h-full" />
                            ))}
                          </div>
                        </div>

                        {/* Task Rows */}
                        <div className="divide-y divide-slate-50">
                          {member.tasks.map(task => (
                            <div key={task.name} className="flex items-center h-9 hover:bg-slate-50/50 transition-colors">
                              {/* Task Name */}
                              <div className="w-[30%] min-w-[160px] px-4 text-xs text-slate-700 truncate font-normal" title={task.name}>
                                {task.name}
                              </div>

                              {/* 6-Week Gantt Area */}
                              <div className="flex-1 h-full relative flex items-center">
                                {/* Vertical Grid Lines */}
                                <div className="absolute inset-0 flex divide-x divide-slate-100 pointer-events-none">
                                  {MVP_COLUMNS.map(col => (
                                    <div key={col} className="flex-1 h-full" />
                                  ))}
                                </div>

                                {/* Continuous Colored Task Bar */}
                                <div
                                  className="absolute h-7 px-1 flex items-center transition-all z-10"
                                  style={{
                                    left: `${(task.startCol / 6) * 100}%`,
                                    width: `${((task.endCol - task.startCol + 1) / 6) * 100}%`
                                  }}
                                >
                                  <div
                                    className={`w-full h-full ${member.barColor} rounded-xs shadow-xs hover:brightness-105 transition-all`}
                                    title={`${member.name}: ${task.name} (${MVP_COLUMNS[task.startCol]} to ${MVP_COLUMNS[task.endCol]}) - ${task.deliverable}`}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* FUTURE DEVELOPMENT ROADMAP (Post-MVP Horizons) */}
          {(timelineViewMode === 'all' || timelineViewMode === 'future') && (
            <div className={`bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-7 space-y-4 transition-all ${
              screenshotMode && timelineViewMode === 'future' ? 'fixed inset-0 z-50 rounded-none overflow-auto p-8 bg-white' : ''
            }`}>
              {/* Header Title */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#0f172a] tracking-tight font-sans">
                    ElevateHR — Future Development Roadmap
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                    Post-MVP 4-Phase Implementation Horizon - Q1 2027 – Q4 2027
                  </p>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Proposal Section 14 Roadmap
                </div>
              </div>

              {/* Table Container */}
              <div className="w-full border border-slate-200 rounded-lg overflow-hidden bg-white">
                {/* Table Header */}
                <div className="flex border-b border-slate-200 bg-white font-bold text-xs text-slate-800 divide-x divide-slate-200">
                  <div className="w-[34%] min-w-[180px] py-2.5 px-4 text-left">
                    Phase / Strategic Milestone
                  </div>
                  {FUTURE_COLUMNS.map(col => (
                    <div key={col} className="flex-1 py-2.5 px-1 text-center truncate">
                      {col}
                    </div>
                  ))}
                </div>

                {/* Phase Sections */}
                <div className="divide-y divide-slate-200">
                  {FUTURE_PHASES.map(phase => (
                    <div key={phase.phase}>
                      {/* Phase Header Row */}
                      <div className="flex items-center h-8 bg-slate-50/50 border-b border-slate-100">
                        <div className={`w-[34%] min-w-[180px] px-4 font-bold text-xs ${phase.color} flex items-center justify-between`}>
                          <span>{phase.phase}: {phase.title}</span>
                          <span className="text-[10px] text-slate-400 font-normal hidden sm:inline">{phase.lead}</span>
                        </div>
                        <div className="flex-1 h-full divide-x divide-slate-100 flex">
                          {FUTURE_COLUMNS.map(col => (
                            <div key={col} className="flex-1 h-full" />
                          ))}
                        </div>
                      </div>

                      {/* Task Rows */}
                      <div className="divide-y divide-slate-50">
                        {phase.tasks.map(task => (
                          <div key={task.name} className="flex items-center h-9 hover:bg-slate-50/50 transition-colors">
                            {/* Task Name */}
                            <div className="w-[34%] min-w-[180px] px-4 text-xs text-slate-700 truncate font-normal" title={task.name}>
                              {task.name}
                            </div>

                            {/* 4-Quarter Gantt Area */}
                            <div className="flex-1 h-full relative flex items-center">
                              {/* Vertical Grid Lines */}
                              <div className="absolute inset-0 flex divide-x divide-slate-100 pointer-events-none">
                                {FUTURE_COLUMNS.map(col => (
                                  <div key={col} className="flex-1 h-full" />
                                ))}
                              </div>

                              {/* Continuous Colored Task Bar */}
                              <div
                                className="absolute h-7 px-1 flex items-center transition-all z-10"
                                style={{
                                  left: `${(task.startCol / 4) * 100}%`,
                                  width: `${((task.endCol - task.startCol + 1) / 4) * 100}%`
                                }}
                              >
                                <div
                                  className={`w-full h-full ${phase.barColor} rounded-xs shadow-xs hover:brightness-105 transition-all`}
                                  title={`${phase.title}: ${task.name} (${FUTURE_COLUMNS[task.startCol]} to ${FUTURE_COLUMNS[task.endCol]}) - ${task.deliverables}`}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Milestone Summary & Signoff Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Project Verification Milestones & University Defense Sign-off
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Phase 1: Planning (Weeks 1–3)
                </div>
                <div className="text-slate-500 text-[11px]">Requirements specification, Figma design library, system architecture & ERD schema.</div>
                <div className="text-emerald-700 font-semibold text-[10px]">Status: Verified & Approved</div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Phase 2 & 3: Dev & QA (Weeks 4–11)
                </div>
                <div className="text-slate-500 text-[11px]">REST API, Cambodia payroll tax engine, leave approval rules, attendance tracking, and penetration audit.</div>
                <div className="text-emerald-700 font-semibold text-[10px]">Status: Verified & Approved</div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Phase 4: Deploy & UAT (Weeks 12–14)
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
