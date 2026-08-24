import { Employee, LeaveRequest, AttendanceRecord, PayrollRun, DocumentItem, DashboardStats } from '../types';

const API_BASE = '/api';

export const api = {
  // Stats
  async getStats(): Promise<DashboardStats> {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
  },

  // Employees
  async getEmployees(params?: { search?: string; department?: string; status?: string; role?: string }): Promise<Employee[]> {
    const query = new URLSearchParams();
    if (params?.search) query.append('search', params.search);
    if (params?.department) query.append('department', params.department);
    if (params?.status) query.append('status', params.status);
    if (params?.role) query.append('role', params.role);
    
    const res = await fetch(`${API_BASE}/employees?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch employees');
    return res.json();
  },

  async getEmployeeById(id: string): Promise<Employee> {
    const res = await fetch(`${API_BASE}/employees/${id}`);
    if (!res.ok) throw new Error('Failed to fetch employee details');
    return res.json();
  },

  async createEmployee(data: Partial<Employee>): Promise<Employee> {
    const res = await fetch(`${API_BASE}/employees`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create employee');
    return res.json();
  },

  async updateEmployee(id: string, data: Partial<Employee>): Promise<Employee> {
    const res = await fetch(`${API_BASE}/employees/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update employee');
    return res.json();
  },

  async deleteEmployee(id: string, permanent?: boolean): Promise<{ message: string }> {
    const res = await fetch(`${API_BASE}/employees/${id}${permanent ? '?permanent=true' : ''}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete employee');
    return res.json();
  },

  // Auth Login
  async login(email: string, password?: string): Promise<{ user: Employee; token: string }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Login failed');
    }
    return res.json();
  },


  // Leaves
  async getLeaves(params?: { employeeId?: string; status?: string }): Promise<LeaveRequest[]> {
    const query = new URLSearchParams();
    if (params?.employeeId) query.append('employeeId', params.employeeId);
    if (params?.status) query.append('status', params.status);

    const res = await fetch(`${API_BASE}/leaves?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch leave requests');
    return res.json();
  },

  async applyLeave(data: { employeeId: string; leaveType: string; startDate: string; endDate: string; totalDays: number; reason: string }): Promise<LeaveRequest> {
    const res = await fetch(`${API_BASE}/leaves`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to submit leave request');
    }
    return res.json();
  },

  async updateLeaveStatus(id: string, data: { status: 'Approved' | 'Rejected'; approverName?: string; approverRemarks?: string }): Promise<LeaveRequest> {
    const res = await fetch(`${API_BASE}/leaves/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update leave status');
    return res.json();
  },

  // Payroll
  async getPayrollRuns(): Promise<PayrollRun[]> {
    const res = await fetch(`${API_BASE}/payroll`);
    if (!res.ok) throw new Error('Failed to fetch payroll history');
    return res.json();
  },

  async calculatePayroll(month: string): Promise<PayrollRun> {
    const res = await fetch(`${API_BASE}/payroll/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ month }),
    });
    if (!res.ok) throw new Error('Failed to calculate payroll');
    return res.json();
  },

  async finalizePayroll(payrollRun: PayrollRun): Promise<PayrollRun> {
    const res = await fetch(`${API_BASE}/payroll/finalize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payrollRun),
    });
    if (!res.ok) throw new Error('Failed to finalize payroll');
    return res.json();
  },

  // Attendance
  async getAttendance(params?: { employeeId?: string; date?: string }): Promise<AttendanceRecord[]> {
    const query = new URLSearchParams();
    if (params?.employeeId) query.append('employeeId', params.employeeId);
    if (params?.date) query.append('date', params.date);

    const res = await fetch(`${API_BASE}/attendance?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch attendance logs');
    return res.json();
  },

  async clockAttendance(employeeId: string, action: 'clock-in' | 'clock-out', workType?: string): Promise<AttendanceRecord> {
    const res = await fetch(`${API_BASE}/attendance/clock`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ employeeId, action, workType }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to clock attendance');
    }
    return res.json();
  },

  // Documents
  async getDocuments(params?: { employeeId?: string }): Promise<DocumentItem[]> {
    const query = new URLSearchParams();
    if (params?.employeeId) query.append('employeeId', params.employeeId);

    const res = await fetch(`${API_BASE}/documents?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch documents');
    return res.json();
  },

  async uploadDocument(data: { employeeId: string; docType: string; fileName: string; fileSize?: string; category?: string }): Promise<DocumentItem> {
    const res = await fetch(`${API_BASE}/documents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to upload document');
    return res.json();
  },

  async verifyDocument(id: string, status: 'Verified' | 'Rejected', verifiedBy?: string): Promise<DocumentItem> {
    const res = await fetch(`${API_BASE}/documents/${id}/verify`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, verifiedBy }),
    });
    if (!res.ok) throw new Error('Failed to verify document');
    return res.json();
  },

  // Reset demo
  async resetDemoData(): Promise<void> {
    await fetch(`${API_BASE}/reset-data`, { method: 'POST' });
  }
};
