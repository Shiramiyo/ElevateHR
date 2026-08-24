# ElevateHR - Enterprise Cloud HR Operations Platform

A centralized, cloud-based Human Resource Operations and Automated Payroll Platform built in compliance with the **ElevateHR Project Specification Proposal**.

---

## 🌟 Key Features & Functional Modules

1. **Executive HR Dashboard**:
   - Real-time KPIs: Active Workforce Headcount, Approved On-Leave Count, Pending Manager Approvals, and Monthly Gross Payroll Projection.
   - Interactive Visual Analytics: Department distribution pie chart and historical payroll expenditure trends.
   - Quick Fast-Track Approvals & Onboarding shortcuts.

2. **Employee Lifecycle & Master Directory**:
   - Complete CRUD (Create, View, Edit, Archive) employee records.
   - Field tracking: Full Name, DOB, Employee ID, Contact Info, Department, Position, Contract Type (Full-time / Probation), Contract Start/End Dates, NSSF Number, National ID, Bank Details, Emergency Contacts, and Statutory Leave Balances.
   - Instant Search & Department / Status filters.
   - One-click export to **Excel (.xlsx)** and **PDF Master Roster**.

3. **Leave Management & 1-Click Approval Engine**:
   - Employee self-service leave submission (Annual, Sick, Casual, Maternity, Unpaid).
   - Automated quota validation & business day calculator.
   - Managerial 1-click Approve / Reject with remarks and automated quota deductions.
   - Export leave logs to Excel and PDF.

4. **Automated Payroll & Tax/NSSF Calculation Engine**:
   - Automated monthly calculations factoring base salary, allowances, overtime pay (1.5x hourly multiplier), performance bonuses, progressive tax brackets, and 4% NSSF statutory contributions.
   - HR Administrator manual override capabilities before finalization.
   - **Confidential Individual Payslip Generation**: Clean, printable PDF payslips with company branding, tax breakdown, and signature areas.
   - Entire batch export to Excel (.xlsx) and Payroll Summary PDF.

5. **Employee Self-Service (ESS) Portal**:
   - Live Attendance Clock-In / Clock-Out punch clock with real-time status.
   - Personal leave quotas tracker & instant request submission.
   - My Payslips archive with direct PDF download.
   - Document upload for NSSF card, National ID / Passport, and Certificates.

6. **Document Repository & Compliance Tracker**:
   - Central repository for NSSF cards, Passports, Employment Contracts, and Resumes.
   - 1-Click HR verification / rejection workflow.

7. **System Architecture & ERD Diagram Viewer**:
   - Interactive visualization of the Multi-Tier Client-Server model, API JSON routing, relational ERD database schema, and project proposal compliance checklist.

---

## 🚀 How to Run the Application

### Option 1: Run via Provided Batch Script (Windows)
Double-click `start.bat` in the root folder, or run:
```cmd
start.bat
```

### Option 2: Run via NPM Commands

1. **Start the Backend API Server** (Port 5000):
   ```cmd
   cd server
   node server.js
   ```

2. **Start the Frontend Client** (Port 3000):
   ```cmd
   cd client
   npm run dev
   ```

3. Open your browser and navigate to:
   **`http://localhost:3000`**

---

## 👥 Demo Accounts & Role Switcher

You can switch personas directly in the top-right menu of the website:
- **Sophea Chan (HR Administrator)**: Full administrative access, employee CRUD, payroll runs, approvals, and reports.
- **Vannak Rath (Department Manager)**: Engineering lead, leave approvals, and team attendance oversight.
- **Darith Sok (General Employee)**: Employee Self-Service portal, clock-in/out, leave requests, and payslip downloads.
- **Bopha Chea (UI/UX Designer)**: Employee portal, leave requests, and document uploads.

---

## 🛡️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, Recharts, jsPDF, jspdf-autotable, SheetJS (xlsx), Canvas-Confetti.
- **Backend**: Node.js & Express REST API with persistent JSON database and comprehensive seed data.
- **Security**: AES-256 Cloud Encryption emulation & Role-Based Access Control (RBAC).
