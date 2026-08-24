import * as XLSX from 'xlsx';
import { Employee, PayrollRun, LeaveRequest, AttendanceRecord } from '../types';

export const exportService = {
  // Export Payroll to Excel (.xlsx)
  exportPayrollToExcel(run: PayrollRun) {
    const rows = run.items.map(item => ({
      'Employee ID': item.employeeId,
      'Employee Name': item.employeeName,
      'Department': item.department,
      'Position': item.position,
      'Base Salary ($)': item.baseSalary,
      'Allowances ($)': item.allowances,
      'OT Hours': item.overtimeHours,
      'OT Pay ($)': item.overtimePay,
      'Bonus ($)': item.bonus,
      'Gross Salary ($)': item.grossSalary,
      'Tax Rate (%)': `${item.taxRate}%`,
      'Tax Amount ($)': item.taxAmount,
      'NSSF Contribution ($)': item.nssfContribution,
      'Deductions ($)': item.deductions,
      'Net Pay ($)': item.netPay,
      'Payment Status': item.paymentStatus,
      'Bank Account': item.bankAccount
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, `Payroll_${run.month}`);

    // Auto-fit column widths
    const maxWidths = Object.keys(rows[0] || {}).map(key => ({
      wch: Math.max(key.length, 12)
    }));
    worksheet['!cols'] = maxWidths;

    XLSX.writeFile(workbook, `ElevateHR_Payroll_${run.month}.xlsx`);
  },

  // Export Employee Master Directory to Excel
  exportEmployeesToExcel(employees: Employee[]) {
    const rows = employees.map(e => ({
      'Employee ID': e.id,
      'First Name': e.firstName,
      'Last Name': e.lastName,
      'Email': e.email,
      'Phone': e.phone,
      'Gender': e.gender,
      'Date of Birth': e.dateOfBirth,
      'Position': e.position,
      'Department': e.department,
      'Role': e.role,
      'Status': e.status,
      'Contract Type': e.contractType,
      'Contract Start': e.contractStartDate,
      'Contract End': e.contractEndDate,
      'Base Salary ($)': e.baseSalary,
      'Currency': e.currency,
      'NSSF Number': e.nssfNumber,
      'National ID': e.nationalId,
      'Address': e.address,
      'Bank Name': e.bankName,
      'Bank Account': e.bankAccountNumber,
      'Emergency Contact Name': e.emergencyContact?.name,
      'Emergency Contact Phone': e.emergencyContact?.phone,
      'Annual Leave Remaining': e.leaveBalance?.annual?.remaining,
      'Sick Leave Remaining': e.leaveBalance?.sick?.remaining
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');
    XLSX.writeFile(workbook, `ElevateHR_Employee_Master_${new Date().toISOString().split('T')[0]}.xlsx`);
  },

  // Export Leave History to Excel
  exportLeavesToExcel(leaves: LeaveRequest[]) {
    const rows = leaves.map(l => ({
      'Leave ID': l.id,
      'Employee ID': l.employeeId,
      'Employee Name': l.employeeName,
      'Department': l.department,
      'Leave Type': l.leaveType,
      'Start Date': l.startDate,
      'End Date': l.endDate,
      'Total Days': l.totalDays,
      'Reason': l.reason,
      'Status': l.status,
      'Applied Date': l.appliedDate,
      'Approver': l.approverName || '—',
      'Approver Remarks': l.approverRemarks || '—',
      'Action Date': l.actionDate || '—'
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Leaves');
    XLSX.writeFile(workbook, `ElevateHR_Leaves_${new Date().toISOString().split('T')[0]}.xlsx`);
  },

  // Export Attendance to Excel
  exportAttendanceToExcel(records: AttendanceRecord[]) {
    const rows = records.map(r => ({
      'Record ID': r.id,
      'Employee ID': r.employeeId,
      'Employee Name': r.employeeName,
      'Department': r.department,
      'Date': r.date,
      'Clock In': r.clockIn || '—',
      'Clock Out': r.clockOut || '—',
      'Logged Hours': r.loggedHours,
      'Status': r.status,
      'Work Type': r.workType
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');
    XLSX.writeFile(workbook, `ElevateHR_Attendance_${new Date().toISOString().split('T')[0]}.xlsx`);
  }
};
