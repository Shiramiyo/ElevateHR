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
  startMonth: number; // 1 to 8 (June 2026 to Q1 2027)
  durationMonths: number;
  progress: number;
  status: 'Completed' | 'In Progress' | 'Planned';
  deliverables: string;
  isFuture?: boolean;
}

export const TIMELINE_COLUMNS = [
  { id: 'm1', label: 'June 2026', shortLabel: 'Jun 2026', sub: 'Phase 1: Planning', isCurrent: false, isFuture: false },
  { id: 'm2', label: 'July 2026', shortLabel: 'Jul 2026', sub: 'Phase 2: Core Dev', isCurrent: false, isFuture: false },
  { id: 'm3', label: 'August 2026', shortLabel: 'Aug 2026', sub: 'Phase 3: Testing', isCurrent: false, isFuture: false },
  { id: 'm4', label: 'Sept 2026 (Now)', shortLabel: 'Sep (Now)', sub: 'Live on Render', isCurrent: true, isFuture: false },
  { id: 'm5', label: 'Oct 2026', shortLabel: 'Oct 2026', sub: 'Future: Biometrics', isCurrent: false, isFuture: true },
  { id: 'm6', label: 'Nov 2026', shortLabel: 'Nov 2026', sub: 'Future: Multi-Branch', isCurrent: false, isFuture: true },
  { id: 'm7', label: 'Dec 2026', shortLabel: 'Dec 2026', sub: 'Future: Accounting ERP', isCurrent: false, isFuture: true },
  { id: 'm8', label: 'Q1 2027', shortLabel: 'Q1 2027', sub: 'Future: Native Mobile', isCurrent: false, isFuture: true }
];

