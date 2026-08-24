import React, { useState, useEffect } from 'react';
import {
  FileText,
  Upload,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  Filter,
  ShieldCheck,
  Search,
  FileCheck,
  FileSpreadsheet
} from 'lucide-react';
import { Badge } from '../components/Badge';
import { Modal } from '../components/Modal';
import { DocumentItem, Employee } from '../types';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const Documents: React.FC = () => {
  const { currentUser } = useAuth();
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Upload Modal State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadData, setUploadData] = useState({
    employeeId: '',
    docType: 'NSSF Card',
    fileName: '',
    fileSize: '1.4 MB',
    category: 'Identification'
  });

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const [docs, emps] = await Promise.all([
        api.getDocuments(),
        api.getEmployees()
      ]);
      setDocuments(docs);
      setEmployees(emps);
      if (emps.length > 0 && !uploadData.employeeId) {
        setUploadData(prev => ({ ...prev, employeeId: emps[0].id }));
      }
    } catch (err) {
      console.error('Failed to fetch documents:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleVerify = async (docId: string, status: 'Verified' | 'Rejected') => {
    try {
      const verifier = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'HR Manager';
      await api.verifyDocument(docId, status, verifier);
      fetchDocuments();
    } catch (err) {
      console.error('Failed to update document status:', err);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.uploadDocument({
        ...uploadData,
        fileName: uploadData.fileName || `${uploadData.docType.replace(/\s+/g, '_')}.pdf`
      });
      setIsUploadModalOpen(false);
      fetchDocuments();
    } catch (err) {
      console.error('Failed to upload document:', err);
    }
  };

  const categories = ['All', 'Identification', 'Legal', 'Career', 'General'];

  const filteredDocs = documents.filter(d => {
    const matchSearch =
      d.employeeName.toLowerCase().includes(search.toLowerCase()) ||
      d.docType.toLowerCase().includes(search.toLowerCase()) ||
      d.fileName.toLowerCase().includes(search.toLowerCase()) ||
      d.employeeId.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === 'All' || d.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Compliance & Document Repository</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage NSSF cards, National IDs/Passports, employment contracts, and employee resumes
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-700/20 transition-all self-start md:self-auto"
        >
          <Upload className="w-4 h-4" />
          <span>Upload New Document</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search documents by employee, title, or filename..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium text-slate-500">Category:</span>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none"
          >
            {categories.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Documents Grid */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 text-xs">Loading documents...</div>
      ) : filteredDocs.length === 0 ? (
        <div className="p-12 text-center text-slate-400 text-xs">No documents found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocs.map(doc => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700">
                    <FileText className="w-6 h-6 text-emerald-600" />
                  </div>
                  <Badge status={doc.status} />
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">{doc.docType}</h4>
                  <p className="text-xs text-slate-500 font-mono mt-0.5 truncate">{doc.fileName}</p>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 text-xs space-y-1 text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Employee:</span>
                    <span className="font-semibold">{doc.employeeName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Category:</span>
                    <span>{doc.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Uploaded:</span>
                    <span>{doc.uploadedAt} ({doc.fileSize})</span>
                  </div>
                  {doc.verifiedBy && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Verified By:</span>
                      <span>{doc.verifiedBy}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-mono">{doc.id}</span>

                <div className="flex items-center space-x-1.5">
                  {doc.status === 'Pending Verification' && (
                    <>
                      <button
                        onClick={() => handleVerify(doc.id, 'Verified')}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-2xs"
                        title="Verify document authenticity"
                      >
                        Verify
                      </button>
                      <button
                        onClick={() => handleVerify(doc.id, 'Rejected')}
                        className="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-semibold border border-rose-200"
                        title="Reject document"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => alert(`Simulating download for ${doc.fileName}`)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
                    title="Download document file"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Document Modal */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload Compliance Document"
        subtitle="Attach ID, NSSF card, employment contract, or certificates"
        maxWidth="md"
      >
        <form onSubmit={handleUploadSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Select Employee *</label>
            <select
              value={uploadData.employeeId}
              onChange={e => setUploadData({ ...uploadData, employeeId: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none font-semibold text-slate-700"
            >
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {emp.firstName} {emp.lastName} ({emp.id})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Document Type *</label>
            <select
              value={uploadData.docType}
              onChange={e => setUploadData({ ...uploadData, docType: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
            >
              <option value="NSSF Card">NSSF Card (Cambodia)</option>
              <option value="National ID / Passport">National ID / Passport</option>
              <option value="Employment Contract">Employment Contract</option>
              <option value="CV / Resume">CV / Resume</option>
              <option value="Certificate">Degree / Professional Certificate</option>
              <option value="Other Document">Other Document</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Document Category *</label>
            <select
              value={uploadData.category}
              onChange={e => setUploadData({ ...uploadData, category: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
            >
              <option value="Identification">Identification</option>
              <option value="Legal">Legal</option>
              <option value="Career">Career</option>
              <option value="General">General</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Document File Name *</label>
            <input
              required
              type="text"
              placeholder="e.g. Darith_Sok_NSSF_2026.pdf"
              value={uploadData.fileName}
              onChange={e => setUploadData({ ...uploadData, fileName: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md shadow-emerald-700/20"
            >
              Upload & Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
