"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  Box,
  Avatar,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import DashboardIcon from "@mui/icons-material/Dashboard";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import useUserInfo from "@/hooks/useUserInfo";
import { logout } from "@/service/actions/logout";

const userMenu = [
  { label: "Client Dashboard", icon: <DashboardIcon />, path: "/dashboard/user" },
  { label: "My Appointments", icon: <CalendarMonthIcon />, path: "/dashboard/user/appointments" },
  { label: "Notifications", icon: <NotificationsIcon />, path: "/dashboard/user/notifications" },
];

const adminMenu = [
  { label: "Admin Dashboard", icon: <DashboardIcon />, path: "/dashboard/admin" },
  { label: "User Management", icon: <PeopleIcon />, path: "/dashboard/admin/users" },
  { label: "Appointment Management", icon: <CalendarMonthIcon />, path: "/dashboard/admin/appointments" },
  { label: "Analytics Overview", icon: <BarChartIcon />, path: "/dashboard/admin/analytics" },
];

const providerMenu = [
  { label: "Provider Dashboard", icon: <DashboardIcon />, path: "/dashboard/provider" },
  { label: "Today's Appointments", icon: <CalendarMonthIcon />, path: "/dashboard/provider/today" },
  { label: "Appointment Requests", icon: <EmailIcon />, path: "/dashboard/provider/requests" },
  { label: "Schedule", icon: <AccessTimeIcon />, path: "/dashboard/provider/schedule" },
  { label: "Analytics", icon: <BarChartIcon />, path: "/dashboard/provider/analytics" },
];

export default function DashboardDrawer({ children }: { children: React.ReactNode }) {
  const userInfo = useUserInfo();
  const pathname = usePathname();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.split(" ");
    return parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0][0];
  };

  const menuItems =
    userInfo?.role === "admin"
      ? adminMenu
      : userInfo?.role === "specialist"
      ? providerMenu
      : userMenu;

  const handleLogout = () => {
    logout(router);
    router.push("/login");
  };

  const drawerContent = (
    <div className="flex flex-col h-full">
      {/* Sidebar Title */}
      <div className="p-4 font-semibold text-xl flex items-center">
        QuickMeet
      </div>

      {/* Menu Items */}
      <List className="mt-2 flex-1">
        {menuItems.map(({ label, path, icon }) => (
          <Link key={path} href={path}>
            <ListItemButton
              selected={pathname === path}
              className={`rounded-lg mx-2 mb-1 transition-all ${
                pathname === path ? "bg-violet-100 text-violet-600" : "hover:bg-gray-100"
              }`}
              onClick={() => isMobile && setMobileOpen(false)}
            >
              <ListItemIcon className={`${pathname === path ? "text-violet-600" : "text-gray-500"}`}>
                {icon}
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </Link>
        ))}
      </List>

      {/* Bottom Section */}
      <div className="p-3">
        <Divider className="mb-2" />
        <List>
          <ListItemButton className="hover:bg-gray-100 rounded-lg mb-1">
            <ListItemIcon className="text-gray-500">
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>

          <ListItemButton
            onClick={handleLogout}
            className="hover:bg-red-100 rounded-lg text-white! bg-red-600! opacity-80"
          >
            <ListItemIcon className="text-white!">
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </div>
    </div>
  );

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: 260,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 260,
            boxSizing: "border-box",
            background: "#fff",
            borderRight: "1px solid #E5E7EB",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <Box className="box-border shadow flex items-center justify-between px-6 py-2 gap-4">
          {/* Hamburger for mobile */}
          {isMobile && (
            <IconButton onClick={() => setMobileOpen(true)} size="large">
              <MenuIcon />
            </IconButton>
          )}

          <div className="flex-1" /> {/* Spacer to push avatar to the right */}

          {/* Dynamic Avatar */}
          <Avatar
            src={userInfo?.image || ""}
            alt={userInfo?.name || "User"}
            sx={{
              width: 50,
              height: 50,
              fontSize: 20,
              bgcolor: userInfo?.image ? "transparent" : "#3b82f6",
              color: "white",
            }}
          >
            {!userInfo?.image && getInitials(userInfo?.name || "User")}
          </Avatar>
        </Box>

        <Box className="p-6">{children}</Box>
      </main>
    </div>
  );
}
