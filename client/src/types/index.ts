export type Role = 'admin' | 'manager' | 'employee';

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface LeaveBalanceCategory {
  total: number;
  used: number;
  remaining: number;
}

export interface LeaveBalance {
  annual: LeaveBalanceCategory;
  sick: LeaveBalanceCategory;
  special: LeaveBalanceCategory; // Cambodia Labour Law Art. 169 & Prakas 267 (Special / Family Event Leave, up to 7 days/yr)
  casual?: LeaveBalanceCategory; // backward compatibility
  maternity: LeaveBalanceCategory; // 90 days for female employees (Art. 182)
  paternity?: LeaveBalanceCategory; // 3-7 days
  marriage?: LeaveBalanceCategory; // 3 days
  bereavement?: LeaveBalanceCategory; // 3 days
  unpaid: LeaveBalanceCategory;
}

export type WorkPermitStatus = 'Valid' | 'Expiring Soon' | 'Expired' | 'Pending Renewal' | 'Not Applicable';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  position: string;
  department: string;
  role: Role;
  status: 'Active' | 'Probation' | 'On Leave' | 'Archived' | 'Terminated';
  contractType: 'Full-time' | 'Part-time' | 'Probation' | 'Contract';
  contractStartDate: string;
  contractEndDate: string;
  baseSalary: number;
  currency: string;
  nssfNumber: string;
  nationalId: string;
  address: string;
  password?: string;
  bankName: string;
  bankAccountNumber: string;
  emergencyContact: EmergencyContact;
  leaveBalance: LeaveBalance;

  // Portrait Photo
  avatar?: string; // Data URL or Image URL

  // Foreign Worker & Work Permit Compliance (Cambodia MoLVT / FWCMS Standard)
  nationality?: string;
  isForeignWorker?: boolean;
  passportNumber?: string;
  passportExpiryDate?: string;
  visaType?: string; // e.g. "EB Business Visa", "K Visa", "Ordinary"
  visaExpiryDate?: string;
  workPermitNumber?: string; // MoLVT / FWCMS Work Permit Card ID
  workPermitIssueDate?: string;
  workPermitExpiryDate?: string;
  workPermitStatus?: WorkPermitStatus;
}

export type CambodiaLeaveType =
  | 'Annual Leave'
  | 'Special Leave (Family Events)'
  | 'Sick Leave'
  | 'Maternity Leave'
  | 'Paternity Leave'
  | 'Marriage Leave'
  | 'Bereavement Leave'
  | 'Unpaid Leave'
  | 'Casual Leave';

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  leaveType: CambodiaLeaveType;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedDate: string;
  approverName: string | null;
  approverRemarks: string | null;
  actionDate: string | null;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  date: string;
  clockIn: string | null;
  clockOut: string | null;
  scheduledIn: string;
  scheduledOut: string;
  loggedHours: number;
  status: 'Present' | 'Late' | 'Absent' | 'Half-day' | 'On Leave';
  workType: 'Office' | 'Remote';
}

export interface PayrollItem {
  employeeId: string;
  employeeName: string;
  position: string;
  department: string;
  baseSalary: number;
  allowances: number;
  overtimeHours: number;
  overtimePay: number;
  bonus: number;
  grossSalary: number;
  taxRate: number;
  taxAmount: number;
  nssfContribution: number;
  deductions: number;
  netPay: number;
  paymentStatus: 'Pending' | 'Paid';
  bankAccount: string;
}

export interface PayrollRun {
  id: string;
  month: string;
  monthLabel: string;
  status: 'Draft' | 'Finalized';
  totalGross: number;
  totalNet: number;
  totalTax: number;
  totalNssf: number;
  processedBy: string;
  processedDate: string;
  items: PayrollItem[];
}

export interface DocumentItem {
  id: string;
  employeeId: string;
  employeeName: string;
  docType: 
    | 'NSSF Card' 
    | 'National ID / Passport' 
    | 'Foreign Work Permit (MoLVT / FWCMS)'
    | 'Passport & EB Visa'
    | 'Employment Contract' 
    | 'CV / Resume' 
    | 'Certificate' 
    | 'Other Document';
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  status: 'Verified' | 'Pending Verification' | 'Rejected';
  verifiedBy: string | null;
  category: 'Identification' | 'Work Permit & Visas' | 'Legal' | 'Career' | 'General';
}

export interface DashboardStats {
  totalEmployees: number;
  onLeaveToday: number;
  pendingLeaves: number;
  monthlyPayrollEstimate: number;
  attendanceRate: number;
  departmentBreakdown: { name: string; count: number }[];
  payrollTrends: { month: string; amount: number }[];
  recentLeaves: LeaveRequest[];
}
