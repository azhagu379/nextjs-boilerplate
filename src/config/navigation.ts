// src/config/navigation.ts
import React from 'react';
import type { Navigation } from '@toolpad/core/AppProvider'; // Import the type

// Import Lucide icons
import {
  Home,
  BookOpen,
  Tv,
  LayoutGrid,
  Settings,
  User,
} from 'lucide-react';

export const APP_NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main Menu',
  },
  {
    segment: '', // Corresponds to '/' route usually
    title: 'Home',
    icon: React.createElement(Home, { size: 20 }),
  },
  {
    segment: 'courses',
    title: 'Courses',
    icon: React.createElement(BookOpen, { size: 20 }),
    // Example of nested navigation if needed later
    // children: [
    //  { segment: 'typescript', title: 'TypeScript', icon: <GitBranch size={18} /> },
    //  { segment: 'react', title: 'React', icon: <GitBranch size={18} /> },
    // ]
  },
  {
    segment: 'series',
    title: 'Series',
    icon: React.createElement(Tv, { size: 20 }),
  },
  {
    segment: 'browse',
    title: 'Browse',
    icon: React.createElement(LayoutGrid, { size: 20 }),
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Account',
  },
  {
    segment: 'profile',
    title: 'Profile',
    icon: React.createElement(User, { size: 20 }),
  },
  {
    segment: 'settings',
    title: 'Settings',
    icon: React.createElement(Settings, { size: 20 }),
  },
];