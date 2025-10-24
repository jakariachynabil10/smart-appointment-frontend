"use client";

import Link from "next/link";
import { Box, Typography, IconButton } from "@mui/material";
import { Facebook, Twitter, LinkedIn, Instagram } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box component="footer" className="bg-gray-50 mt-20 border-t border-gray-200">
      {/* Main Footer Content */}
      <Box className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-10">
        {/* Left Section */}
        <Box className="flex-1">
          <Link href="/" className="no-underline">
            <Typography
              variant="h6"
              color="primary"
              fontWeight="bold"
              className="mb-2 cursor-pointer"
            >
              QuickMeet
            </Typography>
          </Link>

          <Typography variant="body2" color="text.secondary" className="leading-relaxed">
            Streamlining your appointment booking <br/> experience with smart, role-based features.
          </Typography>

          {/* Social Icons */}
          <Box className="flex gap-2 mt-4">
            <IconButton href="https://facebook.com" target="_blank" color="primary">
              <Facebook fontSize="small" />
            </IconButton>
            <IconButton href="https://twitter.com" target="_blank" color="primary">
              <Twitter fontSize="small" />
            </IconButton>
            <IconButton href="https://linkedin.com" target="_blank" color="primary">
              <LinkedIn fontSize="small" />
            </IconButton>
            <IconButton href="https://instagram.com" target="_blank" color="primary">
              <Instagram fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Right Section (Links Columns) */}
        <Box className="flex flex-wrap md:flex-nowrap gap-10 text-sm text-gray-600">
          {/* QuickMeet Column */}
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" className="mb-2">
              QuickMeet
            </Typography>
            <ul className="space-y-1">
              <li>
                <Link href="/features" className="hover:text-blue-600 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </Box>

          {/* Company Column */}
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" className="mb-2">
              Company
            </Typography>
            <ul className="space-y-1">
              <li>
                <Link href="/mission" className="hover:text-blue-600 transition-colors">
                  Mission
                </Link>
              </li>
              <li>
                <Link href="/technology" className="hover:text-blue-600 transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-blue-600 transition-colors">
                  Team
                </Link>
              </li>
            </ul>
          </Box>

          {/* Legal Column */}
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" className="mb-2">
              Legal
            </Typography>
            <ul className="space-y-1">
              <li>
                <Link href="/terms" className="hover:text-blue-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </Box>
        </Box>
      </Box>

      {/* Bottom Bar */}
      <Box className="text-center py-4 border-t border-gray-200 text-sm text-gray-500">
        © {new Date().getFullYear()} QuickMeet. All rights reserved.
      </Box>
    </Box>
  );
};

export default Footer;
