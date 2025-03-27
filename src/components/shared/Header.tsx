// src/components/shared/Header.tsx (Example component)
"use client";

import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
// Import Moon and Sun icons from lucide-react
import { Moon, Sun } from "lucide-react";
import { useCustomTheme } from "@/providers/CustomThemeProvider"; // Import the hook

export function Header() {
  const { mode, toggleTheme } = useCustomTheme(); // Use the theme context

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Tutorial App {/* Your App Name/Logo */}
        </Typography>

        {/* Theme Toggle Button using Lucide icons */}
        <IconButton
          sx={{ ml: 1 }}
          onClick={toggleTheme}
          color="inherit"
          aria-label="toggle theme">
          {/* Use Sun icon for dark mode (to switch to light), Moon icon for light mode (to switch to dark) */}
          {mode === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          {/* Added size prop for consistency, adjust as needed */}
        </IconButton>

        {/* Add other header items like profile menu, navigation etc. */}
      </Toolbar>
    </AppBar>
  );
}

// Remember to add this <Header /> component to your page layouts where needed.
// e.g., potentially inside src/app/layout.tsx or a specific page layout.
