// src/components/layout/TopAppBar.tsx
import * as React from 'react';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { Menu, Sun, Moon, User as UserIcon } from 'lucide-react';
import Tooltip from '@mui/material/Tooltip'; // Import Tooltip
import { useCustomTheme } from '@/providers/CustomThemeProvider';
import { drawerWidth } from '@/config/navigation'; // Import drawerWidth

// Styled AppBar definition (moved here)
interface CustomAppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<CustomAppBarProps>(({ theme, open }) => ({
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

// Props for TopAppBar component
interface TopAppBarProps {
  open: boolean;
  handleDrawerOpen: () => void;
  title: string;
}

export function TopAppBar({ open, handleDrawerOpen, title }: TopAppBarProps) {
  const { mode: currentThemeMode, toggleTheme } = useCustomTheme();

  return (
    <AppBar position="fixed" open={open} enableColorOnDark>
      <Toolbar>
        {/* Menu Icon (to open drawer) */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),
          }}
        >
          <Menu />
        </IconButton>

        {/* App Title */}
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>

        {/* Theme Toggle Button */}
        <Tooltip title={`Toggle ${currentThemeMode === 'dark' ? 'light' : 'dark'} mode`}>
           <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit" aria-label="toggle theme">
               {currentThemeMode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
           </IconButton>
        </Tooltip>

        {/* Profile Icon/Button (Add Link/Menu later) */}
        <Tooltip title="Profile">
           <IconButton sx={{ ml: 1 }} color="inherit" aria-label="user profile">
               <UserIcon size={20} />
           </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}