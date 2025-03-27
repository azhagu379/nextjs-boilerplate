"use client";
import React from "react";
import { ThemeProvider as MuiThemeProvider, Theme } from "@mui/material/styles"; // Import Theme type
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

// ThemeRegistry now ACCEPTS a theme object instead of creating it
export default function ThemeRegistry({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: Theme;
}) {
  return (
    <AppRouterCacheProvider>
      {/* Use the theme passed down from CustomThemeProvider */}
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </AppRouterCacheProvider>
  );
}
