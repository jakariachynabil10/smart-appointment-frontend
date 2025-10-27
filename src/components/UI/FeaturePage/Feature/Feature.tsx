"use client";
import { motion, Variants } from "framer-motion";
import {
  Dashboard,
  EventAvailable,
  Lock,
  BarChart,
  NotificationsActive,
  AdminPanelSettings,
  Build,
  Extension,
} from "@mui/icons-material";

const features = [
  {
    icon: <Dashboard fontSize="large" className="text-indigo-600" />,
    title: "Role-Based Dashboards",
    description:
      "Tailored dashboards for clients, providers, and admins, ensuring relevant data and actions are always at your fingertips.",
  },
  {
    icon: <EventAvailable fontSize="large" className="text-indigo-600" />,
    title: "Smart Booking System",
    description:
      "An intuitive booking experience with real-time availability, smart conflict detection, and automated scheduling.",
  },
  {
    icon: <Lock fontSize="large" className="text-indigo-600" />,
    title: "Secure Authentication & Roles",
    description:
      "Robust user authentication and granular role management to control access and permissions across the platform.",
  },
  {
    icon: <BarChart fontSize="large" className="text-indigo-600" />,
    title: "Insightful Analytics",
    description:
      "Gain valuable insights with comprehensive reports and data visualizations to optimize your operations and growth.",
  },
  {
    icon: <NotificationsActive fontSize="large" className="text-indigo-600" />,
    title: "Real-time Notifications",
    description:
      "Automated email and in-app notifications for appointments, changes, and important updates to keep everyone informed.",
  },
  {
    icon: <AdminPanelSettings fontSize="large" className="text-indigo-600" />,
    title: "Admin Management Portal",
    description:
      "Centralized control for administrators to manage users, services, locations, and system configurations with ease.",
  },
  {
    icon: <Build fontSize="large" className="text-indigo-600" />,
    title: "Customizable Services",
    description:
      "Define and customize your service offerings, durations, pricing, and availability to match your unique business needs.",
  },
  {
    icon: <Extension fontSize="large" className="text-indigo-600" />,
    title: "Integrations & Add-ons",
    description:
      "Seamlessly integrate with other tools and expand functionality with optional add-ons for enhanced capabilities.",
  },
];

// ✅ Define Variants with proper typing & easing function array
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1], // cubic-bezier easing (same as "easeOut")
    },
  },
};

const Feature = () => {
  return (
    <section className="py-16 px-4 text-center bg-white overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
      >
        Powerful Features Built for Efficiency
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true }}
        className="text-gray-500 max-w-2xl mx-auto mb-12"
      >
        Explore the comprehensive capabilities that make QuickMeet the ultimate
        solution for managing your appointments.
      </motion.p>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 12px 30px rgba(79,70,229,0.15)",
              borderColor: "#4f46e5",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="border border-gray-200 rounded-2xl p-6 bg-white transition-all duration-300 text-left hover:border-indigo-500"
          >
            <div className="mb-3">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Feature;
