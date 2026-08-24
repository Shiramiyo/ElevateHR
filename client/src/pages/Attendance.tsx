import React, { useState, useEffect } from 'react';
import {
  Clock,
  Calendar,
  Search,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Building,
  Laptop
} from 'lucide-react';
import { Badge } from '../components/Badge';
import { AttendanceRecord } from '../types';
import { api } from '../services/api';
import { exportService } from '../services/exportService';

export const Attendance: React.FC = () => {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('2026-08-24');
  const [search, setSearch] = useState('');

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const data = await api.getAttendance({ date: selectedDate });
      setRecords(data);
    } catch (err) {
      console.error('Failed to fetch attendance:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [selectedDate]);

  const filteredRecords = records.filter(r =>
    r.employeeName.toLowerCase().includes(search.toLowerCase()) ||
    r.employeeId.toLowerCase().includes(search.toLowerCase()) ||
    r.department.toLowerCase().includes(search.toLowerCase())
  );

  const presentCount = records.filter(r => r.status === 'Present').length;
  const lateCount = records.filter(r => r.status === 'Late').length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Daily Attendance & Time Tracking</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time punch clock records, logged hours, punctuality tracking, and work mode status
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => exportService.exportAttendanceToExcel(records)}
            className="flex items-center space-x-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-xs transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase">Present On-Time</div>
            <div className="text-2xl font-extrabold text-slate-900">{presentCount}</div>
            <div className="text-[11px] text-emerald-600 font-medium">Standard 8:00 AM punch</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase">Late Arrivals</div>
            <div className="text-2xl font-extrabold text-amber-600">{lateCount}</div>
            <div className="text-[11px] text-slate-500">Punched after 8:15 AM</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase">Attendance Rate</div>
            <div className="text-2xl font-extrabold text-blue-600">98.4%</div>
            <div className="text-[11px] text-slate-500">Above corporate target (95%)</div>
          </div>
        </div>
      </div>

      {/* Controls & Filter */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search employee attendance..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-500">Select Date:</span>
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className="px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none"
          />
        </div>
      </div>

      {/* Attendance Records Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs">Loading attendance logs...</div>
        ) : filteredRecords.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs">No records found for {selectedDate}.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3.5">Employee</th>
                  <th className="px-6 py-3.5">Department</th>
                  <th className="px-6 py-3.5">Clock In</th>
                  <th className="px-6 py-3.5">Clock Out</th>
                  <th className="px-6 py-3.5">Logged Hours</th>
                  <th className="px-6 py-3.5">Work Type</th>
                  <th className="px-6 py-3.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRecords.map(rec => (
                  <tr key={rec.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{rec.employeeName}</div>
                      <div className="text-xs text-slate-400 font-mono">{rec.employeeId}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">{rec.department}</td>
                    <td className="px-6 py-4 font-mono text-xs font-bold text-emerald-700">
                      {rec.clockIn || '—'}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-600">
                      {rec.clockOut || 'Active In-Progress'}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-800">
                      {rec.loggedHours > 0 ? `${rec.loggedHours} hrs` : 'In Progress'}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                        {rec.workType === 'Remote' ? (
                          <Laptop className="w-3 h-3 text-purple-600" />
                        ) : (
                          <Building className="w-3 h-3 text-slate-500" />
                        )}
                        <span>{rec.workType}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge status={rec.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
