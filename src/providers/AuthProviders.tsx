// src/providers/AuthProvider.tsx
'use client';

import React, { createContext, useState, useContext, useMemo, ReactNode } from 'react';

// Define Roles (Example - match your backend roles)
type UserRole = 'admin' | 'instructor' | 'student' | 'guest';

// Define a User type for the context
interface User {
  id: string;
  name: string;
  role: UserRole;
  // Add email or other fields if needed by your app
}


// --- UPDATE AuthContextType ---
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null; // Use the User interface here
  mockLogin: (role?: UserRole) => void; // Allow passing a role for testing
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // --- UPDATE useState ---
  const [user, setUser] = useState<User | null>(null); // Use the User interface here

  // --- UPDATE mockLogin ---
  const mockLogin = (role: UserRole = 'student') => { // Default mock role to student
    setIsAuthenticated(true);
    // Set dummy user data including ID and the specified role
    setUser({ id: 'user_mock_001', name: 'Demo User', role: role });
    console.log(`Mock Login Triggered as role: ${role}`);
  };

  const mockLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    console.log('Mock Logout Triggered');
  };

  const value = useMemo(() => ({
    isAuthenticated,
    user,
    mockLogin,
    mockLogout,
  }), [isAuthenticated, user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
      {/* Add temporary buttons to toggle auth state/role for testing */}
      {/* Remove this in production */}
      {/* <div style={{ position: 'fixed', bottom: 10, right: 10, zIndex: 9999, background: 'white', padding: '5px', border: '1px solid black', display:'flex', gap:'5px' }}>
        {!isAuthenticated ? (
            <>
              <button onClick={() => mockLogin('student')}>Login as Student</button>
              <button onClick={() => mockLogin('instructor')}>Login as Instructor</button>
              <button onClick={() => mockLogin('admin')}>Login as Admin</button>
            </>
        ) : (
            <button onClick={mockLogout}>Logout</button>
        )}
      </div> */}
    </AuthContext.Provider>
  );
}