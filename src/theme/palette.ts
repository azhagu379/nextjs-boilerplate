// src/theme/palette.ts

import { PaletteOptions } from '@mui/material/styles';

// --- Your Defined Colors ---

// Base
const lightBg = '#F8F9FA';
const lightText = '#212529';
const darkBg = '#1A1D21';
const darkText = '#E9ECEF';

// Primary (Green)
const greenBase = '#198754';
const greenLightTheme = '#157347'; // Darker - for contrast on light bg
const greenDarkTheme = '#20C997'; // Brighter - for contrast on dark bg

// Accent (Yellow) - We'll map this to MUI's 'secondary' and 'warning'
const accentYellow = '#FFC107';
const accentYellowDark = '#FFA900'; // Darker yellow variant

// Neutrals
const neutralBgLight = '#E9ECEF';
const neutralBorderLight = '#CED4DA';
const neutralTextLight = '#6C757D';
const neutralBgDark = '#343A40';
const neutralBorderDark = '#495057';
const neutralTextDark = '#ADB5BD';

// Standard Colors (Optional - keep MUI defaults or define explicitly)
const errorMain = '#F44336'; // Standard Red
const infoMain = '#29B6F6';  // Standard Blue

// --- MUI Palette Options ---

// Palette for Light Mode
export const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    // Using your green shades for Primary
    main: greenLightTheme,       // #157347 (Darker green for good contrast)
    light: greenBase,           // #198754 (Slightly lighter than main)
    dark: '#105C3A',            // A derived darker shade of main green
    contrastText: '#FFFFFF',    // White text on the dark greens
  },
  secondary: {
    // Using your yellow shades for Secondary
    main: accentYellow,         // #FFC107
    light: '#FFD340',           // A derived lighter shade of main yellow
    dark: accentYellowDark,     // #FFA900 (Your darker variant)
    contrastText: lightText,    // Use the main dark text color for contrast on yellow
  },
  error: {
    main: errorMain,
  },
  warning: {
    // Yellow often maps well to warning
    main: accentYellow,
    dark: accentYellowDark,
    contrastText: lightText,
  },
  info: {
    main: infoMain,
  },
  success: {
    // Use appropriate green for success indication
    main: greenBase,            // #198754
    contrastText: '#FFFFFF',
  },
  background: {
    default: lightBg,           // #F8F9FA
    paper: neutralBgLight,      // #E9ECEF (Your specified background for cards/sections)
    // You could also use #FFFFFF for paper if you prefer whiter cards
  },
  text: {
    primary: lightText,         // #212529
    secondary: neutralTextLight,// #6C757D
    disabled: 'rgba(0, 0, 0, 0.38)', // Standard MUI disabled text
  },
  divider: neutralBorderLight,    // #CED4DA
  action: {
     // Define action colors if needed, e.g., for hover states
     // active: 'rgba(0, 0, 0, 0.54)',
     // hover: 'rgba(0, 0, 0, 0.04)',
     // selected: 'rgba(0, 0, 0, 0.08)',
     // disabled: 'rgba(0, 0, 0, 0.26)',
     // disabledBackground: 'rgba(0, 0, 0, 0.12)',
  }
};

// Palette for Dark Mode
export const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    // Using your green shades for Primary
    main: greenDarkTheme,       // #20C997 (Brighter green for visibility)
    light: '#4ADAB3',           // A derived lighter shade of main green
    dark: greenBase,            // #198754 (Slightly darker than main)
    contrastText: 'rgba(0, 0, 0, 0.87)', // Dark text on the bright green
  },
  secondary: {
    // Using your yellow shades for Secondary
    main: accentYellow,         // #FFC107
    light: '#FFD340',           // A derived lighter shade
    dark: accentYellowDark,     // #FFA900
    contrastText: lightText,    // Use the main dark text color for contrast on yellow
  },
  error: {
    main: errorMain, // Keep error red vibrant
  },
  warning: {
    // Yellow maps well to warning
    main: accentYellow,
    dark: accentYellowDark,
    contrastText: lightText,
  },
  info: {
    main: infoMain, // Keep info blue vibrant
  },
  success: {
    // Use the brighter green for success in dark mode
    main: greenDarkTheme,       // #20C997
    contrastText: 'rgba(0, 0, 0, 0.87)',
  },
  background: {
    default: darkBg,            // #1A1D21
    paper: neutralBgDark,       // #343A40 (Your specified background for cards/sections)
  },
  text: {
    primary: darkText,          // #E9ECEF
    secondary: neutralTextDark, // #ADB5BD
    disabled: 'rgba(255, 255, 255, 0.5)', // Standard MUI disabled text for dark
  },
  divider: neutralBorderDark,     // #495057
  action: {
     // Define action colors for dark theme if needed
     // active: '#fff',
     // hover: 'rgba(255, 255, 255, 0.08)',
     // selected: 'rgba(255, 255, 255, 0.16)',
     // disabled: 'rgba(255, 255, 255, 0.3)',
     // disabledBackground: 'rgba(255, 255, 255, 0.12)',
  }
};