import React, { createContext, useContext, useState, useEffect } from 'react';
import { Employee, Role } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  currentUser: Employee | null;
  role: Role;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<void>;
  quickLogin: (employeeId: string) => Promise<void>;
  logout: () => void;
  switchUser: (id: string) => void;
  switchRole: (role: Role) => void;
  isClockedIn: boolean;
  setIsClockedIn: (val: boolean) => void;
  clockInTime: string | null;
  setClockInTime: (val: string | null) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<Employee | null>(null);
  const [role, setRole] = useState<Role>('admin');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Default to logged in as HR Admin for instant demo convenience, with Sign Out available
  const [isClockedIn, setIsClockedIn] = useState<boolean>(true);
  const [clockInTime, setClockInTime] = useState<string | null>("08:02:15");

  const loadInitialUser = async () => {
    const savedUserId = localStorage.getItem('ehr_active_user_id');
    const isLoggedOut = localStorage.getItem('ehr_logged_out') === 'true';

    if (isLoggedOut) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const emps = await api.getEmployees();
      if (emps.length > 0) {
        let userToLoad = emps.find(e => e.id === savedUserId);
        if (!userToLoad) {
          userToLoad = emps.find(e => e.role === 'admin') || emps[0];
        }
        setCurrentUser(userToLoad);
        setRole(userToLoad.role);
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error('Failed to load user:', err);
    }
  };

  useEffect(() => {
    loadInitialUser();
  }, []);

  const login = async (email: string, password?: string) => {
    const res = await api.login(email, password);
    setCurrentUser(res.user);
    setRole(res.user.role);
    setIsAuthenticated(true);
    localStorage.setItem('ehr_active_user_id', res.user.id);
    localStorage.removeItem('ehr_logged_out');
  };

  const quickLogin = async (employeeId: string) => {
    const emp = await api.getEmployeeById(employeeId);
    setCurrentUser(emp);
    setRole(emp.role);
    setIsAuthenticated(true);
    localStorage.setItem('ehr_active_user_id', emp.id);
    localStorage.removeItem('ehr_logged_out');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('ehr_active_user_id');
    localStorage.setItem('ehr_logged_out', 'true');
  };

  const switchUser = async (id: string) => {
    try {
      const emp = await api.getEmployeeById(id);
      setCurrentUser(emp);
      setRole(emp.role);
      localStorage.setItem('ehr_active_user_id', emp.id);
    } catch (err) {
      console.error('Failed to switch user:', err);
    }
  };

  const switchRole = async (targetRole: Role) => {
    try {
      const emps = await api.getEmployees();
      const match = emps.find(e => e.role === targetRole) || emps[0];
      if (match) {
        setCurrentUser(match);
        setRole(match.role);
        localStorage.setItem('ehr_active_user_id', match.id);
      }
    } catch (err) {
      console.error('Failed to switch role:', err);
    }
  };

  const refreshUser = async () => {
    if (currentUser) {
      try {
        const emp = await api.getEmployeeById(currentUser.id);
        setCurrentUser(emp);
      } catch (err) {
        console.error('Failed to refresh user:', err);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role,
        isAuthenticated,
        login,
        quickLogin,
        logout,
        switchUser,
        switchRole,
        isClockedIn,
        setIsClockedIn,
        clockInTime,
        setClockInTime,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
