import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Plus,
  Filter,
  Download,
  FileSpreadsheet,
  FileText,
  Edit2,
  Trash2,
  Eye,
  Mail,
  Phone,
  Building,
  ShieldCheck,
  Calendar,
  DollarSign
} from 'lucide-react';
import { Badge } from '../components/Badge';
import { Modal } from '../components/Modal';
import { Employee } from '../types';
import { api } from '../services/api';
import { exportService } from '../services/exportService';
import { pdfService } from '../services/pdfService';

export const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [activeEmployee, setActiveEmployee] = useState<Employee | null>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState<Partial<Employee>>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 'Male',
    dateOfBirth: '1995-01-01',
    position: '',
    department: 'Engineering',
    role: 'employee',
    status: 'Active',
    contractType: 'Full-time',
    contractStartDate: '2026-08-01',
    contractEndDate: '2027-07-31',
    baseSalary: 1200,
    currency: 'USD',
    nssfNumber: '',
    nationalId: '',
    address: 'Phnom Penh, Cambodia',
    bankName: 'ABA Bank',
    bankAccountNumber: '',
    emergencyContact: {
      name: '',
      relationship: 'Family',
      phone: ''
    }
  });

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await api.getEmployees({
        search,
        department: selectedDept,
        status: selectedStatus
      });
      setEmployees(data);
    } catch (err) {
      console.error('Failed to fetch employees:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [search, selectedDept, selectedStatus]);

  const handleOpenAdd = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: 'Male',
      dateOfBirth: '1995-01-01',
      position: '',
      department: 'Engineering',
      role: 'employee',
      status: 'Active',
      contractType: 'Full-time',
      contractStartDate: '2026-08-01',
      contractEndDate: '2027-07-31',
      baseSalary: 1200,
      currency: 'USD',
      nssfNumber: `NSSF-${Math.floor(10000000 + Math.random() * 90000000)}`,
      nationalId: `${Math.floor(100000000 + Math.random() * 900000000)}`,
      address: 'Phnom Penh, Cambodia',
      bankName: 'ABA Bank',
      bankAccountNumber: `00${Math.floor(1000000 + Math.random() * 9000000)}`,
      emergencyContact: {
        name: 'Emergency Contact',
        relationship: 'Family',
        phone: '+855 12 000 111'
      }
    });
    setIsAddModalOpen(true);
  };

  const handleSaveAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createEmployee(formData);
      setIsAddModalOpen(false);
      fetchEmployees();
    } catch (err) {
      console.error('Failed to create employee:', err);
    }
  };

  const handleOpenEdit = (emp: Employee) => {
    setActiveEmployee(emp);
    setFormData(emp);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeEmployee) return;
    try {
      await api.updateEmployee(activeEmployee.id, formData);
      setIsEditModalOpen(false);
      fetchEmployees();
    } catch (err) {
      console.error('Failed to update employee:', err);
    }
  };

  const handleArchive = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to archive profile for ${name}?`)) return;
    try {
      await api.deleteEmployee(id);
      fetchEmployees();
    } catch (err) {
      console.error('Failed to archive employee:', err);
    }
  };

  const handleView = (emp: Employee) => {
    setActiveEmployee(emp);
    setIsViewModalOpen(true);
  };

  const departments = ['All', 'Human Resources', 'Engineering', 'Design', 'Finance', 'Marketing', 'Quality Assurance'];
  const statuses = ['All', 'Active', 'Probation', 'Archived'];

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Employee Directory & Profiles</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Centralized employee lifecycle management with full role & compliance tracking
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => exportService.exportEmployeesToExcel(employees)}
            className="flex items-center space-x-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-xs transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Export Excel</span>
          </button>
          <button
            onClick={() => pdfService.generateEmployeeRosterPDF(employees)}
            className="flex items-center space-x-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-xs transition-colors"
          >
            <FileText className="w-4 h-4 text-rose-600" />
            <span>Export PDF</span>
          </button>
          <button
            onClick={handleOpenAdd}
            className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-700/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Employee</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, ID, position, email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-500 font-medium">Department:</span>
            <select
              value={selectedDept}
              onChange={e => setSelectedDept(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              {departments.map(d => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-500 font-medium">Status:</span>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              {statuses.map(s => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs">Loading employee records...</div>
        ) : employees.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">No employees found matching criteria.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3.5">Employee</th>
                  <th className="px-6 py-3.5">Role & Position</th>
                  <th className="px-6 py-3.5">Department</th>
                  <th className="px-6 py-3.5">Contract</th>
                  <th className="px-6 py-3.5">Salary (USD)</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {employees.map(emp => (
                  <tr key={emp.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs border border-slate-200">
                          {emp.firstName[0]}
                          {emp.lastName[0]}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">
                            {emp.firstName} {emp.lastName}
                          </div>
                          <div className="text-xs text-slate-400 font-mono">{emp.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800">{emp.position}</div>
                      <div className="text-xs text-slate-500 capitalize">{emp.role}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">{emp.department}</td>
                    <td className="px-6 py-4">
                      <div className="text-xs font-semibold text-slate-800">{emp.contractType}</div>
                      <div className="text-[11px] text-slate-400">
                        {emp.contractStartDate} to {emp.contractEndDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">${emp.baseSalary.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <Badge status={emp.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => handleView(emp)}
                          className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="View Profile Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(emp)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Profile"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {emp.status !== 'Archived' && (
                          <button
                            onClick={() => handleArchive(emp.id, `${emp.firstName} ${emp.lastName}`)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Archive Employee"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Employee Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Onboard New Employee"
        subtitle="Create an employee profile with contract and payroll details"
        maxWidth="3xl"
      >
        <form onSubmit={handleSaveAdd} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">First Name *</label>
              <input
                required
                type="text"
                value={formData.firstName}
                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name *</label>
              <input
                required
                type="text"
                value={formData.lastName}
                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
              <input
                required
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number *</label>
              <input
                required
                type="text"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Job Position / Title *</label>
              <input
                required
                type="text"
                value={formData.position}
                onChange={e => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Department *</label>
              <select
                value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none font-semibold text-slate-700"
              >
                {departments.filter(d => d !== 'All').map(d => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Base Monthly Salary (USD) *</label>
              <input
                required
                type="number"
                min="100"
                value={formData.baseSalary}
                onChange={e => setFormData({ ...formData, baseSalary: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">System Role *</label>
              <select
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value as any })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
              >
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
                <option value="admin">HR Administrator</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Contract Start Date *</label>
              <input
                required
                type="date"
                value={formData.contractStartDate}
                onChange={e => setFormData({ ...formData, contractStartDate: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Contract End Date</label>
              <input
                type="date"
                value={formData.contractEndDate}
                onChange={e => setFormData({ ...formData, contractEndDate: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">NSSF Number (Cambodia)</label>
              <input
                type="text"
                value={formData.nssfNumber}
                onChange={e => setFormData({ ...formData, nssfNumber: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">National ID / Passport</label>
              <input
                type="text"
                value={formData.nationalId}
                onChange={e => setFormData({ ...formData, nationalId: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-700/20 transition-all"
            >
              Save Employee Profile
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Employee Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Edit Profile: ${activeEmployee?.firstName} ${activeEmployee?.lastName}`}
        subtitle={`ID: ${activeEmployee?.id}`}
        maxWidth="3xl"
      >
        <form onSubmit={handleSaveEdit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">First Name *</label>
              <input
                required
                type="text"
                value={formData.firstName || ''}
                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name *</label>
              <input
                required
                type="text"
                value={formData.lastName || ''}
                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Job Position *</label>
              <input
                required
                type="text"
                value={formData.position || ''}
                onChange={e => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Department *</label>
              <select
                value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none font-semibold text-slate-700"
              >
                {departments.filter(d => d !== 'All').map(d => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Base Monthly Salary (USD) *</label>
              <input
                required
                type="number"
                min="100"
                value={formData.baseSalary || 0}
                onChange={e => setFormData({ ...formData, baseSalary: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
              >
                <option value="Active">Active</option>
                <option value="Probation">Probation</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-700/20 transition-all"
            >
              Update Employee
            </button>
          </div>
        </form>
      </Modal>

      {/* View Full Profile Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Employee Master Record"
        subtitle={activeEmployee ? `${activeEmployee.firstName} ${activeEmployee.lastName} (${activeEmployee.id})` : ''}
        maxWidth="3xl"
      >
        {activeEmployee && (
          <div className="space-y-6">
            {/* Top Identity Card */}
            <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white font-black text-xl flex items-center justify-center shadow-md shadow-emerald-600/20">
                {activeEmployee.firstName[0]}
                {activeEmployee.lastName[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-bold text-slate-900">
                    {activeEmployee.firstName} {activeEmployee.lastName}
                  </h3>
                  <Badge status={activeEmployee.status} />
                </div>
                <p className="text-xs text-slate-600 font-medium">{activeEmployee.position} • {activeEmployee.department}</p>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                  <span>✉ {activeEmployee.email}</span>
                  <span>📞 {activeEmployee.phone}</span>
                </p>
              </div>
            </div>

            {/* Profile Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-slate-100 bg-white space-y-2.5">
                <div className="font-bold text-slate-900 border-b pb-2 flex items-center gap-1.5 text-sm">
                  <Building className="w-4 h-4 text-emerald-600" /> Contract & Position
                </div>
                <div className="flex justify-between"><span className="text-slate-500">Employee ID:</span><span className="font-bold font-mono">{activeEmployee.id}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Contract Type:</span><span className="font-semibold">{activeEmployee.contractType}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Start Date:</span><span>{activeEmployee.contractStartDate}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">End Date:</span><span>{activeEmployee.contractEndDate}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Base Salary:</span><span className="font-bold text-emerald-600">${activeEmployee.baseSalary.toLocaleString()} USD</span></div>
              </div>

              <div className="p-4 rounded-xl border border-slate-100 bg-white space-y-2.5">
                <div className="font-bold text-slate-900 border-b pb-2 flex items-center gap-1.5 text-sm">
                  <ShieldCheck className="w-4 h-4 text-blue-600" /> Compliance & Banking
                </div>
                <div className="flex justify-between"><span className="text-slate-500">NSSF Number:</span><span className="font-mono font-semibold">{activeEmployee.nssfNumber}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">National ID / Passport:</span><span className="font-mono">{activeEmployee.nationalId}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Bank Account:</span><span>{activeEmployee.bankAccountNumber} ({activeEmployee.bankName})</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Emergency Contact:</span><span>{activeEmployee.emergencyContact?.name} ({activeEmployee.emergencyContact?.phone})</span></div>
              </div>
            </div>

            {/* Leave Balance Quotas */}
            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/70">
              <div className="font-bold text-slate-900 mb-3 text-sm flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-600" /> Statutory Leave Quotas & Balances
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center">
                  <div className="text-[11px] font-semibold text-slate-500">Annual Leave</div>
                  <div className="text-lg font-bold text-emerald-600 mt-0.5">{activeEmployee.leaveBalance?.annual?.remaining || 15} days</div>
                  <div className="text-[10px] text-slate-400">{activeEmployee.leaveBalance?.annual?.used || 0} taken of {activeEmployee.leaveBalance?.annual?.total || 18}</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center">
                  <div className="text-[11px] font-semibold text-slate-500">Sick Leave</div>
                  <div className="text-lg font-bold text-blue-600 mt-0.5">{activeEmployee.leaveBalance?.sick?.remaining || 9} days</div>
                  <div className="text-[10px] text-slate-400">{activeEmployee.leaveBalance?.sick?.used || 0} taken of {activeEmployee.leaveBalance?.sick?.total || 10}</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center">
                  <div className="text-[11px] font-semibold text-slate-500">Casual Leave</div>
                  <div className="text-lg font-bold text-purple-600 mt-0.5">{activeEmployee.leaveBalance?.casual?.remaining || 5} days</div>
                  <div className="text-[10px] text-slate-400">{activeEmployee.leaveBalance?.casual?.used || 0} taken of {activeEmployee.leaveBalance?.casual?.total || 5}</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center">
                  <div className="text-[11px] font-semibold text-slate-500">Maternity Leave</div>
                  <div className="text-lg font-bold text-pink-600 mt-0.5">{activeEmployee.leaveBalance?.maternity?.remaining || 0} days</div>
                  <div className="text-[10px] text-slate-400">{activeEmployee.gender === 'Female' ? '90 days standard' : 'N/A'}</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
              >
                Close Record
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
