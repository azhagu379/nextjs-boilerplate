// src/providers/CustomThemeProvider.tsx
"use client";

import React, {
  createContext, useState, useMemo, useContext, useEffect, ReactNode,
} from "react";
import {
  createTheme,
  Theme,
  ThemeOptions,
  responsiveFontSizes // Import responsiveFontSizes
} from "@mui/material/styles";
import { lightPalette, darkPalette } from "@/theme/palette"; // Keep importing palettes
import ThemeRegistry from "./ThemeRegistry"; // Keep using ThemeRegistry

// --- Font Definitions ---
// IMPORTANT: Ensure these fonts (Inter, JetBrains Mono) are loaded in your app,
// e.g., via Google Fonts <link> in layout.tsx or globals.css @import.
const FONT_FAMILY_SANS = ['Inter', 'Helvetica', 'Arial', 'sans-serif'].join(',');
const FONT_FAMILY_MONO = ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'].join(',');

// --- Typography Options ---
const typographyOptions: Partial<ThemeOptions['typography']> = {
  fontFamily: FONT_FAMILY_SANS,
  h1: { fontFamily: FONT_FAMILY_SANS, fontWeight: 700, fontSize: "2.5rem" /* Adjust as needed */ },
  h2: { fontFamily: FONT_FAMILY_SANS, fontWeight: 600, fontSize: "2rem" /* Adjust as needed */ },
  h3: { fontFamily: FONT_FAMILY_SANS, fontWeight: 600, fontSize: "1.75rem" },
  h4: { fontFamily: FONT_FAMILY_SANS, fontWeight: 600, fontSize: "1.5rem" },
  h5: { fontFamily: FONT_FAMILY_SANS, fontWeight: 500, fontSize: "1.25rem" },
  h6: { fontFamily: FONT_FAMILY_SANS, fontWeight: 500, fontSize: "1.1rem" },
  body1: { fontFamily: FONT_FAMILY_SANS },
  body2: { fontFamily: FONT_FAMILY_SANS },
  button: {
    fontFamily: FONT_FAMILY_SANS,
    fontWeight: 500,
    textTransform: 'none', // Keep button text case normal
  },
  // Monospace font applied via CssBaseline overrides below
};

// --- Common Theme Options (Shape, etc.) ---
const commonThemeOptions: Partial<ThemeOptions> = {
  shape: {
    borderRadius: 8,
  },
  // We'll add component overrides inside the createTheme call where 'mode' is available
};

// --- Theme Context (Keep as before) ---
type ThemeMode = "light" | "dark";
interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}
const ThemeContext = createContext<ThemeContextType>({
  mode: "light", // Default to light or dark based on preference
  toggleTheme: () => { console.log("ThemeProvider not yet mounted"); },
});
export const useCustomTheme = () => useContext(ThemeContext);

// --- Custom Theme Provider ---
export function CustomThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("light");

  // Effect for loading preference (Keep as before)
  useEffect(() => {
    try {
      const storedMode = localStorage.getItem("themeMode") as ThemeMode | null;
      if (storedMode) {
        setMode(storedMode);
      } else {
        const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
        setMode(prefersDark ? "dark" : "light");
      }
    } catch (error) { console.error("Could not read theme preference", error); }
  }, []);

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      try {
        localStorage.setItem("themeMode", newMode); // Store preference
      } catch (error) {
        console.error("Could not save theme preference to localStorage", error);
      }
      return newMode;
    });
  };

  // --- Create Theme with useMemo (Updated Logic) ---
  const theme: Theme = useMemo(() => {
    const currentPalette = mode === 'light' ? lightPalette : darkPalette;

    // Define component overrides, including CssBaseline
    const components: ThemeOptions['components'] = {
      MuiCssBaseline: {
        styleOverrides: `
          /* Ensure fonts are loaded via @import or <link> in layout/globals */

          code, pre, kbd, samp { /* Apply to more relevant elements */
            font-family: ${FONT_FAMILY_MONO};
            font-size: 0.9em;
            background-color: ${mode === 'light' ? 'rgba(233, 236, 239, 0.6)' : 'rgba(60, 68, 77, 0.6)'}; /* Subtle bg based on mode */
            padding: 0.2em 0.4em;
            border-radius: 4px;
            /* display: inline-block; removed as it can cause issues */
          }

          /* Ensure inline code doesn't break words weirdly */
          code {
             word-wrap: break-word;
          }

          pre {
            display: block;
            padding: 1em;
            margin: 1.5em 0; /* More vertical space */
            overflow-x: auto;
            background-color: ${currentPalette.background?.paper}; /* Use paper background */
            border: 1px solid ${currentPalette.divider}; /* Use divider color */
            border-radius: 6px;
            white-space: pre; /* Preserve whitespace */
            word-wrap: normal; /* Prevent wrapping long lines */
          }

          /* Optional: Style kbd element like a keyboard key */
          kbd {
            border: 1px solid ${currentPalette.divider};
            border-bottom-width: 2px;
            box-shadow: 0 1px 1px ${mode === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'};
            background-color: ${currentPalette.background?.paper};
          }
        `,
      },
      // Add other component overrides if needed
      MuiButton: {
        styleOverrides: {
          root: {
            // Example: Increase default padding slightly
            // padding: '8px 20px',
          }
        }
      },
      MuiAppBar: {
        styleOverrides: {
           root: {
             // Example: Slightly transparent AppBar
             // backgroundColor: mode === 'light' ? 'rgba(248, 249, 250, 0.9)' : 'rgba(26, 29, 33, 0.9)',
             // backdropFilter: 'blur(6px)',
           }
         }
       },
       // ... more overrides
    };

    // Create the base theme
    let createdTheme = createTheme({
      ...commonThemeOptions, // Apply shape, etc.
      palette: currentPalette, // Apply mode-specific palette
      typography: typographyOptions, // Apply typography settings
      components: components, // Apply component overrides (including CssBaseline)
    });

    // Apply responsive font sizes
    createdTheme = responsiveFontSizes(createdTheme);

    return createdTheme;
  }, [mode]); // Recreate theme only when mode changes

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {/* ThemeRegistry handles MuiThemeProvider + CssBaseline */}
      <ThemeRegistry theme={theme}>
        {children}
      </ThemeRegistry>
    </ThemeContext.Provider>
  );
}