const GANTT_TASKS: GanttTask[] = [
  // --- Phase 1: Planning & Architecture (June 2026) ---
  {
    id: 'TSK-01',
    name: 'Requirements Gathering & Proposal Specification',
    phase: 'Phase 1: Planning',
    assignee: 'Choeng Dyne',
    role: 'Full-Stack Lead',
    startMonth: 1,
    durationMonths: 1,
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
    startMonth: 1,
    durationMonths: 1,
    progress: 100,
    status: 'Completed',
    deliverables: 'Figma Component Library, Color Tokens, Mobile Layouts'
  },
  {
    id: 'TSK-03',
    name: 'QA Test Strategy & Statutory Compliance Criteria Formulation',
    phase: 'Phase 1: Planning',
    assignee: 'Leng Panhaleap',
    role: 'QA & Security Tester',
    startMonth: 1,
    durationMonths: 1,
    progress: 100,
    status: 'Completed',
    deliverables: 'Test Plan, MoLVT Compliance Checklists, Risk Matrix'
  },
  {
    id: 'TSK-04',
    name: 'System Architecture & Relational ERD Modeling',
    phase: 'Phase 1: Planning',
    assignee: 'Choeng Dyne',
    role: 'Full-Stack Lead',
    startMonth: 1,
    durationMonths: 1,
    progress: 100,
    status: 'Completed',
    deliverables: '3-Tier Data Flow Diagram, ERD Relational Entities'
  },
  {
    id: 'TSK-05',
    name: 'Frontend Architecture & Development Environment Setup',
    phase: 'Phase 1: Planning',
    assignee: 'Kith Annsreng',
    role: 'Developer',
    startMonth: 1,
    durationMonths: 1,
    progress: 100,
    status: 'Completed',
    deliverables: 'Vite SPA Tooling, Tailwind Config, Code Formatting Pipeline'
  },

  // --- Phase 2: Core Engineering (July 2026 – August 2026) ---
  {
    id: 'TSK-06',
    name: 'Express REST API & Database Schema Engine',
    phase: 'Phase 2: Core Engineering',
    assignee: 'Choeng Dyne',
    role: 'Full-Stack Lead',
    startMonth: 2,
    durationMonths: 1,
    progress: 100,
    status: 'Completed',
    deliverables: 'Node/Express REST Architecture, JSON Data Store, Seed Fixtures'
  },
  {
    id: 'TSK-07',
    name: 'High-Fidelity UI Prototypes & Mobile Design Tokens',
    phase: 'Phase 2: Core Engineering',
    assignee: 'Kim Menghorpisith',
    role: 'UI/UX Designer',
    startMonth: 2,
    durationMonths: 1,
    progress: 100,
    status: 'Completed',
    deliverables: 'Interactive Prototypes, Micro-interactions, WCAG Standards'
  },
  {
    id: 'TSK-08',
    name: 'React + Vite Frontend Shell & RBAC Navigation',
    phase: 'Phase 2: Core Engineering',
    assignee: 'Kith Annsreng',
    role: 'Developer',
    startMonth: 2,
    durationMonths: 1,
    progress: 100,
    status: 'Completed',
    deliverables: 'Sidebar, Top Navbar, 1-Click Role/Persona Switcher'
  },
  {
    id: 'TSK-09',
    name: 'Database Schema & REST API Functional Testing',
    phase: 'Phase 2: Core Engineering',
    assignee: 'Leng Panhaleap',
    role: 'QA & Security Tester',
    startMonth: 2,
    durationMonths: 1,
    progress: 100,
    status: 'Completed',
    deliverables: 'Endpoint Validation, Status Code Verifications, Edge Cases'
  },
  {
    id: 'TSK-10',
    name: 'Employee Directory & MoLVT Work Permit Module',
    phase: 'Phase 2: Core Engineering',
    assignee: 'Kith Annsreng',
    role: 'Developer',
    startMonth: 2,
    durationMonths: 2,
    progress: 100,
    status: 'Completed',
    deliverables: 'Staff Profiles, Expat FWCMS Tracking, Image Compression'
  },
  {
    id: 'TSK-11',
    name: 'Statutory Cambodian Payroll Tax & NSSF Engine',
    phase: 'Phase 2: Core Engineering',
    assignee: 'Choeng Dyne',
    role: 'Full-Stack Lead',
    startMonth: 3,
    durationMonths: 1,
    progress: 100,
    status: 'Completed',
    deliverables: 'Cambodia Tax Brackets, 4% NSSF, Overtime & Deductions'
  },
  {
    id: 'TSK-12',
    name: 'Cambodian Labor Law Compliance Verification (Arts. 166/182)',
    phase: 'Phase 3: Integration & Testing',
    assignee: 'Leng Panhaleap',
    role: 'QA & Security Tester',
    startMonth: 3,
    durationMonths: 1,
    progress: 100,
    status: 'Completed',
    deliverables: 'MoLVT Article Compliance Audits, Maternity & Sick Leave Rules'
  },
  {
    id: 'TSK-13',
    name: 'Executive Dashboard & Department Analytics Visuals',
    phase: 'Phase 2: Core Engineering',
    assignee: 'Kim Menghorpisith',
    role: 'UI/UX Designer',
    startMonth: 3,
    durationMonths: 1,
    progress: 100,
    status: 'Completed',
    deliverables: 'High-Contrast White Tooltips, Donut & Bar Charts, Metric Cards'
  },
  {
    id: 'TSK-14',
    name: 'Leave Management & Full-Stack System Integration',
    phase: 'Phase 3: Integration & Testing',
    assignee: 'Choeng Dyne',
    role: 'Full-Stack Lead',
    startMonth: 3,
    durationMonths: 1,
    progress: 100,
    status: 'Completed',
    deliverables: 'Leave Approval Logic, Overdraft Guard, Cloud Integration'
  },
  {
    id: 'TSK-15',
    name: 'Daily Attendance Punch Clock & Punctuality Engine',
    phase: 'Phase 2: Core Engineering',
    assignee: 'Kith Annsreng',
    role: 'Developer',
    startMonth: 3,
    durationMonths: 1,
    progress: 100,
    status: 'Completed',
    deliverables: 'Attendance Punching, Punctuality Metrics, Hours Tracking'
  },

  // --- Phase 4: Production Deployment & Live Website on Render (Sept 2026 - NOW) ---
  {
    id: 'TSK-16',
    name: 'Production Cloud Deployment & Live Render App Verification',
    phase: 'Phase 4: Live Production',
    assignee: 'Choeng Dyne',
    role: 'Full-Stack Lead',
    startMonth: 4,
    durationMonths: 1,
    progress: 100,
    status: 'Completed',
    deliverables: 'Live Web App on Render (elevatehr-st61.onrender.com), Healthcheck Monitor'
  },
  {
    id: 'TSK-17',
    name: 'Client-Side PDF Payslip & Excel Export Generators',
    phase: 'Phase 4: Live Production',
    assignee: 'Kith Annsreng',
    role: 'Developer',
    startMonth: 4,
    durationMonths: 1,
    progress: 100,
    status: 'Completed',
    deliverables: 'Confidential Payslip PDFs, Roster & Payroll Excel Sheets'
  },
  {
    id: 'TSK-18',
    name: 'RBAC Security Audit, Penetration Testing & UAT Sign-off',
    phase: 'Phase 4: Live Production',
    assignee: 'Leng Panhaleap',
    role: 'QA & Security Tester',
    startMonth: 4,
    durationMonths: 1,
    progress: 100,
    status: 'Completed',
    deliverables: 'Rate Limiting, XSS Sanitization, UAT Sign-off Report'
  },
  {
    id: 'TSK-19',
    name: 'Live Web App Usability Polish & Defense Presentation Deck',
    phase: 'Phase 4: Live Production',
    assignee: 'Kim Menghorpisith',
    role: 'UI/UX Designer',
    startMonth: 4,
    durationMonths: 1,
    progress: 100,
    status: 'Completed',
    deliverables: 'WCAG Contrast Verification, University Defense Slide Deck'
  },

  // --- Phase 5: Future Plan & Roadmap (After this month / October 2026 onwards) ---
  {
    id: 'TSK-20',
    name: 'Single-Location Optical/Capacitive Biometrics Pilot',
    phase: 'Phase 5: Future Roadmap',
    assignee: 'Choeng Dyne',
    role: 'Full-Stack Lead',
    startMonth: 5,
    durationMonths: 1,
    progress: 0,
    status: 'Planned',
    deliverables: 'Hardware fingerprint reader driver, USB/Serial SDK integration',
    isFuture: true
  },
  {
    id: 'TSK-21',
    name: 'Biometric Anti-Spoofing & Device Validation Protocols',
    phase: 'Phase 5: Future Roadmap',
    assignee: 'Leng Panhaleap',
    role: 'QA & Security Tester',
    startMonth: 5,
    durationMonths: 1,
    progress: 0,
    status: 'Planned',
    deliverables: 'Anti-buddy punching verification, hardware security testing',
    isFuture: true
  },
  {
    id: 'TSK-22',
    name: 'Multi-Branch Biometric Sync & Cloud Centralization',
    phase: 'Phase 5: Future Roadmap',
    assignee: 'Kith Annsreng',
    role: 'Developer',
    startMonth: 6,
    durationMonths: 1,
    progress: 0,
    status: 'Planned',
    deliverables: 'Multi-site punch clock log aggregation, offline buffer sync',
    isFuture: true
  },
  {
    id: 'TSK-23',
    name: 'QuickBooks & Xero Accounting ERP Two-Way Sync',
    phase: 'Phase 5: Future Roadmap',
    assignee: 'Choeng Dyne',
    role: 'Full-Stack Lead',
    startMonth: 7,
    durationMonths: 1,
    progress: 0,
    status: 'Planned',
    deliverables: 'Automated journal entry sync, payroll expense account mapping',
    isFuture: true
  },
  {
    id: 'TSK-24',
    name: 'Dedicated Native Mobile ESS Apps (iOS & Android)',
    phase: 'Phase 5: Future Roadmap',
    assignee: 'Kim Menghorpisith',
    role: 'UI/UX Designer',
    startMonth: 8,
    durationMonths: 1,
    progress: 0,
    status: 'Planned',
    deliverables: 'React Native ESS mobile shell, GPS geofenced attendance, push notifications',
    isFuture: true
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
    tasksCount: 6,
    hours: '150 - 180 hrs'
  },
  {
    name: 'Kith Annsreng',
    role: 'Developer / Integration',
    email: 'sreng.kith@gmail.com',
    quote: 'Good user experience is key.',
    color: 'border-blue-500 bg-blue-50 text-blue-700',
    barColor: 'bg-[#2563eb]',
    tasksCount: 6,
    hours: '140 - 170 hrs'
  },
  {
    name: 'Leng Panhaleap',
    role: 'QA & Security Tester',
    email: 'lengpanhaleap@gmail.com',
    quote: 'Test app and observe missing implementation.',
    color: 'border-emerald-500 bg-emerald-50 text-emerald-700',
    barColor: 'bg-[#16a34a]',
    tasksCount: 6,
    hours: '100 - 130 hrs'
  },
  {
    name: 'Kim Menghorpisith',
    role: 'UI/UX Designer',
    email: 'kmhpisith@gmail.com',
    quote: 'Functions over forms.',
    color: 'border-orange-500 bg-orange-50 text-orange-700',
    barColor: 'bg-[#ea580c]',
    tasksCount: 6,
    hours: '90 - 120 hrs'
  }
];

