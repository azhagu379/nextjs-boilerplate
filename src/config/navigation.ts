
// src/config/navigation.tsx
import React from 'react';
import { Home, BookOpen, Tv, LayoutGrid, Settings, User, ShieldCheck } from 'lucide-react'; // Add role-specific icons

export const drawerWidth = 240;

// Define Roles (Example - match your backend roles)
export type UserRole = 'admin' | 'instructor' | 'student' | 'guest';

export interface NavItem {
  text: string;
  icon: React.ReactNode;
  href: string;
  /** Roles allowed to see this item. If undefined, visible to all authenticated. */
  roles?: UserRole[];
  /** If true, visible even if not authenticated */
  public?: boolean;
}



export const mainNavItems: NavItem[] = [
  { text: 'Home', icon: React.createElement(Home, { size: 20 }), href: '/', public: true },
  { text: 'Courses', icon: React.createElement(BookOpen, { size: 20 }), href: '/courses',public: true },
  { text: 'Series', icon: React.createElement(Tv, { size: 20 }), href: '/series', public: true },
  { text: 'Browse', icon: React.createElement(LayoutGrid, { size: 20 }), href: '/browse',public: true },
  { text: 'Admin Panel', icon: React.createElement(ShieldCheck, { size: 20 }), href: '/admin', roles: ['admin'] }, // Admin only

];

export const secondaryNavItems: NavItem[] = [
  { text: 'Profile', icon: React.createElement(User, { size: 20 }), href: '/profile' },
  { text: 'Settings', icon: React.createElement(Settings, { size: 20 }), href: '/settings' },
];

