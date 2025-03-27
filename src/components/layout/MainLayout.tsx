// src/components/layout/MainLayout.tsx
"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar"; // Needed for spacing

// Import the refactored sub-components
import { TopAppBar } from "./TopAppBar";
import { SideDrawer } from "./SideDrawer";

// Main Layout Component - Manages state and structure
export function MainLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(true); // Drawer state

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Render the Top AppBar */}
      <TopAppBar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        title="Tutorial App" // Pass the application title
      />

      {/* Render the Side Drawer */}
      <SideDrawer open={open} handleDrawerClose={handleDrawerClose} />

      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Toolbar spacer: Ensures content isn't hidden under the fixed AppBar */}
        <Toolbar />
        {/* Render the page content passed as children */}
        {children}
      </Box>
    </Box>
  );
}
