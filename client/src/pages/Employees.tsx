import React, { useState, useEffect, useRef } from 'react';
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
  UserX,
  Eye,
  Mail,
  Phone,
  Building,
  ShieldCheck,
  Calendar,
  DollarSign,
  Camera,
  Upload,
  Globe,
  AlertTriangle,
  CheckCircle2,
  FileCheck2,
  Briefcase,
  X
} from 'lucide-react';
import { Badge } from '../components/Badge';
import { Modal } from '../components/Modal';
import { Employee, WorkPermitStatus } from '../types';
import { api } from '../services/api';
import { exportService } from '../services/exportService';
import { pdfService } from '../services/pdfService';

const PRESET_AVATARS = [
  { label: 'Female 1', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80' },
  { label: 'Male 1', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80' },
  { label: 'Male 2', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80' },
  { label: 'Female 2', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80' },
  { label: 'Male 3', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80' },
  { label: 'Female 3', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80' },
  { label: 'Male 4', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80' },
  { label: 'Female 4', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80' },
];

const NATIONALITIES = [
  { code: 'Cambodian', label: '🇰🇭 Cambodian', isForeign: false },
  { code: 'French', label: '🇫🇷 French', isForeign: true },
  { code: 'Australian', label: '🇦🇺 Australian', isForeign: true },
  { code: 'Malaysian', label: '🇲🇾 Malaysian', isForeign: true },
  { code: 'Singaporean', label: '🇸🇬 Singaporean', isForeign: true },
  { code: 'Chinese', label: '🇨🇳 Chinese', isForeign: true },
  { code: 'Vietnamese', label: '🇻🇳 Vietnamese', isForeign: true },
  { code: 'American', label: '🇺🇸 American', isForeign: true },
  { code: 'British', label: '🇬🇧 British', isForeign: true },
  { code: 'Japanese', label: '🇯🇵 Japanese', isForeign: true },
  { code: 'Other', label: '🌐 Other Expatriate', isForeign: true },
];

export const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedOrigin, setSelectedOrigin] = useState('All');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [activeEmployee, setActiveEmployee] = useState<Employee | null>(null);

  // File input ref for portrait
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    avatar: '',
    nationality: 'Cambodian',
    isForeignWorker: false,
    passportNumber: '',
    passportExpiryDate: '',
    visaType: 'EB Business Visa (1-Year)',
    visaExpiryDate: '',
    workPermitNumber: '',
    workPermitIssueDate: '',
    workPermitExpiryDate: '',
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
        status: selectedStatus,
        origin: selectedOrigin
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
  }, [search, selectedDept, selectedStatus, selectedOrigin]);

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
      password: 'password123',
      nssfNumber: `NSSF-${Math.floor(10000000 + Math.random() * 90000000)}`,
      nationalId: `${Math.floor(100000000 + Math.random() * 900000000)}`,
      address: 'Phnom Penh, Cambodia',
      bankName: 'ABA Bank',
      bankAccountNumber: `00${Math.floor(1000000 + Math.random() * 9000000)}`,
      avatar: PRESET_AVATARS[0].url,
      nationality: 'Cambodian',
      isForeignWorker: false,
      passportNumber: '',
      passportExpiryDate: '',
      visaType: 'EB Business Visa (1-Year)',
      visaExpiryDate: '',
      workPermitNumber: '',
      workPermitIssueDate: '',
      workPermitExpiryDate: '',
      emergencyContact: {
        name: 'Emergency Contact',
        relationship: 'Family',
        phone: '+855 12 000 111'
      }
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (emp: Employee) => {
    setActiveEmployee(emp);
    setFormData(emp);
    setIsEditModalOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Photo size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFormData(prev => ({ ...prev, avatar: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleNationalityChange = (nat: string) => {
    const isForeign = nat !== 'Cambodian';
    setFormData(prev => ({
      ...prev,
      nationality: nat,
      isForeignWorker: isForeign,
      visaType: isForeign && !prev.visaType ? 'EB Business Visa (1-Year)' : prev.visaType,
      workPermitNumber: isForeign && !prev.workPermitNumber ? `FWCMS-2026-${Math.floor(100000 + Math.random() * 900000)}` : prev.workPermitNumber
    }));
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
    if (!window.confirm(`Archive account for ${name}? The employee will be deactivated and unable to log in, but historical records will be preserved.`)) return;
    try {
      await api.deleteEmployee(id, false);
      fetchEmployees();
    } catch (err) {
      console.error('Failed to archive employee:', err);
    }
  };

  const handlePermanentDelete = async (id: string, name: string) => {
    if (!window.confirm(`⚠️ PERMANENT DELETE: Are you sure you want to permanently delete ${name} from the database? This action CANNOT be undone.`)) return;
    try {
      await api.deleteEmployee(id, true);
      fetchEmployees();
    } catch (err) {
      console.error('Failed to permanently delete employee:', err);
    }
  };

  const handleView = (emp: Employee) => {
    setActiveEmployee(emp);
    setIsViewModalOpen(true);
  };

  const departments = ['All', 'Human Resources', 'Engineering', 'Design', 'Finance', 'Marketing', 'Quality Assurance'];
  const statuses = ['All', 'Active', 'Probation', 'Archived'];
  const originFilters = [
    { value: 'All', label: 'All Workforce' },
    { value: 'Cambodian', label: '🇰🇭 Cambodian Nationals' },
    { value: 'Foreign', label: '🌐 Foreign Workers (Expats)' },
    { value: 'ExpiringPermits', label: '⚠️ Permits Expiring Soon' },
  ];

  const foreignCount = employees.filter(e => e.isForeignWorker).length;
  const expiringPermitsCount = employees.filter(e => e.isForeignWorker && (e.workPermitStatus === 'Expiring Soon' || e.workPermitStatus === 'Expired')).length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Employee Directory & Compliance</h1>
            {expiringPermitsCount > 0 && (
              <span className="px-2.5 py-0.5 bg-amber-50 text-amber-800 text-xs font-bold rounded-full border border-amber-300 flex items-center gap-1 shadow-2xs">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                {expiringPermitsCount} Work Permit{expiringPermitsCount > 1 ? 's' : ''} Expiring
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Centralized employee lifecycle management with MoLVT Work Permits, NSSF, and Cambodia Labour Law compliance
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
            placeholder="Search by name, ID, position, nationality, work permit..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Origin / Work Permit Filter */}
          <div className="flex items-center space-x-1 text-xs">
            <select
              value={selectedOrigin}
              onChange={e => setSelectedOrigin(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              {originFilters.map(o => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-1 text-xs">
            <select
              value={selectedDept}
              onChange={e => setSelectedDept(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              {departments.map(d => (
                <option key={d} value={d}>
                  {d === 'All' ? 'All Departments' : d}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-1 text-xs">
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              {statuses.map(s => (
                <option key={s} value={s}>
                  {s === 'All' ? 'All Statuses' : s}
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
                  <th className="px-6 py-3.5">Employee & Photo</th>
                  <th className="px-6 py-3.5">Role & Position</th>
                  <th className="px-6 py-3.5">Nationality & Work Permit</th>
                  <th className="px-6 py-3.5">Department</th>
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
                        {emp.avatar ? (
                          <img
                            src={emp.avatar}
                            alt={`${emp.firstName} ${emp.lastName}`}
                            className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-2xs"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-xs border border-slate-200">
                            {emp.firstName[0]}
                            {emp.lastName[0]}
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-slate-900 flex items-center gap-1.5">
                            <span>{emp.firstName} {emp.lastName}</span>
                            {emp.isForeignWorker && (
                              <span className="text-[10px] px-1.5 py-0.2 bg-blue-50 text-blue-700 rounded border border-blue-200 font-semibold" title="Foreign Worker / Expatriate">
                                Expat
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-400 font-mono">{emp.id}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800">{emp.position}</div>
                      <div className="text-xs text-slate-500 capitalize">{emp.role}</div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="text-xs font-semibold text-slate-800 flex items-center gap-1">
                        <span>{emp.nationality || 'Cambodian'}</span>
                      </div>
                      {emp.isForeignWorker ? (
                        <div className="mt-0.5">
                          {emp.workPermitStatus === 'Valid' && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3" /> FWCMS Valid
                            </span>
                          )}
                          {emp.workPermitStatus === 'Expiring Soon' && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-300 animate-pulse">
                              <AlertTriangle className="w-3 h-3 text-amber-600" /> Expiring: {emp.workPermitExpiryDate}
                            </span>
                          )}
                          {emp.workPermitStatus === 'Expired' && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-300">
                              <X className="w-3 h-3 text-rose-600" /> Permit Expired
                            </span>
                          )}
                          {emp.workPermitStatus === 'Pending Renewal' && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                              Pending Renewal
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400">Local (NSSF Registered)</span>
                      )}
                    </td>

                    <td className="px-6 py-4 font-medium text-slate-700">{emp.department}</td>

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
                            className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                            title="Archive / Deactivate Employee"
                          >
                            <UserX className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handlePermanentDelete(emp.id, `${emp.firstName} ${emp.lastName}`)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Permanently Delete from Database"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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
        subtitle="Create an employee profile with portrait, contract, and Cambodia compliance tracking"
        maxWidth="3xl"
      >
        <form onSubmit={handleSaveAdd} className="space-y-5">
          {/* Portrait Photo Uploader */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
            <label className="block text-xs font-bold text-slate-800 mb-2">Employee Portrait (Photo)</label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative group">
                {formData.avatar ? (
                  <img
                    src={formData.avatar}
                    alt="Preview"
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-slate-200 text-slate-500 flex flex-col items-center justify-center text-xs font-semibold border-2 border-dashed border-slate-300">
                    <Camera className="w-6 h-6 mb-1 text-slate-400" />
                    <span>No Photo</span>
                  </div>
                )}
                {formData.avatar && (
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, avatar: '' }))}
                    className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white rounded-full p-1 shadow-xs hover:bg-rose-700"
                    title="Remove Photo"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              <div className="flex-1 space-y-2 text-center sm:text-left">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl shadow-2xs flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Upload Portrait File</span>
                  </button>
                  <span className="text-[11px] text-slate-400">PNG, JPG up to 5MB</span>
                </div>

                {/* Quick Presets Gallery */}
                <div>
                  <span className="text-[11px] text-slate-500 block mb-1">Or choose preset avatar:</span>
                  <div className="flex items-center gap-1.5 justify-center sm:justify-start flex-wrap">
                    {PRESET_AVATARS.map((p, idx) => (
                      <img
                        key={idx}
                        src={p.url}
                        alt={p.label}
                        onClick={() => setFormData(prev => ({ ...prev, avatar: p.url }))}
                        className={`w-7 h-7 rounded-lg object-cover cursor-pointer border transition-all ${
                          formData.avatar === p.url ? 'border-emerald-600 ring-2 ring-emerald-500/30 scale-110' : 'border-slate-200 opacity-70 hover:opacity-100'
                        }`}
                        title={p.label}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

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
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nationality *</label>
              <select
                value={formData.nationality || 'Cambodian'}
                onChange={e => handleNationalityChange(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none font-semibold text-slate-700"
              >
                {NATIONALITIES.map(n => (
                  <option key={n.code} value={n.code}>
                    {n.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cambodia MoLVT Foreign Worker Work Permit Section */}
          {formData.isForeignWorker && (
            <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span>Cambodia Foreign Worker & Work Permit Compliance (MoLVT / FWCMS)</span>
                </div>
                <span className="text-[11px] px-2 py-0.5 bg-blue-200/60 text-blue-800 rounded font-semibold">
                  Required by Cambodia Labour Law Arts. 261-265
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-blue-950 mb-1">Passport Number *</label>
                  <input
                    type="text"
                    placeholder="e.g. FR-9821039A"
                    value={formData.passportNumber || ''}
                    onChange={e => setFormData({ ...formData, passportNumber: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-blue-950 mb-1">Passport Expiry Date</label>
                  <input
                    type="date"
                    value={formData.passportExpiryDate || ''}
                    onChange={e => setFormData({ ...formData, passportExpiryDate: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-blue-950 mb-1">Cambodia Visa Type</label>
                  <input
                    type="text"
                    placeholder="e.g. EB Business Visa (1-Year)"
                    value={formData.visaType || 'EB Business Visa (1-Year)'}
                    onChange={e => setFormData({ ...formData, visaType: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-blue-950 mb-1">Visa Expiry Date</label>
                  <input
                    type="date"
                    value={formData.visaExpiryDate || ''}
                    onChange={e => setFormData({ ...formData, visaExpiryDate: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-blue-950 mb-1">MoLVT / FWCMS Work Permit Card # *</label>
                  <input
                    type="text"
                    placeholder="e.g. FWCMS-2026-881920"
                    value={formData.workPermitNumber || ''}
                    onChange={e => setFormData({ ...formData, workPermitNumber: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-blue-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-blue-950 mb-1">Work Permit Expiry Date *</label>
                  <input
                    type="date"
                    value={formData.workPermitExpiryDate || ''}
                    onChange={e => setFormData({ ...formData, workPermitExpiryDate: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <label className="block text-xs font-semibold text-slate-700 mb-1">National ID / Resident Card</label>
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
          {/* Portrait Photo Uploader in Edit */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
            <label className="block text-xs font-bold text-slate-800 mb-2">Update Portrait (Photo)</label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative">
                {formData.avatar ? (
                  <img
                    src={formData.avatar}
                    alt="Preview"
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-slate-200 text-slate-500 flex flex-col items-center justify-center text-xs font-semibold border-2 border-dashed border-slate-300">
                    <Camera className="w-6 h-6 mb-1 text-slate-400" />
                    <span>No Photo</span>
                  </div>
                )}
                {formData.avatar && (
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, avatar: '' }))}
                    className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white rounded-full p-1 shadow-xs hover:bg-rose-700"
                    title="Remove Photo"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              <div className="flex-1 space-y-2 text-center sm:text-left">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <input
                    type="file"
                    id="edit-avatar-input"
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <label
                    htmlFor="edit-avatar-input"
                    className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl shadow-2xs cursor-pointer flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Upload New Photo</span>
                  </label>
                </div>

                <div className="flex items-center gap-1.5 justify-center sm:justify-start flex-wrap">
                  {PRESET_AVATARS.map((p, idx) => (
                    <img
                      key={idx}
                      src={p.url}
                      alt={p.label}
                      onClick={() => setFormData(prev => ({ ...prev, avatar: p.url }))}
                      className={`w-7 h-7 rounded-lg object-cover cursor-pointer border transition-all ${
                        formData.avatar === p.url ? 'border-emerald-600 ring-2 ring-emerald-500/30 scale-110' : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                      title={p.label}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

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
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nationality *</label>
              <select
                value={formData.nationality || 'Cambodian'}
                onChange={e => handleNationalityChange(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:outline-none font-semibold text-slate-700"
              >
                {NATIONALITIES.map(n => (
                  <option key={n.code} value={n.code}>
                    {n.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cambodia Work Permit in Edit */}
          {formData.isForeignWorker && (
            <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span>Cambodia Foreign Worker & Work Permit Compliance (MoLVT / FWCMS)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-blue-950 mb-1">Passport Number</label>
                  <input
                    type="text"
                    value={formData.passportNumber || ''}
                    onChange={e => setFormData({ ...formData, passportNumber: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-blue-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-blue-950 mb-1">Passport Expiry Date</label>
                  <input
                    type="date"
                    value={formData.passportExpiryDate || ''}
                    onChange={e => setFormData({ ...formData, passportExpiryDate: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-blue-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-blue-950 mb-1">MoLVT Work Permit Card #</label>
                  <input
                    type="text"
                    value={formData.workPermitNumber || ''}
                    onChange={e => setFormData({ ...formData, workPermitNumber: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-blue-200 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-blue-950 mb-1">Work Permit Expiry Date</label>
                  <input
                    type="date"
                    value={formData.workPermitExpiryDate || ''}
                    onChange={e => setFormData({ ...formData, workPermitExpiryDate: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-blue-200 rounded-xl"
                  />
                </div>
              </div>
            </div>
          )}

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
            {/* Top Identity Card with Portrait Photo */}
            <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              {activeEmployee.avatar ? (
                <img
                  src={activeEmployee.avatar}
                  alt={`${activeEmployee.firstName} ${activeEmployee.lastName}`}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-500 shadow-md"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-emerald-600 text-white font-black text-2xl flex items-center justify-center shadow-md shadow-emerald-600/20">
                  {activeEmployee.firstName[0]}
                  {activeEmployee.lastName[0]}
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-bold text-slate-900">
                    {activeEmployee.firstName} {activeEmployee.lastName}
                  </h3>
                  <Badge status={activeEmployee.status} />
                  {activeEmployee.isForeignWorker ? (
                    <span className="text-xs px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-full font-bold border border-blue-200">
                      🌐 Foreign Worker ({activeEmployee.nationality})
                    </span>
                  ) : (
                    <span className="text-xs px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold border border-emerald-200">
                      🇰🇭 Cambodian National
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 font-medium mt-0.5">{activeEmployee.position} • {activeEmployee.department}</p>
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

            {/* Foreign Worker Compliance Card */}
            {activeEmployee.isForeignWorker && (
              <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 space-y-3">
                <div className="font-bold text-blue-950 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <span>Cambodia MoLVT Foreign Work Permit Record</span>
                  </div>
                  {activeEmployee.workPermitStatus === 'Valid' && (
                    <span className="text-xs px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold border border-emerald-300">
                      FWCMS Valid
                    </span>
                  )}
                  {activeEmployee.workPermitStatus === 'Expiring Soon' && (
                    <span className="text-xs px-2.5 py-0.5 bg-amber-100 text-amber-900 rounded-full font-bold border border-amber-300 animate-pulse">
                      ⚠️ Expiring Soon
                    </span>
                  )}
                  {activeEmployee.workPermitStatus === 'Expired' && (
                    <span className="text-xs px-2.5 py-0.5 bg-rose-100 text-rose-800 rounded-full font-bold border border-rose-300">
                      Expired
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-white p-2.5 rounded-lg border border-blue-100">
                    <span className="text-[10px] text-slate-400 block">Passport #</span>
                    <span className="font-bold font-mono text-slate-900">{activeEmployee.passportNumber || 'N/A'}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Exp: {activeEmployee.passportExpiryDate || 'N/A'}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-blue-100">
                    <span className="text-[10px] text-slate-400 block">Visa Type</span>
                    <span className="font-bold text-slate-900">{activeEmployee.visaType || 'EB Business'}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Exp: {activeEmployee.visaExpiryDate || 'N/A'}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-blue-100">
                    <span className="text-[10px] text-slate-400 block">FWCMS Permit Card #</span>
                    <span className="font-bold font-mono text-blue-700">{activeEmployee.workPermitNumber || 'N/A'}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Issued: {activeEmployee.workPermitIssueDate || 'N/A'}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-blue-100">
                    <span className="text-[10px] text-slate-400 block">Work Permit Expiry</span>
                    <span className={`font-bold ${activeEmployee.workPermitStatus === 'Expiring Soon' ? 'text-amber-600' : 'text-slate-900'}`}>
                      {activeEmployee.workPermitExpiryDate || 'N/A'}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">MoLVT Quota Compliant</span>
                  </div>
                </div>
              </div>
            )}

            {/* Cambodia Statutory Leave Balance Quotas */}
            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/70">
              <div className="font-bold text-slate-900 mb-1 text-sm flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span>Statutory Leave Quotas & Balances (Cambodia Labour Law)</span>
                </div>
                <span className="text-[11px] text-slate-400 font-normal">Arts. 166-171, Prakas 267</span>
              </div>
              <p className="text-[11px] text-slate-500 mb-3">
                Includes Annual Leave (+1 day per 3 yrs continuous service) and Special/Family Event Leave.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center">
                  <div className="text-[11px] font-semibold text-slate-500">Annual Leave (Art. 166)</div>
                  <div className="text-lg font-bold text-emerald-600 mt-0.5">{activeEmployee.leaveBalance?.annual?.remaining || 15} days</div>
                  <div className="text-[10px] text-slate-400">{activeEmployee.leaveBalance?.annual?.used || 0} taken of {activeEmployee.leaveBalance?.annual?.total || 18}</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center">
                  <div className="text-[11px] font-semibold text-slate-500">Special Leave (Prakas 267)</div>
                  <div className="text-lg font-bold text-purple-600 mt-0.5">
                    {activeEmployee.leaveBalance?.special?.remaining ?? activeEmployee.leaveBalance?.casual?.remaining ?? 6} days
                  </div>
                  <div className="text-[10px] text-slate-400">7 days/yr family events</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center">
                  <div className="text-[11px] font-semibold text-slate-500">Sick Leave (Medical)</div>
                  <div className="text-lg font-bold text-blue-600 mt-0.5">{activeEmployee.leaveBalance?.sick?.remaining || 9} days</div>
                  <div className="text-[10px] text-slate-400">{activeEmployee.leaveBalance?.sick?.used || 0} taken of {activeEmployee.leaveBalance?.sick?.total || 10}</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 text-center">
                  <div className="text-[11px] font-semibold text-slate-500">
                    {activeEmployee.gender === 'Female' ? 'Maternity Leave (Art. 182)' : 'Paternity Leave'}
                  </div>
                  <div className="text-lg font-bold text-pink-600 mt-0.5">
                    {activeEmployee.gender === 'Female' ? `${activeEmployee.leaveBalance?.maternity?.remaining || 90} days` : `${activeEmployee.leaveBalance?.paternity?.remaining || 3} days`}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {activeEmployee.gender === 'Female' ? '90 calendar days' : '3 days event leave'}
                  </div>
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
