"use client";

import { motion } from "framer-motion";
import {
  Person,
  Business,
  AdminPanelSettings,
  FormatQuote,
} from "@mui/icons-material";

const TailoredExprience = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const,
      },
    },
  };

  const roles = [
    {
      icon: <Person className="text-4xl" />,
      title: "Clients",
      description:
        "Browse providers, book new appointments, and manage your upcoming schedule with ease. All through your personalized dashboard.",
      color: "bg-linear-to-r from-blue-500 to-cyan-500",
    },
    {
      icon: <Business className="text-4xl" />,
      title: "Providers",
      description:
        "Oversee your daily appointments, manage requests, and track your business analytics. Focus on your clients, not the paperwork.",
      color: "bg-linear-to-r from-purple-500 to-pink-500",
    },
    {
      icon: <AdminPanelSettings className="text-4xl" />,
      title: "Administrators",
      description:
        "Gain full control over user accounts and packages. Monitor system health and ensure smooth operation with comprehensive oversight.",
      color: "bg-linear-to-r from-green-500 to-emerald-500",
    },
  ];

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-blue-50 to-purple-50 rounded-full -translate-y-32 translate-x-32 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-linear-to-tr from-purple-50 to-pink-50 rounded-full translate-y-24 -translate-x-24 opacity-60"></div>

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Tailored Experiences for Every Role
          </h2>
        </motion.div>

        {/* Roles Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {roles.map((role, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="group"
            >
              <div className="h-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden relative">
                {/* linear top border */}
                <div className={`h-1 ${role.color}`}></div>

                <div className="p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-2xl bg-gray-100 text-gray-700 group-hover:scale-110 transition-transform duration-300">
                      {role.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {role.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {role.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TailoredExprience;
