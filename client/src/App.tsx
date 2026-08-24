import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { Employees } from './pages/Employees';
import { LeaveManagement } from './pages/LeaveManagement';
import { Payroll } from './pages/Payroll';
import { Attendance } from './pages/Attendance';
import { Documents } from './pages/Documents';
import { Reports } from './pages/Reports';
import { EmployeePortal } from './pages/EmployeePortal';
import { ArchitectureViewer } from './pages/ArchitectureViewer';
import { api } from './services/api';

const AppContent: React.FC = () => {
  const { role } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [pendingLeavesCount, setPendingLeavesCount] = useState<number>(0);

  // Auto adjust tab when switching to employee role
  useEffect(() => {
    if (role === 'employee' && activeTab !== 'portal' && activeTab !== 'architecture') {
      setActiveTab('portal');
    }
  }, [role]);

  const loadPendingCount = async () => {
    try {
      const leaves = await api.getLeaves({ status: 'Pending' });
      setPendingLeavesCount(leaves.length);
    } catch (err) {
      console.error('Failed to load pending count:', err);
    }
  };

  useEffect(() => {
    loadPendingCount();
    const interval = setInterval(loadPendingCount, 15000);
    return () => clearInterval(interval);
  }, []);

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveTab} />;
      case 'employees':
        return <Employees />;
      case 'leaves':
        return <LeaveManagement />;
      case 'payroll':
        return <Payroll />;
      case 'attendance':
        return <Attendance />;
      case 'documents':
        return <Documents />;
      case 'reports':
        return <Reports />;
      case 'portal':
        return <EmployeePortal />;
      case 'architecture':
        return <ArchitectureViewer />;
      default:
        return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-slate-50 overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingLeavesCount={pendingLeavesCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <Navbar onRefreshAll={loadPendingCount} />

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {renderActivePage()}
          </div>
        </main>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
