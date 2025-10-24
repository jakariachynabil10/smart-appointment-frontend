"use client";

import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

const Navbar = () => {
  return (
    <Box className="flex justify-between items-center px-10 py-4 shadow-md bg-white/70 backdrop-blur-md sticky top-0 z-50">
      {/* Left - Logo */}
      <Typography
        color="primary"
        variant="h6"
        fontWeight="bold"
        className="cursor-pointer transition-transform duration-300 hover:scale-105"
      >
        QuickMeet
      </Typography>

      {/* Middle - Links */}
      <Box className="flex justify-center gap-8">
        {["Home", "Providers", "Features", "About"].map((item) => (
          <Link
            key={item}
            href={`/${item === "Home" ? "" : item.toLowerCase()}`}
            className="relative text-gray-700 font-medium transition-all duration-300 hover:text-blue-600 group"
          >
            {item}
            {/* Animated underline */}
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        ))}
      </Box>

      {/* Right - Buttons */}
      <Box className="flex gap-4">
        <Link href="/login">
          <Button
            variant="outlined"
            size="small"
            className="transition-all duration-300 hover:scale-105"
          >
            Log In
          </Button>
        </Link>
        <Link href="/register">
          <Button
            variant="contained"
            size="small"
            color="primary"
            className="transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            Register
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Navbar;
