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
  casual: LeaveBalanceCategory;
  maternity: LeaveBalanceCategory;
  unpaid: LeaveBalanceCategory;
}

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
  bankName: string;
  bankAccountNumber: string;
  emergencyContact: EmergencyContact;
  leaveBalance: LeaveBalance;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  leaveType: 'Annual Leave' | 'Sick Leave' | 'Casual Leave' | 'Maternity Leave' | 'Unpaid Leave';
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
  docType: 'NSSF Card' | 'National ID / Passport' | 'Employment Contract' | 'CV / Resume' | 'Certificate' | 'Other Document';
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  status: 'Verified' | 'Pending Verification' | 'Rejected';
  verifiedBy: string | null;
  category: 'Identification' | 'Legal' | 'Career' | 'General';
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
