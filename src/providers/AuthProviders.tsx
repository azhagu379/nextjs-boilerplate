// src/providers/AuthProvider.tsx
'use client';

import React, { createContext, useState, useContext, useMemo, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { name: string } | null; // Example user object
  // In a real app, you'd have login/logout functions interacting with your auth service
  // For now, just a mock toggle for demonstration
  mockLogin: () => void;
  mockLogout: () => void;
}

// Create context with a default value
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  mockLogin: () => {},
  mockLogout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Mock state - replace with real auth logic later
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);

  const mockLogin = () => {
    setIsAuthenticated(true);
    setUser({ name: 'Demo User' }); // Set dummy user data
    console.log('Mock Login Triggered');
  };

  const mockLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    console.log('Mock Logout Triggered');
  };

  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    isAuthenticated,
    user,
    mockLogin,
    mockLogout,
  }), [isAuthenticated, user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
      {/* Add a temporary button to toggle auth state for testing */}
      {/* Remove this in production */}
      {/* <div style={{ position: 'fixed', bottom: 10, right: 10, zIndex: 9999 }}>
         <button onClick={isAuthenticated ? mockLogout : mockLogin}>
            Toggle Auth (Dev)
         </button>
      </div> */}
    </AuthContext.Provider>
  );
}