"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";

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
  { label: "Client Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  {
    label: "My Appointments",
    icon: <CalendarMonthIcon />,
    path: "/appointments",
  },
  {
    label: "Notifications",
    icon: <NotificationsIcon />,
    path: "/notifications",
  },
];

const adminMenu = [
  { label: "Admin Dashboard", icon: <DashboardIcon />, path: "/admin" },
  { label: "User Management", icon: <PeopleIcon />, path: "/admin/users" },
  {
    label: "Appointment Management",
    icon: <CalendarMonthIcon />,
    path: "/admin/appointments",
  },
  {
    label: "Analytics Overview",
    icon: <BarChartIcon />,
    path: "/admin/analytics",
  },
];

const providerMenu = [
  { label: "Provider Dashboard", icon: <DashboardIcon />, path: "/provider" },
  {
    label: "Today's Appointments",
    icon: <CalendarMonthIcon />,
    path: "/provider/today",
  },
  {
    label: "Appointment Requests",
    icon: <EmailIcon />,
    path: "/provider/requests",
  },
  { label: "Schedule", icon: <AccessTimeIcon />, path: "/provider/schedule" },
  { label: "Analytics", icon: <BarChartIcon />, path: "/provider/analytics" },
];

export default function DashboardDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const userInfo = useUserInfo();
  const pathname = usePathname();
  const router = useRouter();

  // Choose the correct menu based on user role
  const menuItems =
    userInfo?.role === "admin"
      ? adminMenu
      : userInfo?.role === "specialist"
      ? providerMenu
      : userMenu;

  // Logout handler
  const handleLogout = () => {
    logout(router);
    router.push("/login");
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <Drawer
        variant="permanent"
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
        <div className="p-4 font-semibold text-xl border-b flex items-center">
          QuickMeet
        </div>

        <List className="mt-2">
          {menuItems.map(({ label, path, icon }) => (
            <Link key={path} href={path}>
              <ListItemButton
                selected={pathname === path}
                className={`rounded-lg mx-2 mb-1 transition-all ${
                  pathname === path
                    ? "bg-violet-100 text-violet-600"
                    : "hover:bg-gray-100"
                }`}
              >
                <ListItemIcon
                  className={`${
                    pathname === path ? "text-violet-600" : "text-gray-500"
                  }`}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </Link>
          ))}
        </List>

        {/* Bottom Section */}
        <div className="absolute bottom-0 w-full p-3">
          <Divider className="mb-2" />
          <List>
            <ListItemButton className="hover:bg-gray-100 rounded-lg mb-1">
              <ListItemIcon className="text-gray-500">
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>

            {/* Logout button */}
            <ListItemButton
              onClick={handleLogout}
              className="hover:bg-red-100 rounded-lg text-red-500"
            >
              <ListItemIcon className="text-red-500">
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </div>
      </Drawer>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
