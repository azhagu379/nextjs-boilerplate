// src/components/layout/SideDrawer.tsx
import Link from "next/link";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import { ChevronLeft } from "lucide-react";

// Import navigation config and types
import {
  drawerWidth,
  mainNavItems,
  secondaryNavItems,
  NavItem,
} from "@/config/navigation";

// --- Styled Components and Mixins (Moved Here) ---

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar, // necessary for content to be below app bar
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
// --- End Styled Components ---

// Helper function to render Navigation List Items
const renderNavList = (items: NavItem[], open: boolean) => (
  <List>
    {items.map((item) => (
      <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
        <ListItemButton
          component={Link}
          href={item.href}
          title={item.text} // Add title for tooltip when closed
          aria-label={item.text}
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}>
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
);

// Props for SideDrawer component
interface SideDrawerProps {
  open: boolean;
  handleDrawerClose: () => void;
}

export function SideDrawer({ open, handleDrawerClose }: SideDrawerProps) {
  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose} aria-label="close drawer">
          {/* Add theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft /> if supporting RTL */}
          <ChevronLeft />
        </IconButton>
      </DrawerHeader>
      <Divider />
      {renderNavList(mainNavItems, open)}
      <Divider />
      {renderNavList(secondaryNavItems, open)}
    </Drawer>
  );
}