// Balanced task breakdown spanning June 2026 to September 2026 (Live Website Now) + October 2026 to Q1 2027 (Future Plan)
const IMAGE_MEMBER_TASKS = [
  {
    member: 'Choeng Dyne',
    role: 'Full-Stack Lead / Problem-Solving',
    color: 'text-[#e11d48]',
    barColor: 'bg-[#e11d48]',
    futureBarColor: 'bg-[#e11d48]/70 border border-dashed border-[#e11d48]',
    tasks: [
      { name: 'Requirements & Relational ERD', start: 1, duration: 1, isFuture: false },
      { name: 'Express REST API & Database Engine', start: 2, duration: 1, isFuture: false },
      { name: 'Statutory Cambodian Payroll Engine', start: 3, duration: 1, isFuture: false },
      { name: 'Live Web App on Render (Now)', start: 4, duration: 1, isFuture: false },
      { name: 'Hardware Biometrics Architecture (Future)', start: 5, duration: 1, isFuture: true },
      { name: 'Accounting ERP Ledger Sync (Future)', start: 7, duration: 1, isFuture: true }
    ]
  },
  {
    member: 'Kith Annsreng',
    role: 'Developer / Integration',
    color: 'text-[#2563eb]',
    barColor: 'bg-[#2563eb]',
    futureBarColor: 'bg-[#2563eb]/70 border border-dashed border-[#2563eb]',
    tasks: [
      { name: 'Frontend Architecture & Setup', start: 1, duration: 1, isFuture: false },
      { name: 'React + Vite Shell & RBAC Navigation', start: 2, duration: 1, isFuture: false },
      { name: 'Employee Directory & Punch Clock', start: 3, duration: 1, isFuture: false },
      { name: 'Client-Side PDF & Excel Generators (Now)', start: 4, duration: 1, isFuture: false },
      { name: 'Multi-Branch Centralized Sync (Future)', start: 6, duration: 1, isFuture: true },
      { name: 'Native Mobile ESS App API (Future)', start: 8, duration: 1, isFuture: true }
    ]
  },
  {
    member: 'Leng Panhaleap',
    role: 'QA & Security Tester',
    color: 'text-[#16a34a]',
    barColor: 'bg-[#16a34a]',
    futureBarColor: 'bg-[#16a34a]/70 border border-dashed border-[#16a34a]',
    tasks: [
      { name: 'QA Test Strategy & Compliance Criteria', start: 1, duration: 1, isFuture: false },
      { name: 'API Functional & Integration Testing', start: 2, duration: 1, isFuture: false },
      { name: 'Cambodian Labor Law Compliance Check', start: 3, duration: 1, isFuture: false },
      { name: 'Security Audit & UAT Defense Sign-off (Now)', start: 4, duration: 1, isFuture: false },
      { name: 'Biometric Anti-Spoofing Protocols (Future)', start: 5, duration: 1, isFuture: true },
      { name: 'Multi-Site Security & Mobile Pentesting (Future)', start: 8, duration: 1, isFuture: true }
    ]
  },
  {
    member: 'Kim Menghorpisith',
    role: 'UI/UX Designer',
    color: 'text-[#ea580c]',
    barColor: 'bg-[#ea580c]',
    futureBarColor: 'bg-[#ea580c]/70 border border-dashed border-[#ea580c]',
    tasks: [
      { name: 'UI/UX Design System & Figma Wireframes', start: 1, duration: 1, isFuture: false },
      { name: 'High-Fidelity UI Prototypes & Tokens', start: 2, duration: 1, isFuture: false },
      { name: 'Executive Dashboard & Analytics Visuals', start: 3, duration: 1, isFuture: false },
      { name: 'Live Web App Usability & Defense Deck (Now)', start: 4, duration: 1, isFuture: false },
      { name: 'Biometric Kiosk Interface Design (Future)', start: 5, duration: 1, isFuture: true },
      { name: 'Native iOS & Android ESS Mobile UI (Future)', start: 8, duration: 1, isFuture: true }
    ]
  },
  {
    member: 'Future Expansion Roadmap (Section 14)',
    role: 'Enterprise Scaling & Hardware Post-MVP',
    color: 'text-purple-600',
    barColor: 'bg-purple-600',
    futureBarColor: 'bg-purple-500/80 border border-purple-400',
    tasks: [
      { name: 'Phase 1: Hardware Biometrics Pilot (Future)', start: 5, duration: 1, isFuture: true },
      { name: 'Phase 2: Multi-Branch Sync & Offline Buffer (Future)', start: 6, duration: 1, isFuture: true },
      { name: 'Phase 3: Accounting ERP Automated Ledger (Future)', start: 7, duration: 1, isFuture: true },
      { name: 'Phase 4: Native Mobile App with GPS Attendance (Future)', start: 8, duration: 1, isFuture: true }
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
            Limkokwing University • Software Project Management • June 2026 – September 2026 (Live App) to Q1 2027 (Future Plan)
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
                Cloud Deployed on Render
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
                <div><span className="text-emerald-700 font-bold">PK</span> <strong>id</strong>: VARCHAR(20)</div>
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
                <div><span className="text-blue-700 font-bold">PK</span> <strong>id</strong>: VARCHAR(20)</div>
                <div><span className="text-slate-500 font-bold">FK</span> <strong>employeeId</strong>: VARCHAR(20)</div>
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
                <div><span className="text-purple-700 font-bold">PK</span> <strong>id</strong>: VARCHAR(20)</div>
                <div><span className="text-slate-500 font-bold">FK</span> <strong>payrollRunId</strong>: VARCHAR(20)</div>
                <div><span className="text-slate-500 font-bold">FK</span> <strong>employeeId</strong>: VARCHAR(20)</div>
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
                  <span className="text-emerald-600 font-bold">Active in Project</span>
                </div>
              </div>
            ))}
          </div>

          {/* Gantt Chart Container */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-full border border-emerald-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    June 2026 – Sept 2026 (Live Now) to Q1 2027 (Future Plan)
                  </span>
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-100/70 px-2 py-0.5 rounded">
                    Now: Live Web App Deployed on Render
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-1.5">Project Work Plan & Team Gantt Roadmap</h3>
                <p className="text-xs text-slate-500">
                  Full project timeline extending to the current live website (September 2026) and future development expansion
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
                    Comprehensive Work Plan
                  </button>
                  <button
                    onClick={() => setGanttViewType('image')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      ganttViewType === 'image' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Team Gantt Roadmap
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

            {/* VIEW 1: TEAM MEMBER GROUPED GANTT (Extended to September Now + Future Plans) */}
            {(ganttViewType === 'image' || ganttViewType === 'both') && (
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs">
                <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">ElevateHR — Team Gantt Chart</h4>
                    <p className="text-[11px] text-slate-500 font-medium">Core Development (June–Sept 2026 Now) & Future Development (October 2026 onwards)</p>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                    Now: Live on Render
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <div className="min-w-[950px]">
                    {/* Top Tier Header: Current Web App vs Future Plan */}
                    <div className="grid grid-cols-12 bg-slate-900 text-white text-[11px] font-bold border-b border-slate-800 divide-x divide-slate-800">
                      <div className="col-span-4 p-2.5 text-left">Team Member / Milestone Task</div>
                      <div className="col-span-4 p-2.5 text-center bg-emerald-950/70 text-emerald-300 font-mono flex items-center justify-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        <span>Current Web App (June – Sept 2026 Now)</span>
                      </div>
                      <div className="col-span-4 p-2.5 text-center bg-blue-950/70 text-blue-300 font-mono">
                        Future Plan (October 2026 – Q1 2027)
                      </div>
                    </div>

                    {/* Column Header: The 8 Months */}
                    <div className="grid grid-cols-12 bg-slate-100 text-slate-700 text-xs font-bold border-b border-slate-200 divide-x divide-slate-200">
                      <div className="col-span-4 p-2.5 text-left font-sans text-slate-800">Assignee & Task Breakdown</div>
                      <div className="col-span-8 grid grid-cols-8 divide-x divide-slate-200 text-center font-mono text-[10px]">
                        {TIMELINE_COLUMNS.map(col => (
                          <div
                            key={col.id}
                            className={`py-2 px-1 truncate flex flex-col justify-center items-center ${
                              col.isCurrent ? 'bg-emerald-100/60 text-emerald-950 font-extrabold ring-1 ring-emerald-400 inset-0' :
                              col.isFuture ? 'bg-slate-50 text-slate-600' : 'text-slate-800'
                            }`}
                          >
                            <span>{col.shortLabel}</span>
                            {col.isCurrent && (
                              <span className="text-[8px] bg-emerald-700 text-white px-1 rounded uppercase tracking-tighter font-sans mt-0.5">
                                Now
                              </span>
                            )}
                            {col.isFuture && (
                              <span className="text-[8px] text-blue-600 font-sans mt-0.5">
                                Future
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Member Sections */}
                    <div className="divide-y divide-slate-200">
                      {IMAGE_MEMBER_TASKS.filter(m => selectedAssignee === 'All' || m.member === selectedAssignee).map(group => (
                        <div key={group.member} className="p-1">
                          {/* Member Heading */}
                          <div className={`font-bold text-xs ${group.color} px-3 pt-2 pb-1 flex items-center justify-between`}>
                            <span>{group.member}</span>
                            <span className="text-[10px] text-slate-400 font-normal">{group.role}</span>
                          </div>

                          {/* Member Tasks */}
                          <div className="space-y-1 pb-1">
                            {group.tasks.map(t => {
                              const startPercent = ((t.start - 1) / 8) * 100;
                              const widthPercent = (t.duration / 8) * 100;
                              const barStyle = t.isFuture ? (group.futureBarColor || 'bg-slate-500') : group.barColor;

                              return (
                                <div key={t.name} className="grid grid-cols-12 items-center hover:bg-slate-50/60 rounded-lg">
                                  <div className="col-span-4 px-3 py-1 text-xs text-slate-700 truncate font-medium flex items-center gap-1.5">
                                    {t.isFuture && (
                                      <span className="text-[9px] px-1 py-0.2 bg-blue-50 text-blue-700 rounded border border-blue-200 shrink-0 font-mono">
                                        Future
                                      </span>
                                    )}
                                    <span className="truncate">{t.name}</span>
                                  </div>
                                  <div className="col-span-8 p-1 relative h-7 flex items-center">
                                    {/* Vertical grid lines (8 columns) */}
                                    <div className="absolute inset-0 grid grid-cols-8 divide-x divide-slate-100 pointer-events-none">
                                      {TIMELINE_COLUMNS.map(c => (
                                        <div
                                          key={c.id}
                                          className={`h-full ${c.isCurrent ? 'bg-emerald-50/40' : ''}`}
                                        />
                                      ))}
                                    </div>
                                    {/* Gantt Bar */}
                                    <div
                                      className={`absolute h-5.5 rounded-md ${barStyle} text-white shadow-xs flex items-center px-2 text-[10px] font-bold truncate transition-all`}
                                      style={{
                                        left: `${startPercent}%`,
                                        width: `${Math.max(widthPercent, 11)}%`
                                      }}
                                      title={`${group.member}: ${t.name} (${TIMELINE_COLUMNS[t.start - 1].label})`}
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

            {/* VIEW 2: COMPREHENSIVE WORK PLAN (Detailed Tasks across June–Sept Now + Future Plan) */}
            {(ganttViewType === 'detailed' || ganttViewType === 'both') && (
              <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-xs bg-white">
                <div className="min-w-[950px]">
                  {/* Top Tier Header: Current Web App vs Future Plan */}
                  <div className="grid grid-cols-12 bg-slate-900 text-white text-[11px] font-bold border-b border-slate-800 divide-x divide-slate-800">
                    <div className="col-span-4 p-3 text-left">Task Deliverable & Assignee</div>
                    <div className="col-span-4 p-3 text-center bg-emerald-950/70 text-emerald-300 font-mono flex items-center justify-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span>Current Web App on Render (June – Sept 2026 Now)</span>
                    </div>
                    <div className="col-span-4 p-3 text-center bg-blue-950/70 text-blue-300 font-mono">
                      Future Plan Roadmap (October 2026 – Q1 2027)
                    </div>
                  </div>

                  {/* 8-Month Columns Subheader */}
                  <div className="grid grid-cols-12 bg-slate-100 text-slate-600 text-[10px] font-mono border-b border-slate-200 divide-x divide-slate-200">
                    <div className="col-span-4 px-3 py-2 font-sans font-semibold text-slate-700">Detailed Deliverable Schedule</div>
                    <div className="col-span-8 grid grid-cols-8 divide-x divide-slate-200 text-center font-bold">
                      {TIMELINE_COLUMNS.map(col => (
                        <div
                          key={col.id}
                          className={`py-2 truncate flex flex-col justify-center items-center ${
                            col.isCurrent ? 'bg-emerald-100/60 text-emerald-950 font-extrabold' : ''
                          }`}
                        >
                          <span>{col.shortLabel}</span>
                          {col.isCurrent && (
                            <span className="text-[8px] bg-emerald-700 text-white px-1 rounded uppercase tracking-tighter font-sans mt-0.5">
                              Now
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Task Rows (The Comprehensive 24 Tasks) */}
                  <div className="divide-y divide-slate-100">
                    {GANTT_TASKS.filter(t => selectedAssignee === 'All' || t.assignee === selectedAssignee || t.assignee === 'All Members').map(task => {
                      const member = TEAM_MEMBERS.find(m => m.name === task.assignee);
                      const baseColor = member ? member.barColor : 'bg-slate-700';
                      const barColor = task.isFuture ? `${baseColor}/80 border border-dashed border-white/60` : baseColor;

                      // Compute start offset and width in % across the 8-period timeline
                      const startPercent = ((task.startMonth - 1) / 8) * 100;
                      const widthPercent = (task.durationMonths / 8) * 100;

                      return (
                        <div key={task.id} className="grid grid-cols-12 items-center hover:bg-slate-50/80 transition-colors">
                          {/* Task Meta (Left 4 columns) */}
                          <div className="col-span-4 p-2.5 border-r border-slate-100 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-slate-900 leading-tight flex items-center gap-1">
                                <span className="text-slate-400 font-mono text-[10px]">{task.id}</span>
                                <span className="truncate">{task.name}</span>
                              </span>
                              {task.isFuture && (
                                <span className="text-[8px] bg-blue-50 text-blue-700 font-bold px-1 rounded border border-blue-200 shrink-0 font-mono ml-1">
                                  Future
                                </span>
                              )}
                              {task.startMonth === 4 && (
                                <span className="text-[8px] bg-emerald-100 text-emerald-800 font-bold px-1 rounded shrink-0 font-mono ml-1">
                                  Now
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-slate-500">
                              <span className={`font-semibold ${member ? member.color.replace('border-', 'text-').replace('bg-', '') : 'text-slate-700'}`}>
                                {task.assignee}
                              </span>
                              <span>•</span>
                              <span className="text-slate-400 font-mono">
                                {TIMELINE_COLUMNS[task.startMonth - 1].shortLabel} ({task.durationMonths}mo)
                              </span>
                            </div>
                            <div className="text-[10px] text-slate-400 truncate">
                              <span className="text-slate-500 font-medium">Deliverable:</span> {task.deliverables}
                            </div>
                          </div>

                          {/* Gantt Bar Visualization (Right 8 columns = 8 periods) */}
                          <div className="col-span-8 p-2.5 relative h-11 flex items-center">
                            {/* Background Grid Lines (8 periods) */}
                            <div className="absolute inset-0 grid grid-cols-8 divide-x divide-slate-100 pointer-events-none">
                              {TIMELINE_COLUMNS.map(col => (
                                <div
                                  key={col.id}
                                  className={`h-full ${col.isCurrent ? 'bg-emerald-50/30' : ''}`}
                                />
                              ))}
                            </div>

                            {/* The Active Task Bar */}
                            <div
                              className={`absolute h-6 rounded-md ${barColor} text-white shadow-xs flex items-center px-2 text-[10px] font-bold tracking-tight overflow-hidden transition-all`}
                              style={{
                                left: `${startPercent}%`,
                                width: `${Math.max(widthPercent, 11)}%`
                              }}
                              title={`${task.name} (${task.assignee}) - ${TIMELINE_COLUMNS[task.startMonth - 1].label}`}
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
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> June – August 2026: Core Engineering
                </div>
                <div className="text-slate-500 text-[11px]">Requirements specification, Figma design library, REST API, Cambodian statutory tax engine & compliance.</div>
                <div className="text-emerald-700 font-semibold text-[10px]">Status: Completed & Verified</div>
              </div>

              <div className="p-3.5 bg-emerald-50/40 rounded-2xl border border-emerald-300/80 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> September 2026: Live Web App (Now)
                </div>
                <div className="text-slate-500 text-[11px]">Production cloud deployment on Render, automated payslip PDFs, Excel exports, and live university defense.</div>
                <div className="text-emerald-700 font-semibold text-[10px]">Status: Active & Deployed on Render</div>
              </div>

              <div className="p-3.5 bg-blue-50/40 rounded-2xl border border-blue-200 space-y-1">
                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" /> October 2026 – Q1 2027: Future Plans
                </div>
                <div className="text-slate-500 text-[11px]">Hardware fingerprint biometrics, multi-branch synchronization, accounting ERP sync, and native mobile apps.</div>
                <div className="text-blue-700 font-semibold text-[10px]">Status: Future Development Roadmap</div>
              </div>
            </div>
          </div>

          {/* Section 14: Future Plan & Multi-Phase Implementation Roadmap */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-blue-50 text-blue-800 text-xs font-bold rounded-full border border-blue-300">
                    Post-MVP Horizon 2026–2027
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Proposal Section 14</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-1">Future Plan & Implementation Roadmap</h3>
                <p className="text-xs text-slate-500">
                  Phased rollout milestones expanding ElevateHR beyond current MVP into enterprise hardware & mobile apps (starting after September 2026)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-xs">
              {/* Phase 1 */}
              <div className="p-4 rounded-2xl border-2 border-emerald-500/40 bg-emerald-50/20 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      Phase 1 (Current)
                    </span>
                    <span className="text-[10px] font-mono text-emerald-600 font-bold">Now: Sept 2026</span>
                  </div>
                  <div className="font-extrabold text-slate-900 mt-2 text-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>MVP Core Web App</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Statutory Cambodian payroll tax engine, leave balance tracking, punch clock, and role-based portals.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-emerald-200/60 font-semibold text-[10px] text-emerald-700">
                  Status: Active / Live on Render
                </div>
              </div>

              {/* Phase 2 */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-2 flex flex-col justify-between hover:border-blue-400 transition-all">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      Phase 2 (Future)
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">October 2026</span>
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
                  Status: Planned Architecture
                </div>
              </div>

              {/* Phase 3 */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-2 flex flex-col justify-between hover:border-indigo-400 transition-all">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      Phase 3 (Future)
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">November 2026</span>
                  </div>
                  <div className="font-extrabold text-slate-900 mt-2 text-sm flex items-center gap-1.5">
                    <RefreshCw className="w-4 h-4 text-indigo-600" />
                    <span>Multi-Branch Sync</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Multi-branch fingerprint biometric hardware synchronization with centralized cloud punch logs.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 font-semibold text-[10px] text-indigo-600">
                  Status: Planned Scaling
                </div>
              </div>

              {/* Phase 4 */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-2 flex flex-col justify-between hover:border-amber-400 transition-all">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Phase 4 (Future)
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">December 2026</span>
                  </div>
                  <div className="font-extrabold text-slate-900 mt-2 text-sm flex items-center gap-1.5">
                    <Milestone className="w-4 h-4 text-amber-600" />
                    <span>Accounting ERP Sync</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Two-way automated journal ledger sync with QuickBooks, Xero, and local tax compliance software.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 font-semibold text-[10px] text-amber-600">
                  Status: Planned Integration
                </div>
              </div>

              {/* Phase 5 */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-2 flex flex-col justify-between hover:border-purple-400 transition-all">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                      Phase 5 (Future)
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Q1 2027</span>
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
                  Status: Planned Mobile
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
