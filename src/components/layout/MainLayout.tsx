// src/components/layout/MainLayout.tsx
'use client'; // This component needs state and effects, so it must be a client component

import * as React from 'react';
import Link from 'next/link';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// Import Lucide icons
import {
  Menu,
  ChevronLeft,
//   ChevronRight,
  Home,
  BookOpen,
  Tv,
  LayoutGrid, // Icon for Categories/Browse
  Settings,
  User,       // Icon for Profile
  Moon,
  Sun
} from 'lucide-react';

// Import theme context hook
import { useCustomTheme } from '@/providers/CustomThemeProvider';

// --- Styled Components and Mixins (Adapted from MUI example) ---

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

// Updated AppBar styled component (using variants array might be deprecated, adjust if needed)
// Using a simpler conditional style approach for clarity with `sx` prop or direct styling
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


// Updated Drawer styled component
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

// --- Navigation Items ---
const mainNavItems = [
  { text: 'Home', icon: <Home size={20} />, href: '/' },
  { text: 'Courses', icon: <BookOpen size={20} />, href: '/courses' },
  { text: 'Series', icon: <Tv size={20} />, href: '/series' },
  { text: 'Browse', icon: <LayoutGrid size={20} />, href: '/browse' },
];

const secondaryNavItems = [
  { text: 'Profile', icon: <User size={20} />, href: '/profile' },
  { text: 'Settings', icon: <Settings size={20} />, href: '/settings' },
];

// --- Main Layout Component ---
export function MainLayout({ children }: { children: React.ReactNode }) {
//   const theme = useTheme();
  const { mode: currentThemeMode, toggleTheme } = useCustomTheme(); // Get theme mode and toggle function
  const [open, setOpen] = React.useState(true); // Drawer starts open (or false if preferred)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} enableColorOnDark> {/* Added enableColorOnDark for better dark mode */}
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }), // Hide when drawer is open
            }}
          >
            <Menu /> {/* Lucide Menu Icon */}
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Tutorial App
          </Typography>

          {/* Theme Toggle Button */}
          <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit" aria-label="toggle theme">
            {currentThemeMode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </IconButton>

          {/* Placeholder for Profile Icon/Menu */}
          <IconButton sx={{ ml: 1 }} color="inherit" aria-label="user profile">
            <User size={20} />
          </IconButton>

        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {/* Use ChevronLeft for both LTR/RTL for simplicity, or add theme.direction check */}
            <ChevronLeft /> {/* Lucide ChevronLeft Icon */}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {mainNavItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={Link} // Use Next.js Link
                href={item.href}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {secondaryNavItems.map((item) => (
             <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={Link} // Use Next.js Link
                href={item.href}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* This Toolbar adds the necessary spacing below the fixed AppBar */}
        <Toolbar />
        {/* Render the actual page content here */}
        {children}
      </Box>
    </Box>
  );
}