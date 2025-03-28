// src/theme/palette.ts
import { PaletteOptions } from '@mui/material/styles';

// --- New Palette Definitions ---

// --- Light Theme Palette ---
export const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#5A92C9', // Muted Blue - Professional and calm
    // MUI can generate light/dark, or specify if needed:
    // light: '#88B5DC',
    // dark: '#3D70A8',
    contrastText: '#FFFFFF', // White text likely needed on this blue
  },
  secondary: {
    main: '#F7A440', // Subtle Orange/Yellow - Good for secondary actions or highlights
    contrastText: '#212529', // Dark text needed on orange/yellow
  },
  background: {
    default: '#F8F9FA', // Soft light gray background
    paper: '#FFFFFF',   // White for elements like cards, dialogs
  },
  text: {
    primary: '#212529', // Near-black for high readability
    secondary: '#6C757D', // Grey for less emphasis
  },
  error: { main: '#D32F2F' }, // Standard Material error red
  warning: { main: '#FFA000' }, // Amber/Yellow for warnings
  info: { main: '#1976D2' },   // Standard Material info blue
  success: { main: '#388E3C' }, // Standard Material success green
  divider: 'rgba(0, 0, 0, 0.12)',
};

// --- Dark Theme Palette ---
export const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#4FD1C5', // Bright Teal - Modern and pops on dark background
    contrastText: '#1A1D21', // Dark text likely needed on bright teal
  },
  secondary: {
    main: '#E75A7C', // Bright Pink - Strong accent for dark mode
    contrastText: '#FFFFFF', // White/Light text likely needed on pink
  },
  background: {
    default: '#1A1D21', // Deep charcoal background
    paper: '#2A2F34',   // Slightly lighter charcoal for elevated elements
  },
  text: {
    primary: '#E9ECEF', // Light grey for main text, good contrast
    secondary: '#ADB5BD', // Lighter grey for secondary text
  },
  error: { main: '#F44336' }, // Brighter red for dark mode contrast
  warning: { main: '#FFA726' }, // Brighter orange for warnings
  info: { main: '#26C6DA' },   // Bright Cyan for info - stands out
  success: { main: '#66BB6A' }, // Lighter green for success
  divider: 'rgba(255, 255, 255, 0.12)',
};