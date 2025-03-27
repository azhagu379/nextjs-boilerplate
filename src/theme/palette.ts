// src/theme/palette.ts (Create this new file)

import { PaletteOptions } from '@mui/material/styles';

// --- Define Your Brand Colors ---
const PRIMARY_MAIN = '#007AFF'; // A vibrant, modern blue (similar to iOS blue)
const PRIMARY_LIGHT = '#66B2FF';
const PRIMARY_DARK = '#0052CC';

const SECONDARY_MAIN = '#E91E63'; // A vivid magenta/pink
const SECONDARY_LIGHT = '#FF6090';
const SECONDARY_DARK = '#B0003A';

const ERROR_MAIN = '#F44336'; // Standard error red
const WARNING_MAIN = '#FFA726'; // Standard warning orange
const INFO_MAIN = '#29B6F6';    // Standard info light blue
const SUCCESS_MAIN = '#66BB6A'; // Standard success green (used sparingly is okay)
// --- End Brand Colors ---


// Palette for Light Mode
export const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: PRIMARY_MAIN,
    light: PRIMARY_LIGHT,
    dark: PRIMARY_DARK,
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: SECONDARY_MAIN,
    light: SECONDARY_LIGHT,
    dark: SECONDARY_DARK,
    contrastText: '#FFFFFF',
  },
  error: { main: ERROR_MAIN },
  warning: { main: WARNING_MAIN },
  info: { main: INFO_MAIN },
  success: { main: SUCCESS_MAIN },
  background: {
    default: '#F8F9FA', // Very light gray background
    paper: '#FFFFFF',   // White for cards, dialogs, etc.
  },
  text: {
    primary: '#212529',   // Dark gray for primary text
    secondary: '#6C757D', // Lighter gray for secondary text
  },
  divider: 'rgba(0, 0, 0, 0.12)',
};

// Palette for Dark Mode
export const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: PRIMARY_LIGHT, // Use the lighter shade for better contrast on dark background
    light: '#A0CFFF',    // Even lighter shade if needed
    dark: PRIMARY_MAIN,  // Darker shade is the 'original' main
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },
  secondary: {
    main: SECONDARY_LIGHT, // Lighter shade of pink
    light: '#FF94B8',
    dark: SECONDARY_MAIN,
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },
  error: { main: '#F44336' }, // Keep error colors vibrant
  warning: { main: '#FFA726' },
  info: { main: '#29B6F6' },
  success: { main: '#66BB6A' },
  background: {
    default: '#121212', // Standard dark background
    paper: '#1E1E1E',   // Slightly lighter dark for surfaces
  },
  text: {
    primary: '#E0E0E0',   // Light gray for primary text
    secondary: '#A0A0A0', // Dimmer gray for secondary text
  },
  divider: 'rgba(255, 255, 255, 0.12)',
};