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

interface CalendarWeek {
  index: number;
  date: number;
  month: string;
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
}

interface MonthGroup {
  name: string;
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  dates: number[];
}

const TEMPLATE_MONTHS: MonthGroup[] = [
  // Q1 (13 weeks)
  { name: 'JANUARY', quarter: 'Q1', dates: [6, 13, 20, 27] },
  { name: 'FEBRUARY', quarter: 'Q1', dates: [3, 10, 17, 24] },
  { name: 'MARCH', quarter: 'Q1', dates: [2, 9, 16, 23, 30] },
  // Q2 (13 weeks)
  { name: 'APRIL', quarter: 'Q2', dates: [6, 13, 20, 27] },
  { name: 'MAY', quarter: 'Q2', dates: [4, 11, 18, 25] },
  { name: 'JUNE', quarter: 'Q2', dates: [1, 8, 15, 22, 29] },
  // Q3 (13 weeks)
  { name: 'JULY', quarter: 'Q3', dates: [6, 13, 20, 27] },
  { name: 'AUGUST', quarter: 'Q3', dates: [3, 10, 17, 24, 31] },
  { name: 'SEPTEMBER', quarter: 'Q3', dates: [7, 14, 21, 28] },
  // Q4 (13 weeks)
  { name: 'OCTOBER', quarter: 'Q4', dates: [5, 12, 19, 26] },
  { name: 'NOVEMBER', quarter: 'Q4', dates: [2, 9, 16, 23, 30] },
  { name: 'DECEMBER', quarter: 'Q4', dates: [7, 14, 21, 28] }
];

const ALL_52_WEEKS: CalendarWeek[] = TEMPLATE_MONTHS.flatMap(m =>
  m.dates.map(date => ({
    date,
    month: m.name,
    quarter: m.quarter,
    index: 0
  }))
).map((w, idx) => ({ ...w, index: idx }));

interface ScheduleTask {
  code: string;
  title: string;
  assignee: 'Chhong Dyne' | 'Kith Annsreng' | 'Leng Panhaleap' | 'Kim Menghorpisith' | 'All Members';
  start: number; // 0 to 51
  end: number; // 0 to 51 (inclusive)
  deliverables: string;
}

interface ScheduleProject {
  id: string;
  name: string;
  subtitle: string;
  phaseCode: string;
  headerBg: string;
  labelBg: string;
  barColor: string;
  parentBarColor: string;
  parentStart: number;
  parentEnd: number;
  tasks: ScheduleTask[];
}

