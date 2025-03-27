// src/config/navigation.tsx
import React from 'react'; // Needed for JSX icons

// Import Lucide icons
import {
  Home,
  BookOpen,
  Tv,
  LayoutGrid,
  Settings,
  User,
} from 'lucide-react';

// Define drawer width as a constant
export const drawerWidth = 240;

// Define Navigation Item Type (Optional but good practice)
export interface NavItem {
  text: string;
  icon: React.ReactNode;
  href: string;
}

// Define navigation items
export const mainNavItems: NavItem[] = [
  { text: 'Home', icon: React.createElement(Home, { size: 20 }), href: '/' },
  { text: 'Courses', icon: React.createElement(BookOpen, { size: 20 }), href: '/courses' },
  { text: 'Series', icon: React.createElement(Tv, { size: 20 }), href: '/series' },
  { text: 'Browse', icon: React.createElement(LayoutGrid, { size: 20 }), href: '/browse' },
];

export const secondaryNavItems: NavItem[] = [
  { text: 'Profile', icon: React.createElement(User, { size: 20 }), href: '/profile' },
  { text: 'Settings', icon: React.createElement(Settings, { size: 20 }), href: '/settings' },
];