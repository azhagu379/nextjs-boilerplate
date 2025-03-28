// src/providers/CustomThemeProvider.tsx (Create this new file)
"use client";

import React, {
  createContext,
  useState,
  useMemo,
  useContext,
  useEffect,
} from "react";
import { createTheme, Theme, ThemeOptions } from "@mui/material/styles";
import { lightPalette, darkPalette } from "@/theme/palette"; 
import ThemeRegistry from "./ThemeRegistry";

const commonThemeOptions: Partial<ThemeOptions> = {
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif', 
    h1: { fontSize: "2.5rem", fontWeight: 600 },
    h2: { fontSize: "2rem", fontWeight: 600 },
  
  },
  shape: {
    borderRadius: 8, 
  },

};

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: "dark", 
  toggleTheme: () => {
    console.log("ThemeProvider not yet mounted");
  },
});

export const useCustomTheme = () => useContext(ThemeContext);

export function CustomThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<ThemeMode>("light"); 

  useEffect(() => {
    try {
      const storedMode = localStorage.getItem("themeMode") as ThemeMode | null;
      if (storedMode) {
        setMode(storedMode);
      } else {
        const prefersDark =
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches;
        setMode(prefersDark ? "dark" : "light");
      }
    } catch (error) {
      console.error("Could not read theme preference from localStorage", error);
    }
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

  // Use useMemo to create the theme object only when the mode changes
  const theme: Theme = useMemo(() => {
    const palette = mode === "light" ? lightPalette : darkPalette;
    return createTheme({
      ...commonThemeOptions, // Apply common settings
      palette: palette, // Apply mode-specific palette
    });
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {/* Pass the dynamically created theme object to ThemeRegistry */}
      <ThemeRegistry theme={theme}>{children}</ThemeRegistry>
    </ThemeContext.Provider>
  );
}