const SCHEDULE_PROJECTS: ScheduleProject[] = [
  {
    id: 'P1',
    name: 'PROJECT ONE',
    subtitle: 'MVP Core System Stabilization',
    phaseCode: 'Phase 1 • Q4 2026 – Q1 2027',
    headerBg: 'bg-[#1e293b] text-white',
    labelBg: 'bg-[#e2e8f0]',
    barColor: 'bg-[#64748b]',
    parentBarColor: 'bg-[#334155]',
    parentStart: 8,
    parentEnd: 12,
    tasks: [
      { code: 'Task 1', title: 'Requirements Gathering & Proposal Specification', assignee: 'Chhong Dyne', start: 8, end: 9, deliverables: 'Proposal doc, target personas, scope definition' },
      { code: 'Task 2', title: 'UI/UX Design System & Figma Wireframes', assignee: 'Kim Menghorpisith', start: 9, end: 10, deliverables: 'Figma component library, high-contrast tokens' },
      { code: 'Task 3', title: 'System Architecture & Relational ERD Modeling', assignee: 'Chhong Dyne', start: 9, end: 10, deliverables: '3-tier data flow diagram, schema relations' },
      { code: 'Task 3.1', title: 'Express REST API & Database Schema Engine', assignee: 'Chhong Dyne', start: 10, end: 11, deliverables: 'JSON/SQLite database models, CRUD endpoints' },
      { code: 'Task 3.2', title: 'React + Vite Frontend Shell & RBAC Navigation', assignee: 'Kith Annsreng', start: 10, end: 11, deliverables: '1-click role switcher, responsive sidebar' },
      { code: 'Task 3.3', title: 'Statutory Payroll Calculation & Progressive Tax Engine', assignee: 'Chhong Dyne', start: 10, end: 11, deliverables: 'Cambodian tax brackets, 4% NSSF, deductions' },
      { code: 'Task 4', title: 'Cambodia Labor Compliance & Render Cloud Deployment', assignee: 'Leng Panhaleap', start: 11, end: 12, deliverables: 'Production deploy on Render, QA sign-off' }
    ]
  },
  {
    id: 'P2',
    name: 'PROJECT TWO',
    subtitle: 'Hardware Biometric Integration (Pilot)',
    phaseCode: 'Phase 2 • Q1 – Q2 2027',
    headerBg: 'bg-[#16a34a] text-white',
    labelBg: 'bg-[#dcfce7]',
    barColor: 'bg-[#84cc16]',
    parentBarColor: 'bg-[#16a34a]',
    parentStart: 10,
    parentEnd: 26,
    tasks: [
      { code: 'Task 1', title: 'Biometric Hardware Evaluation & Vendor Selection', assignee: 'Kith Annsreng', start: 12, end: 14, deliverables: 'ZKTeco/Hikvision optical & capacitive reader test' },
      { code: 'Task 2', title: 'Fingerprint Reader SDK Driver Daemon', assignee: 'Chhong Dyne', start: 11, end: 13, deliverables: 'Node.js USB/IP daemon driver listener' },
      { code: 'Task 3', title: 'Biometric Template Cryptographic Storage', assignee: 'Leng Panhaleap', start: 12, end: 14, deliverables: 'One-way template hashing, AES-256 vault' },
      { code: 'Task 4', title: 'Real-Time Hardware Punch Log Listener', assignee: 'Chhong Dyne', start: 13, end: 15, deliverables: 'WebSocket push of physical clock-ins' },
      { code: 'Task 5', title: 'Anti-Buddy Punching & Liveness Detection', assignee: 'Kith Annsreng', start: 15, end: 16, deliverables: 'Sub-second fraud prevention filter' },
      { code: 'Task 6', title: 'Single-Location Pilot Hardware Setup', assignee: 'Kim Menghorpisith', start: 16, end: 17, deliverables: 'Phnom Penh flagship branch installation' },
      { code: 'Task 7', title: 'Physical vs Web Attendance Calibration', assignee: 'Leng Panhaleap', start: 17, end: 19, deliverables: 'Punctuality precision validation' },
      { code: 'Task 8', title: 'Pilot Sign-off & MoLVT Compliance Audit', assignee: 'All Members', start: 19, end: 26, deliverables: 'Section 14 Phase 2 audit approval' }
    ]
  },
  {
    id: 'P3',
    name: 'PROJECT THREE',
    subtitle: 'Multi-Branch Biometric Cloud Rollout',
    phaseCode: 'Phase 3 • Q2 – Q3 2027',
    headerBg: 'bg-[#52525b] text-white',
    labelBg: 'bg-[#e4e4e7]',
    barColor: 'bg-[#94a3b8]',
    parentBarColor: 'bg-[#52525b]',
    parentStart: 13,
    parentEnd: 29,
    tasks: [
      { code: 'Task 1', title: 'Multi-Branch Network Topology & Edge VPN', assignee: 'Chhong Dyne', start: 14, end: 25, deliverables: 'Secure site-to-site WireGuard edge mesh' },
      { code: 'Task 2', title: 'Edge-to-Cloud Biometric Template Sync', assignee: 'Kith Annsreng', start: 15, end: 24, deliverables: 'Distributed roster push to branch readers' },
      { code: 'Task 3', title: 'Offline Punch Buffering & Resilient Queue', assignee: 'Chhong Dyne', start: 16, end: 18, deliverables: 'Local SQLite cache during ISP outage' },
      { code: 'Task 4', title: 'Multi-Tenant Branch Gateway Deployment', assignee: 'Leng Panhaleap', start: 18, end: 20, deliverables: 'Automated gateway config scripts' },
      { code: 'Task 5', title: 'Branch Manager Attendance Live Dashboard', assignee: 'Kim Menghorpisith', start: 20, end: 29, deliverables: 'Real-time multi-branch presence view' },
      { code: 'Task 6', title: 'WAN Disconnect Auto-Failover Testing', assignee: 'Leng Panhaleap', start: 23, end: 28, deliverables: 'Zero-data-loss stress testing' },
      { code: 'Task 7', title: 'Cross-Branch Roaming Employee Verification', assignee: 'Kith Annsreng', start: 29, end: 29, deliverables: 'Seamless clock-in across any location' },
      { code: 'Task 8', title: 'National Multi-Branch Rollout Complete', assignee: 'All Members', start: 30, end: 30, deliverables: 'Section 14 Phase 3 national milestone' }
    ]
  },
  {
    id: 'P4',
    name: 'PROJECT FOUR',
    subtitle: 'Enterprise Accounting & ERP Integration',
    phaseCode: 'Phase 4 • Q2 – Q4 2027',
    headerBg: 'bg-[#ca8a04] text-white',
    labelBg: 'bg-[#fef3c7]',
    barColor: 'bg-[#f59e0b]',
    parentBarColor: 'bg-[#ca8a04]',
    parentStart: 17,
    parentEnd: 42,
    tasks: [
      { code: 'Task 1', title: 'Chart of Accounts & Cost Center Mapping', assignee: 'Chhong Dyne', start: 18, end: 18, deliverables: 'Departmental salary & tax ledger mapping' },
      { code: 'Task 2', title: 'QuickBooks Online & Xero OAuth2 Engine', assignee: 'Kith Annsreng', start: 19, end: 19, deliverables: 'Certified API token handshake' },
      { code: 'Task 3', title: 'Statutory Payroll Cost Split Engine', assignee: 'Chhong Dyne', start: 19, end: 26, deliverables: 'Gross salary, 4% NSSF, and tax journals' },
      { code: 'Task 4', title: 'Two-Way General Ledger Journal Sync', assignee: 'Chhong Dyne', start: 24, end: 24, deliverables: 'Automated monthly debit/credit posting' },
      { code: 'Task 5', title: 'Bank ABA PayWay / Wing Batch Disbursal', assignee: 'Kith Annsreng', start: 24, end: 24, deliverables: 'Automated batch payroll payout files' },
      { code: 'Task 6', title: 'Automated End-of-Month Tax File Exporter', assignee: 'Leng Panhaleap', start: 24, end: 24, deliverables: 'Pre-filled GDT monthly withholding sheet' },
      { code: 'Task 7', title: 'Cambodia GDT E-Tax Format Compliance', assignee: 'Leng Panhaleap', start: 24, end: 24, deliverables: 'Official tax authority schema validation' },
      { code: 'Task 8', title: 'Enterprise ERP Synchronization Sign-off', assignee: 'All Members', start: 24, end: 42, deliverables: 'Section 14 Phase 4 enterprise audit' }
    ]
  },
  {
    id: 'P5',
    name: 'PROJECT FIVE',
    subtitle: 'Native Mobile Applications (iOS & Android)',
    phaseCode: 'Phase 5 • Q3 – Q4 2027',
    headerBg: 'bg-[#0284c7] text-white',
    labelBg: 'bg-[#e0f2fe]',
    barColor: 'bg-[#0ea5e9]',
    parentBarColor: 'bg-[#0284c7]',
    parentStart: 26,
    parentEnd: 48,
    tasks: [
      { code: 'Task 1', title: 'React Native / Flutter Cross-Platform Architecture', assignee: 'Kim Menghorpisith', start: 26, end: 28, deliverables: 'Mobile state engine & component kit' },
      { code: 'Task 2', title: 'Geofenced GPS Mobile Attendance Clock-In', assignee: 'Kith Annsreng', start: 28, end: 29, deliverables: 'Radius-restricted mobile punch' },
      { code: 'Task 3', title: 'TouchID / FaceID Biometric Auth Module', assignee: 'Chhong Dyne', start: 29, end: 29, deliverables: 'Hardware biometrics keychain security' },
      { code: 'Task 4', title: 'Push Notifications for Leave & Overtime', assignee: 'Kim Menghorpisith', start: 29, end: 29, deliverables: 'FCM / APNs instant approval notifications' },
      { code: 'Task 5', title: 'Digital PDF Payslip Download & Storage', assignee: 'Kith Annsreng', start: 30, end: 32, deliverables: 'Offline encrypted payslip vault' },
      { code: 'Task 6', title: 'Tamper-Proof Offline Attendance Stash', assignee: 'Leng Panhaleap', start: 31, end: 32, deliverables: 'Cryptographic signature on punch queues' },
      { code: 'Task 7', title: 'App Store & Play Store Compliance Build', assignee: 'All Members', start: 33, end: 39, deliverables: 'Apple Developer & Google Play submission' },
      { code: 'Task 8', title: 'Enterprise Mobile Rollout & UAT Defense', assignee: 'All Members', start: 43, end: 46, deliverables: 'End-to-end pilot feedback rollout' },
      { code: 'Task 9', title: 'University Defense Final Presentation', assignee: 'All Members', start: 47, end: 48, deliverables: 'Project completion & graduation demo' }
    ]
  }
];

