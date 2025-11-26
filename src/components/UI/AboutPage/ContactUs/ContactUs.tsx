"use client";

import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { motion } from "framer-motion";

import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";

const ContactUs = () => {
  return (
    <>
      <Box className="py-20 px-4 flex justify-center bg-white">
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full">
          {/* LEFT FORM */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border border-purple-300 rounded-2xl p-10 shadow-sm bg-white"
          >
            <Typography fontWeight={700} className="text-xl! text-gray-900 mb-8">
              Send Us a Message
            </Typography>

            {/* NAME */}
            <Box className="p-5">
              <Typography className="text-sm mb-1 text-gray-700">
                Name
              </Typography>
              <TextField
                placeholder="Your Full Name"
                fullWidth
                variant="outlined"
                size="small"
                className="bg-white"
              />
            </Box>

            {/* EMAIL */}
            <Box className="p-5">
              <Typography className="text-sm mb-1 text-gray-700">
                Email
              </Typography>
              <TextField
                placeholder="your@email.com"
                fullWidth
                variant="outlined"
                size="small"
                className="bg-white"
              />
            </Box>

            {/* MESSAGE */}
            <Box className="p-5">
              <Typography className="text-sm mb-1 text-gray-700">
                Message
              </Typography>
              <TextField
                placeholder="How can we help you?"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                className="bg-white"
              />
            </Box>

            <Button
              variant="contained"
              fullWidth
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
            >
              Submit Inquiry
            </Button>
          </motion.div>

          {/* RIGHT INFO CARD */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="border border-gray-200 rounded-2xl p-10 shadow-sm bg-white"
          >
            <Typography fontWeight={700} className="text-xl! text-gray-900 mb-8!">
              Reach Out
            </Typography>

            {/* EMAIL */}
            <Box className="mb-8">
              <Typography className="text-gray-900 font-medium mb-1">
                Email Us
              </Typography>
              <Box className="flex items-center gap-3 text-gray-600">
                <EmailIcon fontSize="small" />
                info@quickmeet.com
              </Box>
            </Box>

            {/* CALL */}
            <Box className="mb-8">
              <Typography className="text-gray-900 font-medium mb-1">
                Call Us
              </Typography>
              <Box className="flex items-center gap-3 text-gray-600">
                <PhoneIcon fontSize="small" />
                +1 (234) 567-890
              </Box>
            </Box>

            {/* ADDRESS */}
            <Box className="mb-8">
              <Typography className="text-gray-900 font-medium mb-1">
                Visit Us
              </Typography>
              <Box className="flex items-center gap-3 text-gray-600 leading-relaxed">
                <LocationOnIcon fontSize="small" />
                123 Collaboration Way, Suite 400, Innovate City, CA 90210
              </Box>
            </Box>

            {/* SOCIALS */}
            <Box>
              <Typography className="text-gray-900 font-medium mb-2">
                Connect with Us
              </Typography>

              <Box className="flex items-center gap-5 text-gray-600 mt-2">
                <TwitterIcon className="cursor-pointer hover:text-purple-600" />
                <LinkedInIcon className="cursor-pointer hover:text-purple-600" />
                <FacebookIcon className="cursor-pointer hover:text-purple-600" />
              </Box>
            </Box>
          </motion.div>
        </Box>
      </Box>
    </>
  );
};

export default ContactUs;
