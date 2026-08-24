import React, { createContext, useContext, useState, useEffect } from 'react';
import { Employee, Role } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  currentUser: Employee | null;
  role: Role;
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
  const [isClockedIn, setIsClockedIn] = useState<boolean>(true);
  const [clockInTime, setClockInTime] = useState<string | null>("08:02:15");

  const loadInitialUser = async () => {
    try {
      const emps = await api.getEmployees();
      if (emps.length > 0) {
        // Default to Admin: Sophea Chan
        const adminUser = emps.find(e => e.role === 'admin') || emps[0];
        setCurrentUser(adminUser);
        setRole(adminUser.role);
      }
    } catch (err) {
      console.error('Failed to load initial user:', err);
    }
  };

  useEffect(() => {
    loadInitialUser();
  }, []);

  const switchUser = async (id: string) => {
    try {
      const emp = await api.getEmployeeById(id);
      setCurrentUser(emp);
      setRole(emp.role);
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