export const ArchitectureViewer: React.FC = () => {
  const [activeView, setActiveView] = useState<'architecture' | 'erd' | 'scope' | 'timeline'>('timeline');
  const [selectedAssignee, setSelectedAssignee] = useState<string>('All');
  const [labelStyle, setLabelStyle] = useState<'template' | 'detailed'>('template');
  const [zoomScale, setZoomScale] = useState<number>(100);
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

          {/* MULTIPLE PROJECT SCHEDULE TEMPLATE CONTAINER */}
          <div className={`bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm space-y-4 transition-all ${
            screenshotMode ? 'fixed inset-0 z-50 rounded-none overflow-auto p-6 bg-white' : ''
          }`}>
            {/* Top Toolbar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-slate-900 text-white text-[10px] font-black uppercase rounded tracking-wider">
                    Limkokwing SPM Proposal
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                    5 Projects • 52-Week Calendar
                  </span>
                  {screenshotMode && (
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded animate-pulse">
                      📸 Screenshot Mode Active (Press Esc or Exit button)
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight mt-1 font-sans">
                  MULTIPLE PROJECT SCHEDULE TEMPLATE
                </h2>
                <p className="text-xs text-slate-500">
                  Section 14 Implementation Roadmap • MVP Stabilization, Biometrics, Cloud Sync, ERP & Native Mobile
                </p>
              </div>

              {/* Toolbar Controls */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Style Toggle */}
                <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[11px] font-bold">
                  <button
                    onClick={() => setLabelStyle('template')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      labelStyle === 'template' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                    }`}
                    title="Exact labels like the template image (Task 1, Task 2...)"
                  >
                    Template Labels
                  </button>
                  <button
                    onClick={() => setLabelStyle('detailed')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      labelStyle === 'detailed' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                    }`}
                    title="Descriptive deliverables from proposal"
                  >
                    Deliverable Names
                  </button>
                </div>

                {/* Zoom Fit Controls */}
                <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[11px] font-bold">
                  <span className="px-2 text-slate-400 text-[10px] uppercase font-mono">Zoom</span>
                  {[
                    { label: '75%', val: 75 },
                    { label: '85%', val: 85 },
                    { label: '100%', val: 100 }
                  ].map(z => (
                    <button
                      key={z.val}
                      onClick={() => setZoomScale(z.val)}
                      className={`px-2 py-1 rounded-md transition-all ${
                        zoomScale === z.val ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      {z.label}
                    </button>
                  ))}
                </div>

                {/* Team Member Filter */}
                <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[11px] font-bold">
                  <button
                    onClick={() => setSelectedAssignee('All')}
                    className={`px-2 py-1 rounded-md transition-all ${
                      selectedAssignee === 'All' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All
                  </button>
                  {TEAM_MEMBERS.map(m => (
                    <button
                      key={m.name}
                      onClick={() => setSelectedAssignee(selectedAssignee === m.name ? 'All' : m.name)}
                      className={`px-2 py-1 rounded-md transition-all ${
                        selectedAssignee === m.name ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {m.name.split(' ')[0]}
                    </button>
                  ))}
                </div>

                {/* Screenshot Focus Mode Button */}
                <button
                  onClick={() => setScreenshotMode(!screenshotMode)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border ${
                    screenshotMode
                      ? 'bg-rose-600 text-white border-rose-700 shadow-sm'
                      : 'bg-emerald-600 text-white border-emerald-700 hover:bg-emerald-700 shadow-sm'
                  }`}
                  title={screenshotMode ? 'Exit Screenshot View' : 'Focus for clean single-screen screenshot'}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>{screenshotMode ? 'Exit Screenshot View' : '📸 Screenshot Mode'}</span>
                </button>
              </div>
            </div>

            {/* Hint for easy screenshot */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-slate-700">💡 Screenshot Tip:</span>
                <span>Press <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-mono text-[10px] text-slate-800">Win</kbd> + <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-mono text-[10px] text-slate-800">Shift</kbd> + <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-mono text-[10px] text-slate-800">S</kbd> to snip.</span>
                <span>Zoom <strong>85%</strong> fits all 5 projects on a 1080p screen.</span>
              </div>
              {selectedAssignee !== 'All' && (
                <div className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Highlighting: {selectedAssignee}
                </div>
              )}
            </div>

            {/* The Visual Schedule Grid with dynamic zoom */}
            <div
              className="overflow-x-auto border border-slate-300 rounded-sm bg-white shadow-xs"
              style={{
                transformOrigin: 'top left',
                transform: zoomScale !== 100 ? `scale(${zoomScale / 100})` : 'none',
                width: zoomScale !== 100 ? `${(100 / zoomScale) * 100}%` : '100%',
                marginBottom: zoomScale !== 100 ? `-${(100 - zoomScale) * 4}px` : '0px'
              }}
            >
              <div className="min-w-[1140px] text-[10px]">
                {/* 1. Header Row 1: Quarters (Q1, Q2, Q3, Q4) */}
                <div className="flex border-b border-slate-300 font-black text-[11px] text-white">
                  <div className="w-[220px] shrink-0 bg-white border-r border-slate-300"></div>
                  {/* Q1: 13 weeks */}
                  <div className="flex-[13] bg-[#1e293b] text-center py-1 border-r border-slate-700 tracking-wider">
                    Q1
                  </div>
                  {/* Q2: 13 weeks */}
                  <div className="flex-[13] bg-[#15803d] text-center py-1 border-r border-green-800 tracking-wider">
                    Q2
                  </div>
                  {/* Q3: 13 weeks */}
                  <div className="flex-[13] bg-[#475569] text-center py-1 border-r border-slate-700 tracking-wider">
                    Q3
                  </div>
                  {/* Q4: 13 weeks */}
                  <div className="flex-[13] bg-[#b45309] text-center py-1 tracking-wider">
                    Q4
                  </div>
                </div>

                {/* 2. Header Row 2: Months (January to December) */}
                <div className="flex border-b border-slate-300 text-[9px] font-bold text-white uppercase">
                  <div className="w-[220px] shrink-0 bg-slate-50 text-slate-500 font-medium text-[8px] italic text-right pr-2 py-0.5 border-r border-slate-300 truncate">
                    Enter the date of the first Monday of each month ---&gt;
                  </div>
                  {TEMPLATE_MONTHS.map(m => {
                    const monthBg =
                      m.quarter === 'Q1'
                        ? 'bg-[#1e293b] border-slate-700'
                        : m.quarter === 'Q2'
                        ? 'bg-[#15803d] border-green-800'
                        : m.quarter === 'Q3'
                        ? 'bg-[#475569] border-slate-700'
                        : 'bg-[#b45309] border-amber-800';
                    return (
                      <div
                        key={m.name}
                        style={{ flex: m.dates.length }}
                        className={`${monthBg} text-center py-0.5 border-r tracking-tight truncate`}
                      >
                        {m.name}
                      </div>
                    );
                  })}
                </div>

                {/* 3. Header Row 3: Monday Dates */}
                <div className="flex border-b border-slate-300 font-mono text-[8px] font-bold text-slate-700">
                  <div className="w-[220px] shrink-0 bg-slate-50 border-r border-slate-300"></div>
                  {ALL_52_WEEKS.map(w => {
                    const weekBg =
                      w.quarter === 'Q1'
                        ? 'bg-slate-50'
                        : w.quarter === 'Q2'
                        ? 'bg-[#ecfdf5]'
                        : w.quarter === 'Q3'
                        ? 'bg-slate-100'
                        : 'bg-[#fefce8]';
                    return (
                      <div
                        key={w.index}
                        className={`flex-1 text-center py-0.5 border-r border-slate-300 ${weekBg}`}
                      >
                        {w.date}
                      </div>
                    );
                  })}
                </div>

                {/* 4. Projects & Tasks Schedule */}
                <div className="divide-y divide-slate-200">
                  {SCHEDULE_PROJECTS.map(project => (
                    <div key={project.id} className="border-b-2 border-slate-300/80">
                      {/* Project Header Row */}
                      <div className="flex items-center h-[22px] border-b border-slate-200 font-bold">
                        {/* Project Header Title */}
                        <div
                          className={`w-[220px] shrink-0 h-full ${project.headerBg} px-2 flex items-center justify-between border-r border-slate-300 text-[10px] tracking-wider uppercase font-black`}
                        >
                          <span className="truncate">{project.name}</span>
                          <span className="text-[8px] font-normal opacity-80 hidden sm:inline">
                            {project.subtitle.split(' ')[0]}
                          </span>
                        </div>

                        {/* Project Schedule Area with Summary Bar */}
                        <div className="flex-1 relative h-full flex items-center">
                          {/* 52 Grid columns */}
                          <div className="absolute inset-0 flex">
                            {ALL_52_WEEKS.map(w => {
                              const cellBg =
                                w.quarter === 'Q1'
                                  ? 'bg-white'
                                  : w.quarter === 'Q2'
                                  ? 'bg-[#ecfdf5]/40'
                                  : w.quarter === 'Q3'
                                  ? 'bg-[#f8fafc]'
                                  : 'bg-[#fefce8]/40';
                              return (
                                <div
                                  key={w.index}
                                  className={`flex-1 h-full border-r border-slate-200 ${cellBg}`}
                                />
                              );
                            })}
                          </div>

                          {/* Continuous Parent Bar */}
                          <div
                            className={`absolute h-[14px] rounded-[2px] ${project.parentBarColor} shadow-xs z-10 transition-all`}
                            style={{
                              left: `${(project.parentStart / 52) * 100}%`,
                              width: `${((project.parentEnd - project.parentStart + 1) / 52) * 100}%`
                            }}
                            title={`${project.name}: ${project.subtitle} (${project.phaseCode})`}
                          />
                        </div>
                      </div>

                      {/* Project Task Sub-Rows */}
                      {project.tasks.map(task => {
                        const isHighlighted =
                          selectedAssignee === 'All' ||
                          task.assignee === selectedAssignee ||
                          task.assignee === 'All Members';

                        return (
                          <div
                            key={task.code + task.title}
                            className={`flex items-center h-[20px] border-b border-slate-100 transition-opacity ${
                              isHighlighted ? 'opacity-100' : 'opacity-25'
                            }`}
                          >
                            {/* Task Label Cell */}
                            <div
                              className={`w-[220px] shrink-0 h-full ${project.labelBg} px-2 flex items-center justify-between border-r border-slate-300 text-[9.5px] font-medium text-slate-800`}
                            >
                              <span className="truncate">
                                {labelStyle === 'template' ? (
                                  <span className="font-semibold text-slate-900">{task.code}</span>
                                ) : (
                                  <span>
                                    <strong className="text-slate-900 mr-1">{task.code}:</strong>
                                    {task.title}
                                  </span>
                                )}
                              </span>
                              {labelStyle === 'detailed' && (
                                <span className="text-[8px] font-bold text-slate-500 shrink-0 ml-1">
                                  {task.assignee.split(' ')[0]}
                                </span>
                              )}
                            </div>

                            {/* Task Timeline Area */}
                            <div className="flex-1 relative h-full flex items-center">
                              {/* 52 Grid columns */}
                              <div className="absolute inset-0 flex">
                                {ALL_52_WEEKS.map(w => {
                                  const cellBg =
                                    w.quarter === 'Q1'
                                      ? 'bg-white'
                                      : w.quarter === 'Q2'
                                      ? 'bg-[#ecfdf5]/40'
                                      : w.quarter === 'Q3'
                                      ? 'bg-[#f8fafc]'
                                      : 'bg-[#fefce8]/40';
                                  return (
                                    <div
                                      key={w.index}
                                      className={`flex-1 h-full border-r border-slate-200 ${cellBg}`}
                                    />
                                  );
                                })}
                              </div>

                              {/* Continuous Cascading Task Bar */}
                              <div
                                className={`absolute h-[13px] rounded-[2px] ${project.barColor} shadow-xs z-10 transition-all cursor-pointer hover:brightness-110`}
                                style={{
                                  left: `${(task.start / 52) * 100}%`,
                                  width: `${((task.end - task.start + 1) / 52) * 100}%`
                                }}
                                title={`${task.code}: ${task.title} • Assignee: ${task.assignee} • Deliverable: ${task.deliverables}`}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

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
