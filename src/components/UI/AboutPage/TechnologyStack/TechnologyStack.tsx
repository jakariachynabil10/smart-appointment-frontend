"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

// MATERIAL UI ICONS
import StorageIcon from "@mui/icons-material/Storage";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import ForumIcon from "@mui/icons-material/Forum";
import SecurityIcon from "@mui/icons-material/Security";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import BarChartIcon from "@mui/icons-material/BarChart";

const items = [
  {
    icon: <StorageIcon className="text-blue-500" />,
    title: "Scalable Databases",
    desc: "Ensuring robust data storage and retrieval for seamless operations.",
  },
  {
    icon: <CloudQueueIcon className="text-blue-500" />,
    title: "Cloud Infrastructure",
    desc: "Leveraging global cloud services for high availability and speed.",
  },
  {
    icon: <ForumIcon className="text-blue-500" />,
    title: "Real-time Communication",
    desc: "Powering instant messaging and live interaction features seamlessly.",
  },
  {
    icon: <SecurityIcon className="text-blue-500" />,
    title: "Advanced Security",
    desc: "Protecting user data and communications with industry-leading encryption.",
  },
  {
    icon: <AccountTreeIcon className="text-blue-500" />,
    title: "Microservices Architecture",
    desc: "Building modular and resilient systems for rapid development.",
  },
  {
    icon: <SmartToyIcon className="text-blue-500" />,
    title: "AI & Automation",
    desc: "Integrating intelligent bots for scheduling and task management efficiency.",
  },
  {
    icon: <DeviceHubIcon className="text-blue-500" />,
    title: "Responsive UI",
    desc: "Delivering a consistent and intuitive experience across all devices.",
  },
  {
    icon: <BarChartIcon className="text-blue-500" />,
    title: "Analytics & Reporting",
    desc: "Providing actionable insights into meeting trends and collaboration patterns.",
  },
];

const TechnologyStack = () => {
  return (
    <>
      {/* PARENT WITH SAME ANIMATION */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.7,
          ease: "easeOut",
        }}
      >
        <Box className="py-16 md:py-24 px-4 bg-white">
          {/* TITLE */}
          <Typography
            fontWeight="bold"
            className="text-center text-3xl! sm:text-3xl! md:text-4xl! text-gray-900"
          >
            Our Core Technology Stack
          </Typography>

          {/* SUBTEXT */}
          <Typography className="text-center mt-10! text-neutral-600 opacity-80 leading-relaxed">
            We leverage cutting-edge technologies to build a robust, secure, and
            highly{" "}
            <span className="hidden lg:inline">
              <br />
            </span>{" "}
            performant platform. Our infrastructure is designed for reliability
            and scalability{" "}
            <span className="hidden lg:inline">
              <br />
            </span>{" "}
            to meet the demands of modern collaboration.
          </Typography>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 md:mx-20">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.07,
                  y: -4,
                  boxShadow: "0px 12px 30px rgba(0,0,0,0.12)",
                }}
                whileTap={{ scale: 0.97 }}
                animate={{ y: [0, -3, 0] }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 2.5,
                }}
                className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 flex flex-col items-center text-center transition-all"
              >
                {/* ICON WRAPPER */}
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-50 mb-4">
                  {item.icon}
                </div>

                <Typography
                  fontWeight="600"
                  className="text-gray-900 text-lg mb-2"
                >
                  {item.title}
                </Typography>

                <Typography className="text-neutral-600 text-sm leading-relaxed">
                  {item.desc}
                </Typography>
              </motion.div>
            ))}
          </div>
        </Box>
      </motion.div>
    </>
  );
};

export default TechnologyStack;
