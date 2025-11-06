"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

import toast from "react-hot-toast";
import { logout } from "@/service/actions/logout";
import { useGetSingleUserQuery } from "@/redux/api/userApi";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (state: boolean) => () => setOpen(state);
  const router = useRouter();
  const pathname = usePathname();

  const {data : userInfo, isLoading} = useGetSingleUserQuery();
  
  

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      logout(router);
      toast.success("Logged out successfully!");
      router.push("/login");
    }
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Providers", href: "/providers" },
    { label: "Feature", href: "/feature" },
    { label: "About", href: "/about" },
  ];

  return (
    <Box
      className="
        flex justify-between items-center 
        px-6 md:px-10 py-4
        sticky top-0 z-50
        bg-white/60 backdrop-blur-lg border-b border-gray-200/40
        shadow-sm transition-all duration-300
      "
    >
      {/* Left - Logo */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          className="cursor-pointer bg-linear-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent"
        >
          QuickMeet
        </Typography>
      </motion.div>

      {/* Middle - Links (Desktop) */}
      <Box className="hidden md:flex justify-center gap-8">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.label}
              href={item.href}
              className="
                relative text-gray-700 font-medium 
                transition-all duration-300 group
                hover:text-blue-600
              "
            >
              {item.label}
              {isActive ? (
                <motion.span
                  layoutId="underline"
                  className="
                    absolute left-0 -bottom-1 
                    h-0.5 w-full 
                    bg-linear-to-r from-blue-600 to-indigo-500
                  "
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              ) : (
                <span
                  className="
                    absolute left-0 -bottom-1 w-0 h-0.5 
                    bg-linear-to-r from-blue-600 to-indigo-500
                    transition-all duration-300 group-hover:w-full
                  "
                />
              )}
            </Link>
          );
        })}
      </Box>

      {/* Right - Auth / Avatar */}
      <Box className="hidden md:flex items-center gap-4">
        {userInfo?.id ? (
          <>
            {/* ✅ Avatar linking to dashboard */}
            <IconButton
              onClick={() => router.push("/dashboard")}
              className="hover:scale-105 transition-transform"
            >
              <Avatar
                alt={userInfo?.name || "User"}
                src={userInfo?.profilePhoto || ""}
                sx={{ width: 38, height: 38 }}
              />
            </IconButton>

            <Button
              variant="outlined"
              size="small"
              onClick={handleLogout}
              className="
                transition-all duration-300 hover:scale-105 
                border-red-500 text-red-600 hover:bg-red-50
                rounded-full px-4
              "
            >
              Log Out
            </Button>
          </>
        ) : (
          <>
            <Link href="/login">
              <Button
                variant="outlined"
                size="small"
                className="
                  transition-all duration-300 hover:scale-105 
                  border-blue-500 text-blue-600 hover:bg-blue-50
                  rounded-full px-4
                "
              >
                Log In
              </Button>
            </Link>
            <Link href="/register">
              <Button
                variant="contained"
                size="small"
                color="primary"
                className="
                  transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 
                  bg-linear-to-r from-blue-600 to-indigo-500 text-white
                  rounded-full px-4
                "
              >
                Register
              </Button>
            </Link>
          </>
        )}
      </Box>

      {/* Mobile Menu Icon */}
      <Box className="md:hidden">
        <IconButton onClick={toggleDrawer(true)} className="text-blue-600">
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: "75%",
            backgroundColor: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
          },
        }}
      >
        <Box className="p-5 flex flex-col gap-6 h-full">
          {/* Header */}
          <Box className="flex justify-between items-center">
            <Typography
              variant="h6"
              fontWeight="bold"
              className="bg-linear-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent"
            >
              QuickMeet
            </Typography>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider />

          {/* Nav Links */}
          <List>
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <ListItem
                  key={item.label}
                  onClick={toggleDrawer(false)}
                  component={Link}
                  href={item.href}
                  className={`transition-all duration-200 rounded-lg ${
                    isActive ? "bg-blue-50" : "hover:bg-blue-50"
                  }`}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      className: `font-medium transition-all duration-300 ${
                        isActive
                          ? "text-blue-600"
                          : "text-gray-700 hover:text-blue-600"
                      }`,
                    }}
                  />
                </ListItem>
              );
            })}
          </List>

          {/* Auth Buttons (Mobile) */}
          <Box className="mt-auto flex flex-col gap-3">
            {userInfo?.id ? (
              <>
                {/* ✅ Avatar for mobile */}
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => {
                    toggleDrawer(false)();
                    router.push("/dashboard");
                  }}
                  className="
                    border-blue-500 text-blue-600 hover:bg-blue-50 
                    rounded-full
                  "
                >
                  Go to Dashboard
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleLogout}
                  className="
                    border-red-500 text-red-600 hover:bg-red-50 
                    rounded-full
                  "
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button
                    fullWidth
                    variant="outlined"
                    className="
                      border-blue-500 text-blue-600 hover:bg-blue-50 
                      rounded-full
                    "
                  >
                    Log In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    fullWidth
                    variant="contained"
                    className="
                      bg-linear-to-r from-blue-600 to-indigo-500 
                      hover:shadow-lg text-white rounded-full
                    "
                  >
                    Register
                  </Button>
                </Link>
              </>
            )}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Navbar;
